import React from "react";

export interface CVData {
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

interface CVTemplateProps {
  cvData: CVData;
  photoUrl?: string;
  colors?: {
    accent: string;
    text: string;
    background: string;
  };
  // New customization props
  layout?: "header" | "left" | "two-col" | "center" | "timeline";
  fontFamily?: string;
  photoPosition?: "left" | "right" | "top" | "none";
  showSkillsBg?: boolean;
  sectionOrder?: string[];
  bulletStyle?: "arrow" | "dot" | "dash" | "none";
  skillStyle?: "inline" | "pills" | "list";
  headerStyle?: "underline" | "stripe" | "centered" | "boxed";
}

// 1. MODERN - Clean, contemporary design with bold headers
export const ModernTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors, fontFamily, photoPosition }) => {
  const accentColor = colors?.accent || "#2563eb";
  const textColor = colors?.text || "#111827";
  const bgColor = colors?.background || "#ffffff";

  return (
  <div id="cv-preview" className="p-8 md:p-12 max-w-4xl mx-auto" style={{ backgroundColor: bgColor, fontFamily: fontFamily || undefined }}>
    {/* Header */}
    <div className="pb-8 mb-8" style={{ borderBottom: `4px solid ${accentColor}` }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-5xl font-black mb-1" style={{ color: textColor }}>{cvData.header.name}</h1>
          <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>{cvData.header.title}</h2>
        </div>
        {photoUrl && photoPosition !== "left" && <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded-lg object-cover" />}
        {photoUrl && photoPosition === "left" && (
          <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded-lg object-cover order-first mr-4" />
        )}
      </div>
      <div className="flex flex-wrap gap-6 text-sm" style={{ color: textColor }}>
        <span>{cvData.header.email}</span>
        <span>{cvData.header.phone}</span>
        <span>{cvData.header.location}</span>
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="mb-8">
        <h3 className="text-xl font-black mb-3 uppercase tracking-wider" style={{ color: textColor }}>Professional Summary</h3>
        <p className="leading-relaxed text-justify" style={{ color: textColor }}>{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-8">
        <h3 className="text-xl font-black mb-4 uppercase tracking-wider" style={{ color: textColor }}>Experience</h3>
        <div className="space-y-6">
          {cvData.experience.map((exp, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-lg font-bold" style={{ color: textColor }}>{exp.title}</h4>
                <span className="text-sm" style={{ color: textColor, opacity: 0.6 }}>{exp.dates}</span>
              </div>
              <p className="font-semibold mb-3" style={{ color: accentColor }}>{exp.company}</p>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3" style={{ color: textColor }}>
                    <span className="font-bold" style={{ color: accentColor }}>▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {cvData.education?.length > 0 && (
      <div className="mb-8">
        <h3 className="text-xl font-black mb-4 uppercase tracking-wider" style={{ color: textColor }}>Education</h3>
        <div className="space-y-4">
          {cvData.education.map((edu, idx) => (
            <div key={idx} className="pl-4" style={{ borderLeft: `4px solid ${accentColor}` }}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-lg font-bold" style={{ color: textColor }}>{edu.degree}</h4>
                <span className="text-sm" style={{ color: textColor, opacity: 0.6 }}>{edu.graduationDate}</span>
              </div>
              <p className="font-semibold" style={{ color: accentColor }}>{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {Object.keys(cvData.skills || {}).length > 0 && (
      <div>
        <h3 className="text-xl font-black mb-4 uppercase tracking-wider" style={{ color: textColor }}>Skills</h3>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(cvData.skills).map(([category, skills], idx) => (
            <div key={idx}>
              <h4 className="font-bold mb-2" style={{ color: textColor }}>{category}</h4>
              <p className="text-sm" style={{ color: textColor }}>{(skills as string[]).join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

// 2. CLASSIC - Traditional, ATS-friendly design
export const ClassicTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors, fontFamily, photoPosition }) => {
  const accentColor = colors?.accent || "#374151";
  const textColor = colors?.text || "#111827";
  const bgColor = colors?.background || "#ffffff";

  return (
  <div id="cv-preview" className="p-10 max-w-4xl mx-auto font-serif" style={{ backgroundColor: bgColor, fontFamily: fontFamily || undefined }}>
    {/* Header */}
    <div className="text-center pb-4 mb-4" style={{ borderBottom: `1px solid ${textColor}`, opacity: 0.8 }}>
      {photoUrl && <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-2 object-cover" />}
      <h1 className="text-4xl font-bold mb-1" style={{ color: textColor }}>{cvData.header.name}</h1>
      <h2 className="text-lg mb-2" style={{ color: textColor }}>{cvData.header.title}</h2>
      <div className="text-sm mt-2" style={{ color: textColor }}>
        {cvData.header.email} | {cvData.header.phone} | {cvData.header.location}
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3" style={{ color: textColor, borderBottom: `1px solid ${accentColor}` }}>
          Professional Summary
        </h3>
        <p className="text-justify text-sm leading-relaxed" style={{ color: textColor }}>{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3" style={{ color: textColor, borderBottom: `1px solid ${accentColor}` }}>
          Work Experience
        </h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between">
                <span className="font-bold" style={{ color: textColor }}>{exp.title}</span>
                <span style={{ color: textColor, opacity: 0.7 }}>{exp.dates}</span>
              </div>
              <p style={{ color: accentColor }}>{exp.company}</p>
              <ul className="mt-2 ml-4 space-y-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} style={{ color: textColor }}>• {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {cvData.education?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3" style={{ color: textColor, borderBottom: `1px solid ${accentColor}` }}>
          Education
        </h3>
        <div className="space-y-3 text-sm">
          {cvData.education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex justify-between">
                <span className="font-bold" style={{ color: textColor }}>{edu.degree}</span>
                <span style={{ color: textColor, opacity: 0.7 }}>{edu.graduationDate}</span>
              </div>
              <p style={{ color: accentColor }}>{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {Object.keys(cvData.skills || {}).length > 0 && (
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3" style={{ color: textColor, borderBottom: `1px solid ${accentColor}` }}>
          Skills
        </h3>
        <div className="text-sm space-y-2">
          {Object.entries(cvData.skills).map(([category, skills], idx) => (
            <p key={idx} style={{ color: textColor }}>
              <span className="font-bold">{category}:</span> {(skills as string[]).join(", ")}
            </p>
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

// 3. CREATIVE - Artistic, vibrant design for creative professionals
export const CreativeTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12 max-w-4xl mx-auto">
    {/* Header */}
    <div className="mb-8">
      <div className="flex items-end gap-6 mb-6">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-purple-500" />}
        <div>
          <h1 className="text-5xl font-black text-purple-900 mb-2">{cvData.header.name}</h1>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">{cvData.header.title}</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm bg-white p-4 rounded-lg shadow-sm">
        <span className="text-gray-700">{cvData.header.email}</span>
        <span className="text-gray-700">•</span>
        <span className="text-gray-700">{cvData.header.phone}</span>
        <span className="text-gray-700">•</span>
        <span className="text-gray-700">{cvData.header.location}</span>
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="bg-white rounded-lg p-6 mb-6 shadow-md border-l-4 border-pink-500">
        <h3 className="text-lg font-black text-purple-900 mb-3">About</h3>
        <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-black text-purple-900 mb-4">Experience</h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                <span className="text-sm text-pink-600 font-semibold">{exp.dates}</span>
              </div>
              <p className="text-purple-700 font-semibold mb-3">{exp.company}</p>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-gray-700">
                    <span className="text-pink-500">◆</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {cvData.education?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-black text-purple-900 mb-4">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvData.education.map((edu, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 shadow-md">
              <h4 className="font-bold text-gray-900 mb-1">{edu.degree}</h4>
              <p className="text-purple-700 font-semibold text-sm">{edu.school}</p>
              <p className="text-gray-600 text-xs">{edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {Object.keys(cvData.skills || {}).length > 0 && (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-black text-purple-900 mb-4">Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(cvData.skills).map(([category, skills], idx) => (
            <div key={idx}>
              <h4 className="font-bold text-gray-900 text-sm mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {(skills as string[]).map((skill, i) => (
                  <span key={i} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 4. EXECUTIVE - Premium, professional design for leadership
export const ExecutiveTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-white p-8 md:p-16 max-w-4xl mx-auto">
    <div className="border-b-8 border-amber-900 pb-12 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-6xl font-black text-amber-900 mb-2">{cvData.header.name}</h1>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-900 to-amber-700 mb-4" />
          <h2 className="text-2xl font-light text-gray-700">{cvData.header.title}</h2>
        </div>
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-28 h-28 rounded-sm object-cover border-4 border-amber-900" />}
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>{cvData.header.email}</p>
        <p>{cvData.header.phone}</p>
        <p>{cvData.header.location}</p>
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="mb-12">
        <h3 className="text-sm font-black text-amber-900 uppercase tracking-widest mb-4">Executive Profile</h3>
        <p className="text-gray-800 leading-relaxed text-justify italic">{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-12">
        <h3 className="text-sm font-black text-amber-900 uppercase tracking-widest mb-6">Professional Experience</h3>
        <div className="space-y-8">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-amber-900 pl-6">
              <div className="flex justify-between mb-2">
                <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                <span className="text-sm font-semibold text-amber-900">{exp.dates}</span>
              </div>
              <p className="text-amber-900 font-semibold mb-3">{exp.company}</p>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-800 flex gap-3">
                    <span className="text-amber-900">→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {cvData.education?.length > 0 && (
      <div className="mb-8">
        <h3 className="text-sm font-black text-amber-900 uppercase tracking-widest mb-4">Education</h3>
        <div className="space-y-3">
          {cvData.education.map((edu, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-gray-900">{edu.degree}</h4>
              <p className="text-amber-900">{edu.school}</p>
              <p className="text-sm text-gray-600">{edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {Object.keys(cvData.skills || {}).length > 0 && (
      <div>
        <h3 className="text-sm font-black text-amber-900 uppercase tracking-widest mb-4">Core Competencies</h3>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(cvData.skills).map(([category, skills], idx) => (
            <div key={idx}>
              <p className="font-bold text-gray-900 text-sm mb-2">{category}</p>
              <p className="text-gray-700 text-sm">{(skills as string[]).join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 5. MINIMAL - Ultra-clean, minimalist design
export const MinimalTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-white p-6 md:p-8 max-w-4xl mx-auto">
    {/* Header */}
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-light text-gray-900 mb-1">{cvData.header.name}</h1>
          <p className="text-lg text-gray-600">{cvData.header.title}</p>
        </div>
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-20 h-20 object-cover" />}
      </div>
      <div className="text-xs text-gray-600 mt-4 space-x-4">
        <span>{cvData.header.email}</span>
        <span>·</span>
        <span>{cvData.header.phone}</span>
        <span>·</span>
        <span>{cvData.header.location}</span>
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="mb-6 pb-6 border-b">
        <p className="text-gray-700 text-sm leading-relaxed">{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-6 pb-6 border-b">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Experience</h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-900">{exp.title}</span>
                <span className="text-gray-500">{exp.dates}</span>
              </div>
              <p className="text-gray-600 text-xs mb-2">{exp.company}</p>
              <ul className="space-y-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-700">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education & Skills */}
    <div className="grid grid-cols-2 gap-6 text-sm">
      {cvData.education?.length > 0 && (
        <div className="border-b pb-4">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Education</h3>
          <div className="space-y-2">
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="text-xs">
                <p className="font-semibold text-gray-900">{edu.degree}</p>
                <p className="text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(cvData.skills || {}).length > 0 && (
        <div className="border-b pb-4">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Skills</h3>
          <div className="space-y-2">
            {Object.entries(cvData.skills).map(([category, skills], idx) => (
              <p key={idx} className="text-xs text-gray-700">
                <span className="font-semibold">{category}:</span> {(skills as string[]).join(", ")}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// 6. TECH - Modern design for tech professionals
export const TechTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-gradient-to-br from-slate-950 to-blue-950 p-8 md:p-12 max-w-4xl mx-auto text-white">
    {/* Header */}
    <div className="mb-8 pb-8 border-b border-blue-400/30">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-black text-white mb-2">{cvData.header.name}</h1>
          <p className="text-2xl text-cyan-400 font-semibold">{cvData.header.title}</p>
        </div>
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded object-cover border-2 border-cyan-400" />}
      </div>
      <div className="flex flex-wrap gap-4 mt-4 text-sm">
        <span className="text-gray-300">{cvData.header.email}</span>
        <span className="text-cyan-400">|</span>
        <span className="text-gray-300">{cvData.header.phone}</span>
        <span className="text-cyan-400">|</span>
        <span className="text-gray-300">{cvData.header.location}</span>
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="mb-8 bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
        <p className="text-gray-200 leading-relaxed text-sm">{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-8">
        <h3 className="text-lg font-black text-cyan-400 mb-4 uppercase tracking-wider">Experience</h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="bg-blue-500/10 border-l-4 border-cyan-400 pl-4 py-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                <span className="text-xs text-cyan-400">{exp.dates}</span>
              </div>
              <p className="text-cyan-300 font-semibold text-sm mb-2">{exp.company}</p>
              <ul className="space-y-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-300 text-sm">› {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education & Skills */}
    <div className="grid grid-cols-2 gap-6">
      {cvData.education?.length > 0 && (
        <div>
          <h3 className="text-lg font-black text-cyan-400 mb-3 uppercase tracking-wider">Education</h3>
          <div className="space-y-3">
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="text-sm">
                <p className="font-bold text-white">{edu.degree}</p>
                <p className="text-gray-300">{edu.school}</p>
                <p className="text-gray-500 text-xs">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(cvData.skills || {}).length > 0 && (
        <div>
          <h3 className="text-lg font-black text-cyan-400 mb-3 uppercase tracking-wider">Skills</h3>
          <div className="space-y-3">
            {Object.entries(cvData.skills).map(([category, skills], idx) => (
              <div key={idx} className="text-sm">
                <p className="font-bold text-white mb-1">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map((skill, i) => (
                    <span key={i} className="bg-cyan-400/20 text-cyan-300 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// 7. CORPORATE - Formal, structured design
export const CorporateTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-white p-10 max-w-4xl mx-auto">
    <div className="grid grid-cols-3 gap-8 mb-8">
      <div className="col-span-2 border-b-4 border-gray-900 pb-4">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-900" />}
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{cvData.header.name}</h1>
        <h2 className="text-lg font-bold text-gray-700">{cvData.header.title}</h2>
      </div>
      <div className="border-l-4 border-gray-900 pl-4">
        <p className="font-bold text-gray-900 text-xs mb-3 uppercase">CONTACT</p>
        <p className="text-xs text-gray-700 mb-2">{cvData.header.email}</p>
        <p className="text-xs text-gray-700 mb-2">{cvData.header.phone}</p>
        <p className="text-xs text-gray-700">{cvData.header.location}</p>
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="mb-6">
        <p className="font-bold text-gray-900 text-xs mb-2 uppercase">Overview</p>
        <p className="text-gray-800 text-sm leading-relaxed">{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-6">
        <p className="font-bold text-gray-900 text-xs mb-4 uppercase border-b pb-2 border-gray-300">Professional History</p>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx}>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="col-span-2">
                  <p className="font-bold text-gray-900">{exp.title}</p>
                  <p className="text-gray-700 font-semibold text-sm">{exp.company}</p>
                </div>
                <p className="text-gray-600 text-sm text-right">{exp.dates}</p>
              </div>
              <ul className="ml-4 space-y-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-700 text-sm">• {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {cvData.education?.length > 0 && (
      <div className="mb-6">
        <p className="font-bold text-gray-900 text-xs mb-3 uppercase border-b pb-2 border-gray-300">Academic Credentials</p>
        <div className="space-y-2 text-sm">
          {cvData.education.map((edu, idx) => (
            <div key={idx}>
              <p className="font-bold text-gray-900">{edu.degree}</p>
              <p className="text-gray-700">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {Object.keys(cvData.skills || {}).length > 0 && (
      <div>
        <p className="font-bold text-gray-900 text-xs mb-3 uppercase border-b pb-2 border-gray-300">Competencies</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {Object.entries(cvData.skills).map(([category, skills], idx) => (
            <p key={idx} className="text-gray-800">
              <span className="font-bold">{category}:</span> {(skills as string[]).join(", ")}
            </p>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 8. ELEGANT - Sophisticated, refined design
export const ElegantTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-gradient-to-b from-rose-50 to-white p-8 md:p-12 max-w-4xl mx-auto">
    {/* Header */}
    <div className="text-center mb-12">
      {photoUrl && <img src={photoUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg" />}
      <h1 className="text-5xl font-light text-rose-900 mb-2 tracking-wide">{cvData.header.name}</h1>
      <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-rose-600 mx-auto mb-4" />
      <h2 className="text-xl text-rose-700 font-light mb-4">{cvData.header.title}</h2>
      <div className="text-sm text-gray-600 space-y-1">
        <p>{cvData.header.email}</p>
        <p>{cvData.header.phone}</p>
        <p>{cvData.header.location}</p>
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="mb-10 text-center px-8">
        <p className="text-gray-800 leading-relaxed italic">{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-10">
        <h3 className="text-center text-sm font-light text-rose-900 mb-8 uppercase tracking-widest">Professional Experience</h3>
        <div className="space-y-8">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="text-center">
              <h4 className="text-lg font-light text-gray-900 mb-1">{exp.title}</h4>
              <p className="text-rose-700 font-light text-sm mb-3">{exp.company} • {exp.dates}</p>
              <ul className="text-gray-700 text-sm space-y-2 inline-block text-left">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-rose-400">◆</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education & Skills */}
    <div className="grid grid-cols-2 gap-12 pt-8 border-t border-rose-200">
      {cvData.education?.length > 0 && (
        <div className="text-center">
          <h3 className="text-sm font-light text-rose-900 mb-6 uppercase tracking-widest">Education</h3>
          <div className="space-y-4">
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="text-sm">
                <p className="text-gray-900 font-light">{edu.degree}</p>
                <p className="text-rose-700 font-light text-xs">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(cvData.skills || {}).length > 0 && (
        <div className="text-center">
          <h3 className="text-sm font-light text-rose-900 mb-6 uppercase tracking-widest">Skills</h3>
          <div className="space-y-3">
            {Object.entries(cvData.skills).map(([category, skills], idx) => (
              <div key={idx} className="text-sm">
                <p className="text-gray-900 font-light mb-1">{category}</p>
                <p className="text-gray-600 text-xs">{(skills as string[]).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// 9. DYNAMIC - Bold, energetic design
export const DynamicTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-white max-w-4xl mx-auto overflow-hidden">
    {/* Side Panel */}
    <div className="grid grid-cols-3 h-full">
      <div className="bg-gradient-to-b from-lime-500 to-lime-600 p-8 text-white">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-white" />}
        <div className="mb-8">
          <h3 className="text-xs font-black uppercase mb-4">Contact</h3>
          <div className="space-y-2 text-sm">
            <p>{cvData.header.email}</p>
            <p>{cvData.header.phone}</p>
            <p>{cvData.header.location}</p>
          </div>
        </div>

        {Object.keys(cvData.skills || {}).length > 0 && (
          <div>
            <h3 className="text-xs font-black uppercase mb-4">Skills</h3>
            <div className="space-y-3">
              {Object.entries(cvData.skills).map(([category, skills], idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold mb-1">{category}</p>
                  <div className="space-y-1">
                    {(skills as string[]).map((skill, i) => (
                      <div key={i} className="bg-white/20 rounded px-2 py-1 text-xs">{skill}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-2 p-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-2">{cvData.header.name}</h1>
          <div className="h-1 w-24 bg-lime-500 mb-3" />
          <h2 className="text-2xl font-bold text-lime-600">{cvData.header.title}</h2>
        </div>

        {/* Summary */}
        {cvData.summary && (
          <div className="mb-8 pb-6 border-b-2 border-lime-200">
            <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {cvData.experience?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-lime-500 rounded-full" />
              Experience
            </h3>
            <div className="space-y-6">
              {cvData.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                    <span className="text-sm text-lime-600 font-bold">{exp.dates}</span>
                  </div>
                  <p className="text-gray-600 font-semibold text-sm mb-2">{exp.company}</p>
                  <ul className="space-y-1">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-gray-700 text-sm">▸ {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education?.length > 0 && (
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-lime-500 rounded-full" />
              Education
            </h3>
            <div className="space-y-3">
              {cvData.education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// 10. ARTISTIC - Creative, visual design for artists
export const ArtisticTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 md:p-12 max-w-4xl mx-auto">
    {/* Decorative Header */}
    <div className="mb-12">
      <div className="flex items-end gap-8 mb-6">
        {photoUrl && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-indigo-300 rounded-2xl transform -rotate-3 blur-lg opacity-50" />
            <img src={photoUrl} alt="Profile" className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl relative" />
          </div>
        )}
        <div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {cvData.header.name}
          </h1>
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">{cvData.header.title}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-indigo-400" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur rounded-lg p-3 border border-purple-200">
          <p className="text-xs text-purple-700 font-semibold">EMAIL</p>
          <p className="text-sm text-gray-800">{cvData.header.email}</p>
        </div>
        <div className="bg-white/60 backdrop-blur rounded-lg p-3 border border-purple-200">
          <p className="text-xs text-purple-700 font-semibold">PHONE</p>
          <p className="text-sm text-gray-800">{cvData.header.phone}</p>
        </div>
        <div className="bg-white/60 backdrop-blur rounded-lg p-3 border border-purple-200">
          <p className="text-xs text-purple-700 font-semibold">LOCATION</p>
          <p className="text-sm text-gray-800">{cvData.header.location}</p>
        </div>
      </div>
    </div>

    {/* Summary */}
    {cvData.summary && (
      <div className="mb-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 border-2 border-purple-300">
        <p className="text-gray-800 leading-relaxed">{cvData.summary}</p>
      </div>
    )}

    {/* Experience */}
    {cvData.experience?.length > 0 && (
      <div className="mb-8">
        <h3 className="text-2xl font-black text-purple-600 mb-6">EXPERIENCE</h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-gradient-to-b from-purple-400 to-indigo-400 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-black text-gray-900">{exp.title}</h4>
                  <p className="text-purple-600 font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm font-bold text-indigo-600">{exp.dates}</span>
              </div>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-700 flex gap-3">
                    <span className="text-purple-500 text-lg">◆</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education & Skills */}
    <div className="grid grid-cols-2 gap-6">
      {cvData.education?.length > 0 && (
        <div>
          <h3 className="text-2xl font-black text-purple-600 mb-4">EDUCATION</h3>
          <div className="space-y-3">
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-md">
                <h4 className="font-bold text-gray-900 mb-1">{edu.degree}</h4>
                <p className="text-indigo-600 text-sm">{edu.school}</p>
                <p className="text-gray-500 text-xs">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(cvData.skills || {}).length > 0 && (
        <div>
          <h3 className="text-2xl font-black text-purple-600 mb-4">SKILLS</h3>
          <div className="space-y-4">
            {Object.entries(cvData.skills).map(([category, skills], idx) => (
              <div key={idx}>
                <p className="font-bold text-gray-900 mb-2">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map((skill, i) => (
                    <span key={i} className="bg-gradient-to-r from-purple-300 to-indigo-300 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// 11. GRADIENT - Modern gradient design
export const GradientTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-gradient-to-br from-teal-50 via-white to-blue-50 p-8 md:p-12 max-w-4xl mx-auto">
    <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-2xl p-8 mb-8">
      <div className="flex justify-between items-start">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white" />}
        <div className="flex-1 ml-6">
          <h1 className="text-4xl font-black mb-2">{cvData.header.name}</h1>
          <h2 className="text-2xl font-light mb-4">{cvData.header.title}</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <span>{cvData.header.email}</span>
            <span>•</span>
            <span>{cvData.header.phone}</span>
            <span>•</span>
            <span>{cvData.header.location}</span>
          </div>
        </div>
      </div>
    </div>

    {cvData.summary && (
      <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
        <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
      </div>
    )}

    {cvData.experience?.length > 0 && (
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gradient-to-b from-teal-500 to-blue-500">
              <div className="flex justify-between mb-2">
                <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                <span className="text-teal-600 font-semibold">{exp.dates}</span>
              </div>
              <p className="text-teal-700 font-semibold mb-3">{exp.company}</p>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-700 flex gap-3">
                    <span className="text-teal-500">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {cvData.education?.length > 0 && (
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Education</h3>
        <div className="grid grid-cols-2 gap-4">
          {cvData.education.map((edu, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-4">
              <h4 className="font-bold text-gray-900">{edu.degree}</h4>
              <p className="text-teal-700 font-semibold text-sm">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {Object.keys(cvData.skills || {}).length > 0 && (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(cvData.skills).map(([category, skills], idx) => (
            <div key={idx}>
              <p className="font-bold text-gray-900 mb-2">{category}</p>
              <div className="flex flex-wrap gap-2">
                {(skills as string[]).map((skill, i) => (
                  <span key={i} className="bg-gradient-to-r from-teal-100 to-blue-100 text-teal-900 px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 12. RETRO - Vintage, retro design
export const RetroTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-yellow-50 p-8 md:p-12 max-w-4xl mx-auto" style={{ fontFamily: "Georgia, serif" }}>
    <div className="border-8 border-orange-700 bg-orange-100 p-6 mb-6">
      <div className="text-center mb-4">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-orange-700" />}
        <h1 className="text-5xl font-black text-orange-900">{cvData.header.name}</h1>
        <h2 className="text-2xl font-bold text-orange-700 mt-2">{cvData.header.title}</h2>
      </div>
      <div className="text-center text-sm text-orange-900">
        {cvData.header.email} | {cvData.header.phone} | {cvData.header.location}
      </div>
    </div>

    {cvData.summary && (
      <div className="mb-6 p-4 bg-white border-4 border-orange-700">
        <p className="text-gray-800 text-justify">{cvData.summary}</p>
      </div>
    )}

    {cvData.experience?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-3xl font-black text-orange-900 mb-4 border-b-4 border-orange-700 pb-2">EXPERIENCE</h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="p-4 bg-white border-4 border-orange-500">
              <div className="flex justify-between mb-2">
                <h4 className="text-xl font-bold text-orange-900">{exp.title}</h4>
                <span className="text-orange-700 font-bold">{exp.dates}</span>
              </div>
              <p className="text-orange-800 font-bold mb-2">{exp.company}</p>
              <ul className="space-y-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-800">★ {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {cvData.education?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-3xl font-black text-orange-900 mb-4 border-b-4 border-orange-700 pb-2">EDUCATION</h3>
        <div className="space-y-3">
          {cvData.education.map((edu, idx) => (
            <div key={idx} className="p-3 bg-white border-2 border-orange-500">
              <h4 className="font-bold text-orange-900">{edu.degree}</h4>
              <p className="text-orange-800">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {Object.keys(cvData.skills || {}).length > 0 && (
      <div>
        <h3 className="text-3xl font-black text-orange-900 mb-4 border-b-4 border-orange-700 pb-2">SKILLS</h3>
        <div className="space-y-2">
          {Object.entries(cvData.skills).map(([category, skills], idx) => (
            <p key={idx} className="text-gray-800">
              <span className="font-bold text-orange-900">{category}:</span> {(skills as string[]).join(", ")}
            </p>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 13-20. Quick template stubs (full versions would follow same pattern)
export const FlatTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-white p-8 md:p-12 max-w-4xl mx-auto">
    <div className="flex items-start gap-6 mb-8 bg-indigo-50 p-6 rounded-none">
      {photoUrl && <img src={photoUrl} alt="Profile" className="w-24 h-24 object-cover" />}
      <div>
        <h1 className="text-4xl font-black text-indigo-900">{cvData.header.name}</h1>
        <h2 className="text-xl font-bold text-indigo-600 mt-1">{cvData.header.title}</h2>
        <p className="text-sm text-gray-700 mt-2">{cvData.header.email} • {cvData.header.phone} • {cvData.header.location}</p>
      </div>
    </div>
    {cvData.summary && <div className="mb-6"><p className="text-gray-700">{cvData.summary}</p></div>}
    {cvData.experience?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-black text-indigo-900 mb-3">EXPERIENCE</h3>
        {cvData.experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <h4 className="font-bold text-gray-900">{exp.title}</h4>
            <p className="text-indigo-600 font-semibold text-sm">{exp.company} • {exp.dates}</p>
            <ul className="text-gray-700 text-sm mt-2 space-y-1">
              {exp.bullets.map((bullet, i) => (
                <li key={i}>• {bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
    {Object.keys(cvData.skills || {}).length > 0 && (
      <div><h3 className="text-lg font-black text-indigo-900 mb-2">SKILLS</h3>
        {Object.entries(cvData.skills).map(([cat, skills], idx) => (
          <p key={idx} className="text-sm text-gray-700"><span className="font-bold">{cat}:</span> {(skills as string[]).join(", ")}</p>
        ))}
      </div>
    )}
  </div>
);

export const CyberpunkTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-black p-8 md:p-12 max-w-4xl mx-auto text-white" style={{ fontFamily: "monospace" }}>
    <div className="border-4 border-cyan-400 p-6 mb-6 bg-gradient-to-r from-black via-purple-900 to-black">
      {photoUrl && <img src={photoUrl} alt="Profile" className="w-24 h-24 object-cover border-2 border-cyan-400 mb-4" />}
      <h1 className="text-4xl font-black text-cyan-400 glitch" style={{ textShadow: "0 0 20px rgba(0,255,255,0.8)" }}>
        {cvData.header.name}
      </h1>
      <h2 className="text-xl font-bold text-magenta-400 mt-2" style={{ color: "#ff00ff", textShadow: "0 0 10px rgba(255,0,255,0.8)" }}>
        &gt;&gt; {cvData.header.title}
      </h2>
      <div className="text-cyan-300 text-xs mt-4">{cvData.header.email} | {cvData.header.phone} | {cvData.header.location}</div>
    </div>

    {cvData.summary && (
      <div className="mb-6 border-l-4 border-cyan-400 pl-4">
        <p className="text-gray-200 text-sm">{cvData.summary}</p>
      </div>
    )}

    {cvData.experience?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-cyan-400 font-black mb-3">[ EXPERIENCE ]</h3>
        {cvData.experience.map((exp, idx) => (
          <div key={idx} className="mb-4 border-l-2 border-magenta-500 pl-4" style={{ borderColor: "#ff00ff" }}>
            <h4 className="text-cyan-300 font-bold">{exp.title}</h4>
            <p className="text-gray-400 text-xs">{exp.company} ({exp.dates})</p>
            <ul className="text-gray-300 text-xs mt-2 space-y-1">
              {exp.bullets.map((b, i) => (
                <li key={i}>$ {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}

    {Object.keys(cvData.skills || {}).length > 0 && (
      <div>
        <h3 className="text-cyan-400 font-black mb-2">[ SKILLS ]</h3>
        {Object.entries(cvData.skills).map(([cat, skills], idx) => (
          <p key={idx} className="text-gray-300 text-xs"><span className="text-cyan-300">{cat}:</span> {(skills as string[]).join(" > ")}</p>
        ))}
      </div>
    )}
  </div>
);

// Generic template used to produce simple layout variants programmatically
export const GenericTemplate: React.FC<CVTemplateProps & { variantIndex?: number }> = ({
  cvData,
  photoUrl,
  colors,
  layout = "header",
  fontFamily,
  photoPosition = "right",
  showSkillsBg = false,
  sectionOrder = ["summary", "experience", "education", "skills"],
  variantIndex = 0,
  bulletStyle = "arrow",
  skillStyle = "inline",
  headerStyle = "stripe",
}) => {
  const accentColor = colors?.accent || "#2563eb";
  const textColor = colors?.text || "#111827";
  const bgColor = "#ffffff"; // keep white page background per user request

  // small variation class by variant index
  const chip = variantIndex % 6;
  const layoutClass = layout === "left" ? "md:grid md:grid-cols-3 gap-6" : layout === "two-col" ? "md:grid md:grid-cols-2 gap-8" : layout === "header" ? "" : layout === "center" ? "max-w-2xl mx-auto" : "";

  const renderHeader = (title: string) => {
    const base = "text-xl font-black mb-3 tracking-wide";
    if (headerStyle === "boxed") return <h3 className={`${base} p-3 rounded`} style={{ color: textColor, backgroundColor: `${accentColor}10` }}>{title}</h3>;
    if (headerStyle === "centered") return <h3 className={`${base} text-center`} style={{ color: textColor }}>{title}</h3>;
    if (headerStyle === "underline") return <h3 className={`${base} pb-2 border-b`} style={{ color: textColor, borderColor: accentColor }}>{title}</h3>;
    return <h3 className={`${base} uppercase tracking-wider`} style={{ color: textColor }}>{title}</h3>;
  };

  const renderSection = (section: string) => {
    switch (section) {
      case "summary":
        return cvData.summary ? (
          <div key="summary">
            {renderHeader("Professional Summary")}
            <p style={{ color: textColor }}>{cvData.summary}</p>
          </div>
        ) : null;
      case "experience":
        return cvData.experience?.length ? (
          <div key="experience">
            {renderHeader("Experience")}
            <div className="space-y-4">
              {cvData.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold" style={{ color: textColor }}>{exp.title}</h4>
                    <span className="text-sm" style={{ color: textColor, opacity: 0.6 }}>{exp.dates}</span>
                  </div>
                  <p className="font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                  {
                    bulletStyle === "none" ? (
                      exp.bullets.map((b, idx) => <p key={idx} style={{ color: textColor }}>{b}</p>)
                    ) : (
                      <ul className="ml-4" style={{ listStyle: "none" }}>
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="flex gap-3 items-start" style={{ color: textColor }}>
                            <span className="font-bold" style={{ color: accentColor }}>{bulletStyle === "arrow" ? '▸' : bulletStyle === "dot" ? '•' : '—'}</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                </div>
              ))}
            </div>
          </div>
        ) : null;
      case "education":
        return cvData.education?.length ? (
          <div key="education">
            {renderHeader("Education")}
            <div className="space-y-2">
              {cvData.education.map((edu, i) => (
                <div key={i} className="pl-2" style={{ borderLeft: `3px solid ${accentColor}` }}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold" style={{ color: textColor }}>{edu.degree}</span>
                    <span className="text-sm" style={{ color: textColor, opacity: 0.6 }}>{edu.graduationDate}</span>
                  </div>
                  <p style={{ color: accentColor }}>{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      case "skills":
        return Object.keys(cvData.skills || {}).length ? (
          <div key="skills" className={showSkillsBg ? "p-4 rounded-lg" : ""} style={{ backgroundColor: showSkillsBg ? `${accentColor}10` : undefined }}>
            {renderHeader("Skills")}
            <div className="grid grid-cols-2 gap-4 text-sm" style={{ color: textColor }}>
              {Object.entries(cvData.skills).map(([cat, skills], i) => (
                <div key={i}>
                  <h4 className="font-semibold mb-1" style={{ color: textColor }}>{cat}</h4>
                  {skillStyle === "pills" ? (
                    <div className="flex flex-wrap gap-2">
                      {(skills as string[]).map((s, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${accentColor}20`, color: textColor }}>{s}</span>
                      ))}
                    </div>
                  ) : skillStyle === "list" ? (
                    <ul className="list-disc ml-4">{(skills as string[]).map((s, idx) => <li key={idx}>{s}</li>)}</ul>
                  ) : (
                    <p>{(skills as string[]).join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div id="cv-preview" className={`p-8 md:p-12 max-w-4xl mx-auto ${layoutClass}`} style={{ backgroundColor: bgColor, fontFamily: fontFamily || undefined }}>
      {/* optionally a left side decorative strip variant */}
      {chip === 1 && <div style={{ width: "8px", background: accentColor, position: 'absolute', left: 16, top: 48, height: 120, borderRadius: 4 }} />} 
      <div className={layout === "left" ? "md:col-span-2" : undefined}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: textColor }}>{cvData.header.name}</h1>
            <h2 className="text-lg font-semibold" style={{ color: accentColor }}>{cvData.header.title}</h2>
          </div>
          {photoUrl && photoPosition !== "left" && <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover" />}
        </div>
        <div className="text-sm mb-6" style={{ color: textColor }}>{cvData.header.email} | {cvData.header.phone} | {cvData.header.location}</div>

        {/* Sections in specified order */}
        <div className="space-y-6">
          {sectionOrder.map((sec) => renderSection(sec))}
        </div>
      </div>
      {/* right column variants */}
      {layout === "two-col" && (
        <div className="md:col-span-1">
          {photoUrl && photoPosition === "right" && <img src={photoUrl} alt="Profile" className="w-full rounded object-cover mb-6" />}
          {/* small right column extras */}
          {cvData.skills && cvData.skills.Languages && (
            <div className="mb-4">
              <h4 className="font-bold mb-2" style={{ color: textColor }}>Languages</h4>
              <p style={{ color: textColor }}>{(cvData.skills?.Languages || []).join(", ")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const PastelTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8 md:p-12 max-w-4xl mx-auto">
    <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-2xl mb-6">
      <div className="flex items-center gap-6 mb-4">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-purple-300" />}
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{cvData.header.name}</h1>
          <h2 className="text-xl font-bold text-purple-500 mt-1">{cvData.header.title}</h2>
        </div>
      </div>
      <div className="text-sm text-gray-700">{cvData.header.email} • {cvData.header.phone} • {cvData.header.location}</div>
    </div>

    {cvData.summary && (
      <div className="bg-white/80 backdrop-blur rounded-3xl p-6 mb-6 shadow-lg">
        <p className="text-gray-800 leading-relaxed">{cvData.summary}</p>
      </div>
    )}

    {cvData.experience?.length > 0 && (
      <div className="mb-6">
        <h3 className="text-2xl font-black text-purple-600 mb-4">Experience</h3>
        {cvData.experience.map((exp, idx) => (
          <div key={idx} className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-4 shadow-lg">
            <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
            <p className="text-pink-600 font-semibold">{exp.company} • {exp.dates}</p>
            <ul className="mt-3 space-y-2">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-gray-700">◦ {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}

    {Object.keys(cvData.skills || {}).length > 0 && (
      <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg">
        <h3 className="text-2xl font-black text-purple-600 mb-4">Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(cvData.skills).map(([cat, skills], idx) => (
            <div key={idx}>
              <p className="font-bold text-gray-900 mb-2">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {(skills as string[]).map((s, i) => (
                  <span key={i} className="bg-gradient-to-r from-pink-200 to-purple-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Simplified versions of remaining templates
export const ProfessionalBlueTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-white p-8 md:p-12 max-w-4xl mx-auto">
    <div className="border-b-8 border-blue-700 pb-6 mb-8">
      {photoUrl && <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-lg mb-4 object-cover border-2 border-blue-700" />}
      <h1 className="text-5xl font-black text-blue-900">{cvData.header.name}</h1>
      <h2 className="text-2xl font-bold text-blue-600 mt-2">{cvData.header.title}</h2>
      <div className="text-sm text-gray-700 mt-3">{cvData.header.email} • {cvData.header.phone} • {cvData.header.location}</div>
    </div>
    {cvData.summary && <div className="mb-8"><p className="text-gray-800 leading-relaxed">{cvData.summary}</p></div>}
    {cvData.experience?.length > 0 && (
      <div className="mb-8"><h3 className="text-xl font-black text-blue-900 mb-4">PROFESSIONAL EXPERIENCE</h3>
        {cvData.experience.map((exp, idx) => (
          <div key={idx} className="mb-4 pb-4 border-b border-blue-200">
            <h4 className="font-bold text-gray-900">{exp.title}</h4>
            <p className="text-blue-700 font-semibold text-sm">{exp.company} • {exp.dates}</p>
            <ul className="text-gray-700 text-sm mt-2 space-y-1">
              {exp.bullets.map((b, i) => (
                <li key={i}>• {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
    {Object.keys(cvData.skills || {}).length > 0 && (
      <div><h3 className="text-xl font-black text-blue-900 mb-3">CORE SKILLS</h3>
        {Object.entries(cvData.skills).map(([cat, skills], idx) => (
          <p key={idx} className="text-gray-800 text-sm"><span className="font-bold text-blue-900">{cat}:</span> {(skills as string[]).join(", ")}</p>
        ))}
      </div>
    )}
  </div>
);

export const ModernGradientTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-white p-8 md:p-12 max-w-4xl mx-auto">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
      {photoUrl && <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white" />}
      <h1 className="text-4xl font-black mb-2">{cvData.header.name}</h1>
      <h2 className="text-2xl font-light mb-4">{cvData.header.title}</h2>
      <div className="text-blue-100 text-sm">{cvData.header.email} • {cvData.header.phone} • {cvData.header.location}</div>
    </div>
    {cvData.summary && <div className="mb-8 text-gray-700">{cvData.summary}</div>}
    {cvData.experience?.length > 0 && (
      <div className="mb-8"><h3 className="text-2xl font-black text-gray-900 mb-4">Experience</h3>
        {cvData.experience.map((exp, idx) => (
          <div key={idx} className="mb-6 pb-4 border-l-4 border-purple-500 pl-4">
            <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
            <p className="text-purple-600 font-semibold">{exp.company}</p>
            <p className="text-gray-600 text-sm">{exp.dates}</p>
            <ul className="text-gray-700 text-sm mt-2 space-y-1">
              {exp.bullets.map((b, i) => (
                <li key={i}>▪ {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const VerticalTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="bg-white max-w-4xl mx-auto overflow-hidden">
    <div className="grid grid-cols-4 h-full">
      <div className="bg-gray-900 text-white p-6 col-span-1">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-full rounded-lg mb-6 object-cover border-4 border-white" />}
        <h1 className="text-2xl font-black mb-6 leading-tight">{cvData.header.name}</h1>
        {Object.keys(cvData.skills || {}).length > 0 && (
          <div>
            <h3 className="text-xs font-black uppercase mb-3 text-yellow-400">Skills</h3>
            <div className="space-y-3">
              {Object.entries(cvData.skills).map(([cat, skills], idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold mb-1">{cat}</p>
                  <div className="space-y-1">
                    {(skills as string[]).map((s, i) => (
                      <div key={i} className="bg-gray-700 rounded px-2 py-1 text-xs">{s}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="col-span-3 p-8">
        <h2 className="text-3xl font-black text-gray-900 mb-1">{cvData.header.title}</h2>
        <div className="text-gray-600 text-sm mb-6">{cvData.header.email} • {cvData.header.phone} • {cvData.header.location}</div>
        {cvData.summary && <div className="mb-8"><p className="text-gray-700 leading-relaxed text-sm">{cvData.summary}</p></div>}
        {cvData.experience?.length > 0 && (
          <div>
            <h3 className="text-xl font-black text-gray-900 mb-4">Experience</h3>
            {cvData.experience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <h4 className="font-bold text-gray-900">{exp.title}</h4>
                <p className="text-gray-600 text-sm">{exp.company} • {exp.dates}</p>
                <ul className="text-gray-700 text-sm mt-2 space-y-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>◆ {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// 19. MINIMALIST - Extremely minimal with maximum whitespace
export const MinimalistTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#000000";
  const textColor = colors?.text || "#000000";
  const bgColor = colors?.background || "#ffffff";

  return (
    <div id="cv-preview" className="p-16 max-w-4xl mx-auto" style={{ backgroundColor: bgColor }}>
      <div className="text-center mb-12">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-6 object-cover" />}
        <h1 className="text-5xl font-light mb-2" style={{ color: textColor }}>{cvData.header.name}</h1>
        <p className="text-sm tracking-widest uppercase" style={{ color: accentColor, opacity: 0.6 }}>{cvData.header.title}</p>
        <div className="text-xs mt-4 space-y-1" style={{ color: textColor, opacity: 0.7 }}>
          <p>{cvData.header.email}</p>
          <p>{cvData.header.phone}</p>
          <p>{cvData.header.location}</p>
        </div>
      </div>

      {cvData.summary && (
        <div className="mb-12 text-center">
          <p className="text-sm leading-loose" style={{ color: textColor }}>{cvData.summary}</p>
        </div>
      )}

      {cvData.experience?.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: textColor }}>Experience</h3>
          <div className="space-y-8">
            {cvData.experience.map((exp, idx) => (
              <div key={idx} className="border-l-2" style={{ borderColor: accentColor, paddingLeft: '16px' }}>
                <h4 className="font-light text-sm" style={{ color: textColor }}>{exp.title}</h4>
                <p className="text-xs uppercase tracking-wider" style={{ color: accentColor, opacity: 0.5 }}>{exp.company}</p>
                <p className="text-xs mt-1" style={{ color: textColor, opacity: 0.5 }}>{exp.dates}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {cvData.education?.length > 0 && (
        <div>
          <h3 className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: textColor }}>Education</h3>
          <div className="space-y-4">
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="text-sm">
                <p style={{ color: textColor }}>{edu.degree}</p>
                <p className="text-xs" style={{ color: textColor, opacity: 0.6 }}>{edu.school} • {edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 20. BOLD ACCENT - High contrast with strong accent colors
export const BoldAccentTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#ff6b6b";
  const textColor = colors?.text || "#1a1a1a";
  const bgColor = colors?.background || "#f8f8f8";

  return (
    <div id="cv-preview" className="p-0 max-w-4xl mx-auto flex" style={{ backgroundColor: bgColor }}>
      <div className="w-1/3 p-8" style={{ backgroundColor: accentColor }}>
        <div className="text-white">
          {photoUrl && <img src={photoUrl} alt="Profile" className="w-32 h-32 rounded-lg mb-6 object-cover" />}
          <h1 className="text-3xl font-black mb-1">CONTACT</h1>
          <div className="text-xs space-y-2 opacity-90">
            <p>{cvData.header.email}</p>
            <p>{cvData.header.phone}</p>
            <p>{cvData.header.location}</p>
          </div>
          {Object.keys(cvData.skills || {}).length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-black mb-3">SKILLS</h2>
              <div className="space-y-3">
                {Object.entries(cvData.skills).map(([cat, skills], idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold mb-1">{cat}</p>
                    <p className="opacity-90">{(skills as string[]).join(" • ")}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-2/3 p-8">
        <h2 className="text-5xl font-black mb-2" style={{ color: textColor }}>{cvData.header.name}</h2>
        <h3 className="text-2xl font-bold mb-6" style={{ color: accentColor }}>{cvData.header.title}</h3>
        {cvData.summary && <p className="mb-6 leading-relaxed" style={{ color: textColor }}>{cvData.summary}</p>}
        {cvData.experience?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-black mb-3" style={{ color: accentColor }}>EXPERIENCE</h4>
            <div className="space-y-4">
              {cvData.experience.map((exp, idx) => (
                <div key={idx}>
                  <p className="font-bold" style={{ color: textColor }}>{exp.title}</p>
                  <p style={{ color: accentColor, fontSize: '0.875rem' }}>{exp.company} • {exp.dates}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 21. SIDEBAR DARK - Modern dark sidebar layout
export const SidebarDarkTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#60a5fa";
  const textColor = colors?.text || "#ffffff";
  const bgColor = colors?.background || "#1f2937";

  return (
    <div id="cv-preview" className="max-w-4xl mx-auto flex min-h-screen" style={{ backgroundColor: '#000' }}>
      <div className="w-72 p-8" style={{ backgroundColor: bgColor }}>
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-40 h-40 rounded-2xl mb-6 object-cover" />}
        <h1 className="text-3xl font-black mb-1" style={{ color: textColor }}>{cvData.header.name}</h1>
        <p className="text-sm mb-6" style={{ color: accentColor }}>{cvData.header.title}</p>
        <div className="space-y-4 text-sm" style={{ color: textColor, opacity: 0.8 }}>
          <div>
            <p style={{ color: accentColor }} className="font-bold text-xs uppercase">Email</p>
            <p>{cvData.header.email}</p>
          </div>
          <div>
            <p style={{ color: accentColor }} className="font-bold text-xs uppercase">Phone</p>
            <p>{cvData.header.phone}</p>
          </div>
          <div>
            <p style={{ color: accentColor }} className="font-bold text-xs uppercase">Location</p>
            <p>{cvData.header.location}</p>
          </div>
        </div>
        {Object.keys(cvData.skills || {}).length > 0 && (
          <div className="mt-8">
            <h3 style={{ color: accentColor }} className="font-black text-sm mb-4">SKILLS</h3>
            <div className="space-y-3">
              {Object.entries(cvData.skills).map(([cat, skills], idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold mb-2" style={{ color: textColor }}>{cat}</p>
                  <div className="space-y-1">
                    {(skills as string[]).slice(0, 3).map((s, i) => (
                      <div key={i} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: accentColor, color: bgColor }}>{s}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 p-12" style={{ backgroundColor: '#ffffff', color: '#1f2937' }}>
        {cvData.summary && <p className="mb-8 leading-relaxed text-sm">{cvData.summary}</p>}
        {cvData.experience?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-black mb-4 uppercase" style={{ color: '#1f2937' }}>Experience</h3>
            <div className="space-y-6">
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-300">
                  <h4 className="font-black" style={{ color: '#1f2937' }}>{exp.title}</h4>
                  <p className="text-sm font-bold" style={{ color: accentColor }}>{exp.company}</p>
                  <p className="text-xs" style={{ color: '#6b7280' }}>{exp.dates}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 22. NEON FUTURE - Bright neon colors with dark background
export const NeonFutureTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="p-10 max-w-4xl mx-auto bg-black text-white">
    <div className="border-l-4 border-cyan-400 pl-6 mb-10">
      {photoUrl && <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded mb-4 object-cover border-2 border-purple-400" />}
      <h1 className="text-5xl font-black text-cyan-400 mb-2">{cvData.header.name}</h1>
      <h2 className="text-2xl text-pink-400 font-bold">{cvData.header.title}</h2>
    </div>
    <div className="grid grid-cols-3 gap-4 text-sm mb-10 text-lime-400">
      <div className="border border-lime-400 p-3">{cvData.header.email}</div>
      <div className="border border-cyan-400 p-3">{cvData.header.phone}</div>
      <div className="border border-pink-400 p-3">{cvData.header.location}</div>
    </div>
    {cvData.summary && <p className="mb-10 leading-relaxed text-gray-300 italic">{cvData.summary}</p>}
    {cvData.experience?.length > 0 && (
      <div className="mb-10">
        <h3 className="text-2xl font-black text-cyan-400 mb-4 uppercase">▶ Experience</h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="border-l-2 border-purple-400 pl-4">
              <h4 className="text-pink-400 font-bold">{exp.title}</h4>
              <p className="text-cyan-400 text-sm">{exp.company}</p>
              <p className="text-gray-400 text-xs">{exp.dates}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 23. MAGAZINE - Editorial magazine-style layout
export const MagazineTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#dc2626";
  const textColor = colors?.text || "#1f2937";

  return (
    <div id="cv-preview" className="p-12 max-w-4xl mx-auto bg-white">
      <div className="mb-12">
        <h2 className="text-6xl font-black mb-4" style={{ color: accentColor }}>{cvData.header.name}</h2>
        <div className="flex gap-8 items-start">
          {photoUrl && <img src={photoUrl} alt="Profile" className="w-40 h-40 object-cover" />}
          <div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: textColor }}>{cvData.header.title}</h3>
            <div className="text-sm space-y-1" style={{ color: textColor, opacity: 0.7 }}>
              <p>{cvData.header.email}</p>
              <p>{cvData.header.phone}</p>
              <p>{cvData.header.location}</p>
            </div>
          </div>
        </div>
      </div>
      {cvData.summary && (
        <div className="mb-12 text-lg leading-relaxed italic" style={{ color: textColor }}>
          {cvData.summary}
        </div>
      )}
      <div className="grid grid-cols-2 gap-12">
        {cvData.experience?.length > 0 && (
          <div>
            <h4 className="text-2xl font-black uppercase mb-6" style={{ color: accentColor }}>Experience</h4>
            <div className="space-y-6">
              {cvData.experience.map((exp, idx) => (
                <article key={idx}>
                  <h5 className="font-black text-base mb-1" style={{ color: textColor }}>{exp.title}</h5>
                  <p className="font-bold text-sm" style={{ color: accentColor, marginBottom: '0.25rem' }}>{exp.company}</p>
                  <p className="text-xs opacity-60" style={{ color: textColor }}>{exp.dates}</p>
                </article>
              ))}
            </div>
          </div>
        )}
        {cvData.education?.length > 0 && (
          <div>
            <h4 className="text-2xl font-black uppercase mb-6" style={{ color: accentColor }}>Education</h4>
            <div className="space-y-6">
              {cvData.education.map((edu, idx) => (
                <article key={idx}>
                  <h5 className="font-black text-base mb-1" style={{ color: textColor }}>{edu.degree}</h5>
                  <p className="font-bold text-sm" style={{ color: accentColor, marginBottom: '0.25rem' }}>{edu.school}</p>
                  <p className="text-xs opacity-60" style={{ color: textColor }}>{edu.graduationDate}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 24. CLEAN CARD - Modular card-based design
export const CleanCardTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#3b82f6";
  const bgColor = colors?.background || "#f9fafb";

  return (
    <div id="cv-preview" className="p-8 max-w-4xl mx-auto" style={{ backgroundColor: bgColor }}>
      <div className="mb-8 rounded-xl overflow-hidden bg-white shadow-lg p-8">
        <div className="flex gap-6 items-start">
          {photoUrl && <img src={photoUrl} alt="Profile" className="w-32 h-32 rounded-lg object-cover" />}
          <div>
            <h1 className="text-4xl font-black mb-1">{cvData.header.name}</h1>
            <h2 className="text-xl font-bold mb-4" style={{ color: accentColor }}>{cvData.header.title}</h2>
            <div className="flex gap-6 text-sm">
              <span>{cvData.header.email}</span>
              <span>{cvData.header.phone}</span>
              <span>{cvData.header.location}</span>
            </div>
          </div>
        </div>
      </div>

      {cvData.summary && (
        <div className="mb-6 bg-white rounded-xl shadow p-6">
          <p className="text-center leading-relaxed">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-black mb-4" style={{ color: accentColor }}>Experience</h3>
          <div className="space-y-3">
            {cvData.experience.map((exp, idx) => (
              <div key={idx} className="bg-white rounded-lg p-5 shadow-sm border-l-4" style={{ borderColor: accentColor }}>
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold">{exp.title}</h4>
                  <span className="text-xs text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: accentColor }}>{exp.company}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {cvData.education?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-2xl font-black mb-4" style={{ color: accentColor }}>Education</h3>
          <div className="space-y-3">
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="border-b pb-3" style={{ borderColor: accentColor }}>
                <h4 className="font-bold">{edu.degree}</h4>
                <p className="text-sm" style={{ color: accentColor }}>{edu.school} • {edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 25. PROGRESSIVE - Linear timeline design
export const ProgressiveTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#10b981";
  const textColor = colors?.text || "#111827";

  return (
    <div id="cv-preview" className="p-12 max-w-4xl mx-auto bg-white">
      <div className="text-center mb-16">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" />}
        <h1 className="text-5xl font-black mb-2">{cvData.header.name}</h1>
        <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>{cvData.header.title}</h2>
        <div className="flex justify-center gap-8 text-sm">
          <span>{cvData.header.email}</span>
          <span>{cvData.header.phone}</span>
          <span>{cvData.header.location}</span>
        </div>
      </div>

      {cvData.summary && <p className="text-center mb-12 leading-relaxed text-lg">{cvData.summary}</p>}

      {cvData.experience?.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-black mb-8 text-center" style={{ color: accentColor }}>Career Timeline</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full" style={{ backgroundColor: accentColor }}></div>
            <div className="space-y-8">
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className={`flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className={`${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-bold text-lg">{exp.title}</h4>
                      <p style={{ color: accentColor }} className="font-bold">{exp.company}</p>
                      <p className="text-sm opacity-60">{exp.dates}</p>
                    </div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {cvData.education?.length > 0 && (
        <div className="text-center">
          <h3 className="text-2xl font-black mb-6" style={{ color: accentColor }}>Education</h3>
          <div className="space-y-3">
            {cvData.education.map((edu, idx) => (
              <div key={idx}>
                <p className="font-bold">{edu.degree}</p>
                <p style={{ color: accentColor }}>{edu.school} • {edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 26. ELEGANT GOLD - Luxury design with gold accents
export const ElegantGoldTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="p-12 max-w-4xl mx-auto bg-amber-50">
    <div className="text-center mb-12">
      <div className="inline-block p-6 bg-white rounded-full mb-6 shadow-lg">
        {photoUrl ? <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover" /> : <div className="w-24 h-24 bg-gray-200 rounded-full"></div>}
      </div>
      <h1 className="text-5xl font-black mb-2 text-amber-900">{cvData.header.name}</h1>
      <h2 className="text-2xl font-light text-amber-700">{cvData.header.title}</h2>
      <div className="border-t-4 border-b-4 border-amber-800 my-6 py-4 inline-block">
        <div className="flex gap-6 text-amber-900 text-sm">
          <span>{cvData.header.email}</span>
          <span>{cvData.header.phone}</span>
          <span>{cvData.header.location}</span>
        </div>
      </div>
    </div>

    {cvData.summary && (
      <div className="mb-12 italic text-center text-amber-900 leading-relaxed">
        {cvData.summary}
      </div>
    )}

    {cvData.experience?.length > 0 && (
      <div className="mb-12">
        <h3 className="text-3xl font-light text-center mb-6 text-amber-900">Experience</h3>
        <div className="space-y-6">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-amber-800 pl-6">
              <h4 className="font-bold text-amber-900">{exp.title}</h4>
              <p className="text-amber-700 font-light">{exp.company}</p>
              <p className="text-sm text-amber-600">{exp.dates}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 27. TECH MINIMAL - Minimalist tech stack design
export const TechMinimalTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl }) => (
  <div id="cv-preview" className="p-10 max-w-4xl mx-auto bg-white font-mono">
    <div className="mb-10 pb-6 border-b-2 border-gray-300">
      <div className="flex gap-4 items-center mb-4">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-16 h-16 rounded object-cover" />}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{cvData.header.name}</h1>
          <p className="text-gray-600 text-sm">{cvData.header.title}</p>
        </div>
      </div>
      <div className="text-xs text-gray-600 space-y-1">
        <p>email: {cvData.header.email}</p>
        <p>phone: {cvData.header.phone}</p>
        <p>location: {cvData.header.location}</p>
      </div>
    </div>

    {cvData.summary && <div className="mb-8 text-sm text-gray-700 italic">"' {cvData.summary} '"</div>}

    {cvData.experience?.length > 0 && (
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-900 mb-4">// EXPERIENCE</h3>
        <div className="space-y-4">
          {cvData.experience.map((exp, idx) => (
            <div key={idx} className="text-xs text-gray-700">
              <p className="font-bold">[{idx}] = "{exp.title}"</p>
              <p className="ml-2">company: "{exp.company}"</p>
              <p className="ml-2">period: "{exp.dates}"</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 28. SPLASH CREATIVE - Colorful scattered design
export const SplashCreativeTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#ec4899";

  return (
    <div id="cv-preview" className="p-12 max-w-4xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.1 }}></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.05 }}></div>
      
      <div className="relative z-10">
        <div className="mb-12">
          {photoUrl && <img src={photoUrl} alt="Profile" className="w-40 h-40 rounded-3xl mb-6 object-cover shadow-xl rotate-3" />}
          <h1 className="text-6xl font-black mb-2" style={{ color: accentColor }}>{cvData.header.name}</h1>
          <h2 className="text-3xl font-bold mb-6 text-gray-700">{cvData.header.title}</h2>
          <div className="inline-flex gap-4 text-sm">
            <span className="px-4 py-2 rounded-full bg-white shadow">{cvData.header.email}</span>
            <span className="px-4 py-2 rounded-full bg-white shadow">{cvData.header.phone}</span>
            <span className="px-4 py-2 rounded-full bg-white shadow">{cvData.header.location}</span>
          </div>
        </div>

        {cvData.summary && <p className="mb-12 text-lg leading-relaxed text-gray-700">{cvData.summary}</p>}

        {cvData.experience?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-3xl font-black mb-6" style={{ color: accentColor }}>Experience</h3>
            <div className="grid grid-cols-2 gap-6">
              {cvData.experience.slice(0, 4).map((exp, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg transform hover:rotate-1" style={{ borderTop: `4px solid ${accentColor}` }}>
                  <h4 className="font-bold text-gray-900 mb-1">{exp.title}</h4>
                  <p style={{ color: accentColor }} className="font-bold text-sm mb-2">{exp.company}</p>
                  <p className="text-xs text-gray-500">{exp.dates}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 29. PROFILE FOCUS - Large profile photo emphasis
export const ProfileFocusTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#7c3aed";

  return (
    <div id="cv-preview" className="max-w-4xl mx-auto">
      <div className="relative h-96" style={{ backgroundColor: accentColor }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {photoUrl && <img src={photoUrl} alt="Profile" className="w-72 h-72 rounded-full object-cover border-8 border-white shadow-2xl" />}
        </div>
      </div>
      <div className="p-12 bg-white">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black mb-2">{cvData.header.name}</h1>
          <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>{cvData.header.title}</h2>
          <div className="flex justify-center gap-6 text-sm">
            <span>{cvData.header.email}</span>
            <span>{cvData.header.phone}</span>
            <span>{cvData.header.location}</span>
          </div>
        </div>

        {cvData.summary && <p className="text-center mb-10 leading-relaxed text-gray-700">{cvData.summary}</p>}

        <div className="grid grid-cols-3 gap-8">
          {cvData.experience?.length > 0 && (
            <div className="col-span-2">
              <h3 className="text-2xl font-black mb-4" style={{ color: accentColor }}>Experience</h3>
              <div className="space-y-6">
                {cvData.experience.map((exp, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-lg">{exp.title}</h4>
                    <p style={{ color: accentColor }} className="font-bold">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.dates}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {cvData.education?.length > 0 && (
            <div>
              <h3 className="text-2xl font-black mb-4" style={{ color: accentColor }}>Education</h3>
              <div className="space-y-4">
                {cvData.education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-bold">{edu.degree}</p>
                    <p style={{ color: accentColor }} className="text-sm">{edu.school}</p>
                    <p className="text-xs text-gray-600">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 30. INFOGRAPHIC - Data visualization style
export const InfographicTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#f59e0b";

  return (
    <div id="cv-preview" className="p-12 max-w-4xl mx-auto bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex gap-10 mb-12 items-start">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-40 h-40 rounded-2xl object-cover" />}
        <div>
          <h1 className="text-6xl font-black mb-2">{cvData.header.name}</h1>
          <h2 className="text-3xl font-bold mb-6" style={{ color: accentColor }}>{cvData.header.title}</h2>
          <div className="flex gap-4 text-sm">
            <div className="flex-1">
              <p className="text-gray-400 text-xs">EMAIL</p>
              <p>{cvData.header.email}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs">PHONE</p>
              <p>{cvData.header.phone}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs">LOCATION</p>
              <p>{cvData.header.location}</p>
            </div>
          </div>
        </div>
      </div>

      {cvData.summary && (
        <div className="mb-12 pb-8 border-b" style={{ borderColor: accentColor }}>
          <p className="italic text-gray-300">{cvData.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-12">
        {cvData.experience?.length > 0 && (
          <div>
            <h3 className="text-2xl font-black mb-6" style={{ color: accentColor }}>▼ EXPERIENCE</h3>
            {cvData.experience.map((exp, idx) => (
              <div key={idx} className="mb-6 pb-4 border-b border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: accentColor }}></div>
                  <div>
                    <h4 className="font-black">{exp.title}</h4>
                    <p style={{ color: accentColor }}>{exp.company}</p>
                    <p className="text-xs text-gray-400">{exp.dates}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cvData.education?.length > 0 && (
          <div>
            <h3 className="text-2xl font-black mb-6" style={{ color: accentColor }}>▼ EDUCATION</h3>
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="mb-6 pb-4 border-b border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: accentColor }}></div>
                  <div>
                    <h4 className="font-black">{edu.degree}</h4>
                    <p style={{ color: accentColor }}>{edu.school}</p>
                    <p className="text-xs text-gray-400">{edu.graduationDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 31. GEOMETRIC - Bold geometric shapes and patterns
export const GeometricTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#0ea5e9";

  return (
    <div id="cv-preview" className="p-0 max-w-4xl mx-auto">
      <div className="flex">
        <div className="w-1/3 p-10 relative overflow-hidden" style={{ backgroundColor: accentColor }}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 border-4 border-white"></div>
          <div className="relative z-10 text-white">
            {photoUrl && <img src={photoUrl} alt="Profile" className="w-full rounded-lg mb-6 object-cover" />}
            <h1 className="text-3xl font-black mb-4">{cvData.header.name}</h1>
            {Object.keys(cvData.skills || {}).length > 0 && (
              <div>
                <h2 className="font-black mb-3">SKILLS</h2>
                <div className="space-y-3">
                  {Object.entries(cvData.skills).map(([cat, skills], idx) => (
                    <div key={idx} className="text-xs">
                      <p className="font-bold mb-1">{cat}</p>
                      <div className="space-y-1">
                        {(skills as string[]).slice(0, 2).map((s, i) => (
                          <div key={i} className="bg-white text-gray-900 px-2 py-1 text-xs font-bold rounded">{s}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-2/3 p-10 bg-white">
          <h2 className="text-4xl font-black mb-2">{cvData.header.title}</h2>
          <div className="flex gap-6 text-sm mb-8">
            <span>{cvData.header.email}</span>
            <span>{cvData.header.phone}</span>
            <span>{cvData.header.location}</span>
          </div>
          {cvData.summary && <p className="mb-8">{cvData.summary}</p>}
          {cvData.experience?.length > 0 && (
            <div>
              <h3 className="text-2xl font-black mb-4" style={{ color: accentColor }}>EXPERIENCE</h3>
              <div className="space-y-5">
                {cvData.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-4" style={{ borderColor: accentColor, paddingLeft: '16px' }}>
                    <h4 className="font-bold">{exp.title}</h4>
                    <p style={{ color: accentColor }} className="text-sm font-bold">{exp.company}</p>
                    <p className="text-xs text-gray-500">{exp.dates}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 32. LUXURY DARK - Premium dark theme
export const LuxuryDarkTemplate: React.FC<CVTemplateProps> = ({ cvData, photoUrl, colors }) => {
  const accentColor = colors?.accent || "#fbbf24";

  return (
    <div id="cv-preview" className="p-12 max-w-4xl mx-auto bg-gray-950 text-gray-100" style={{ fontFamily: "'Garamond', serif" }}>
      <div className="text-center mb-16">
        {photoUrl && <img src={photoUrl} alt="Profile" className="w-48 h-48 rounded-full mx-auto mb-8 object-cover border-4" style={{ borderColor: accentColor }} />}
        <h1 className="text-6xl font-black mb-3" style={{ color: accentColor }}>{cvData.header.name}</h1>
        <h2 className="text-3xl font-light mb-8">{cvData.header.title}</h2>
        <div className="inline-block text-sm space-y-2">
          <p>{cvData.header.email}</p>
          <p>{cvData.header.phone}</p>
          <p>{cvData.header.location}</p>
        </div>
      </div>

      {cvData.summary && (
        <div className="mb-16 text-center text-lg leading-relaxed opacity-90">
          {cvData.summary}
        </div>
      )}

      <div className="space-y-12">
        {cvData.experience?.length > 0 && (
          <div>
            <h3 className="text-2xl font-light uppercase tracking-widest mb-8" style={{ color: accentColor }}>Experience</h3>
            <div className="space-y-8">
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className="pl-6 border-l-2" style={{ borderColor: accentColor }}>
                  <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                  <p className="font-light mb-2">{exp.company}</p>
                  <p className="text-sm opacity-60">{exp.dates}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Template registry
// Expanded templates list with 50 distinct named styles
const extraTemplateConfigs = [
  { id: "leftProfileModern", label: "Left Profile Modern", desc: "Left photo, clean headers", props: { layout: "left", fontFamily: "Inter, system-ui, -apple-system", photoPosition: "left", showSkillsBg: false, bulletStyle: "arrow", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "rightProfileModern", label: "Right Profile Modern", desc: "Right photo, modern layout", props: { layout: "header", fontFamily: "Inter, system-ui, -apple-system", photoPosition: "right", showSkillsBg: false, bulletStyle: "arrow", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "centeredHeaderClassic", label: "Centered Header Classic", desc: "Centered title & contact info", props: { layout: "center", fontFamily: "'Times New Roman', serif", photoPosition: "top", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "centered" } },
  { id: "headerStripeExecutive", label: "Header Stripe Executive", desc: "Top stripe with bold title", props: { layout: "header", fontFamily: "Georgia, serif", photoPosition: "right", showSkillsBg: false, bulletStyle: "dash", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "sidebarCompact", label: "Sidebar Compact", desc: "Compact left sidebar layout", props: { layout: "left", fontFamily: "Arial, sans-serif", photoPosition: "left", showSkillsBg: true, bulletStyle: "dot", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "timelineLeftElegant", label: "Timeline Left Elegant", desc: "Left timeline for roles", props: { layout: "timeline", fontFamily: "Garamond, serif", photoPosition: "left", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "underline" } },
  { id: "twoColBalanced", label: "Two Column Balanced", desc: "Two-column distribution of sections", props: { layout: "two-col", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: false, bulletStyle: "arrow", skillStyle: "list", headerStyle: "centered" } },
  { id: "twoColSharp", label: "Two Column Sharp", desc: "Two columns with sharp spacing", props: { layout: "two-col", fontFamily: "Arial, sans-serif", photoPosition: "right", showSkillsBg: true, bulletStyle: "dash", skillStyle: "inline", headerStyle: "boxed" } },
  { id: "infographicSimple", label: "Infographic Simple", desc: "Skill bars & visual data-friendly", props: { layout: "two-col", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "none", skillStyle: "pills", headerStyle: "centered" } },
  { id: "infographicColorful", label: "Infographic Colorful", desc: "Colorful charts & skill badges", props: { layout: "two-col", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "none", skillStyle: "pills", headerStyle: "stripe" } },
  { id: "magazineBold", label: "Magazine Bold", desc: "Bold headings and editorial feel", props: { layout: "header", fontFamily: "'Georgia', serif", photoPosition: "top", showSkillsBg: true, bulletStyle: "dot", skillStyle: "inline", headerStyle: "boxed" } },
  { id: "magazineLight", label: "Magazine Light", desc: "Editorial with light spacing", props: { layout: "header", fontFamily: "'Times New Roman', serif", photoPosition: "top", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "centered" } },
  { id: "boldAccentLeft", label: "Bold Accent Left", desc: "Strong left accent color", props: { layout: "left", fontFamily: "Inter, system-ui", photoPosition: "left", showSkillsBg: false, bulletStyle: "arrow", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "boldAccentRight", label: "Bold Accent Right", desc: "Strong right accent color", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: false, bulletStyle: "arrow", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "splitModern", label: "Split Modern", desc: "Split page content into two clean blocks", props: { layout: "two-col", fontFamily: "Inter, system-ui", photoPosition: "left", showSkillsBg: true, bulletStyle: "dot", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "splitClassic", label: "Split Classic", desc: "Split with classic typography", props: { layout: "two-col", fontFamily: "'Times New Roman', serif", photoPosition: "right", showSkillsBg: false, bulletStyle: "dash", skillStyle: "list", headerStyle: "centered" } },
  { id: "verticalTimeline", label: "Vertical Timeline", desc: "Vertical timeline for career progression", props: { layout: "timeline", fontFamily: "Inter, system-ui", photoPosition: "left", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "underline" } },
  { id: "retroSimple", label: "Retro Simple", desc: "Vintage fonts and retro layout", props: { layout: "header", fontFamily: "'Courier New', monospace", photoPosition: "top", showSkillsBg: false, bulletStyle: "dash", skillStyle: "inline", headerStyle: "centered" } },
  { id: "retroBold", label: "Retro Bold", desc: "Bold retro styling", props: { layout: "header", fontFamily: "'Courier New', monospace", photoPosition: "top", showSkillsBg: true, bulletStyle: "dot", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "pastelSoft", label: "Pastel Soft", desc: "Soft colors and gentle spacing", props: { layout: "header", fontFamily: "Georgia, serif", photoPosition: "top", showSkillsBg: true, bulletStyle: "dot", skillStyle: "list", headerStyle: "centered" } },
  { id: "minimalistWhitespace", label: "Minimalist Whitespace", desc: "Much whitespace, minimal decorations", props: { layout: "center", fontFamily: "Inter, system-ui", photoPosition: "none", showSkillsBg: false, bulletStyle: "none", skillStyle: "inline", headerStyle: "centered" } },
  { id: "luxuryGoldAccent", label: "Luxury Gold Accent", desc: "Gold accents and luxury typography", props: { layout: "header", fontFamily: "'Garamond', serif", photoPosition: "right", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "boxed" } },
  { id: "luxuryDarkClassic", label: "Luxury Dark Classic", desc: "Dark luxury layout for executives", props: { layout: "header", fontFamily: "'Times New Roman', serif", photoPosition: "right", showSkillsBg: false, bulletStyle: "dash", skillStyle: "list", headerStyle: "stripe" } },
  { id: "techMonospace", label: "Tech Monospace", desc: "Monospace font with micro spacing", props: { layout: "header", fontFamily: "'Courier New', monospace", photoPosition: "top", showSkillsBg: true, bulletStyle: "dot", skillStyle: "inline", headerStyle: "centered" } },
  { id: "techDarkMinimal", label: "Tech Dark Minimal", desc: "Dark, minimal layout for engineering CVs", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "arrow", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "corporateSimple", label: "Corporate Simple", desc: "Professional corporate layout", props: { layout: "header", fontFamily: "Arial, sans-serif", photoPosition: "right", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "underline" } },
  { id: "corporateClassic", label: "Corporate Classic", desc: "Formal corporate classic layout", props: { layout: "header", fontFamily: "'Times New Roman', serif", photoPosition: "right", showSkillsBg: false, bulletStyle: "dash", skillStyle: "list", headerStyle: "centered" } },
  { id: "cleanCardSoft", label: "Clean Card Soft", desc: "Card-based modular sections with soft edges", props: { layout: "two-col", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "dot", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "cleanCardSharp", label: "Clean Card Sharp", desc: "Sharp card-based modular layout", props: { layout: "two-col", fontFamily: "Arial, sans-serif", photoPosition: "right", showSkillsBg: true, bulletStyle: "arrow", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "progressiveTimeline", label: "Progressive Timeline", desc: "Progressive, timeline-style layout for careers", props: { layout: "timeline", fontFamily: "Inter, system-ui", photoPosition: "left", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "underline" } },
  { id: "geometricShapes", label: "Geometric Shapes", desc: "Geometric accents & shapes", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "dot", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "profileFocusLarge", label: "Profile Focus Large", desc: "Large profile image and personality", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "top", showSkillsBg: false, bulletStyle: "arrow", skillStyle: "inline", headerStyle: "centered" } },
  { id: "photoLeftCompact", label: "Photo Left Compact", desc: "Compact with left photo and compact header", props: { layout: "left", fontFamily: "Inter, system-ui", photoPosition: "left", showSkillsBg: false, bulletStyle: "dot", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "photoRightCompact", label: "Photo Right Compact", desc: "Compact with right photo and compact header", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: false, bulletStyle: "dot", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "verticalSidebar", label: "Vertical Sidebar", desc: "Vertical sidebar for contact and skills", props: { layout: "left", fontFamily: "Arial, sans-serif", photoPosition: "left", showSkillsBg: true, bulletStyle: "dot", skillStyle: "list", headerStyle: "boxed" } },
  { id: "photoCenteredLarge", label: "Photo Centered Large", desc: "Large centered photo with focused header", props: { layout: "center", fontFamily: "Inter, system-ui", photoPosition: "top", showSkillsBg: false, bulletStyle: "arrow", skillStyle: "inline", headerStyle: "centered" } },
  { id: "elegantSerif", label: "Elegant Serif", desc: "Serif elegant look with traditional spacing", props: { layout: "header", fontFamily: "Garamond, serif", photoPosition: "right", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "underline" } },
  { id: "neatSans", label: "Neat Sans", desc: "San-serif focused modern layout", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: false, bulletStyle: "arrow", skillStyle: "inline", headerStyle: "stripe" } },
  { id: "executiveTwoPanel", label: "Executive Two-Panel", desc: "Executive layout with two panels and summary", props: { layout: "two-col", fontFamily: "'Times New Roman', serif", photoPosition: "right", showSkillsBg: false, bulletStyle: "dash", skillStyle: "list", headerStyle: "boxed" } },
  { id: "verticalBold", label: "Vertical Bold", desc: "Bold vertical layout emphasizing dates and roles", props: { layout: "timeline", fontFamily: "Arial, sans-serif", photoPosition: "left", showSkillsBg: false, bulletStyle: "dash", skillStyle: "inline", headerStyle: "underline" } },
  { id: "timelineDots", label: "Timeline Dots", desc: "Timeline with dot markers", props: { layout: "timeline", fontFamily: "Inter, system-ui", photoPosition: "left", showSkillsBg: false, bulletStyle: "dot", skillStyle: "list", headerStyle: "centered" } },
  { id: "highlightedSkills", label: "Highlighted Skills", desc: "Skill blocks with highlighted background", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "arrow", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "skillsPills", label: "Skills Pills", desc: "Skills shown as rounded pills", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "none", skillStyle: "pills", headerStyle: "stripe" } },
  { id: "skillsLabels", label: "Skills Labels", desc: "Skills grouped with labels", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "dot", skillStyle: "list", headerStyle: "centered" } },
  { id: "skillsBar", label: "Skills Bar", desc: "Visual skill bars (simple)", props: { layout: "two-col", fontFamily: "Inter, system-ui", photoPosition: "right", showSkillsBg: true, bulletStyle: "none", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "academicClassic", label: "Academic Classic", desc: "Academic style with publications & honors", props: { layout: "header", fontFamily: "'Times New Roman', serif", photoPosition: "none", showSkillsBg: false, bulletStyle: "dash", skillStyle: "list", headerStyle: "centered" } },
  { id: "academicMinimal", label: "Academic Minimal", desc: "Minimal academic CV with ample whitespace", props: { layout: "center", fontFamily: "Garamond, serif", photoPosition: "none", showSkillsBg: false, bulletStyle: "none", skillStyle: "list", headerStyle: "centered" } },
  { id: "startupFounder", label: "Startup Founder", desc: "Founder layout emphasizing impact & product", props: { layout: "header", fontFamily: "Inter, system-ui", photoPosition: "top", showSkillsBg: true, bulletStyle: "arrow", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "creativeDesigner", label: "Creative Designer", desc: "Visual design with color accents", props: { layout: "header", fontFamily: "'Georgia', serif", photoPosition: "right", showSkillsBg: true, bulletStyle: "dot", skillStyle: "pills", headerStyle: "boxed" } },
  { id: "creativeArtist", label: "Creative Artist", desc: "Artistic visual layout with illustrations", props: { layout: "header", fontFamily: "'Courier New', monospace", photoPosition: "right", showSkillsBg: true, bulletStyle: "dot", skillStyle: "pills", headerStyle: "boxed" } },
];

const generatedVariants: Record<string, React.FC<CVTemplateProps>> = {};
for (const tpl of extraTemplateConfigs) {
  const key = tpl.id;
  const props = tpl.props as any;
  generatedVariants[key] = (componentProps: CVTemplateProps) => (
    <GenericTemplate {...props} {...componentProps} />
  );
}

export const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  minimal: MinimalTemplate,
  tech: TechTemplate,
  corporate: CorporateTemplate,
  elegant: ElegantTemplate,
  dynamic: DynamicTemplate,
  artistic: ArtisticTemplate,
  gradient: GradientTemplate,
  retro: RetroTemplate,
  flat: FlatTemplate,
  cyberpunk: CyberpunkTemplate,
  pastel: PastelTemplate,
  professionalBlue: ProfessionalBlueTemplate,
  modernGradient: ModernGradientTemplate,
  vertical: VerticalTemplate,
  minimalist: MinimalistTemplate,
  boldAccent: BoldAccentTemplate,
  sidebarDark: SidebarDarkTemplate,
  neonFuture: NeonFutureTemplate,
  magazine: MagazineTemplate,
  cleanCard: CleanCardTemplate,
  progressive: ProgressiveTemplate,
  elegantGold: ElegantGoldTemplate,
  techMinimal: TechMinimalTemplate,
  splashCreative: SplashCreativeTemplate,
  profileFocus: ProfileFocusTemplate,
  infographic: InfographicTemplate,
  geometric: GeometricTemplate,
  luxuryDark: LuxuryDarkTemplate,
  // attach generated variants
  ...generatedVariants,
};

export type TemplateType = keyof typeof templates;

const extraTemplateOptions = extraTemplateConfigs.map((t) => ({ id: t.id as TemplateType, label: t.label, description: t.desc }));

export const templateOptions: Array<{ id: TemplateType; label: string; description: string }> = [
  { id: "modern", label: "Modern", description: "Clean, contemporary" },
  { id: "classic", label: "Classic", description: "Traditional, ATS" },
  { id: "creative", label: "Creative", description: "Artistic, vibrant" },
  { id: "executive", label: "Executive", description: "Premium, bold" },
  { id: "minimal", label: "Minimal", description: "Ultra-clean" },
  { id: "tech", label: "Tech", description: "Dark, technical" },
  { id: "corporate", label: "Corporate", description: "Formal, structured" },
  { id: "elegant", label: "Elegant", description: "Refined, centered" },
  { id: "dynamic", label: "Dynamic", description: "Energetic, bold" },
  { id: "artistic", label: "Artistic", description: "Visual, creative" },
  { id: "gradient", label: "Gradient", description: "Modern colors" },
  { id: "retro", label: "Retro", description: "Vintage vibes" },
  { id: "flat", label: "Flat", description: "Flat design" },
  { id: "cyberpunk", label: "Cyberpunk", description: "Neon, futuristic" },
  { id: "pastel", label: "Pastel", description: "Soft, dreamy" },
  { id: "professionalBlue", label: "Pro Blue", description: "Professional" },
  { id: "modernGradient", label: "Gradient Pro", description: "Modern gradient" },
  { id: "vertical", label: "Vertical", description: "Side panel" },
  { id: "minimalist", label: "Minimalist", description: "Extremely minimal" },
  { id: "boldAccent", label: "Bold Accent", description: "High contrast" },
  { id: "sidebarDark", label: "Sidebar Dark", description: "Modern dark layout" },
  { id: "neonFuture", label: "Neon", description: "Futuristic neon" },
  { id: "magazine", label: "Magazine", description: "Editorial style" },
  { id: "cleanCard", label: "Clean Card", description: "Card-based modular" },
  { id: "progressive", label: "Progressive", description: "Timeline design" },
  { id: "elegantGold", label: "Elegant Gold", description: "Luxury gold theme" },
  { id: "techMinimal", label: "Tech Minimal", description: "Monospace tech" },
  { id: "splashCreative", label: "Splash", description: "Colorful creative" },
  { id: "profileFocus", label: "Profile Focus", description: "Photo emphasis" },
  { id: "infographic", label: "Infographic", description: "Data visualization" },
  { id: "geometric", label: "Geometric", description: "Bold geometric shapes" },
  { id: "luxuryDark", label: "Luxury Dark", description: "Premium dark" },
  // Extra named templates
  ...extraTemplateOptions,
];
