import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import LandingPage from "@/components/LandingPage";
import { EmailSignupModal } from "@/components/EmailSignupModal";
import { ImageEditor } from "@/components/ImageEditor";
import { ColorCustomizer, SharePanel, type CustomizationOptions } from "@/components/Customization";
import RefineDialog from "@/components/RefineDialog";
import { JobTweakDialog, type TweakResult } from "@/components/JobTweakDialog";
import { GenerationDialog, GenerationAnimation, SaveDataDialog, LoadDataDialog, DownloadAnimation } from "@/components/GenerationFlow";
import { SettingsPanel, type SavedCVData } from "@/components/SettingsPanel";
import { templates, templateOptions, type TemplateType, type CVData as TemplateCVData } from "@/components/CVTemplates";
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
  Target,
  Palette,
  Image as ImageIcon,
  Share2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
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
  const [view, setView] = useState<"landing" | "form" | "preview" | "settings">("landing");
  const [loading, setLoading] = useState(false);
  
  // Email signup state
  const [showEmailSignup, setShowEmailSignup] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [generationsUsedToday, setGenerationsUsedToday] = useState(0);
  const GENERATIONS_PER_DAY = 5;

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [certifications, setCertifications] = useState("");
  const [languages, setLanguages] = useState("");
  const [projects, setProjects] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [template, setTemplate] = useState<TemplateType>("modern");
  

  const [editingPhoto, setEditingPhoto] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Arial, sans-serif");
  const [customization, setCustomization] = useState<CustomizationOptions>({
    accentColor: "#3B82F6",
    backgroundColor: "#F0F9FF",
    textColor: "#1F2937",
    fontFamily: "Arial, sans-serif",
    tone: "formal",
  });
  const [layoutPreset, setLayoutPreset] = useState<"header" | "left" | "two-col" | "center" | "timeline">("header");
  const [photoPosition, setPhotoPosition] = useState<"right" | "left" | "top" | "none">("right");
  const [showSkillsBg, setShowSkillsBg] = useState(false);
  const [sectionOrder, setSectionOrder] = useState<string[]>(["summary", "experience", "education", "skills"]);

  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canCustomizeColors, setCanCustomizeColors] = useState(true);
  const [showSaveDataDialog, setShowSaveDataDialog] = useState(false);
  const [showLoadDataDialog, setShowLoadDataDialog] = useState(false);
  const [savedDataList, setSavedDataList] = useState<SavedCVData[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Controls for optional form sections visibility
  const [showSkillsSection, setShowSkillsSection] = useState(true);
  const [showCertificationsSection, setShowCertificationsSection] = useState(false);
  const [showLanguagesSection, setShowLanguagesSection] = useState(false);
  const [showProjectsSection, setShowProjectsSection] = useState(false);
  const [showHobbiesSection, setShowHobbiesSection] = useState(false);

  const [experiences, setExperiences] = useState<Experience[]>([
    { company: "", title: "", startDate: "", endDate: "", description: "" },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    { school: "", degree: "", field: "", graduationDate: "", gpa: "", honors: "" },
  ]);
  const [showExperienceSection, setShowExperienceSection] = useState(true);
  const [showEducationSection, setShowEducationSection] = useState(true);

  const [cvData, setCvData] = useState<TemplateCVData | null>(null);
  const [isRefiningSummary, setIsRefiningSummary] = useState(false);
  const [isRefiningSkills, setIsRefiningSkills] = useState(false);
  const [isRefiningExperiences, setIsRefiningExperiences] = useState<boolean[]>(
    experiences.map(() => false)
  );
  const [isRefiningCertifications, setIsRefiningCertifications] = useState(false);
  const [isRefiningLanguages, setIsRefiningLanguages] = useState(false);
  const [isRefiningProjects, setIsRefiningProjects] = useState(false);
  const [refineDialogOpen, setRefineDialogOpen] = useState(false);
  const [refineTarget, setRefineTarget] = useState<{ type: string; index?: number } | null>(null);
  const [refineOriginal, setRefineOriginal] = useState<string>("");
  const [refineMode, setRefineMode] = useState<"custom" | "job">("custom");
  const [showTweakDialog, setShowTweakDialog] = useState(false);
  const [tweakJobDescription, setTweakJobDescription] = useState("");
  const [isTweaking, setIsTweaking] = useState(false);
  const [targetJobDescription, setTargetJobDescription] = useState("");
  const [showSavePersonalInfoDialog, setShowSavePersonalInfoDialog] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<"pdf" | "word" | "png" | null>(null);

  useEffect(() => {
    setIsRefiningExperiences(experiences.map(() => false));
  }, [experiences.length]);

  // Initialize email signup and generation tracking
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const signupDate = localStorage.getItem("signupDate");
    const generationsToday = localStorage.getItem("generationsUsedToday");
    const lastResetDate = localStorage.getItem("lastResetDate");
    
    // Check if it's a new day
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
      localStorage.setItem("lastResetDate", today);
      localStorage.setItem("generationsUsedToday", "0");
      setGenerationsUsedToday(0);
    } else if (generationsToday) {
      setGenerationsUsedToday(parseInt(generationsToday, 10));
    }

    if (savedEmail) {
      setUserEmail(savedEmail);
      setEmail(savedEmail);
    } else {
      // Show email signup modal on first visit
      setShowEmailSignup(true);
    }
  }, []);

  // Load saved CV data when component mounts and when form view is accessed
  useEffect(() => {
    if (view === "form") {
      const savedData = localStorage.getItem("saved_cv_data_list");
      if (savedData) {
        try {
          const dataList = JSON.parse(savedData);
          setSavedDataList(dataList);
          if (dataList.length > 0 && !fullName) {
            // Show load dialog only on first visit to form with saved data
            setShowLoadDataDialog(true);
          }
        } catch (err) {
          console.error("Failed to load saved data:", err);
        }
      }
    }
  }, [view, fullName]);

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
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

  const demoDataProfiles = {
    softwareEngineer: {
      fullName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      title: "Senior Full-Stack Developer",
      jobDescription: "We're seeking a Senior Full-Stack Developer with 5+ years experience to join our growing team. Must have expertise in React, Node.js, TypeScript, AWS, and microservices architecture. You'll lead development of enterprise applications, mentor junior developers, and drive technical decisions. Strong problem-solving skills and experience with CI/CD pipelines required. We value team collaboration and clean code practices.",
      summary: "Passionate and results-driven Full-Stack Developer with 6+ years of experience building scalable web applications and leading development teams. Expertise in React, Node.js, and cloud technologies. Proven track record of delivering high-impact projects that drive business growth and improve user experience. Strong problem-solver with excellent communication skills and a commitment to writing clean, maintainable code.",
      skills: "JavaScript, TypeScript, React, Node.js, Express, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, Git, CI/CD, REST APIs, GraphQL, Agile/Scrum, Team Leadership",
      experiences: [
        { company: "TechCorp Solutions", title: "Senior Full-Stack Developer", startDate: "Jan 2021", endDate: "Present", description: "Lead development of enterprise web applications serving 100K+ users. Architect and implement scalable microservices using Node.js and React. Mentor junior developers and conduct code reviews. Reduced application load time by 40% through optimization. Implemented CI/CD pipelines reducing deployment time by 60%." },
        { company: "StartupXYZ", title: "Full-Stack Developer", startDate: "Mar 2019", endDate: "Dec 2020", description: "Built and maintained customer-facing web applications using React and Node.js. Developed RESTful APIs serving mobile and web clients. Collaborated with design team to implement responsive UI components. Improved test coverage from 40% to 85%. Participated in agile development process and sprint planning." },
        { company: "Digital Innovations Inc", title: "Junior Developer", startDate: "Jun 2018", endDate: "Feb 2019", description: "Developed features for company website and internal tools. Fixed bugs and implemented new functionality based on user feedback. Worked with MongoDB and Express.js to build backend services. Learned modern development practices and version control with Git. Contributed to team documentation and knowledge base." }
      ],
      educations: [{ school: "University of California, Berkeley", degree: "Bachelor of Science in Computer Science", field: "Computer Science", graduationDate: "May 2018", gpa: "3.8", honors: "Magna Cum Laude, Dean's List" }],
      certifications: "AWS Certified Solutions Architect, MongoDB Certified Developer",
      languages: "English (Native), Spanish (Conversational)",
      projects: "Open-source contributor to React ecosystem, Built personal portfolio showcasing 10+ projects"
    },
    productManager: {
      fullName: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      title: "Senior Product Manager",
      jobDescription: "Looking for an experienced Product Manager to lead our mobile app division. 5+ years PM experience required. Must have strong analytical skills, experience with data-driven decision making, and proven ability to ship products. Experience with mobile platforms, user research, and cross-functional collaboration essential. Leadership experience and startup background preferred.",
      summary: "Strategic Product Manager with 7+ years of experience launching and scaling digital products. Expert in user research, data analytics, and cross-functional team leadership. Proven ability to identify market opportunities and drive product strategy that increases user engagement by 40% and revenue by $5M+. Passionate about solving complex problems through user-centered design and data-driven decision making.",
      skills: "Product Strategy, User Research, Data Analytics, SQL, Tableau, Figma, Jira, Roadmap Planning, Competitive Analysis, Go-to-Market Strategy, Agile, Team Leadership, Stakeholder Management, Market Research",
      experiences: [
        { company: "InnovateTech Inc", title: "Senior Product Manager", startDate: "Feb 2021", endDate: "Present", description: "Lead product strategy for mobile division across 3M+ active users. Increased monthly active users by 45% through data-driven feature prioritization. Collaborated with engineering, design, and marketing teams to launch 8 major features. Established OKR framework driving company-wide alignment. Managed $2M annual product budget." },
        { company: "CloudServices Corp", title: "Product Manager", startDate: "Jun 2019", endDate: "Jan 2021", description: "Owned enterprise SaaS product roadmap with 500+ enterprise customers. Conducted 50+ user interviews and identified key market gaps. Shipped API integrations increasing customer retention by 35%. Defined go-to-market strategy for 3 new product lines generating $8M revenue." },
        { company: "DigitalStart Ventures", title: "Associate Product Manager", startDate: "Jul 2018", endDate: "May 2019", description: "Analyzed user behavior data and contributed to feature prioritization. Assisted in market research and competitive analysis. Collaborated with designers to prototype new features. Tracked KPIs and presented insights to stakeholders." }
      ],
      educations: [{ school: "Stanford University", degree: "Bachelor of Science in Computer Science", field: "Computer Science", graduationDate: "Jun 2017", gpa: "3.7", honors: "Dean's List, Pi Sigma Alpha" }],
      certifications: "Reforge: Product Management, Pragmatic Marketing Certified",
      languages: "English (Native), Mandarin Chinese (Fluent)",
      projects: "Built product analytics dashboard used by 10+ companies, Created product strategy framework adopted across organization"
    },
    marketingManager: {
      fullName: "Jessica Martinez",
      email: "j.martinez@email.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      title: "Marketing Manager",
      jobDescription: "Seeking experienced Marketing Manager to lead brand and digital marketing initiatives. 4+ years marketing experience required. Must have expertise in digital marketing, content strategy, and campaign management. Experience with marketing analytics, SEO/SEM, and social media marketing essential. Creative thinker with strong project management skills.",
      summary: "Dynamic Marketing Manager with 6+ years of experience driving brand awareness and customer acquisition across digital channels. Proven expertise in developing integrated marketing campaigns that increase leads by 60% and reduce CAC by 30%. Data-driven marketer skilled in content strategy, performance marketing, and team leadership. Strong communicator with track record of collaborating with C-suite and cross-functional teams.",
      skills: "Digital Marketing, Content Strategy, SEO/SEM, Social Media Marketing, Google Analytics, HubSpot, Salesforce, Email Marketing, Marketing Automation, Copywriting, Brand Development, Project Management, Team Leadership, Campaign Management",
      experiences: [
        { company: "GrowthTech Solutions", title: "Marketing Manager", startDate: "Mar 2021", endDate: "Present", description: "Develop and execute integrated marketing strategy across 8 digital channels. Generated 150K+ qualified leads through paid and organic channels. Increased website traffic by 200% and improved conversion rate by 40%. Managed $500K annual marketing budget and led team of 4. Created content calendar resulting in 50K+ social media followers." },
        { company: "BrandForce Agency", title: "Digital Marketing Specialist", startDate: "Jan 2020", endDate: "Feb 2021", description: "Managed paid advertising campaigns across Google, Facebook, and LinkedIn for 20+ clients. Increased average ROAS by 3.5x through optimization and A/B testing. Created SEO strategy improving organic traffic by 150%. Developed monthly performance reports and client presentations." },
        { company: "StartupMarketing Co", title: "Marketing Coordinator", startDate: "Aug 2018", endDate: "Dec 2019", description: "Assisted in campaign execution and content creation. Managed social media accounts and community engagement. Conducted market research and competitive analysis. Supported email marketing campaigns with 18% average open rate." }
      ],
      educations: [{ school: "University of Southern California", degree: "Bachelor of Arts in Marketing", field: "Marketing", graduationDate: "May 2018", gpa: "3.6", honors: "Cum Laude" }],
      certifications: "Google Analytics Certified, HubSpot Inbound Marketing Certified",
      languages: "English (Native), Spanish (Fluent)",
      projects: "Created viral marketing campaign reaching 2M+ impressions, Developed personal branding strategy for 5 founders"
    },
    designer: {
      fullName: "Alex Rivera",
      email: "alex.rivera@design.com",
      phone: "+1 (555) 345-7890",
      location: "Austin, TX",
      title: "Senior UX/UI Designer",
      jobDescription: "Looking for Senior UX/UI Designer to lead design for our mobile and web products. 5+ years design experience required. Must have strong portfolio demonstrating user research and design thinking. Experience with design systems, prototyping, and user testing essential. Figma expertise and knowledge of accessibility standards required.",
      summary: "Talented and detail-oriented Senior UX/UI Designer with 6+ years of experience creating beautiful, intuitive digital experiences. Specialized in user research, interaction design, and design systems that improve user satisfaction by 50%. Expert in design thinking methodology and accessibility standards. Proven ability to collaborate with product and engineering teams to ship products users love.",
      skills: "UX/UI Design, Figma, Adobe XD, Prototyping, Wireframing, User Research, User Testing, Information Architecture, Design Systems, Interaction Design, Visual Design, CSS, JavaScript, Accessibility (WCAG), Design Thinking",
      experiences: [
        { company: "DesignForward Studios", title: "Senior UX/UI Designer", startDate: "Jun 2021", endDate: "Present", description: "Lead design for 3 major product lines used by 500K+ users. Created comprehensive design system improving design-to-development time by 50%. Conducted 40+ user interviews and usability tests informing design decisions. Mentored team of 2 junior designers. Collaborated with product and engineering on accessibility compliance achieving WCAG AA standard." },
        { company: "CreativeHub Agency", title: "UX/UI Designer", startDate: "Feb 2020", endDate: "May 2021", description: "Designed mobile and web applications for 15+ clients across various industries. Created wireframes, prototypes, and high-fidelity mockups in Figma. Conducted user research and usability testing sessions. Improved user satisfaction scores by 35% through iterative design improvements." },
        { company: "StartupDesign Lab", title: "Junior Designer", startDate: "Aug 2018", endDate: "Jan 2020", description: "Supported design team on multiple projects. Created UI components and design mockups. Learned design best practices and user-centered design principles. Collaborated with developers on design implementation and QA." }
      ],
      educations: [{ school: "School of Visual Arts", degree: "BFA in Interaction Design", field: "Design", graduationDate: "May 2018", gpa: "3.9", honors: "Honors Graduate" }],
      certifications: "Google UX Design Certificate, Nielsen Norman Group UX Research Certification",
      languages: "English (Native), Portuguese (Conversational)",
      projects: "Redesigned mobile app increasing user retention by 40%, Created design system used by 30+ designers"
    },
    dataScientist: {
      fullName: "Dr. Priya Sharma",
      email: "p.sharma@email.com",
      phone: "+1 (555) 456-8901",
      location: "Boston, MA",
      title: "Senior Data Scientist",
      jobDescription: "Seeking Senior Data Scientist to lead ML initiatives. PhD or 5+ years industry experience required. Must have strong statistics background and experience with Python, SQL, and ML frameworks. Experience with deep learning, recommendation systems, or NLP preferred. Leadership and communication skills essential.",
      summary: "Accomplished Data Scientist with PhD in Statistics and 7+ years of experience building machine learning models that drive business impact. Expert in statistical modeling, predictive analytics, and deep learning. Proven track record developing recommendation systems increasing revenue by $12M+ and ML models improving operational efficiency by 45%. Strong communicator skilled at translating complex analysis into actionable insights for non-technical stakeholders.",
      skills: "Python, R, SQL, Machine Learning, TensorFlow, PyTorch, Scikit-learn, Statistics, A/B Testing, Deep Learning, NLP, Computer Vision, Data Visualization, Tableau, AWS, Spark, Git",
      experiences: [
        { company: "DataIntel Corp", title: "Senior Data Scientist", startDate: "Sep 2020", endDate: "Present", description: "Lead ML team of 4 building predictive models and recommendation systems. Developed personalization engine increasing user engagement by 50% and revenue by $8M. Built real-time fraud detection system reducing fraud losses by 70%. Established ML best practices and model governance framework. Published 3 papers on novel ML approaches." },
        { company: "AnalyticsPlus Inc", title: "Data Scientist", startDate: "Jan 2019", endDate: "Aug 2020", description: "Developed machine learning models for customer churn prediction (92% accuracy). Built recommendation system generating 20% of company revenue. Conducted A/B tests and statistical analyses informing business decisions. Created data pipelines processing 100M+ records daily." },
        { company: "Research Institute", title: "Data Analyst", startDate: "Jun 2017", endDate: "Dec 2018", description: "Analyzed complex datasets and built statistical models. Collaborated with researchers on publications. Developed Python scripts for data processing and visualization. Mentored interns on statistical methods and coding practices." }
      ],
      educations: [{ school: "MIT", degree: "PhD in Statistics", field: "Statistics", graduationDate: "Jun 2017", gpa: "4.0", honors: "With Distinction" }],
      certifications: "Cloudera Certified Spark and Hadoop Developer, Deep Learning Specialization (Coursera)",
      languages: "English (Native), Hindi (Native), French (Conversational)",
      projects: "Published 8 peer-reviewed papers on machine learning, Developed open-source ML library with 10K+ GitHub stars"
    }
  };

  const fillDemoData = (profileType: keyof typeof demoDataProfiles = "softwareEngineer") => {
    const profile = demoDataProfiles[profileType];
    setFullName(profile.fullName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setLocation(profile.location);
    setTitle(profile.title);
    setJobDescription(profile.jobDescription);
    setSummary(profile.summary);
    setSkills(profile.skills);
    setExperiences(profile.experiences);
    setEducations(profile.educations);
    setCertifications(profile.certifications);
    setLanguages(profile.languages);
    setProjects(profile.projects);
    toast({
      title: "Demo Data Loaded",
      description: `${profileType === "softwareEngineer" ? "Software Engineer" : profileType === "productManager" ? "Product Manager" : profileType === "marketingManager" ? "Marketing Manager" : profileType === "designer" ? "Designer" : "Data Scientist"} profile loaded. Click 'Generate My CV' to continue.`,
    });
  };

  const savePersonalInfoToSettings = () => {
    const personalInfo = {
      fullName,
      title,
      email,
      phone,
      location,
      photoUrl: photoUrl || "",
    };
    localStorage.setItem("savedPersonalInfo", JSON.stringify(personalInfo));
    toast({
      title: "Personal Info Saved",
      description: "Your personal information has been saved to Settings. You can load it anytime.",
    });
  };

  const generateCV = async () => {
    // Check generation limit
    if (generationsUsedToday >= GENERATIONS_PER_DAY) {
      toast({
        title: "Daily Limit Reached",
        description: `You've used all ${GENERATIONS_PER_DAY} generations for today. Come back tomorrow for more!`,
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setIsGenerating(true);
    setShowGenerationDialog(false);
    setCanCustomizeColors(false);

    // Generate using local input fields (no longer calling Gemini for full CV generation)

    // Simulate minimum animation time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Not calling the Gemini API for full CV generation

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

    const templateInstructions: Record<TemplateType, string> = {
      modern: "Modern - Clean, contemporary design with bold headers and accent colors",
      classic: "Classic - Traditional, chronological, maximum ATS compatibility",
      creative: "Creative - Artistic, vibrant with visual elements",
      executive: "Executive - Premium, sophisticated, emphasize leadership",
      minimal: "Minimal - Ultra-clean, minimalist, whitespace-focused",
      tech: "Tech - Modern dark theme for technical professionals",
      corporate: "Corporate - Formal, structured, professional tone",
      elegant: "Elegant - Sophisticated, refined, centered layout",
      dynamic: "Dynamic - Bold, energetic with side panels",
      artistic: "Artistic - Visual, creative with gradient elements",
      gradient: "Gradient - Multi-color gradient design with modern flair",
      retro: "Retro - Vintage-inspired design with classic typography",
      flat: "Flat - Flat design with colorful blocks and minimal depth",
      cyberpunk: "Cyberpunk - Dark, futuristic design with neon accents",
      pastel: "Pastel - Soft colors with gentle, approachable aesthetic",
      professionalBlue: "Professional Blue - Corporate blue-themed design",
      modernGradient: "Modern Gradient - Contemporary gradient backgrounds",
      vertical: "Vertical - Column-based layout with sidebar design",
      minimalist: "Minimalist - Extremely minimal design with maximum whitespace and typography focus",
      boldAccent: "Bold Accent - High contrast with strong accent color on left side",
      sidebarDark: "Sidebar Dark - Modern dark sidebar layout with detailed contact panel",
      neonFuture: "Neon Future - Bright neon colors with dark background, futuristic feel",
      magazine: "Magazine - Editorial magazine-style layout with large typography",
      cleanCard: "Clean Card - Modular card-based design with clean sections",
      progressive: "Progressive - Linear timeline design for career progression",
      elegantGold: "Elegant Gold - Luxury design with gold accents and formal layout",
      techMinimal: "Tech Minimal - Monospace typography for tech professionals",
      splashCreative: "Splash Creative - Colorful scattered design with vibrant elements",
      profileFocus: "Profile Focus - Large profile photo emphasis with three-column layout",
      infographic: "Infographic - Data visualization style with bullet points",
      geometric: "Geometric - Bold geometric shapes and patterns with sidebar",
      luxuryDark: "Luxury Dark - Premium dark theme with serif typography and gold accents",
    };

      // No longer sending entire dataset to Gemini. Build CV from local data.

    try {
      // Simple local generation - convert form state into cvData for preview
      const parsedExperience = experiences.map((exp) => {
        const lines = exp.description.split(/\n|\.\s/).map((l) => l.trim()).filter(Boolean).slice(0, 3);
        return {
          company: exp.company,
          title: exp.title,
          dates: `${exp.startDate} - ${exp.endDate}`,
          bullets: lines,
        };
      });

      const parsedEducation = educations.map((edu) => ({
        school: edu.school,
        degree: edu.degree,
        field: edu.field,
        graduationDate: edu.graduationDate,
        gpa: edu.gpa,
      }));

      const skillList = skills.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);

      const builtCV: TemplateCVData = {
        header: { name: fullName || "", title: title || "", email: email || "", phone: phone || "", location: location || "" },
        summary: summary,
        experience: parsedExperience,
        education: parsedEducation,
        skills: { Skills: skillList },
      };

      setCvData(builtCV);
      
      // Increment generation counter
      const newCount = generationsUsedToday + 1;
      setGenerationsUsedToday(newCount);
      localStorage.setItem("generationsUsedToday", newCount.toString());
      
      setView("preview");
      setShowSaveDataDialog(true);
      toast({ title: "CV Generated Locally", description: "Using your edited text and refinements." });
    } catch (error: any) {
      console.error("Error generating CV:", error);
      toast({ title: "Generation Failed", description: error.message || "Could not generate CV. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  // Helper to call Gemini for refine actions
  const callRefineAI = async (prompt: string) => {
    const savedApiKey = localStorage.getItem("gemini_api_key");
    const apiKey = savedApiKey || "";
    try {
      if (!apiKey) throw new Error("API key not configured. Please go to Settings and add your Gemini API key.");
      if (apiKey.trim().length === 0) throw new Error("API key is empty. Please go to Settings and add your Gemini API key.");
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
      if (!response || !response.text) throw new Error("Empty response from AI. Please try again.");
      return response.text || "";
    } catch (err) {
      console.error("Refine AI error", err);
      throw err;
    }
  };

  const refineSummary = async () => {
    setIsRefiningSummary(true);
    try {
      const prompt = `Please refine the following professional summary for grammar, flow, and conciseness. Keep it professional and clear, no more than 120 words. Return ONLY the refined paragraph with no additional commentary.\n\n${summary}`;
      const result = await callRefineAI(prompt);
      if (result) setSummary(result.trim());
      toast({ title: "Summary Refined", description: "Your professional summary has been refined by Gemini AI." });
    } catch (err: any) {
      toast({ title: "Refine Failed", description: err.message || "Could not refine summary.", variant: "destructive" });
    } finally {
      setIsRefiningSummary(false);
    }
  };

  const refineSkills = async () => {
    setIsRefiningSkills(true);
    try {
      const prompt = `Refine the following skills list into a concise, comma-separated list of key skills (no more than 12 items). Keep core technical skills and remove duplicates. Return only the refined list as comma-separated text.\n\n${skills}`;
      const result = await callRefineAI(prompt);
      if (result) setSkills(result.trim());
      toast({ title: "Skills Refined", description: "Your skills list has been refined by Gemini AI." });
    } catch (err: any) {
      toast({ title: "Refine Failed", description: err.message || "Could not refine skills.", variant: "destructive" });
    } finally {
      setIsRefiningSkills(false);
    }
  };

  const refineExperienceAt = async (index: number) => {
    setIsRefiningExperiences((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    try {
      const exp = experiences[index];
      const prompt = `Convert the following job description into 2-3 concise achievement-oriented bullet points. Use action verbs, quantifiable impact when possible, and keep each bullet under 20 words. Return only the bullet points separated by newlines.\n\n${exp.description}`;
      const result = await callRefineAI(prompt);
      if (result) {
        // Replace description with refined bullets
        const updated = [...experiences];
        updated[index] = { ...exp, description: result.trim() };
        setExperiences(updated);
      }
      toast({ title: "Experience Refined", description: `Experience #${index + 1} refined by Gemini AI.` });
    } catch (err: any) {
      toast({ title: "Refine Failed", description: err.message || "Could not refine experience.", variant: "destructive" });
    } finally {
      setIsRefiningExperiences((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

  const refineCertifications = async () => {
    setIsRefiningCertifications(true);
    try {
      const prompt = `Refine the following certifications text and return a concise comma-separated list: \n\n${certifications}`;
      const result = await callRefineAI(prompt);
      if (result) setCertifications(result.trim());
      toast({ title: "Certifications Refined" });
    } catch (err: any) {
      toast({ title: "Refine Failed", description: err.message || "Could not refine certifications.", variant: "destructive" });
    } finally {
      setIsRefiningCertifications(false);
    }
  };

  const refineLanguages = async () => {
    setIsRefiningLanguages(true);
    try {
      const prompt = `Refine the following languages text and return a concise comma-separated list: \n\n${languages}`;
      const result = await callRefineAI(prompt);
      if (result) setLanguages(result.trim());
      toast({ title: "Languages Refined" });
    } catch (err: any) {
      toast({ title: "Refine Failed", description: err.message || "Could not refine languages.", variant: "destructive" });
    } finally {
      setIsRefiningLanguages(false);
    }
  };

  const refineProjects = async () => {
    setIsRefiningProjects(true);
    try {
      const prompt = `Refine the following projects/portfolio text to be concise and impactful, return a brief text: \n\n${projects}`;
      const result = await callRefineAI(prompt);
      if (result) setProjects(result.trim());
      toast({ title: "Projects Refined" });
    } catch (err: any) {
      toast({ title: "Refine Failed", description: err.message || "Could not refine projects.", variant: "destructive" });
    } finally {
      setIsRefiningProjects(false);
    }
  };

  const openRefineDialog = (type: string, original: string, index?: number) => {
    setRefineTarget({ type, index });
    setRefineOriginal(original);
    setRefineDialogOpen(true);
  };

  // Preview the refinement by calling AI, returns 3 versions
  const previewRefine = async (instructions: string) => {
    // Ensure a global visual animation is shown while we call AI
    setIsGenerating(true);
    await new Promise((res) => setTimeout(res, 200));
    let fullPrompt = "";
    
    if (refineMode === "job" && targetJobDescription) {
      // Job-based refinement
      fullPrompt = `You are an expert content writer. I need you to refine the following text to better align with this job description: "${targetJobDescription}"

Additional context or focus points: "${instructions}"

Generate EXACTLY 3 different refined versions that highlight relevant experience and skills for this job. Each version should be distinct in style or approach but all should:
- Be tailored to the job requirements
- Maintain the core meaning and truth of the original
- Emphasize relevant skills and achievements

Original text: "${refineOriginal}"

Return ONLY valid JSON (no markdown, no code blocks, just raw JSON) in this exact format:
{
  "versions": [
    {
      "version": 1,
      "text": "First refined version here"
    },
    {
      "version": 2,
      "text": "Second refined version here"
    },
    {
      "version": 3,
      "text": "Third refined version here"
    }
  ]
}`;
    } else {
      // Custom prompt refinement
      fullPrompt = `You are an expert content writer. I need you to refine the following text based on this instruction: "${instructions}"

Generate EXACTLY 3 different refined versions that meet the instruction. Each version should be distinct in style or approach but all should maintain the core meaning.

Original text: "${refineOriginal}"

Return ONLY valid JSON (no markdown, no code blocks, just raw JSON) in this exact format:
{
  "versions": [
    {
      "version": 1,
      "text": "First refined version here"
    },
    {
      "version": 2,
      "text": "Second refined version here"
    },
    {
      "version": 3,
      "text": "Third refined version here"
    }
  ]
}`;
    }

    let responseText: string | null = null;
    try {
      responseText = await callRefineAI(fullPrompt);
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      const data = JSON.parse(jsonMatch[0]);
      return data.versions || [];
    } catch (err) {
      console.error("Failed to parse refinement versions:", err);
      throw new Error("Failed to generate refined versions. Please try again.");
    }
    finally {
      setIsGenerating(false);
    }
  };

  const applyRefinedText = async (result: string): Promise<void> => {
    if (!refineTarget) return;
    setLoading(true);
    try {
      // set loading flags per type
      if (refineTarget.type === 'summary') setIsRefiningSummary(true);
      if (refineTarget.type === 'skills') setIsRefiningSkills(true);
      if (refineTarget.type === 'certifications') setIsRefiningCertifications(true);
      if (refineTarget.type === 'languages') setIsRefiningLanguages(true);
      if (refineTarget.type === 'projects') setIsRefiningProjects(true);
      if (refineTarget.type === 'experience' && typeof refineTarget.index === 'number') {
        setIsRefiningExperiences((prev) => { const c = [...prev]; c[refineTarget.index!] = true; return c; });
      }
      const text = result.trim();
      if (text) {
        if (refineTarget.type === "summary") setSummary(text);
        if (refineTarget.type === "skills") setSkills(text);
        if (refineTarget.type === "certifications") setCertifications(text);
        if (refineTarget.type === "languages") setLanguages(text);
        if (refineTarget.type === "projects") setProjects(text);
        if (refineTarget.type === "hobbies") setHobbies(text);
        if (refineTarget.type === "experience" && typeof refineTarget.index === "number") {
          const idx = refineTarget.index;
          const updated = [...experiences];
          updated[idx] = { ...updated[idx], description: text };
          setExperiences(updated);
        }
        setRefineDialogOpen(false);
        toast({ title: "Refined", description: `${refineTarget.type} updated.` });
      }
    } catch (err: any) {
      toast({ title: "Refine Failed", description: err.message || "Could not refine.", variant: "destructive" });
    } finally {
      setLoading(false);
      // unset loading flags
      if (refineTarget?.type === 'summary') setIsRefiningSummary(false);
      if (refineTarget?.type === 'skills') setIsRefiningSkills(false);
      if (refineTarget?.type === 'certifications') setIsRefiningCertifications(false);
      if (refineTarget?.type === 'languages') setIsRefiningLanguages(false);
      if (refineTarget?.type === 'projects') setIsRefiningProjects(false);
      if (refineTarget?.type === 'experience' && typeof refineTarget.index === 'number') {
        setIsRefiningExperiences((prev) => { const c = [...prev]; c[refineTarget.index!] = false; return c; });
      }
    }
  };

  const tweakCVForNewJob = async (jobDesc: string): Promise<TweakResult[] | null> => {
    if (!jobDesc.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please provide a job title or job description",
        variant: "destructive",
      });
      return null;
    }

    try {
      const savedApiKey = localStorage.getItem("gemini_api_key");
      if (!savedApiKey) {
        toast({
          title: "API Key Required",
          description: "Please configure your Gemini API key in Settings",
          variant: "destructive",
        });
        return null;
      }

      const ai = new GoogleGenAI({ apiKey: savedApiKey });
      
      const tweakPrompt = `You are an expert CV writer. The user has an existing CV and wants to tailor it for a specific job.

Your task: Analyze the current CV and the target job, then suggest tweaks to specific CV sections to better match the job requirements.

Current CV Summary: 
${summary}

Current Experience (brief):
${experiences.map((exp) => `${exp.title} at ${exp.company}: ${exp.description.substring(0, 100)}`).join("\n")}

Current Skills:
${skills}

Target Job Description:
${jobDesc}

Please return ONLY valid JSON (no markdown, no code blocks) in this exact format with 2-3 tweaked sections:
{
  "tweaks": [
    {
      "field": "summary",
      "original": "original summary text here",
      "tweaked": "tweaked summary that better matches the job requirements"
    },
    {
      "field": "skills",
      "original": "current skills list",
      "tweaked": "skills reordered and emphasized to match job requirements"
    },
    {
      "field": "experience",
      "original": "brief description of experience",
      "tweaked": "reworded to highlight relevant achievements for this role"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: tweakPrompt,
      });

      const responseText = response.text || "";
      
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const tweakResult = JSON.parse(jsonMatch[0]);
        return tweakResult.tweaks || [];
      }
      
      return [];
    } catch (err: any) {
      console.error("Tweak error:", err);
      toast({
        title: "Tweak Failed",
        description: err.message || "Could not generate tweaks for this job",
        variant: "destructive",
      });
      return null;
    }
  };

  const applyJobTweaks = (tweaks: TweakResult[]) => {
    tweaks.forEach((tweak) => {
      if (tweak.field === "summary") setSummary(tweak.tweaked);
      if (tweak.field === "skills") setSkills(tweak.tweaked);
      if (tweak.field === "experience") {
        // Apply to first experience as example
        const updated = [...experiences];
        if (updated.length > 0) {
          updated[0] = { ...updated[0], description: tweak.tweaked };
          setExperiences(updated);
        }
      }
    });
    
    toast({
      title: "CV Updated for New Job",
      description: "Your CV sections have been tailored to match the job requirements. Review and make any final adjustments.",
    });
  };
  const downloadPDF = async () => {
    setDownloadingFormat("pdf");
    try {
      const element = document.getElementById("cv-preview");
      if (!element) {
        toast({
          title: "Error",
          description: "CV preview not found",
          variant: "destructive",
        });
        return;
      }

      // Simulate processing time for animation
      await new Promise(resolve => setTimeout(resolve, 800));

      const opt = {
        margin: 0,
        filename: `${fullName.replace(/\s+/g, "_")}_CV.pdf`,
        image: { type: "png" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: null,
          allowTaint: true,
        },
        pagebreak: { mode: ["css", "legacy"] },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as const,
          compress: true,
        },
      };
      
      html2pdf().set(opt).from(element).save();
      toast({
        title: "✓ PDF Downloaded",
        description: "Your professional CV is ready",
      });
    } finally {
      setDownloadingFormat(null);
    }
  };

  const downloadWord = async () => {
    setDownloadingFormat("word");
    try {
      if (!cvData) return;

      // Simulate processing time for animation
      await new Promise(resolve => setTimeout(resolve, 1000));

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
        title: "✓ Word Document Downloaded",
        description: "Your professional CV is ready",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download Word document",
        variant: "destructive",
      });
    } finally {
      setDownloadingFormat(null);
    }
  };

  const downloadPNG = async () => {
    setDownloadingFormat("png");
    try {
      const element = document.getElementById("cv-preview");
      if (!element) return;

      // Simulate processing time for animation
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${fullName.replace(/\s+/g, "_")}_CV.png`);
          toast({
            title: "✓ PNG Downloaded",
            description: "Your professional CV is ready",
          });
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download PNG image",
        variant: "destructive",
      });
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handleSaveData = (dataName: string) => {
    try {
      const newSavedData: SavedCVData = {
        id: Date.now().toString(),
        name: dataName,
        fullName,
        email,
        phone,
        location,
        title,
        photoUrl,
        summary,
        jobDescription,
        skills,
        certifications,
        languages,
        projects,
        experiences,
        educations,
        savedAt: new Date().toISOString(),
      };

      const savedDataList = JSON.parse(localStorage.getItem("saved_cv_data_list") || "[]");
      savedDataList.push(newSavedData);
      localStorage.setItem("saved_cv_data_list", JSON.stringify(savedDataList));

      setShowSaveDataDialog(false);
      toast({
        title: "Data Saved Successfully",
        description: `'${dataName}' has been saved. You can restore it anytime from Settings.`,
      });
    } catch (error) {
      toast({
        title: "Failed to Save",
        description: "Could not save your CV data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLoadData = async (data: SavedCVData) => {
    setIsGenerating(true);
    // small delay to ensure animation shows and avoid flicker
    await new Promise((res) => setTimeout(res, 350));
    setFullName(data.fullName);
    setEmail(data.email);
    setPhone(data.phone);
    setLocation(data.location);
    setTitle(data.title);
    setPhotoUrl(data.photoUrl);
    setSummary(data.summary);
    setJobDescription(data.jobDescription);
    setSkills(data.skills);
    setCertifications(data.certifications);
    setLanguages(data.languages);
    setProjects(data.projects);
    setExperiences(data.experiences);
    setEducations(data.educations);
    setView("form");
    setCanCustomizeColors(true);
    setCvData(null);
    toast({
      title: "Data Loaded",
      description: `'${data.name}' has been loaded. You can now edit and regenerate.`,
    });
    // Keep animation visible for a fraction for UX
    await new Promise((res) => setTimeout(res, 250));
    setIsGenerating(false);
  };

  if (view === "landing") {
    return (
      <>
        <LandingPage onGetStarted={() => setView("form")} onSettings={() => setView("settings")} />
        <EmailSignupModal
          open={showEmailSignup}
          onClose={() => setShowEmailSignup(false)}
          onSubmit={(email) => {
            setUserEmail(email);
            setEmail(email);
          }}
        />
      </>
    );
  }

  if (view === "settings") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">AICV Builder</h1>
              <Button
                onClick={() => setView("landing")}
                variant="outline"
                className="gap-2"
              >
                ← Back to App
              </Button>
            </div>
          </div>
        </div>
            {/* Add Section Selector */}
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Plus className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Add Section</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">Pick a section to add to your CV. The form will scroll to the section once added.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button type="button" onClick={() => { setShowExperienceSection(true); setTimeout(() => scrollToSection('work-experience'), 200); }} className="py-3 px-3 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-300 hover:border-purple-500 hover:shadow-md transition font-medium text-purple-900">💼 Work Experience</button>
                <button type="button" onClick={() => { setShowEducationSection(true); setTimeout(() => scrollToSection('education'), 200); }} className="py-3 px-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-300 hover:border-blue-500 hover:shadow-md transition font-medium text-blue-900">🎓 Education</button>
                <button type="button" onClick={() => { setShowSkillsSection(true); setTimeout(() => scrollToSection('skills'), 200); }} className="py-3 px-3 rounded-lg bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300 hover:border-green-500 hover:shadow-md transition font-medium text-green-900">⚡ Skills</button>
                <button type="button" onClick={() => { setShowCertificationsSection(true); setTimeout(() => scrollToSection('certifications'), 200); }} className="py-3 px-3 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-300 hover:border-yellow-500 hover:shadow-md transition font-medium text-yellow-900">🏆 Certifications</button>
                <button type="button" onClick={() => { setShowLanguagesSection(true); setTimeout(() => scrollToSection('languages'), 200); }} className="py-3 px-3 rounded-lg bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-300 hover:border-red-500 hover:shadow-md transition font-medium text-red-900">🌐 Languages</button>
                <button type="button" onClick={() => { setShowProjectsSection(true); setTimeout(() => scrollToSection('projects'), 200); }} className="py-3 px-3 rounded-lg bg-gradient-to-br from-pink-100 to-pink-50 border-2 border-pink-300 hover:border-pink-500 hover:shadow-md transition font-medium text-pink-900">🚀 Projects</button>
                <button type="button" onClick={() => { setShowHobbiesSection(true); setTimeout(() => scrollToSection('hobbies'), 200); }} className="py-3 px-3 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 border-2 border-indigo-300 hover:border-indigo-500 hover:shadow-md transition font-medium text-indigo-900">🎨 Hobbies</button>
                <button type="button" onClick={() => { setShowCertificationsSection(true); setTimeout(() => scrollToSection('additional-info'), 200); }} className="py-3 px-3 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 border-2 border-cyan-300 hover:border-cyan-500 hover:shadow-md transition font-medium text-cyan-900">📝 Additional</button>
              </div>
            </div>
        <div className="pt-20">
          <SettingsPanel 
            onApiKeyChange={(key) => {
              if (key) {
                toast({
                  title: "API Key Updated",
                  description: "Your Google Gemini API key has been saved.",
                });
              }
            }}
            onLoadData={handleLoadData}
          />
        </div>
      </div>
    );
  }

  if (view === "preview" && cvData) {
    const SelectedTemplate = templates[template];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
        {editingPhoto && (
          <ImageEditor
            imageUrl={photoUrl}
            onSave={(editedUrl) => {
              setPhotoUrl(editedUrl);
              setEditingPhoto(false);
              toast({ title: "Photo Updated", description: "Your profile picture has been edited." });
            }}
            onCancel={() => setEditingPhoto(false)}
          />
        )}

        <div className="max-w-7xl mx-auto">
          {/* Action Buttons */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            <Button onClick={() => setView("form")} variant="outline" size="sm" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button onClick={() => setEditingPhoto(true)} variant="outline" size="sm" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Edit Photo
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main CV Preview */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* CV Preview */}
              <div 
                id="cv-preview-container"
                className={`bg-white rounded-lg shadow-lg p-4 overflow-auto max-h-[75vh] ${photoPosition === 'left' ? 'photo-left' : 'photo-right'}`}
                style={{
                  '--cv-accent': customization.accentColor,
                  '--cv-text': customization.textColor,
                  '--cv-background': customization.backgroundColor,
                  fontFamily: fontFamily || customization.fontFamily || "Arial, sans-serif",
                } as React.CSSProperties}
              >
                <style>{`
                  #cv-preview-container.photo-left #cv-preview img { float:left; margin-right: 0.75rem; }
                  #cv-preview-container.photo-right #cv-preview img { float:none; margin: 0; }
                `}</style>
                
                <style>{`
                  #cv-preview {
                    line-height: 1.4;
                    color: ${customization.textColor};
                    font-family: ${customization.fontFamily || "Arial, sans-serif"};
                  }
                  #cv-preview h1, #cv-preview h2, #cv-preview h3 {
                    margin-top: 0.5rem;
                    margin-bottom: 0.25rem;
                  }
                  #cv-preview p {
                    margin: 0.25rem 0;
                  }
                  #cv-preview ul, #cv-preview ol {
                    margin: 0.25rem 0;
                    padding-left: 1.5rem;
                  }
                  #cv-preview li {
                    margin: 0.1rem 0;
                  }
                  @media print {
                    #cv-preview {
                      box-shadow: none;
                      border: none;
                    }
                  }
                `}</style>
                <SelectedTemplate 
                  cvData={cvData} 
                  photoUrl={photoUrl}
                  colors={{ accent: customization.accentColor, background: '#ffffff', text: customization.textColor }}
                  layout={layoutPreset}
                  fontFamily={fontFamily}
                  photoPosition={photoPosition}
                  showSkillsBg={showSkillsBg}
                  sectionOrder={sectionOrder}
                />
              </div>
            </div>

            {/* Customization & Share Sidebar */}
            <div className={`lg:col-span-1 order-1 lg:order-2 transition-all duration-300 ${sidebarOpen ? 'w-full' : 'w-0 lg:w-auto'}`}>
              <div className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[75vh] transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
                {/* Header with Toggle Button */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-sm font-bold text-gray-900">Customize</h2>
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1 hover:bg-gray-100 rounded transition lg:hidden"
                    title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                  >
                    {sidebarOpen ? (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-4 space-y-6">
                  {/* Template Selector */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Template</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {templateOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setTemplate(opt.id)}
                          className={`p-2 rounded text-xs font-medium transition ${
                            template === opt.id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Customizer */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Customize Colors
                    </h3>
                    {!canCustomizeColors && (
                      <p className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded p-2 mb-3">
                        Colors are locked after generation. Go back to edit form to change them.
                      </p>
                    )}
                    <ColorCustomizer
                      current={customization}
                      onCustomizationChange={canCustomizeColors ? setCustomization : undefined}
                    />
                  </div>

                  {/* Share Panel */}
                  <div className="border-t pt-4 space-y-4">
                    <SharePanel
                      fileName={fullName}
                      onDownloadPDF={downloadPDF}
                      onDownloadWord={downloadWord}
                      onDownloadPNG={downloadPNG}
                      onShareLink={() => navigator.clipboard.writeText(window.location.href)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Tweak Dialog */}
            <JobTweakDialog
              isOpen={showTweakDialog}
              onClose={() => {
                setShowTweakDialog(false);
                setTweakJobDescription("");
              }}
              jobDescription={tweakJobDescription}
              cvData={{ summary, experience: experiences.map(e => e.description).join(" "), skills }}
              onConfirm={tweakCVForNewJob}
              onApplyTweaks={applyJobTweaks}
            />

            {/* Sidebar Toggle Button for Mobile */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="fixed bottom-6 right-6 lg:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                title="Open sidebar"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center gap-3 flex-1">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              <h1 className="text-5xl font-bold text-primary">
                AI CV Builder
              </h1>
            </div>
            <ThemeToggle />
          </div>
          <p className="text-muted-foreground text-lg">
            Create a professional CV powered by Google Gemini AI
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
              <Button 
                type="button"
                onClick={() => fillDemoData("softwareEngineer")}
                variant="outline" 
                size="lg"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Engineer Demo
              </Button>
              <Button 
                type="button"
                onClick={() => fillDemoData("productManager")}
                variant="outline" 
                size="lg"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                PM Demo
              </Button>
              <Button 
                type="button"
                onClick={() => fillDemoData("marketingManager")}
                variant="outline" 
                size="lg"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Marketing Demo
              </Button>
              <Button 
                type="button"
                onClick={() => fillDemoData("designer")}
                variant="outline" 
                size="lg"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Designer Demo
              </Button>
              <Button 
                type="button"
                onClick={() => fillDemoData("dataScientist")}
                variant="outline" 
                size="lg"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Data Scientist Demo
              </Button>
            </div>
          </div>
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

                <div className="md:col-span-2">
                  <Label>Section Order</Label>
                  <div className="mt-2 space-y-2">
                    {sectionOrder.map((sec, idx) => (
                      <div key={sec} className="flex items-center gap-2">
                        <span className="font-semibold w-32">{sec}</span>
                        <div className="flex gap-2">
                          <button disabled={idx===0} onClick={() => {
                            const next = [...sectionOrder];
                            [next[idx-1], next[idx]] = [next[idx], next[idx-1]];
                            setSectionOrder(next);
                          }} className="btn">↑</button>
                          <button disabled={idx===sectionOrder.length-1} onClick={() => {
                            const next = [...sectionOrder];
                            [next[idx+1], next[idx]] = [next[idx], next[idx+1]];
                            setSectionOrder(next);
                          }} className="btn">↓</button>
                        </div>
                      </div>
                    ))}
                  </div>
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

                {/* Font Style Selection */}
                <div className="md:col-span-2">
                  <Label htmlFor="fontFamily">Text Font</Label>
                  <select
                    id="fontFamily"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="Arial, sans-serif">Arial (Modern)</option>
                    <option value="Inter, system-ui, -apple-system, 'Segoe UI', Roboto">Inter (Clean)</option>
                    <option value="'Times New Roman', serif">Times New Roman (Classic)</option>
                    <option value="'Garamond', serif">Garamond (Elegant)</option>
                    <option value="'Courier New', monospace">Courier New (Monospace)</option>
                    <option value="'Georgia', serif">Georgia (Readable)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Choose your preferred font family for the CV</p>
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
            <div id="summary">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Professional Summary *</h2>
                <div className="flex items-center gap-2">
                  <Button type="button" size="sm" onClick={() => openRefineDialog('summary', summary)} disabled={isRefiningSummary || !summary.trim()} className="gap-2" title="Refine summary with Gemini AI">
                    {isRefiningSummary ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                    <span className="hidden sm:inline">Refine</span>
                  </Button>
                </div>
              </div>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write a detailed professional summary about yourself, your experience, and career goals..."
                rows={5}
                required
              />
            </div>

            {/* Target Job Description (Optional) */}
            <div id="target-job" className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Target Job (Optional)</h2>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                Paste a job description to refine your CV sections to match specific job requirements
              </p>
              <Textarea
                value={targetJobDescription}
                onChange={(e) => setTargetJobDescription(e.target.value)}
                placeholder="Paste the full job description here (title, requirements, responsibilities, etc.). This helps us refine your CV to better match the job you're applying for."
                rows={4}
              />
              {targetJobDescription && (
                <p className="text-xs text-blue-700 mt-2">✓ Target job loaded - you can now use 'Target Job' mode when refining fields</p>
              )}
            </div>

            {/* Work Experience */}
            {showExperienceSection && (
            <div id="work-experience">
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
                                <div className="flex items-center justify-between">
                                  <Label>Job Description *</Label>
                                  <Button type="button" size="sm" onClick={() => openRefineDialog('experience', exp.description, index)} disabled={isRefiningExperiences[index] || !exp.description.trim()} className="gap-2" title="Refine this job description with Gemini AI">
                            {isRefiningExperiences[index] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                            <span className="hidden sm:inline">Refine</span>
                          </Button>
                        </div>
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
            )}

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
            {showSkillsSection && (
            <div id="skills">
                <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-card-foreground">Skills *</h2>
                <div>
                  <Button type="button" size="sm" onClick={() => openRefineDialog('skills', skills)} disabled={isRefiningSkills || !skills.trim()} className="ml-3 gap-2" title="Refine skills with Gemini AI">
                    {isRefiningSkills ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                    <span className="hidden sm:inline">Refine</span>
                  </Button>
                </div>
              </div>
              <Textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="List your skills (comma-separated or one per line)"
                rows={3}
                required
              />
            </div>
            )}

            {/* Optional Sections placeholder - use the Add Section panel to show specific blocks */}

            {/* Optional Sections */}
            <div id="additional-info">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Additional Information (Optional)</h2>
              <div className="space-y-4">
                {showCertificationsSection && (
                <div id="certifications">
                  <div className="flex items-center justify-between">
                    <Label>Certifications</Label>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" onClick={() => openRefineDialog('certifications', certifications)} disabled={isRefiningCertifications || !certifications.trim()} className="gap-2" title="Refine certifications with Gemini AI">
                        {isRefiningCertifications ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                        <span className="hidden sm:inline">Refine</span>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setShowCertificationsSection(false)}>Remove</Button>
                    </div>
                  </div>
                  <Textarea
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    placeholder="AWS Certified Solutions Architect, PMP"
                    rows={2}
                  />
                </div>
                )}

                {showLanguagesSection && (
                <div id="languages">
                  <div className="flex items-center justify-between">
                    <Label>Languages</Label>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" onClick={() => openRefineDialog('languages', languages)} disabled={isRefiningLanguages || !languages.trim()} className="gap-2" title="Refine languages with Gemini AI">
                        {isRefiningLanguages ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                        <span className="hidden sm:inline">Refine</span>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setShowLanguagesSection(false)}>Remove</Button>
                    </div>
                  </div>
                  <Textarea
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="English (Native), Spanish (Fluent)"
                    rows={2}
                  />
                </div>
                )}

                {showProjectsSection && (
                <div id="projects">
                  <div className="flex items-center justify-between">
                    <Label>Projects/Portfolio</Label>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" onClick={() => openRefineDialog('projects', projects)} disabled={isRefiningProjects || !projects.trim()} className="gap-2" title="Refine projects with Gemini AI">
                        {isRefiningProjects ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                        <span className="hidden sm:inline">Refine</span>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setShowProjectsSection(false)}>Remove</Button>
                    </div>
                  </div>
                  <Textarea
                    value={projects}
                    onChange={(e) => setProjects(e.target.value)}
                    placeholder="Personal website: example.com, GitHub: github.com/username"
                    rows={2}
                  />
                </div>
                )}

                {showHobbiesSection && (
                <div id="hobbies">
                  <div className="flex items-center justify-between">
                    <Label>Hobbies / Interests</Label>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" onClick={() => openRefineDialog('hobbies', hobbies)} disabled={!hobbies.trim()} className="gap-2" title="Refine hobbies with Gemini AI">
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline">Refine</span>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setShowHobbiesSection(false)}>Remove</Button>
                    </div>
                  </div>
                  <Textarea
                    value={hobbies}
                    onChange={(e) => setHobbies(e.target.value)}
                    placeholder="Volunteering, cycling, photography..."
                    rows={2}
                  />
                </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Generate CV
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => setShowGenerationDialog(true)}>
                Settings
              </Button>
            </div>
          </form>
        </Card>

        {/* Tweak for New Job Dialog */}
        {showTweakDialog && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Tweak for New Job</h2>
                  <p className="text-sm text-muted-foreground">
                    Paste a job description and we'll automatically tweak your CV to match the job requirements using AI.
                  </p>
                </div>
                <Textarea
                  value={tweakJobDescription}
                  onChange={(e) => setTweakJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={8}
                  className="resize-none"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowTweakDialog(false);
                      setTweakJobDescription("");
                    }}
                    disabled={isTweaking}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={tweakCVForNewJob}
                    disabled={isTweaking || !tweakJobDescription.trim()}
                    className="flex-1 gap-2"
                  >
                    {isTweaking ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Tweaking...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Tweak CV
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* RefineDialog Component */}
        <RefineDialog
          isOpen={refineDialogOpen}
          onClose={() => setRefineDialogOpen(false)}
          fieldLabel={refineTarget?.type || ''}
          originalText={refineOriginal}
          onConfirm={(instructions) => previewRefine(instructions)}
          onApplyResult={(result) => applyRefinedText(result)}
          targetJobDescription={targetJobDescription}
          refineMode={refineMode}
        />

        {/* SaveDataDialog Component */}
        <SaveDataDialog
          isOpen={showSaveDataDialog}
          onSave={handleSaveData}
          onSkip={() => setShowSaveDataDialog(false)}
          fullName={fullName}
          onSavePersonalInfo={savePersonalInfoToSettings}
        />

        {/* DownloadAnimation Component */}
        {downloadingFormat && (
          <DownloadAnimation format={downloadingFormat} />
        )}

        {/* GenerationAnimation Component */}
        {isGenerating && (
          <GenerationAnimation isGenerating={isGenerating} />
        )}

        {/* LoadDataDialog Component */}
        <LoadDataDialog
          isOpen={showLoadDataDialog}
          onLoad={handleLoadData}
          onStartFresh={() => setShowLoadDataDialog(false)}
          savedDataList={savedDataList}
        />
      </div>
    </div>
  );
};

export default Index;
