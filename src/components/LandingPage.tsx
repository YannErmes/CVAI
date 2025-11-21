import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Download, Zap } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              AI CV Builder
            </h1>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Create Your Perfect CV
              <span className="block text-primary mt-2">
                Powered by AI
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your career story into a professional CV in minutes. 
              Our AI enhances your experience with compelling bullet points and 
              polished formatting.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start for Free
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No sign-up required • Takes 5 minutes
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              AI-Powered Enhancement
            </h3>
            <p className="text-muted-foreground">
              Our AI transforms your experience into compelling, achievement-focused bullet points that stand out.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Professional Templates
            </h3>
            <p className="text-muted-foreground">
              Choose from modern, classic, or executive templates designed to impress hiring managers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Download & Share
            </h3>
            <p className="text-muted-foreground">
              Export your CV as PDF or Word document, ready to send to recruiters and employers.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mt-24">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Fill Your Information
              </h4>
              <p className="text-muted-foreground">
                Add your work experience, education, skills, and professional summary.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                AI Enhancement
              </h4>
              <p className="text-muted-foreground">
                Our AI polishes your content with compelling language and formatting.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Download & Apply
              </h4>
              <p className="text-muted-foreground">
                Get your professional CV and start applying to your dream jobs.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto mt-24 text-center bg-gradient-to-r from-primary to-accent rounded-2xl p-12 shadow-xl">
          <Zap className="w-12 h-12 text-white mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your CV?
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            Join thousands who've landed their dream jobs with our AI-powered CV builder.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            variant="secondary"
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-lg"
          >
            Get Started Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 AI CV Builder. Powered by Google Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
}
