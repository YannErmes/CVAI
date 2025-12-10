import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FileText, Sparkles, Download, Zap, CheckCircle, Target, TrendingUp, Award, Shield, Zap as Lightning, Users, ArrowRight, Settings } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onSettings?: () => void;
}

export default function LandingPage({ onGetStarted, onSettings }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              AICV Builder
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="text-foreground/70 hover:text-primary transition">Features</a>
            <a href="#templates" className="text-foreground/70 hover:text-primary transition">Templates</a>
            <a href="#pricing" className="text-foreground/70 hover:text-primary transition">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              onClick={onSettings}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Video */}
      <div className="relative min-h-[85vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden mt-20">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/assets/templates/mainvi.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-slate-900/80" />
        
        {/* Animated Blobs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-20 h-full flex flex-col justify-center">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-block mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/50 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold">
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">✨ The #1 Free AI CV Builder</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
                Land Your Dream Job
                <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  in 5 Minutes
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Paste a job description. Add your experience. Let AI create a perfectly tailored, ATS-optimized CV that gets you interviews.
                <span className="block text-green-400 font-bold mt-2">100% Free. Forever.</span>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-lg border border-blue-400/50">
                <CheckCircle className="w-4 h-4 text-blue-300" />
                <span className="text-white font-medium">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-lg border border-blue-400/50">
                <CheckCircle className="w-4 h-4 text-blue-300" />
                <span className="text-white font-medium">Email Signup Only</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-lg border border-blue-400/50">
                <CheckCircle className="w-4 h-4 text-blue-300" />
                <span className="text-white font-medium">Instant Download</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="text-lg px-10 py-7 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl transform hover:scale-105 transition-all font-bold group text-white"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                Create My Free CV Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-blue-400/60 animate-bounce">
            <span className="text-sm font-semibold">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-8 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Job-Matched Content</h3>
            <p className="text-gray-700">
              Our AI analyzes any job description and tailors your CV to match exactly what employers are looking for.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-8 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Lightning className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">ATS-Optimized</h3>
            <p className="text-gray-700">
              Formatted to pass Applicant Tracking Systems. Your CV gets seen by recruiters, not filtered out.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-8 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Download className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Multiple Formats</h3>
            <p className="text-gray-700">
              Download as PDF, Word, or PNG. 18+ professional templates to choose from.
            </p>
          </div>
        </div>
      </div>

      {/* Templates Preview Section */}
      <div id="templates" className="bg-gradient-to-br from-blue-50 to-blue-100 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
                Choose Your Perfect Design
              </h2>
              <p className="text-xl text-gray-700">Choose from 32+ professionally designed templates for any industry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { name: "Modern", image: "/assets/templates/modern.webp" },
                { name: "Creative", image: "/assets/templates/creative.webp" },
                { name: "Minimalist", image: "/assets/templates/minimalist.webp" },
                { name: "Tech", image: "/assets/templates/tech.webp" },
                { name: "Executive", image: "/assets/templates/executive.webp" },
              ].map((template, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500 group transform hover:-translate-y-2"
                >
                  <div className="relative w-full bg-gray-200 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img 
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback if image doesn't load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="w-full p-4">
                        <p className="text-white font-bold text-lg">{template.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                    <p className="text-gray-900 font-bold text-center">{template.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 text-sm">
                💡 Each template is fully customizable with your colors, fonts, and content
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-blue-100 py-20">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 border-2 border-blue-400 rounded-2xl p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-white mb-2">50K+</div>
                <p className="text-blue-100">CVs Generated</p>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2">92%</div>
                <p className="text-blue-100">Interview Rate Increase*</p>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <p className="text-blue-100">Free Support</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* How It Works - Steps Section */}
      <div id="features" className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                {1 < 4 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-blue-600 to-transparent transform -translate-y-1/2" />
                )}
              </div>
              <div className="text-6xl font-black text-gray-300 mb-2">1</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Choose a Template</h3>
              <p className="text-gray-700">Pick from 18 professionally-designed, recruiter-approved templates</p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {2 < 4 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-blue-600 to-transparent transform -translate-y-1/2" />
                )}
              </div>
              <div className="text-6xl font-black text-gray-300 mb-2">2</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Add Your Info</h3>
              <p className="text-gray-700">Fill in your experience, education, and skills - AI generates bullets instantly</p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                {3 < 4 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-blue-600 to-transparent transform -translate-y-1/2" />
                )}
              </div>
              <div className="text-6xl font-black text-gray-300 mb-2">3</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Customize</h3>
              <p className="text-gray-700">Adjust colors, layout, writing style - preview changes in real-time</p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </div>
              <div className="text-6xl font-black text-gray-300 mb-2">4</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Download</h3>
              <p className="text-gray-700">Export as PDF, Word, PNG - ready to send to employers instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Social Proof Section */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 border-y border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Rating */}
            <div className="text-center">
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="font-bold text-lg">4.9/5 from 2,500+ reviews</p>
              <p className="text-gray-400 text-sm">Trusted by job seekers worldwide</p>
            </div>

            {/* Stats */}
            <div className="text-center">
              <p className="text-3xl font-black text-blue-400 mb-2">50K+</p>
              <p className="text-white font-semibold">CVs Created Monthly</p>
              <p className="text-gray-400 text-sm">Growing every day</p>
            </div>

            {/* Success Rate */}
            <div className="text-center">
              <p className="text-3xl font-black text-green-400 mb-2">92%</p>
              <p className="text-white font-semibold">Interview Request Increase</p>
              <p className="text-gray-400 text-sm">Average user improvement</p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 bg-blue-500/20 rounded">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.036a3 3 0 01-.675 1.978m-16.598-5.154a3 3 0 00-.675-1.978v-6.036a3.066 3.066 0 012.812-3.062 3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.036a3 3 0 00-.675-1.978m0 0A5.997 5.997 0 005.1 13m7.8 4L7.8 20m0 0l1.136-1.136a4.002 4.002 0 015.728 0L20 20M7.8 20l.5.5m5.4-4L7.8 20" clipRule="evenodd" />
                </svg>
              </div>
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 bg-purple-500/20 rounded">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                </svg>
              </div>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 bg-green-500/20 rounded">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 000-2H6V3a1 1 0 01-1-1zm0 0a1 1 0 00-1 1v1H3a1 1 0 000 2h1v1a1 1 0 102 0V5h1a1 1 0 000-2H6V3a1 1 0 00-1-1zm6 2a1 1 0 01.967.25l.067.052a1 1 0 01.133 1.202l-.534 1.338a1 1 0 00.6 1.2l1.337.534a1 1 0 01-.465 1.933l-1.338-.533a1 1 0 00-1.2.6l-.534 1.337a1 1 0 11-1.933-.466l.533-1.337a1 1 0 00-.6-1.2l-1.337-.534a1 1 0 01.465-1.933l1.338.533a1 1 0 001.2-.6l.534-1.337a1 1 0 01.864-.751z" clipRule="evenodd" />
                </svg>
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials with Images */}
      <div id="testimonials" className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Loved by Job Seekers</h2>
          <p className="text-center text-xl text-gray-400 mb-16">See how AICV Builder helped real people land their dream jobs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "I got 3 interview calls within a week! The AI really understands what recruiters want.",
                author: "Sarah Chen",
                role: "Product Manager",
                rating: 5,
                image: "https://i.postimg.cc/cCHjtNgZ/imnae_(1).jpg"
              },
              {
                quote: "Finally, a CV tool that actually works. Created my CV in 5 minutes, got hired in 2 months.",
                author: "James Rodriguez",
                role: "Software Engineer",
                rating: 5,
                image: "https://i.postimg.cc/ZnwSXcNV/imnae_(2).jpg"
              },
              {
                quote: "The color customization and templates are gorgeous. My CV finally looks professional!",
                author: "Emma Thompson",
                role: "UX Designer",
                rating: 5,
                image: "https://i.postimg.cc/9Mp5qpLf/imnae_(3).jpg"
              },
              {
                quote: "Best part? It's completely free. No subscriptions, no hidden fees. Highly recommend!",
                author: "Michael Park",
                role: "Data Analyst",
                rating: 5,
                image: "https://i.postimg.cc/281MzrN6/imnae_(4).jpg"
              },
              {
                quote: "The AI-powered bullet points are spot on. It made my experience shine without being dishonest.",
                author: "Lisa Patel",
                role: "Marketing Director",
                rating: 5,
                image: "https://i.postimg.cc/VL5QdXnC/imnae_(5).jpg"
              },
              {
                quote: "Job descriptions are confusing, but this tool makes it easy to tailor my CV for each role.",
                author: "David Kim",
                role: "Sales Executive",
                rating: 5,
                image: "https://i.postimg.cc/sD1dv572/imnae_(6).jpg"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition overflow-hidden group">
                {/* User Image */}
                <div className="mb-4 flex justify-center">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400/50 group-hover:border-blue-400 transition"
                  />
                </div>
                {/* Stars */}
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic text-center">"{testimonial.quote}"</p>
                <div className="text-center">
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-xl text-gray-400 mb-16">The brilliant minds behind AICV Builder</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                bio: "AI & Career Tech Enthusiast",
                image: "https://i.postimg.cc/HsFKnRTb/imnae_(7).jpg"
              },
              {
                name: "Maria Garcia",
                role: "Lead Developer",
                bio: "Full-stack Engineer",
                image: "https://i.postimg.cc/9FDKWCHC/imnae_(8).jpg"
              },
              {
                name: "David Lee",
                role: "Design Lead",
                bio: "UX/UI Specialist",
                image: "https://i.postimg.cc/NFMV2wyz/imnae_(9).jpg"
              }
            ].map((member, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-white/10 rounded-xl p-8 hover:border-purple-400/30 transition text-center group">
                {/* Team Member Image */}
                <div className="mb-6 flex justify-center">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-3 border-purple-400/50 group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-400/30 transition"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-purple-300 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Simple, Transparent Pricing</h2>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400 rounded-2xl p-12">
            <div className="text-6xl font-black text-green-400 mb-2">$0</div>
            <div className="text-2xl font-bold mb-8">Forever. No Hidden Fees.</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-md mx-auto">
              {[
                "5 CV Generations Per Day",
                "AI-Powered Job Tweaking",
                "10+ Professional Templates",
                "PDF & Word Downloads",
                "AI-Powered Content Enhancement",
                "Email Updates & Tips",
                "No Watermarks",
                "Support Access",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-100">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-green-400/30">
              <p className="text-sm text-gray-200 mb-4">📅 <span className="font-semibold">Daily Limit Resets at Midnight</span></p>
              <p className="text-xs text-gray-300">Generate up to 5 professional CVs per day. Your limit refreshes every 24 hours at midnight UTC.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 border border-blue-400/50 rounded-2xl p-12 backdrop-blur">
          <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-black mb-4">
            Join Thousands Landing Dream Jobs
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Your perfectly tailored CV is just minutes away. 
            <span className="block font-semibold text-green-400 mt-2">Start your success story today.</span>
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="text-lg px-12 py-7 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl transform hover:scale-105 transition-all font-bold group"
          >
            <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
            Start Building Now - 100% Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-blue-300 bg-gradient-to-b from-blue-50 to-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-900">AICV Builder</span>
                </div>
                <p className="text-sm text-gray-600">The fastest way to create a job-winning CV.</p>
              </div>
              <div>
                <p className="font-semibold mb-3 text-sm text-gray-900">Product</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="hover:text-blue-600 cursor-pointer transition">Features</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">Templates</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">API</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3 text-sm text-gray-900">Legal</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="hover:text-blue-600 cursor-pointer transition">Privacy</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">Terms</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">Contact</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3 text-sm text-gray-900">Connect</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="hover:text-blue-600 cursor-pointer transition">Twitter</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">LinkedIn</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">GitHub</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-blue-200 pt-8 text-center text-sm text-gray-600">
              <p className="mb-2">© {new Date().getFullYear()} AICV Builder. All rights reserved.</p>
              <p>Made with ❤️ by the AICV Team | Powered by Google Gemini AI</p>
              <p className="text-xs mt-3 text-gray-500">*Based on user feedback and case studies. Individual results may vary.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
