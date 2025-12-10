import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, Zap, ChevronDown, ChevronUp } from "lucide-react";

interface JobTweakCardProps {
  onTweak: (jobDescription: string) => void;
  isLoading?: boolean;
}

export const JobTweakCard: React.FC<JobTweakCardProps> = ({ onTweak, isLoading }) => {
  const [jobInput, setJobInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTweak = () => {
    if (jobInput.trim()) {
      onTweak(jobInput);
      setJobInput("");
    }
  };

  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-4 space-y-3">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:opacity-80 transition"
      >
        <div className="flex items-center gap-3">
          <div className="bg-amber-200 dark:bg-amber-800 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-amber-700 dark:text-amber-200" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-amber-900 dark:text-amber-100">
              🎯 Tailor for a New Job
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-200">
              Adjust your CV for a specific role
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-amber-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-amber-600" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-3 border-t border-amber-200 dark:border-amber-800 pt-3">
          {/* Instructions */}
          <div className="bg-white dark:bg-black/20 rounded p-3 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="font-semibold mb-1">How it works:</p>
                <ul className="space-y-1 text-xs ml-2">
                  <li>✓ Paste the job posting or job title</li>
                  <li>✓ AI will reword your CV to match the role</li>
                  <li>✓ Keep what's relevant, remove what's not</li>
                  <li>✓ Your original CV stays unchanged</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Input */}
          <div>
            <label className="text-xs font-semibold text-amber-900 dark:text-amber-100 block mb-2">
              Job Title or Job Description
            </label>
            <Input
              placeholder="e.g., 'Senior React Developer' or paste full job posting..."
              value={jobInput}
              onChange={(e) => setJobInput(e.target.value)}
              disabled={isLoading}
              className="text-sm"
              onKeyPress={(e) => {
                if (e.key === "Enter" && jobInput.trim() && !isLoading) {
                  handleTweak();
                }
              }}
            />
          </div>

          {/* Quick Examples */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded p-2">
            <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Examples:
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-200">
              "Full-stack engineer with React" • "Data scientist in healthcare" • "Product manager at fintech"
            </p>
          </div>

          {/* Button */}
          <Button
            onClick={handleTweak}
            disabled={!jobInput.trim() || isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Tweaking...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Tweak My CV for This Job
              </>
            )}
          </Button>
        </div>
      )}

      {/* Collapsed Hint */}
      {!isExpanded && (
        <div className="text-xs text-amber-600 dark:text-amber-300 flex items-center gap-1">
          <span>💡 Click to reveal tailoring options</span>
        </div>
      )}
    </Card>
  );
};
