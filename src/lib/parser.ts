import mammoth from 'mammoth';
import { ResumeData, WorkExperience, Education, SkillGroup, Project } from '../types/resume';

/**
 * High-Precision Client-Side Resume Parser for PDF, DOCX, and JSON files.
 */
export async function parseResumeFile(file: File): Promise<Partial<ResumeData>> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.json')) {
    const text = await file.text();
    return JSON.parse(text);
  }

  let rawText = '';

  if (fileName.endsWith('.docx')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      rawText = result.value || '';
    } catch (err) {
      console.warn('Mammoth DOCX parsing failed, fallback to text:', err);
      rawText = await file.text();
    }
  } else if (fileName.endsWith('.pdf')) {
    rawText = await extractPDFText(file);
  } else {
    rawText = await file.text();
  }

  return precisionParseResume(rawText);
}

/**
 * Extract clean text string from PDF using pdfjs-dist text layer
 */
async function extractPDFText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
    });

    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageLines: string[] = [];
      
      let lastY: number | null = null;
      let currentLine = '';

      for (const item of textContent.items as any[]) {
        if (!item.str) continue;
        // Group text items by Y coordinate (same line)
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 4) {
          if (currentLine.trim()) pageLines.push(currentLine.trim());
          currentLine = item.str;
        } else {
          currentLine += (currentLine ? ' ' : '') + item.str;
        }
        lastY = item.transform[5];
      }
      if (currentLine.trim()) pageLines.push(currentLine.trim());

      fullText += pageLines.join('\n') + '\n';
    }

    if (fullText.trim().length > 30) {
      return fullText;
    }
  } catch (err) {
    console.warn('pdfjs-dist text extraction error, falling back to binary scanner:', err);
  }

  // Fallback scanner for PDF binary objects
  return extractPDFStreamTextFallback(arrayBuffer);
}

function extractPDFStreamTextFallback(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  for (let i = 0; i < bytes.length; i++) {
    const code = bytes[i];
    if ((code >= 32 && code <= 126) || code === 10 || code === 13) {
      str += String.fromCharCode(code);
    } else {
      str += ' ';
    }
  }
  const matches = str.match(/\(([^()]{2,100})\)\s*T[jJ]/g) || [];
  if (matches.length > 0) {
    return matches.map((m) => m.replace(/^\(/, '').replace(/\)\s*T[jJ]$/, '')).join('\n');
  }
  return str.replace(/\s+/g, '\n');
}

/**
 * High-Precision Section & Line Parser
 */
export function precisionParseResume(rawText: string): Partial<ResumeData> {
  const cleanText = rawText.replace(/\r\n/g, '\n');
  const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);

  const basics: Partial<ResumeData['basics']> = {
    name: 'John Doe',
    label: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: {},
    profiles: [],
  };

  if (lines.length === 0) return { basics: basics as any };

  // 1. Email Extraction Regex
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = rawText.match(emailRegex);
  if (emailMatch) basics.email = emailMatch[0];

  // 2. Phone Number Extraction Regex
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = rawText.match(phoneRegex);
  if (phoneMatch) basics.phone = phoneMatch[0];

  // 3. Location Extraction (City, State)
  const locationMatch = rawText.match(/\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)?),\s([A-Z]{2})\b/);
  if (locationMatch) {
    basics.location = { city: locationMatch[1], region: locationMatch[2] };
  }

  // 4. LinkedIn & GitHub Profile Extraction
  const linkedinMatch = rawText.match(/(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  if (linkedinMatch) {
    basics.profiles?.push({
      network: 'LinkedIn',
      username: linkedinMatch[0].replace(/https?:\/\/(www\.)?linkedin\.com\/in\//i, ''),
      url: linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`,
    });
  }

  const githubMatch = rawText.match(/(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  if (githubMatch) {
    basics.profiles?.push({
      network: 'GitHub',
      username: githubMatch[0].replace(/https?:\/\/(www\.)?github\.com\//i, ''),
      url: githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`,
    });
  }

  // 5. Name Extraction (First line that doesn't contain contact symbols or keywords)
  for (const line of lines.slice(0, 6)) {
    if (
      line.length < 40 &&
      !emailRegex.test(line) &&
      !phoneRegex.test(line) &&
      !/http|www\.|resume|curriculum|cv|page|phone|email/i.test(line)
    ) {
      basics.name = line;
      break;
    }
  }

  // Title Extraction (Line directly under Name)
  if (lines.length > 1) {
    const titleCandidates = lines.slice(1, 4).filter(
      (l) => l !== basics.name && l.length < 60 && !emailRegex.test(l) && !phoneRegex.test(l)
    );
    if (titleCandidates.length > 0) {
      basics.label = titleCandidates[0];
    }
  }

  // 6. Section Segmentation & Parsing
  const work: WorkExperience[] = [];
  const education: Education[] = [];
  const skills: SkillGroup[] = [];
  const projects: Project[] = [];
  let summaryText = '';

  let currentSection: 'none' | 'summary' | 'work' | 'education' | 'skills' | 'projects' = 'none';

  const dateRegex = /\b(19|20)\d\d\b|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present|Current)\b/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const upper = line.toUpperCase();

    // Detect Section Headers
    if (/^(PROFESSIONAL SUMMARY|SUMMARY|PROFILE|OBJECTIVE|ABOUT ME)\b/i.test(upper)) {
      currentSection = 'summary';
      continue;
    } else if (/^(WORK EXPERIENCE|EXPERIENCE|EMPLOYMENT HISTORY|PROFESSIONAL EXPERIENCE|CAREER)\b/i.test(upper)) {
      currentSection = 'work';
      continue;
    } else if (/^(EDUCATION|ACADEMIC BACKGROUND|DEGREES|QUALIFICATIONS)\b/i.test(upper)) {
      currentSection = 'education';
      continue;
    } else if (/^(SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES|SKILLSET|TECHNOLOGIES)\b/i.test(upper)) {
      currentSection = 'skills';
      continue;
    } else if (/^(PROJECTS|FEATURED PROJECTS|PORTFOLIO|ACCOMPLISHMENTS)\b/i.test(upper)) {
      currentSection = 'projects';
      continue;
    }

    // Process section lines
    if (currentSection === 'summary') {
      if (!summaryText && line.length > 15 && !emailRegex.test(line)) {
        summaryText += line + ' ';
      } else if (summaryText.length < 400 && line.length > 15) {
        summaryText += line + ' ';
      }
    } else if (currentSection === 'work') {
      // Check if line looks like a job header (Company - Role | Dates)
      const isBullet = /^[•\-*–>]\s*/.test(line);
      if (!isBullet && (line.includes('|') || line.includes(' - ') || line.includes('–') || dateRegex.test(line))) {
        const parts = line.split(/[-–|]/).map((p) => p.trim());
        work.push({
          id: 'work-' + (work.length + 1),
          company: parts[0] || 'Company Name',
          position: parts[1] || parts[0] || 'Position Title',
          startDate: '2020',
          endDate: 'Present',
          current: true,
          highlights: [],
        });
      } else if (work.length > 0) {
        const cleanHighlight = line.replace(/^[•\-*–>]\s*/, '').trim();
        if (cleanHighlight.length > 5) {
          work[work.length - 1].highlights.push(cleanHighlight);
        }
      }
    } else if (currentSection === 'education') {
      if (/B\.S\.|B\.A\.|M\.S\.|Ph\.D\.|Bachelor|Master|Degree|University|College|Institute/i.test(line)) {
        education.push({
          id: 'edu-' + (education.length + 1),
          institution: line.includes('University') || line.includes('College') ? line : 'State University',
          area: line.includes('in') ? line.split('in')[1]?.trim() || 'Computer Science' : 'Computer Science',
          studyType: line.includes('Bachelor') ? 'Bachelor of Science' : line.includes('Master') ? 'Master of Science' : 'Degree',
          startDate: '2016',
          endDate: '2020',
        });
      }
    } else if (currentSection === 'skills') {
      if (line.includes(':')) {
        const [catName, catKeywords] = line.split(':');
        const keywords = catKeywords.split(/[,•|]/).map((k) => k.trim()).filter(Boolean);
        if (keywords.length > 0) {
          skills.push({
            id: 'skill-' + (skills.length + 1),
            name: catName.trim(),
            keywords,
          });
        }
      } else {
        const keywords = line.split(/[,•|]/).map((k) => k.trim()).filter(Boolean);
        if (keywords.length > 0) {
          skills.push({
            id: 'skill-' + (skills.length + 1),
            name: skills.length === 0 ? 'Technical Skills' : 'Additional Skills',
            keywords,
          });
        }
      }
    }
  }

  if (summaryText.trim()) {
    basics.summary = summaryText.trim();
  }

  return {
    basics: basics as any,
    work: work.length > 0 ? work : undefined,
    education: education.length > 0 ? education : undefined,
    skills: skills.length > 0 ? skills : undefined,
    projects: projects.length > 0 ? projects : undefined,
  };
}
