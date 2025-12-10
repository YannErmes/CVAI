import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sparkles, Save } from "lucide-react";
import { SavedCVData } from "./SettingsPanel";

interface GenerationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const GenerationDialog: React.FC<GenerationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Generate Your CV
          </DialogTitle>
          <DialogDescription>
            We'll generate your CV using the text you already provided. Inline AI tools are available on fields to refine them individually.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm()}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate CV
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface SaveDataDialogProps {
  isOpen: boolean;
  onSave: (name: string) => void;
  onSkip: () => void;
  fullName: string;
  onSavePersonalInfo?: () => void;
}

export const SaveDataDialog: React.FC<SaveDataDialogProps> = ({
  isOpen,
  onSave,
  onSkip,
  fullName,
  onSavePersonalInfo,
}) => {
  const [dataName, setDataName] = useState(fullName || "My CV Data");
  const [savePersonalInfo, setSavePersonalInfo] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onSkip}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5 text-green-600" />
            Save Your CV Data?
          </DialogTitle>
          <DialogDescription>
            Would you like to save this CV data for future use? You can edit and regenerate it anytime from Settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="data-name" className="text-sm font-medium">
              Data Name
            </Label>
            <Input
              id="data-name"
              value={dataName}
              onChange={(e) => setDataName(e.target.value)}
              placeholder="e.g., My CV Data - Software Engineer"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Give this saved data a meaningful name to identify it later
            </p>
          </div>

          {onSavePersonalInfo && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={savePersonalInfo}
                  onChange={(e) => setSavePersonalInfo(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-amber-900">Also save personal info to Settings</span>
              </label>
              <p className="text-xs text-amber-800 ml-6">
                Save your name, email, phone, and location so you can quickly load it next time
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              ✓ Your data will be saved locally in your browser and never sent to any server
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onSkip} className="flex-1">
            Skip
          </Button>
          <Button
            onClick={() => {
              if (savePersonalInfo && onSavePersonalInfo) {
                onSavePersonalInfo();
              }
              onSave(dataName);
            }}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface LoadDataDialogProps {
  isOpen: boolean;
  onLoad: (data: SavedCVData) => void;
  onStartFresh: () => void;
  savedDataList: SavedCVData[];
}

export const LoadDataDialog: React.FC<LoadDataDialogProps> = ({
  isOpen,
  onLoad,
  onStartFresh,
  savedDataList,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onStartFresh}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome Back!</DialogTitle>
          <DialogDescription>
            You have {savedDataList.length} saved CV {savedDataList.length === 1 ? "entry" : "entries"}. Would you like to load one or start fresh?
          </DialogDescription>
        </DialogHeader>

        {savedDataList.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {savedDataList.map((data) => (
              <button
                key={data.id}
                onClick={() => onLoad(data)}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
              >
                <p className="font-semibold text-gray-900">{data.name}</p>
                <p className="text-xs text-gray-500">{data.fullName} • {data.title}</p>
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={onStartFresh} className="flex-1">
            Start Fresh
          </Button>
          {savedDataList.length > 0 && (
            <Button
              onClick={onStartFresh}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              View All in Settings
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface GenerationAnimationProps {
  isGenerating: boolean;
}

export const GenerationAnimation: React.FC<GenerationAnimationProps> = ({ isGenerating }) => {
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showPop, setShowPop] = useState(false);

  const generationMessages = [
    "📝 Analyzing your information...",
    "✨ Structuring your CV...",
    "🎨 Adding visual polish...",
    "🔍 Optimizing content...",
    "💼 Tailoring for impact...",
    "✅ Almost there...",
  ];

  useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      setMessages([]);
      setIsComplete(false);
      setShowPop(false);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 35;
        if (next >= 95) {
          setIsComplete(true);
          setShowPop(true);
          setTimeout(() => setShowPop(false), 600);
          return 100;
        }
        return next;
      });
    }, 400);

    const messageInterval = setInterval(() => {
      setMessages((prev) => {
        const newMessages = [...prev, generationMessages[prev.length % generationMessages.length]];
        if (newMessages.length > 3) {
          newMessages.shift();
        }
        return newMessages;
      });
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md w-full mx-4 overflow-hidden relative">
        {/* Pop explosion effect */}
        {showPop && (
          <>
            <style>{`
              @keyframes popBurst {
                0% {
                  transform: scale(1);
                  opacity: 1;
                }
                100% {
                  transform: scale(2.5);
                  opacity: 0;
                }
              }
              @keyframes popParticle {
                0% {
                  transform: translate(0, 0) scale(1);
                  opacity: 1;
                }
                100% {
                  transform: translate(var(--tx), var(--ty)) scale(0);
                  opacity: 0;
                }
              }
            `}</style>
            {/* Main pop circle */}
            <div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400"
              style={{
                animation: "popBurst 0.6s ease-out forwards",
              }}
            />
            {/* Pop particles */}
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const distance = 100;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              return (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{
                    left: "50%",
                    top: "50%",
                    animation: `popParticle 0.6s ease-out forwards`,
                    "--tx": `${tx}px`,
                    "--ty": `${ty}px`,
                  } as React.CSSProperties}
                />
              );
            })}
            {/* Confetti sparkles */}
            {[...Array(20)].map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const distance = 150;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              return (
                <div
                  key={`spark-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-yellow-400"
                  style={{
                    left: "50%",
                    top: "50%",
                    boxShadow: "0 0 8px rgba(250, 204, 21, 0.8)",
                    animation: `popParticle 0.8s ease-out forwards`,
                    "--tx": `${tx}px`,
                    "--ty": `${ty}px`,
                    animationDelay: `${i * 20}ms`,
                  } as React.CSSProperties}
                />
              );
            })}
          </>
        )}

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 opacity-40" />
        
        <div className="relative z-10">
          {/* Animated SVG */}
          <div className="mb-8 flex justify-center">
            <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Outer rotating circle */}
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="3"
                style={{
                  animation: "rotate 4s linear infinite",
                  transformOrigin: "50px 50px",
                }}
              />
              {/* Middle rotating circle */}
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="2.5"
                opacity="0.7"
                style={{
                  animation: "rotateReverse 3s linear infinite",
                  transformOrigin: "50px 50px",
                }}
              />
              {/* Inner pulsing circle */}
              <circle
                cx="50"
                cy="50"
                r="15"
                fill="url(#gradient3)"
                opacity="0.6"
                style={{
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              {/* Document icon */}
              <g style={{ animation: "float 3s ease-in-out infinite" }}>
                <rect x="28" y="30" width="44" height="55" rx="3" fill="white" opacity="0.9" stroke="#3b82f6" strokeWidth="1.5" />
                <line x1="32" y1="40" x2="68" y2="40" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
                <line x1="32" y1="50" x2="68" y2="50" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
                <line x1="32" y1="60" x2="55" y2="60" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
              </g>
              
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#0ea5e9", stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#a78bfa", stopOpacity: 0.5 }} />
                  <stop offset="100%" style={{ stopColor: "#60a5fa", stopOpacity: 0.5 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <style>{`
            @keyframes rotate {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            @keyframes rotateReverse {
              from {
                transform: rotate(360deg);
              }
              to {
                transform: rotate(0deg);
              }
            }
            @keyframes pulse {
              0%, 100% {
                r: 15;
                opacity: 0.6;
              }
              50% {
                r: 18;
                opacity: 0.3;
              }
            }
            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-3px);
              }
            }
            @keyframes slideInUp {
              from {
                transform: translateY(10px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            @keyframes progressPulse {
              0%, 100% {
                box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
              }
              50% {
                box-shadow: 0 0 0 8px rgba(139, 92, 246, 0);
              }
            }
            @keyframes progressGrow {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
          `}</style>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center mb-3">
            Generating Your CV
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Powered by AI • Crafting excellence
          </p>

          {/* Animated status messages */}
          <div className="mb-6 h-12 flex flex-col justify-center">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="text-sm text-gray-700 text-center"
                style={{
                  animation: "slideInUp 0.5s ease-out forwards",
                  opacity: messages.length - idx <= 2 ? 1 : 0.6,
                }}
              >
                {msg}
              </div>
            ))}
          </div>

          {/* Enhanced Progress Bar with Pulse */}
          <div className="w-full mb-4 overflow-hidden">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner relative">
              <div
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300 shadow-lg relative"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  animation: isComplete ? "none" : "progressPulse 2s ease-in-out infinite",
                }}
              >
                {/* Shiny overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />
                {/* Pulsing glow at end */}
                {progress < 100 && (
                  <div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full blur-md"
                    style={{
                      animation: "pulse 1s ease-in-out infinite",
                      opacity: 0.6,
                    }}
                  />
                )}
              </div>
            </div>
            <p className={`text-xs text-center font-semibold mt-2 transition-all ${
              isComplete ? "text-green-600" : "text-gray-600"
            }`}>
              {Math.floor(Math.min(progress, 100))}%
            </p>
          </div>

          {/* Animated dots */}
          <div className="flex justify-center gap-3 mt-8">
            {[0, 0.2, 0.4].map((delay) => (
              <div
                key={delay}
                className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg"
                style={{
                  animation: `pulse 1.5s ease-in-out ${delay}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DownloadAnimationProps {
  format: "pdf" | "word" | "png";
}

export const DownloadAnimation: React.FC<DownloadAnimationProps> = ({ format }) => {
  const [message, setMessage] = useState(0);
  const messages = [
    "📦 Formatting your file...",
    "💾 Processing content...",
    "✨ Adding final touches...",
    "🔄 Preparing for download...",
    "⚡ Almost done...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage((prev) => (prev + 1) % messages.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const formatLabel = {
    pdf: "PDF Document",
    word: "Word Document",
    png: "PNG Image",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md">
      <style>{`
        @keyframes downloadFloat {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(-8px); opacity: 0.8; }
        }
        @keyframes downloadSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes downloadPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4">
        {/* Animated spinner */}
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 relative"
            style={{ animation: "downloadSpin 3s linear infinite" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="downloadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#downloadGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="2"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Saving your {formatLabel[format]}
          </h3>
          <p
            className="text-sm text-gray-600 h-6 transition-all duration-500"
            key={message}
          >
            {messages[message]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            style={{
              width: "85%",
              animation: "downloadPulse 1s ease-in-out infinite",
            }}
          />
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Please don't close this window...
        </p>
      </div>
    </div>
  );
};
