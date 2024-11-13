import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eraser, Undo2 } from "lucide-react";

const SignatureComponent = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  
  // Initialize canvas context and settings
  const initCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.lineCap = 'round';
  };

  React.useEffect(() => {
    initCanvas();
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const saveSignature = () => {
    if (!hasSignature) return;
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL(); // Convert to base64
    console.log('Signature saved:', signatureData);
    // Here you would typically send this data to your backend
  };

  // Handle touch events for mobile devices
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    startDrawing(mouseEvent);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    draw(mouseEvent);
  };

  const handleTouchEnd = () => {
    stopDrawing();
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-medium">Signature</Label>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearSignature}
                disabled={!hasSignature}
              >
                <Eraser className="h-4 w-4 mr-1" />
                Clear
              </Button>
              <Button 
                size="sm"
                onClick={saveSignature}
                disabled={!hasSignature}
              >
                Save
              </Button>
            </div>
          </div>
          
          <div className="border-2 border-dashed rounded-lg p-1 bg-white">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="w-full cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Please sign above using your mouse or touch screen
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignatureComponent;
