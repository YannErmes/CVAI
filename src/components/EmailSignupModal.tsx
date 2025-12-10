import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Sparkles } from "lucide-react";

interface EmailSignupModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export function EmailSignupModal({ open, onClose, onSubmit }: EmailSignupModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);
    
    // Save email to localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("signupDate", new Date().toISOString());
    localStorage.setItem("generationsUsedToday", "0");
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Close modal after 1.5 seconds
      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
        onSubmit(email);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            Sign Up for Free
          </DialogTitle>
          <DialogDescription>
            Enter your email to get started with your AI-powered CV builder. You'll get 5 free generations per day.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!submitted ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="flex-1"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send you occasional updates and tips to get the most out of your CV.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 space-y-1">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Free Plan Includes:</p>
                <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                  <li>✓ 5 CV generations per day</li>
                  <li>✓ AI-powered job tweaking</li>
                  <li>✓ 10+ professional templates</li>
                  <li>✓ PDF & Word downloads</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {loading ? "Creating Account..." : "Get Started - Free"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                No credit card required. Sign up is free.
              </p>
            </>
          ) : (
            <div className="text-center space-y-3">
              <div className="text-3xl">✓</div>
              <p className="font-semibold text-green-600">Account created!</p>
              <p className="text-sm text-muted-foreground">Redirecting to your CV builder...</p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
