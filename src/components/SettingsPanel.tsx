import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { AlertCircle, Check, Copy, Eye, EyeOff, Trash2, Download, Upload, Zap, Gift } from "lucide-react";

export interface SavedCVData {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  photoUrl: string;
  summary: string;
  jobDescription: string;
  skills: string;
  certifications: string;
  languages: string;
  projects: string;
  experiences: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  educations: Array<{
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa: string;
    honors: string;
  }>;
  savedAt: string;
}

interface SettingsPanelProps {
  onApiKeyChange?: (apiKey: string) => void;
  onLoadData?: (data: SavedCVData) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onApiKeyChange, onLoadData }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string>("");
  const [savedDataList, setSavedDataList] = useState<SavedCVData[]>([]);
  
  // New state for credits and affiliation codes
  const [generationsUsedToday, setGenerationsUsedToday] = useState(0);
  const [affiliationCode, setAffiliationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);
  
  const GENERATIONS_PER_DAY = 5;
  
  // Preset affiliation codes (you can add/remove these)
  const VALID_AFFILIATION_CODES = [
    "WELCOME2025",
    "EARLY100",
    "REFER1",
    "REFER2",
    "REFER3",
    "REFER4",
    "REFER5",
    "REFER6",
    "REFER7",
    "REFER8",
  ];

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setSaved(true);
    }

    // Load saved CV data
    loadSavedData();
    
    // Load generations used today
    const generationsToday = localStorage.getItem("generationsUsedToday");
    if (generationsToday) {
      setGenerationsUsedToday(parseInt(generationsToday, 10));
    }
  }, []);

  const loadSavedData = () => {
    const savedData = localStorage.getItem("saved_cv_data_list");
    if (savedData) {
      try {
        setSavedDataList(JSON.parse(savedData));
      } catch (err) {
        console.error("Failed to load saved data:", err);
      }
    }
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setError("API key cannot be empty");
      return;
    }

    if (apiKey.length < 20) {
      setError("API key appears to be invalid (too short)");
      return;
    }

    try {
      localStorage.setItem("gemini_api_key", apiKey);
      setSaved(true);
      setError("");
      onApiKeyChange?.(apiKey);

      // Show success message briefly
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError("Failed to save API key");
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteApiKey = () => {
    if (window.confirm("Are you sure you want to delete the saved API key?")) {
      localStorage.removeItem("gemini_api_key");
      setApiKey("");
      setSaved(false);
      setError("");
      onApiKeyChange?.("");
    }
  };

  const handleLoadData = (data: SavedCVData) => {
    onLoadData?.(data);
  };

  const handleDeleteData = (id: string) => {
    if (window.confirm("Are you sure you want to delete this saved data?")) {
      const updatedList = savedDataList.filter((item) => item.id !== id);
      setSavedDataList(updatedList);
      localStorage.setItem("saved_cv_data_list", JSON.stringify(updatedList));
    }
  };

  const handleExportData = (data: SavedCVData) => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cv-data-${data.name}-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAffiliationCodeSubmit = () => {
    setCodeError("");
    setCodeSuccess(false);

    if (!affiliationCode.trim()) {
      setCodeError("Please enter an affiliation code");
      return;
    }

    // Check if code is valid
    if (!VALID_AFFILIATION_CODES.includes(affiliationCode.toUpperCase())) {
      setCodeError("Invalid affiliation code. Please check and try again.");
      return;
    }

    // Check if code has already been used
    const usedCodes = JSON.parse(localStorage.getItem("usedAffiliationCodes") || "[]");
    if (usedCodes.includes(affiliationCode.toUpperCase())) {
      setCodeError("This code has already been used. Each code can only be used once.");
      return;
    }

    // Mark code as used
    usedCodes.push(affiliationCode.toUpperCase());
    localStorage.setItem("usedAffiliationCodes", JSON.stringify(usedCodes));

    // Add 5 bonus credits
    const currentCredits = generationsUsedToday;
    const newCredits = Math.max(0, currentCredits - 5); // Reduce used count by 5 (same as adding 5 available)
    setGenerationsUsedToday(newCredits);
    localStorage.setItem("generationsUsedToday", newCredits.toString());

    setCodeSuccess(true);
    setAffiliationCode("");

    // Clear success message after 3 seconds
    setTimeout(() => setCodeSuccess(false), 3000);
  };

  const creditsRemaining = GENERATIONS_PER_DAY - generationsUsedToday;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Credits Section */}
        <Card className="shadow-lg border-0 mb-6 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-amber-600" />
                <h2 className="text-2xl font-bold text-amber-900">Free Generation Credits</h2>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-amber-600">{creditsRemaining}</div>
                <div className="text-sm text-amber-700">generations left today</div>
              </div>
            </div>

            {creditsRemaining <= 0 && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-semibold mb-2">⏰ Daily Limit Reached</p>
                <p className="text-red-700 text-sm">You've used all 5 free generations for today. Come back tomorrow at midnight UTC to get 5 more!</p>
              </div>
            )}

            {creditsRemaining > 0 && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold mb-1">✓ Credits Available</p>
                <p className="text-green-700 text-sm">You have {creditsRemaining} generations available today.</p>
              </div>
            )}

            {/* Affiliation Code Section */}
            <div className="bg-white rounded-lg p-6 border border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Unlock Bonus Credits with Affiliation Code</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Have an affiliation code? Enter it below to unlock 5 bonus generations! Each code works only once.
              </p>

              <div className="flex gap-2 mb-4">
                <Input
                  type="text"
                  placeholder="Enter affiliation code (e.g., WELCOME2025)"
                  value={affiliationCode}
                  onChange={(e) => {
                    setAffiliationCode(e.target.value.toUpperCase());
                    setCodeError("");
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleAffiliationCodeSubmit}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Redeem
                </Button>
              </div>

              {codeError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm mb-4">
                  <AlertCircle size={16} />
                  {codeError}
                </div>
              )}

              {codeSuccess && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm mb-4">
                  <Check size={16} />
                  🎉 Success! You've unlocked 5 bonus generations! Your credits have been added.
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="shadow-lg border-0 mb-6">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">Manage your API keys and saved CV data</p>
            </div>

            {/* API Key Section */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Google Gemini API Key
                </h2>

                <div className="space-y-3 ml-10">
                  <p className="text-sm text-gray-600">
                    Add your own Google Gemini API key to use the AI features. You can get a free API key at{" "}
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      makersuite.google.com
                    </a>
                  </p>

                  <div className="relative">
                    <Label htmlFor="api-key" className="block mb-2 text-sm font-medium">
                      API Key
                    </Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="api-key"
                          type={showApiKey ? "text" : "password"}
                          value={apiKey}
                          onChange={(e) => {
                            setApiKey(e.target.value);
                            setError("");
                          }}
                          placeholder="Paste your API key here..."
                          className="pr-10"
                        />
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showApiKey ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {apiKey && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleCopyApiKey}
                          title="Copy API key"
                        >
                          {copied ? (
                            <Check size={18} className="text-green-600" />
                          ) : (
                            <Copy size={18} />
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="flex items-center gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                        <AlertCircle size={16} />
                        {error}
                      </div>
                    )}

                    {/* Success Message */}
                    {saved && !error && (
                      <div className="flex items-center gap-2 mt-2 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                        <Check size={16} />
                        API key saved successfully
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleSaveApiKey}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Save API Key
                    </Button>
                    {apiKey && (
                      <Button
                        onClick={handleDeleteApiKey}
                        variant="outline"
                        className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Why use your own API key?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ No rate limits</li>
                  <li>✓ Better performance</li>
                  <li>✓ Your data stays private</li>
                  <li>✓ Free tier available</li>
                </ul>
              </div>

              {/* Status */}
              {saved && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                  <Check size={20} className="text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">API Key Active</p>
                    <p className="text-sm text-green-800">Your API key is saved and ready to use</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Saved CV Data Section */}
        {savedDataList.length > 0 && (
          <Card className="shadow-lg border-0">
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Saved CV Data ({savedDataList.length})
              </h2>

              <div className="space-y-4">
                {savedDataList.map((data) => (
                  <div
                    key={data.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{data.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>{data.fullName}</strong> • {data.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Saved on {new Date(data.savedAt).toLocaleDateString()} at{" "}
                          {new Date(data.savedAt).toLocaleTimeString()}
                        </p>
                        <div className="mt-3 text-xs text-gray-600 space-y-1">
                          <p>
                            📧 Email: <span className="font-mono">{data.email}</span>
                          </p>
                          <p>
                            📍 Location: <span>{data.location}</span>
                          </p>
                          <p>
                            💼 Experiences: <span>{data.experiences.length}</span>
                          </p>
                          <p>
                            🎓 Education: <span>{data.educations.length}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <Button
                          onClick={() => handleLoadData(data)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white gap-2 whitespace-nowrap"
                        >
                          <Upload size={16} />
                          Load Data
                        </Button>
                        <Button
                          onClick={() => handleExportData(data)}
                          size="sm"
                          variant="outline"
                          className="gap-2"
                        >
                          <Download size={16} />
                          Export
                        </Button>
                        <Button
                          onClick={() => handleDeleteData(data.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
