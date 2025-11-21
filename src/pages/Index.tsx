import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CVPreview } from "@/components/CVPreview";
import { useToast } from "@/hooks/use-toast";
import LandingPage from "@/components/LandingPage";
import {
  Sparkles,
  Upload,
  Plus,
  Trash2,
  Download,
  Edit,
  FileText,
  Loader2,
  User,
  Briefcase,
  GraduationCap,
  Code,
} from "lucide-react";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { GoogleGenAI } from "@google/genai";

interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa: string;
  honors: string;
}

const Index = () => {
  const { toast } = useToast();
  const [view, setView] = useState<"landing" | "form" | "preview">("landing");
  const [loading, setLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [certifications, setCertifications] = useState("");
  const [languages, setLanguages] = useState("");
  const [projects, setProjects] = useState("");
  const [template, setTemplate] = useState<"classic" | "modern" | "executive">("modern");

  const [experiences, setExperiences] = useState<Experience[]>([
    { company: "", title: "", startDate: "", endDate: "", description: "" },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    { school: "", degree: "", field: "", graduationDate: "", gpa: "", honors: "" },
  ]);

  const [cvData, setCvData] = useState<any>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", title: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      { school: "", degree: "", field: "", graduationDate: "", gpa: "", honors: "" },
    ]);
  };

  const removeEducation = (index: number) => {
    if (educations.length > 1) {
      setEducations(educations.filter((_, i) => i !== index));
    }
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const validateForm = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !location.trim() || !title.trim()) {
      toast({
        title: "Missing Personal Information",
        description: "Please fill in all personal information fields",
        variant: "destructive",
      });
      return false;
    }

    if (!summary.trim() || summary.trim().length < 20) {
      toast({
        title: "Professional Summary Required",
        description: "Please write a detailed professional summary (minimum 20 characters)",
        variant: "destructive",
      });
      return false;
    }

    for (const exp of experiences) {
      if (!exp.company.trim() || !exp.title.trim() || !exp.startDate.trim() || !exp.endDate.trim() || !exp.description.trim()) {
        toast({
          title: "Incomplete Work Experience",
          description: "Please complete all work experience entries",
          variant: "destructive",
        });
        return false;
      }
    }

    for (const edu of educations) {
      if (!edu.school.trim() || !edu.degree.trim() || !edu.graduationDate.trim()) {
        toast({
          title: "Incomplete Education",
          description: "Please complete all education entries (school, degree, graduation date required)",
          variant: "destructive",
        });
        return false;
      }
    }

    if (!skills.trim()) {
      toast({
        title: "Skills Required",
        description: "Please list your skills",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const generateCV = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const apiKey = "AIzaSyCxwL3FoaAZ0Raq-yBnz2fjQcTN4bEy1-s";

    const experienceText = experiences
      .map(
        (exp) =>
          `Company: ${exp.company}\nJob Title: ${exp.title}\nDuration: ${exp.startDate} to ${exp.endDate}\nDescription: ${exp.description}`
      )
      .join("\n\n");

    const educationText = educations
      .map(
        (edu) =>
          `School: ${edu.school}\nDegree: ${edu.degree}${edu.field ? `\nField: ${edu.field}` : ""}\nGraduation: ${edu.graduationDate}${
            edu.gpa ? `\nGPA: ${edu.gpa}` : ""
          }${edu.honors ? `\nHonors: ${edu.honors}` : ""}`
      )
      .join("\n\n");

    const templateInstructions = {
      classic: "Classic Professional - Focus on chronological order, traditional layout, maximum ATS compatibility",
      modern: "Modern Minimal - Contemporary design, strategic whitespace, clean minimalist layout",
      executive: "Executive - Premium, sophisticated, emphasize leadership and results",
    };

    const prompt = `You are an expert professional CV writer and designer. Your task is to create a polished, professionally formatted CV that impresses hiring managers.

CANDIDATE DATA:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Location: ${location}
Professional Title: ${title}

PROFESSIONAL SUMMARY:
${summary}

WORK EXPERIENCE:
${experienceText}

EDUCATION:
${educationText}

SKILLS:
${skills}

${certifications ? `CERTIFICATIONS:\n${certifications}\n` : ""}
${languages ? `LANGUAGES:\n${languages}\n` : ""}
${projects ? `PROJECTS:\n${projects}\n` : ""}

TEMPLATE STYLE: ${templateInstructions[template]}

INSTRUCTIONS:
Your job is to create a professional CV using the data above. Follow these rules:

1. Transform EACH job description into 3-4 compelling bullet points with:
   - Action verbs (Led, Built, Developed, Optimized, Architected, etc.)
   - Quantifiable metrics where possible (increased by X%, served Y users, reduced by Z%, etc.)
   - Focus on business impact, not just tasks
   - 15-20 words per bullet maximum
   - Start each with a strong action verb

2. Enhance the professional summary to be:
   - Compelling and specific (100-120 words)
   - Highlight unique value proposition
   - Include 1-2 key achievements or specialties
   - Professional, confident tone
   - Make it stand out

3. Organize skills into 3-4 logical categories:
   - Examples: Technical, Leadership, Languages, Soft Skills, Tools & Technologies, etc.
   - Group related skills together
   - List 3-8 skills per category

4. Format the ENTIRE response as VALID JSON ONLY (no other text, no markdown, no preamble):

{
  "header": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": ""
  },
  "summary": "",
  "experience": [
    {
      "company": "",
      "title": "",
      "dates": "",
      "bullets": ["", "", ""]
    }
  ],
  "education": [
    {
      "school": "",
      "degree": "",
      "field": "",
      "graduationDate": "",
      "gpa": ""
    }
  ],
  "skills": {
    "Category1": ["skill1", "skill2", "skill3"],
    "Category2": ["skill4", "skill5", "skill6"]
  }
}

CRITICAL: Return ONLY valid JSON. Do not include any other text, markdown, code fences, or explanation.`;

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: prompt,
      });

      const generatedText = response.text;

      if (!generatedText) {
        throw new Error("No response from AI");
      }

      // Clean and parse JSON
      let cleanJson = generatedText.trim();
      cleanJson = cleanJson.replace(/```json\n?/g, "").replace(/```\n?/g, "");
      const parsedCV = JSON.parse(cleanJson);

      setCvData(parsedCV);
      setView("preview");
      toast({
        title: "CV Generated Successfully!",
        description: "Your professional CV is ready",
      });
    } catch (error: any) {
      console.error("Error generating CV:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Could not generate CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("cv-preview");
    const opt = {
      margin: 0.5,
      filename: `${fullName.replace(/\s+/g, "_")}_CV.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const },
    };
    html2pdf().set(opt).from(element).save();
    toast({
      title: "PDF Downloaded",
      description: "Your CV has been downloaded as PDF",
    });
  };

  const downloadWord = async () => {
    if (!cvData) return;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: cvData.header.name,
              heading: HeadingLevel.HEADING_1,
              alignment: "center",
            }),
            new Paragraph({
              text: cvData.header.title,
              alignment: "center",
            }),
            new Paragraph({
              text: `${cvData.header.email} | ${cvData.header.phone} | ${cvData.header.location}`,
              alignment: "center",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "PROFESSIONAL SUMMARY",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({ text: cvData.summary }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "WORK EXPERIENCE",
              heading: HeadingLevel.HEADING_2,
            }),
            ...cvData.experience.flatMap((exp: any) => [
              new Paragraph({
                children: [
                  new TextRun({ text: exp.title, bold: true }),
                  new TextRun({ text: ` | ${exp.dates}` }),
                ],
              }),
              new Paragraph({ text: exp.company }),
              ...exp.bullets.map((bullet: string) => new Paragraph({ text: `• ${bullet}` })),
              new Paragraph({ text: "" }),
            ]),
            new Paragraph({
              text: "EDUCATION",
              heading: HeadingLevel.HEADING_2,
            }),
            ...cvData.education.flatMap((edu: any) => [
              new Paragraph({
                children: [
                  new TextRun({ text: edu.degree, bold: true }),
                  new TextRun({ text: ` | ${edu.graduationDate}` }),
                ],
              }),
              new Paragraph({ text: edu.school }),
              new Paragraph({ text: "" }),
            ]),
            new Paragraph({
              text: "SKILLS",
              heading: HeadingLevel.HEADING_2,
            }),
            ...Object.entries(cvData.skills).map(
              ([category, skills]: [string, any]) =>
                new Paragraph({ text: `${category}: ${skills.join(", ")}` })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${fullName.replace(/\s+/g, "_")}_CV.docx`);
    toast({
      title: "Word Document Downloaded",
      description: "Your CV has been downloaded as Word document",
    });
  };

  if (view === "landing") {
    return <LandingPage onGetStarted={() => setView("form")} />;
  }

  if (view === "preview" && cvData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <Button onClick={() => setView("form")} variant="outline" size="lg" className="gap-2">
              <Edit className="w-5 h-5" />
              Edit
            </Button>
            <Button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700 gap-2" size="lg">
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
            <Button onClick={downloadWord} className="bg-green-600 hover:bg-green-700 gap-2" size="lg">
              <FileText className="w-5 h-5" />
              Download Word
            </Button>
          </div>

          <CVPreview cvData={cvData} photoUrl={photoUrl} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-5xl font-bold text-primary">
              AI CV Builder
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Create a professional CV powered by Google Gemini AI
          </p>
        </div>

        {/* Form */}
        <Card className="p-8 shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateCV();
            }}
            className="space-y-8"
          >
            {/* Personal Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-card-foreground">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Francisco, CA"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="title">Professional Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Senior Full-Stack Developer"
                    required
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="mt-6">
                <Label>Profile Photo (Optional)</Label>
                <div className="mt-2 flex items-center gap-4">
                  {photoUrl ? (
                    <div className="relative">
                      <img
                        src={photoUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => setPhotoUrl("")}
                        className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-muted rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">Upload Photo</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Professional Summary *</h2>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write a detailed professional summary about yourself, your experience, and career goals..."
                rows={5}
                required
              />
            </div>

            {/* Work Experience */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-card-foreground">Work Experience *</h2>
                </div>
                <Button type="button" onClick={addExperience} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Experience
                </Button>
              </div>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <Card key={index} className="p-6 bg-muted/50">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-card-foreground">Experience #{index + 1}</h3>
                      {experiences.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Company Name *</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          placeholder="Acme Corp"
                          required
                        />
                      </div>
                      <div>
                        <Label>Job Title *</Label>
                        <Input
                          value={exp.title}
                          onChange={(e) => updateExperience(index, "title", e.target.value)}
                          placeholder="Senior Developer"
                          required
                        />
                      </div>
                      <div>
                        <Label>Start Date *</Label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                          placeholder="Jan 2020"
                          required
                        />
                      </div>
                      <div>
                        <Label>End Date *</Label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                          placeholder="Present"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Job Description *</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(index, "description", e.target.value)}
                          placeholder="Detailed job description - what did you do, accomplish, and achieve?"
                          rows={4}
                          required
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-card-foreground">Education *</h2>
                </div>
                <Button type="button" onClick={addEducation} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Education
                </Button>
              </div>
              <div className="space-y-4">
                {educations.map((edu, index) => (
                  <Card key={index} className="p-6 bg-muted/50">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-card-foreground">Education #{index + 1}</h3>
                      {educations.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>School/University *</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => updateEducation(index, "school", e.target.value)}
                          placeholder="Stanford University"
                          required
                        />
                      </div>
                      <div>
                        <Label>Degree *</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="Bachelor of Science"
                          required
                        />
                      </div>
                      <div>
                        <Label>Field of Study</Label>
                        <Input
                          value={edu.field}
                          onChange={(e) => updateEducation(index, "field", e.target.value)}
                          placeholder="Computer Science"
                        />
                      </div>
                      <div>
                        <Label>Graduation Date *</Label>
                        <Input
                          value={edu.graduationDate}
                          onChange={(e) => updateEducation(index, "graduationDate", e.target.value)}
                          placeholder="May 2020"
                          required
                        />
                      </div>
                      <div>
                        <Label>GPA</Label>
                        <Input
                          value={edu.gpa}
                          onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                          placeholder="3.8/4.0"
                        />
                      </div>
                      <div>
                        <Label>Honors/Achievements</Label>
                        <Input
                          value={edu.honors}
                          onChange={(e) => updateEducation(index, "honors", e.target.value)}
                          placeholder="Summa Cum Laude"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-card-foreground">Skills *</h2>
              </div>
              <Textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="List your skills (comma-separated or one per line)"
                rows={3}
                required
              />
            </div>

            {/* Optional Sections */}
            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Additional Information (Optional)</h2>
              <div className="space-y-4">
                <div>
                  <Label>Certifications</Label>
                  <Textarea
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    placeholder="AWS Certified Solutions Architect, PMP"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Languages</Label>
                  <Textarea
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="English (Native), Spanish (Fluent)"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Projects/Portfolio</Label>
                  <Textarea
                    value={projects}
                    onChange={(e) => setProjects(e.target.value)}
                    placeholder="Personal website: example.com, GitHub: github.com/username"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">🎨 CV Template Style</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    template === "classic"
                      ? "border-primary border-2 bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => setTemplate("classic")}
                >
                  <h3 className="font-bold text-lg mb-2">Classic Professional</h3>
                  <p className="text-sm text-muted-foreground">Traditional, ATS-friendly</p>
                  <p className="text-xs text-muted-foreground mt-2">Good for corporate jobs</p>
                </Card>
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    template === "modern"
                      ? "border-primary border-2 bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => setTemplate("modern")}
                >
                  <h3 className="font-bold text-lg mb-2">Modern Minimal</h3>
                  <p className="text-sm text-muted-foreground">Contemporary, clean design</p>
                  <p className="text-xs text-muted-foreground mt-2">Good for creative/tech roles</p>
                </Card>
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    template === "executive"
                      ? "border-primary border-2 bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => setTemplate("executive")}
                >
                  <h3 className="font-bold text-lg mb-2">Executive</h3>
                  <p className="text-sm text-muted-foreground">Premium, achievement-focused</p>
                  <p className="text-xs text-muted-foreground mt-2">Good for leadership positions</p>
                </Card>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating your CV...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate My CV with AI
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Index;
