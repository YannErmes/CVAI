import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Zap, Loader2 } from "lucide-react";

interface TweakResult {
  field: string;
  original: string;
  tweaked: string;
}

interface JobTweakDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobDescription: string;
  cvData: {
    summary?: string;
    experience?: string;
    skills?: string;
  };
  onConfirm: (jobDesc: string) => Promise<TweakResult[] | null>;
  onApplyTweaks?: (tweaks: TweakResult[]) => void;
}

export const JobTweakDialog: React.FC<JobTweakDialogProps> = ({
  isOpen,
  onClose,
  jobDescription,
  cvData,
  onConfirm,
  onApplyTweaks,
}) => {
  const [loading, setLoading] = useState(false);
  const [tweaks, setTweaks] = useState<TweakResult[] | null>(null);
  const [selectedTweaks, setSelectedTweaks] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) {
      setTweaks(null);
      setSelectedTweaks(new Set());
      setLoading(false);
    }
  }, [isOpen]);

  const handleGenerateTweaks = async () => {
    setLoading(true);
    try {
      const result = await onConfirm(jobDescription);
      setTweaks(result);
      if (result) {
        setSelectedTweaks(new Set(result.map((t) => t.field)));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTweaks = () => {
    if (tweaks) {
      const filtered = tweaks.filter((t) => selectedTweaks.has(t.field));
      onApplyTweaks?.(filtered);
      onClose();
    }
  };

  const toggleTweak = (field: string) => {
    const newSelected = new Set(selectedTweaks);
    if (newSelected.has(field)) {
      newSelected.delete(field);
    } else {
      newSelected.add(field);
    }
    setSelectedTweaks(newSelected);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Tailor CV for New Job
          </DialogTitle>
          <DialogDescription>
            Your CV will be adjusted to match the job requirements. You can review and choose which changes to apply.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Job Description Display */}
          {!tweaks && (
            <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 p-4">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📋 Target Job:
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200 font-mono bg-white dark:bg-black/20 p-3 rounded border border-blue-300 dark:border-blue-700">
                {jobDescription}
              </p>
            </Card>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Analyzing job posting...
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI is finding the best ways to tailor your CV
              </p>
            </div>
          )}

          {/* Results */}
          {tweaks && !loading && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded p-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>AI found {tweaks.length} ways to improve your CV for this role</span>
              </div>

              {tweaks.map((tweak, index) => (
                <Card
                  key={index}
                  className={`p-4 border-2 cursor-pointer transition ${
                    selectedTweaks.has(tweak.field)
                      ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => toggleTweak(tweak.field)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedTweaks.has(tweak.field)}
                      onChange={() => toggleTweak(tweak.field)}
                      className="mt-1 w-5 h-5 cursor-pointer"
                    />
                    <div className="flex-1 space-y-2">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
                        {tweak.field}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Original */}
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                            Current:
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 p-2 rounded border-l-2 border-gray-400 dark:border-gray-600 line-clamp-3">
                            {tweak.original}
                          </p>
                        </div>

                        {/* Tweaked */}
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                            ✨ Tailored:
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30 p-2 rounded border-l-2 border-green-500 dark:border-green-400 line-clamp-3">
                            {tweak.tweaked}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-semibold">Tip:</span> Uncheck any tweaks you don't like. All other sections of your CV will remain unchanged.
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {!tweaks ? (
              <>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateTweaks}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Generate Recommendations
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setTweaks(null)}
                  className="flex-1"
                >
                  ← Back
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Discard
                </Button>
                <Button
                  onClick={handleApplyTweaks}
                  disabled={selectedTweaks.size === 0}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Apply ({selectedTweaks.size} tweaks)
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
