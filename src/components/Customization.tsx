import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Link2, Copy, Check, Mail } from "lucide-react";

interface CustomizationOptions {
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily?: string;
  tone: "formal" | "friendly" | "bold";
}

interface ShareOptions {
  formats: Array<"pdf" | "word" | "png" | "link">;
  includeWatermark: boolean;
  quality: "high" | "medium" | "low";
}

interface ColorCustomizerProps {
  onCustomizationChange: (options: CustomizationOptions) => void;
  current: CustomizationOptions;
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  onCustomizationChange,
  current,
}) => {
  const textStyles = [
    { name: "Modern", font: "Arial, sans-serif", desc: "Clean & Contemporary" },
    { name: "New Roman", font: "'Times New Roman', serif", desc: "Classic & Professional" },
    { name: "Garamond", font: "'Garamond', serif", desc: "Elegant & Traditional" },
    { name: "Georgia", font: "'Georgia', serif", desc: "Soft & Readable" },
    { name: "Courier", font: "'Courier New', monospace", desc: "Technical & Precise" },
  ];

  const colorPresets = [
    { name: "Blue", accent: "#3B82F6", bg: "#F0F9FF", text: "#1F2937" },
    { name: "Purple", accent: "#A855F7", bg: "#FAF5FF", text: "#1F2937" },
    { name: "Rose", accent: "#E11D48", bg: "#FFF1F2", text: "#1F2937" },
    { name: "Green", accent: "#10B981", bg: "#F0FDF4", text: "#1F2937" },
    { name: "Teal", accent: "#14B8A6", bg: "#F0FDFA", text: "#1F2937" },
    { name: "Dark", accent: "#6366F1", bg: "#F8F9FA", text: "#111827" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Text Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {textStyles.map((style) => (
            <button
              key={style.name}
              onClick={() =>
                onCustomizationChange({
                  ...current,
                  fontFamily: style.font,
                })
              }
              className="flex flex-col items-start gap-1 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors text-left"
              style={{ fontFamily: style.font }}
              title={style.name}
            >
              <span className="font-bold text-gray-900">{style.name}</span>
              <span className="text-xs text-gray-600">{style.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          {/* Writing Style selector removed per user request - inline AI tools provide field-level refinement */}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tone
          </label>
          <select
            value={current.tone}
            onChange={(e) =>
              onCustomizationChange({ ...current, tone: e.target.value as any })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      </div>
    </div>
  );
};

interface SharePanelProps {
  onDownloadPDF: () => void;
  onDownloadWord: () => void;
  onDownloadPNG: () => void;
  onShareLink: () => void;
  fileName: string;
  isLoading?: boolean;
}

export const SharePanel: React.FC<SharePanelProps> = ({
  onDownloadPDF,
  onDownloadWord,
  onDownloadPNG,
  onShareLink,
  fileName,
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = `Check out my CV - ${fileName}`;
    const body = `Here's my professional CV created with AICV Builder.\n\n${window.location.href}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Download & Share</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Button
          onClick={onDownloadPDF}
          disabled={isLoading}
          className="gap-2 bg-red-600 hover:bg-red-700"
          size="sm"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">PDF</span>
        </Button>

        <Button
          onClick={onDownloadWord}
          disabled={isLoading}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          size="sm"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Word</span>
        </Button>

        <Button
          onClick={onDownloadPNG}
          disabled={isLoading}
          className="gap-2 bg-purple-600 hover:bg-purple-700"
          size="sm"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">PNG</span>
        </Button>

        <Button
          onClick={handleCopy}
          className="gap-2 bg-green-600 hover:bg-green-700"
          size="sm"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Copy Link</span>
        </Button>
      </div>

      <div className="space-y-3">
        <div className="text-sm text-gray-600">
          <p className="font-semibold mb-2">Share Via:</p>
          <div className="flex gap-2">
            <Button
              onClick={shareViaEmail}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <Button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    window.location.href
                  )}`,
                  "_blank"
                )
              }
              variant="outline"
              size="sm"
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-900">
        <p className="font-semibold mb-1">✨ Pro Tip:</p>
        <p>Use the PNG format to share your CV on social media, and PDF/Word for job applications.</p>
      </div>
    </div>
  );
};

export type { CustomizationOptions, ShareOptions };
