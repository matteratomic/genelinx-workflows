import React, { useState, useEffect } from 'react';
import { Settings2, Save, Undo } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const OTPTemplateEditor = ({
  data,
  onTemplateChange,
  isWorkflowBlock
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState({
    title: 'Email Confirmation',
    description: "We'd like to confirm your email address before proceeding further",
    emailLabel: 'Email',
    buttonText: 'Send OTP',
    placeholderText: 'Enter your email'
  });

  // Load initial data if provided
  useEffect(() => {
    if (data) {
      setTemplate(data);
    }
  }, [data]);

  const handleSave = () => {
    setIsEditing(false);
    // Notify parent of template changes
    onTemplateChange(template);
  };

  const handleRevert = () => {
    setTemplate(data || {
      title: 'Email Confirmation',
      description: "We'd like to confirm your email address before proceeding further",
      emailLabel: 'Email',
      buttonText: 'Send OTP',
      placeholderText: 'Enter your email'
    });
    setIsEditing(false);
  };

  const updateTemplate = (field: string, value: string) => {
    const updatedTemplate = { ...template, [field]: value };
    setTemplate(updatedTemplate);
    // Notify parent of template changes
    onTemplateChange(updatedTemplate);
  };

  return (
    <div className="w-full max-w-xl p-6 pt-0 space-y-4">
      <div className="flex justify-start space-x-2">
        {!isWorkflowBlock && <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Settings2 className="w-4 h-4 mr-2" />
          {isEditing ? 'Editing Mode' : 'Edit Template'}
        </Button>}
        {isEditing && (
          <>
            <Button onClick={handleSave} variant="default">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={handleRevert} variant="outline">
              <Undo className="w-4 h-4 mr-2" />
              Revert
            </Button>
          </>
        )}
      </div>

      <Card className="w-full bg-white shadow-lg">
        <CardContent className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={template.title}
                  onChange={(e) => updateTemplate('title', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  value={template.description}
                  onChange={(e) => updateTemplate('description', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Label</label>
                <Input
                  value={template.emailLabel}
                  onChange={(e) => updateTemplate('emailLabel', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Placeholder Text</label>
                <Input
                  value={template.placeholderText}
                  onChange={(e) => updateTemplate('placeholderText', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
                <Input
                  value={template.buttonText}
                  onChange={(e) => updateTemplate('buttonText', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{template.title}</h2>
              <p className="text-gray-600">{template.description}</p>
              <div className="space-y-2">
                <label className="block text-gray-700">{template.emailLabel}</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder={template.placeholderText}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled
                  />
                </div>
              </div>
              <Button className="w-full">{template.buttonText}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPTemplateEditor;
