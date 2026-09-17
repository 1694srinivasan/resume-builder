import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';

export async function exportToWordDocx(data: ResumeData): Promise<void> {
  const { basics, work, education, skills, projects, certifications } = data;

  const children: Paragraph[] = [];

  // Header - Name
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: basics.name || 'Your Name',
          bold: true,
          size: 32, // 16pt font
          font: 'Arial',
        }),
      ],
    })
  );

  // Professional Title / Subtitle
  if (basics.label) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: basics.label,
            italics: true,
            size: 24, // 12pt
            font: 'Arial',
            color: '475569',
          }),
        ],
      })
    );
  }

  // Contact Info Line
  const contactParts = [
    basics.email,
    basics.phone,
    basics.location?.city ? `${basics.location.city}${basics.location.region ? `, ${basics.location.region}` : ''}` : '',
    basics.url,
  ].filter(Boolean);

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: contactParts.join('  |  '),
            size: 20, // 10pt
            font: 'Arial',
            color: '64748B',
          }),
        ],
      })
    );
  }

  // Helper for Section Titles (Heading Level 2 with bottom border)
  const addSectionTitle = (title: string) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        border: {
          bottom: {
            color: '0F172A',
            space: 4,
            style: BorderStyle.SINGLE,
            size: 12,
          },
        },
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 24, // 12pt
            font: 'Arial',
            color: '0F172A',
          }),
        ],
      })
    );
  };

  // Summary Section
  if (basics.summary) {
    addSectionTitle('Professional Summary');
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: basics.summary,
            size: 22,
            font: 'Arial',
          }),
        ],
      })
    );
  }

  // Work Experience Section
  if (work && work.length > 0) {
    addSectionTitle('Work Experience');
    work.forEach((w) => {
      // Role & Dates
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: `${w.position} `,
              bold: true,
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: `— ${w.company}`,
              bold: true,
              color: '2563EB',
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${w.startDate} - ${w.current ? 'Present' : w.endDate}`,
              italics: true,
              size: 20,
              font: 'Arial',
              color: '475569',
            }),
          ],
        })
      );

      if (w.location) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: w.location,
                italics: true,
                size: 20,
                color: '64748B',
                font: 'Arial',
              }),
            ],
          })
        );
      }

      // Highlights / Bullets
      if (w.highlights && w.highlights.length > 0) {
        w.highlights.forEach((hl) => {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: hl,
                  size: 21,
                  font: 'Arial',
                }),
              ],
            })
          );
        });
      }
    });
  }

  // Education Section
  if (education && education.length > 0) {
    addSectionTitle('Education');
    education.forEach((e) => {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: `${e.studyType} in ${e.area}`,
              bold: true,
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: ` — ${e.institution}`,
              color: '2563EB',
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${e.startDate} - ${e.endDate}`,
              italics: true,
              size: 20,
              color: '475569',
              font: 'Arial',
            }),
          ],
        })
      );
      if (e.score) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `Honors/GPA: ${e.score}`,
                italics: true,
                size: 20,
                color: '64748B',
                font: 'Arial',
              }),
            ],
          })
        );
      }
    });
  }

  // Skills Section
  if (skills && skills.length > 0) {
    addSectionTitle('Technical Skills');
    skills.forEach((s) => {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `${s.name}: `,
              bold: true,
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: s.keywords.join(', '),
              size: 21,
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  // Projects Section
  if (projects && projects.length > 0) {
    addSectionTitle('Projects');
    projects.forEach((p) => {
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: `${p.name} `,
              bold: true,
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: p.description ? `— ${p.description}` : '',
              size: 21,
              font: 'Arial',
            }),
          ],
        })
      );
      p.highlights?.forEach((hl) => {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: hl,
                size: 21,
                font: 'Arial',
              }),
            ],
          })
        );
      });
    });
  }

  // Certifications Section
  if (certifications && certifications.length > 0) {
    addSectionTitle('Certifications');
    certifications.forEach((c) => {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `${c.name} `,
              bold: true,
              size: 21,
              font: 'Arial',
            }),
            new TextRun({
              text: `— ${c.issuer} (${c.date})`,
              size: 21,
              font: 'Arial',
              color: '475569',
            }),
          ],
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeFilename = (basics.name || 'Resume').replace(/[^a-zA-Z0-9_-]/g, '_');
  saveAs(blob, `${safeFilename}_Resume.docx`);
}
