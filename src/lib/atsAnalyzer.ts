import { ResumeData, ATSAnalysisResult, ATSCheckItem } from '../types/resume';

const STRONG_ACTION_VERBS = [
  'achieved', 'architected', 'accelerated', 'built', 'created', 'designed',
  'developed', 'engineered', 'expanded', 'generated', 'implemented', 'increased',
  'launched', 'led', 'managed', 'migrated', 'optimized', 'orchestrated', 'pioneered',
  'reduced', 'scaled', 'spearheaded', 'transformed', 'delivered', 'improved', 'decreased'
];

export function analyzeATSCompliance(data: ResumeData, targetJobDescription?: string): ATSAnalysisResult {
  const checks: ATSCheckItem[] = [];
  let scorePoints = 0;
  const maxScore = 100;

  // 1. Basics Completeness (20 pts)
  const hasBasics = Boolean(data.basics.name && data.basics.email && data.basics.phone);
  if (hasBasics) {
    scorePoints += 20;
    checks.push({
      id: 'check-basics',
      title: 'Contact Details Completeness',
      status: 'pass',
      description: 'Name, email, and phone number are present for ATS identification.',
    });
  } else {
    checks.push({
      id: 'check-basics',
      title: 'Contact Details Missing',
      status: 'fail',
      description: 'Ensure full name, email address, and phone number are provided.',
      suggestion: 'Fill in your personal email and phone in the Personal Information section.',
    });
  }

  // 2. Professional Summary (15 pts)
  if (data.basics.summary && data.basics.summary.length >= 80) {
    scorePoints += 15;
    checks.push({
      id: 'check-summary',
      title: 'Professional Summary',
      status: 'pass',
      description: 'High-impact summary provided with sufficient context.',
    });
  } else {
    checks.push({
      id: 'check-summary',
      title: 'Short or Missing Summary',
      status: 'warning',
      description: 'Summaries help recruiters and ATS quickly understand your background.',
      suggestion: 'Add a 2-4 sentence professional summary highlighting your core expertise.',
    });
  }

  // 3. Work Experience Items & Highlights (25 pts)
  if (data.work && data.work.length > 0) {
    const totalHighlights = data.work.reduce((acc, curr) => acc + (curr.highlights?.length || 0), 0);
    if (totalHighlights >= 3) {
      scorePoints += 25;
      checks.push({
        id: 'check-work',
        title: 'Work Experience Bullet Points',
        status: 'pass',
        description: `Found ${data.work.length} position(s) with ${totalHighlights} detailed bullet achievements.`,
      });
    } else {
      scorePoints += 15;
      checks.push({
        id: 'check-work',
        title: 'Sparse Work Bullet Points',
        status: 'warning',
        description: 'Aim for at least 2-4 measurable bullet points per work experience item.',
        suggestion: 'Add quantifiable accomplishments (e.g., "Increased performance by 30%").',
      });
    }
  } else {
    checks.push({
      id: 'check-work',
      title: 'Work Experience Missing',
      status: 'fail',
      description: 'No work experience listed.',
      suggestion: 'Add your relevant work, internship, or project experience.',
    });
  }

  // 4. Skills Categorization (20 pts)
  const totalSkillKeywords = data.skills.reduce((acc, curr) => acc + (curr.keywords?.length || 0), 0);
  if (totalSkillKeywords >= 6) {
    scorePoints += 20;
    checks.push({
      id: 'check-skills',
      title: 'Skills Density & Categorization',
      status: 'pass',
      description: `Identified ${totalSkillKeywords} technical skills grouped logically.`,
    });
  } else {
    scorePoints += 10;
    checks.push({
      id: 'check-skills',
      title: 'Low Skill Keyword Count',
      status: 'warning',
      description: 'ATS parsers look heavily at relevant skills and keywords.',
      suggestion: 'List at least 8-12 specific tools, languages, or domain skills.',
    });
  }

  // 5. Education Section (10 pts)
  if (data.education && data.education.length > 0) {
    scorePoints += 10;
    checks.push({
      id: 'check-edu',
      title: 'Education Credentials',
      status: 'pass',
      description: 'Education credentials identified clearly.',
    });
  } else {
    checks.push({
      id: 'check-edu',
      title: 'Education Section Missing',
      status: 'warning',
      description: 'Many ATS filters filter candidates by degree requirements.',
      suggestion: 'Add your degree, university, or relevant certifications.',
    });
  }

  // 6. Action Verbs Count (10 pts)
  const fullText = JSON.stringify(data).toLowerCase();
  let actionVerbsFound = 0;
  STRONG_ACTION_VERBS.forEach((verb) => {
    if (fullText.includes(verb)) {
      actionVerbsFound++;
    }
  });

  if (actionVerbsFound >= 4) {
    scorePoints += 10;
    checks.push({
      id: 'check-verbs',
      title: 'Strong Action Verbs Used',
      status: 'pass',
      description: `Detected ${actionVerbsFound} strong action verbs across experience bullets.`,
    });
  } else {
    checks.push({
      id: 'check-verbs',
      title: 'Action Verb Density',
      status: 'warning',
      description: 'Use dynamic action verbs to open bullet points for ATS impact.',
      suggestion: 'Start bullet points with verbs like "Spearheaded", "Engineered", "Optimized", "Scaled".',
    });
  }

  // Target Job Description Keyword Matching
  const missingKeywords: string[] = [];
  const matchedKeywords: string[] = [];

  if (targetJobDescription && targetJobDescription.trim().length > 10) {
    // Extract potential skill words from job description (alphanumeric 3+ chars)
    const rawWords = Array.from(new Set(targetJobDescription.toLowerCase().match(/\b[a-z0-9+#.]{3,20}\b/g) || []));
    const commonStopwords = new Set(['and', 'the', 'for', 'with', 'you', 'will', 'that', 'this', 'have', 'from', 'are', 'was', 'were', 'our', 'your', 'about', 'work', 'team']);
    
    const jobKeywords = rawWords.filter(w => !commonStopwords.has(w) && !/^\d+$/.test(w)).slice(0, 30);

    jobKeywords.forEach(kw => {
      if (fullText.includes(kw)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });
  }

  return {
    score: Math.min(scorePoints, maxScore),
    checks,
    missingKeywords: missingKeywords.slice(0, 15),
    matchedKeywords: matchedKeywords.slice(0, 15),
    actionVerbsCount: actionVerbsFound,
  };
}
