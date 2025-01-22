import React from 'react';
import { MoveUp, MoveDown, Trash2, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const QuestionEditor = ({ question, index, onUpdate, onDelete, onMove, totalQuestions }) => {
  const updateField = (field, value) => {
    onUpdate(index, {
      ...question,
      [field]: value
    });
  };

  const updateOption = (optionIndex, newValue) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = newValue;
    updateField('options', newOptions);
  };

  const addOption = () => {
    const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
    updateField('options', newOptions);
  };

  const removeOption = (optionIndex) => {
    const newOptions = question.options.filter((_, idx) => idx !== optionIndex);
    updateField('options', newOptions);
  };

  return (
    <Card className="p-4 space-y-4">
      {/* Question Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onMove(index, -1)}
            disabled={index === 0}
          >
            <MoveUp className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onMove(index, 1)}
            disabled={index === totalQuestions - 1}
          >
            <MoveDown className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Question Type */}
      <div>
        <Label>Question Type</Label>
        <Select
          defaultValue={question.type}
          onValueChange={(value) => updateField('type', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="radio">Radio Buttons</SelectItem>
            <SelectItem value="checkbox">Checkboxes</SelectItem>
            <SelectItem value="text">Text Input</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Question Text */}
      <div>
        <Label>Question Text</Label>
        <Input
          defaultValue={question.question}
          onChange={(e) => {
            e.preventDefault();
            const newValue = e.target.value;
            updateField('question', newValue);
          }}
        />
      </div>

      {/* Required Toggle */}
      <div className="flex items-center space-x-2">
        <Switch
          checked={question.required}
          onCheckedChange={(checked) => updateField('required', checked)}
        />
        <Label>Required</Label>
      </div>


      {/* Options for Radio and Checkbox types */}
      {(question.type === 'radio' || question.type === 'checkbox') && (
        <div>
          <Label>Options</Label>
          <div className="space-y-2 mt-2">
            {question.options?.map((option, optIndex) => (
              <div key={`${question.id}-option-${optIndex}`} className="flex gap-2">
                <Input
                  defaultValue={option}
                  onChange={(e) => updateOption(optIndex, e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeOption(optIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addOption}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        </div>
      )}

      {/* Multiline Toggle for Text type */}
      {question.type === 'text' && (
        <div className="flex items-center space-x-2">
          <Switch
            checked={question.multiline}
            onCheckedChange={(checked) => updateField('multiline', checked)}
          />
          <Label>Multiline</Label>
        </div>
      )}
    </Card>
  );
};

export default QuestionEditor;
