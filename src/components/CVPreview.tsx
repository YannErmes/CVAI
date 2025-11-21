import { FileText } from "lucide-react";

interface CVData {
  header: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    title: string;
    dates: string;
    bullets: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    field?: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: Record<string, string[]>;
}

interface CVPreviewProps {
  cvData: CVData;
  photoUrl?: string;
}

export const CVPreview = ({ cvData, photoUrl }: CVPreviewProps) => {
  return (
    <div id="cv-preview" className="bg-card rounded-lg p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="border-b-2 border-muted pb-6 mb-6 text-center">
        {photoUrl && (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-2">
          {cvData.header.name}
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-primary mb-3">
          {cvData.header.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
          <span>{cvData.header.email}</span>
          <span>•</span>
          <span>{cvData.header.phone}</span>
          <span>•</span>
          <span>{cvData.header.location}</span>
        </div>
      </div>

      {/* Professional Summary */}
      {cvData.summary && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-card-foreground mb-3 pb-2 border-b-2 border-primary">
            Professional Summary
          </h3>
          <p className="text-card-foreground leading-relaxed text-justify">
            {cvData.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {cvData.experience && cvData.experience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-card-foreground mb-4 pb-2 border-b-2 border-primary">
            Work Experience
          </h3>
          <div className="space-y-6">
            {cvData.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <h4 className="text-lg font-bold text-card-foreground">{exp.title}</h4>
                  <span className="text-sm text-muted-foreground">{exp.dates}</span>
                </div>
                <p className="text-primary font-semibold mb-3">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                      <span className="text-muted-foreground leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education && cvData.education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-card-foreground mb-4 pb-2 border-b-2 border-primary">
            Education
          </h3>
          <div className="space-y-4">
            {cvData.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <h4 className="text-lg font-semibold text-card-foreground">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h4>
                  <span className="text-sm text-muted-foreground">{edu.graduationDate}</span>
                </div>
                <p className="text-primary font-semibold">{edu.school}</p>
                {edu.gpa && <p className="text-muted-foreground text-sm mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills && Object.keys(cvData.skills).length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-card-foreground mb-4 pb-2 border-b-2 border-primary">
            Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(cvData.skills).map(([category, skills], index) => (
              <div key={index}>
                <h4 className="font-semibold text-muted-foreground mb-2">{category}</h4>
                <p className="text-card-foreground">{skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
