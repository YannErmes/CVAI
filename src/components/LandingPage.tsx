import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Download, Zap, CheckCircle, Target, TrendingUp } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <div className="p-3 bg-primary rounded-xl shadow-lg animate-scale-in">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              AI CV Builder
            </h1>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              100% FREE • No Credit Card • No Sign-Up
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Land Your Dream Job with an
              <span className="block text-primary mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-Tailored CV
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Paste any job description, add your experience, and our AI instantly creates a 
              <span className="font-semibold text-foreground"> perfectly tailored CV</span> that matches what employers want. 
              In 5 minutes. For free.
            </p>
          </div>

          {/* Value Props - Quick Highlights */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">Job-Specific Tailoring</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">ATS-Optimized</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">Ready in 5 Minutes</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="text-lg px-10 py-7 bg-gradient-to-r from-primary to-accent hover:shadow-2xl transition-all transform hover:scale-105 animate-pulse"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Create My Free CV Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4 font-medium">
              🎉 Completely Free Forever • No Hidden Fees • Instant Download
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 animate-scale-in" style={{ animationDelay: "0.6s" }}>
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Job-Tailored Content
            </h3>
            <p className="text-muted-foreground">
              Paste any job description and our AI automatically highlights the exact skills and achievements employers are looking for.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 animate-scale-in" style={{ animationDelay: "0.7s" }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              AI-Powered Writing
            </h3>
            <p className="text-muted-foreground">
              Transform basic job descriptions into compelling, achievement-focused bullet points with quantifiable results.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 animate-scale-in" style={{ animationDelay: "0.8s" }}>
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Instant Download
            </h3>
            <p className="text-muted-foreground">
              Get your polished CV as a PDF or Word document in seconds. No watermarks, no limitations, completely free.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-3xl mx-auto mt-24 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-3">
              Simple, Transparent Pricing
            </h3>
            <p className="text-lg text-muted-foreground">
              No tricks, no hidden fees, no premium plans
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-300 shadow-xl transform hover:scale-105 transition-all">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-xl font-semibold text-foreground mb-4">Forever Free</div>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">Unlimited CV generations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">Job-specific tailoring with AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">PDF and Word downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">3 professional templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">No sign-up or credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mt-24 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Create Your Perfect CV in 3 Simple Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                1
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Paste Job Description
              </h4>
              <p className="text-muted-foreground">
                Copy the job posting you're applying to. Our AI analyzes what skills and keywords employers want.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                2
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Add Your Experience
              </h4>
              <p className="text-muted-foreground">
                Enter your work history, education, and skills. AI transforms it into compelling bullet points.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                3
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Download & Win
              </h4>
              <p className="text-muted-foreground">
                Get your job-tailored, ATS-optimized CV as PDF or Word. Start applying immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto mt-24 text-center bg-gradient-to-r from-primary via-accent to-primary rounded-2xl p-12 shadow-2xl animate-fade-in transform hover:scale-105 transition-all" style={{ animationDelay: "1s" }}>
          <TrendingUp className="w-14 h-14 text-white mx-auto mb-4 animate-pulse" />
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Stand Out?
          </h3>
          <p className="text-blue-50 mb-6 text-lg">
            Join thousands landing interviews with perfectly tailored CVs. 
            <span className="block font-semibold mt-2">No sign-up. No fees. Just results.</span>
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="text-lg px-10 py-7 bg-white text-primary hover:bg-gray-50 shadow-xl transform hover:scale-105 transition-all font-bold"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Building Now - It's Free
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} AI CV Builder. Powered by Google Gemini AI.</p>
          <p className="text-sm mt-2">100% Free • No Sign-Up Required • Privacy Focused</p>
        </div>
      </footer>
    </div>
  );
}
