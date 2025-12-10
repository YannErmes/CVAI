import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCcw, ZoomIn, ZoomOut, Download, X } from "lucide-react";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ imageUrl, onSave, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [blur, setBlur] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [scale, setScale] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      redrawImage();
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const redrawImage = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;
    canvas.width = 300;
    canvas.height = 300;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Apply transformations
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) saturate(${saturation}%)`;

    // Translate to center for rotation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.scale(scale, scale);

    // Draw image centered
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);

    ctx.restore();
  };

  useEffect(() => {
    redrawImage();
  }, [brightness, contrast, blur, saturation, scale, rotationAngle]);

  const handleSave = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      onSave(dataUrl);
    }
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setBlur(0);
    setSaturation(100);
    setScale(1);
    setRotationAngle(0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Profile Picture</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Canvas Preview */}
        <div className="flex justify-center mb-8 bg-gray-100 rounded-lg p-4">
          <canvas
            ref={canvasRef}
            className="rounded-full border-4 border-blue-500"
            width={300}
            height={300}
          />
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Brightness */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Brightness: {brightness}%
            </label>
            <Slider
              value={[brightness]}
              onValueChange={(val) => setBrightness(val[0])}
              min={50}
              max={150}
              step={1}
              className="w-full"
            />
          </div>

          {/* Contrast */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Contrast: {contrast}%
            </label>
            <Slider
              value={[contrast]}
              onValueChange={(val) => setContrast(val[0])}
              min={50}
              max={150}
              step={1}
              className="w-full"
            />
          </div>

          {/* Saturation */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Saturation: {saturation}%
            </label>
            <Slider
              value={[saturation]}
              onValueChange={(val) => setSaturation(val[0])}
              min={0}
              max={150}
              step={1}
              className="w-full"
            />
          </div>

          {/* Blur */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Blur: {blur}px
            </label>
            <Slider
              value={[blur]}
              onValueChange={(val) => setBlur(val[0])}
              min={0}
              max={10}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Scale */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Zoom: {(scale * 100).toFixed(0)}%
            </label>
            <Slider
              value={[scale]}
              onValueChange={(val) => setScale(val[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Rotation */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Rotation: {rotationAngle}°
            </label>
            <Slider
              value={[rotationAngle]}
              onValueChange={(val) => setRotationAngle(val[0])}
              min={0}
              max={360}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2 flex-1"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 gap-2 flex-1"
          >
            <Download className="w-4 h-4" />
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
