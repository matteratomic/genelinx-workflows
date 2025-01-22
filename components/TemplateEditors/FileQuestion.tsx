import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const FileQuestion = ({ question }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-emerald-800">
        {/* {question.question} */}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <div className="flex items-center gap-2">
        <input
          type="file"
          id={`file-${question.id}`}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          className="border rounded-md px-4 py-2 hover:bg-gray-50"
          onClick={() => document.getElementById(`file-${question.id}`).click()}
        >
          Choose File
        </Button>
        <span className="inline-block text-gray-600 border border-gray-300 rounded-md p-1 w-full w-full w-full w-full w-full w-full w-full w-full">
          {selectedFile ? selectedFile.name : 'No file chosen'}
        </span>
      </div>
    </div>
  );
};

export default FileQuestion;
