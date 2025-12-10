import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check, Loader2, AlertCircle } from "lucide-react";

interface RefineVersion {
  version: number;
  text: string;
}

interface RefineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fieldLabel: string;
  originalText: string;
  onConfirm: (instructions: string) => Promise<RefineVersion[] | null>; // returns 3 versions
  onApplyResult?: (result: string) => Promise<void>;
  targetJobDescription?: string;
  refineMode?: "custom" | "job";
}

export const RefineDialog: React.FC<RefineDialogProps> = ({ 
  isOpen, 
  onClose, 
  fieldLabel, 
  originalText, 
  onConfirm, 
  onApplyResult,
  targetJobDescription = "",
  refineMode = "custom"
}) => {
  const [instructions, setInstructions] = useState("");
  const [mode, setMode] = useState<"custom" | "job">(refineMode);
  const [loading, setLoading] = useState(false);
  const [versions, setVersions] = useState<RefineVersion[] | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      setInstructions("");
      setVersions(null);
      setSelectedVersion(null);
      setLoading(false);
      setApplying(false);
      setError("");
      setMode(refineMode);
    }
  }, [isOpen, refineMode]);

  const handleRefine = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await onConfirm(instructions);
      if (!result || result.length === 0) {
        throw new Error("No versions generated. Please check your API key and try again.");
      }
      setVersions(result);
      setSelectedVersion(null);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to generate versions";
      console.error("Error generating versions:", error);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyVersion = async (version: RefineVersion) => {
    setError("");
    setApplying(true);
    try {
      if (onApplyResult) {
        await onApplyResult(version.text);
      }
      onClose();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to apply version";
      console.error("Error applying version:", error);
      setError(errorMsg);
      setApplying(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Refine: {fieldLabel}</DialogTitle>
          <DialogDescription>
            Get 3 AI-refined versions. Select the one you like best.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 items-start">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}
          {!versions ? (
            <>
              {/* Original Text */}
              <div>
                <Label className="font-semibold">Original Text</Label>
                <Textarea value={originalText} readOnly rows={4} className="mt-2 bg-gray-50" />
              </div>

              {/* Refine Mode Selection */}
              {targetJobDescription && (
                <div>
                  <Label className="font-semibold mb-3 block">Refine Based On:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50" onClick={() => setMode("custom")}>
                      <input type="radio" id="mode-custom" checked={mode === "custom"} onChange={() => setMode("custom")} />
                      <label htmlFor="mode-custom" className="cursor-pointer flex-1">
                        <div className="font-medium">Custom Prompt</div>
                        <div className="text-sm text-gray-600">Use your own instructions</div>
                      </label>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50" onClick={() => setMode("job")}>
                      <input type="radio" id="mode-job" checked={mode === "job"} onChange={() => setMode("job")} />
                      <label htmlFor="mode-job" className="cursor-pointer flex-1">
                        <div className="font-medium">Target Job Description</div>
                        <div className="text-sm text-gray-600">Align with the job you're applying for</div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructions / Job Context */}
              <div>
                <Label className="font-semibold">
                  {mode === "custom" ? "How to refine?" : "Why align with this job?"}
                </Label>
                {mode === "custom" ? (
                  <Textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={3}
                    placeholder="e.g., Make it shorter and more impactful, emphasize achievements, use stronger action verbs"
                  />
                ) : (
                  <Textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={3}
                    placeholder="e.g., Focus on metrics and quantifiable results, highlight leadership experience"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleRefine}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={loading || !instructions.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating 3 versions...
                    </>
                  ) : (
                    'Generate 3 Versions'
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Display 3 Versions */}
              <div className="space-y-3">
                <Label className="font-semibold text-lg">Choose a version:</Label>
                {versions.map((version) => (
                  <Card
                    key={version.version}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      selectedVersion === version.version
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedVersion(version.version)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          selectedVersion === version.version
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedVersion === version.version && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-600 mb-2">Version {version.version}</p>
                        <p className="text-gray-900 leading-relaxed">{version.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Apply / Back Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setVersions(null)} disabled={applying}>
                  ← Back
                </Button>
                <Button
                  onClick={() => {
                    if (selectedVersion !== null) {
                      const selected = versions.find((v) => v.version === selectedVersion);
                      if (selected) handleApplyVersion(selected);
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={selectedVersion === null || applying}
                >
                  {applying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Applying...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Use Version {selectedVersion}
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RefineDialog;
