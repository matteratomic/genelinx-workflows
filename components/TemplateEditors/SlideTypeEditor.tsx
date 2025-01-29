import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SlideType, SlideTypeField } from './slideTypes';
import { Plus, Trash2 } from 'lucide-react';

interface SlideTypeEditorProps {
  slideType: SlideType;
  onUpdate: (updatedType: SlideType) => void;
  onDelete: () => void;
}

const fieldTypes = [
  { value: 'text', label: 'Text Input' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'url', label: 'URL Input' },
  { value: 'html', label: 'HTML Editor' },
  { value: 'boolean', label: 'Toggle Switch' },
  { value: 'select', label: 'Dropdown Select' },
  { value: 'color', label: 'Color Picker' },
];

export const SlideTypeEditor: React.FC<SlideTypeEditorProps> = ({
  slideType,
  onUpdate,
  onDelete,
}) => {
  const [fields, setFields] = useState<SlideTypeField[]>(slideType.fields);

  const handleAddField = () => {
    const newField: SlideTypeField = {
      name: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
    };
    setFields([...fields, newField]);
    onUpdate({ ...slideType, fields: [...fields, newField] });
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    onUpdate({ ...slideType, fields: newFields });
  };

  const handleFieldUpdate = (index: number, updates: Partial<SlideTypeField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...updates };
    setFields(newFields);
    onUpdate({ ...slideType, fields: newFields });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-semibold">
          Edit Slide Type: {slideType.name}
        </CardTitle>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            value={slideType.name}
            onChange={(e) => onUpdate({ ...slideType, name: e.target.value })}
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={slideType.description}
            onChange={(e) => onUpdate({ ...slideType, description: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Fields</Label>
            <Button onClick={handleAddField} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Field {index + 1}</Label>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveField(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <Label>Field Name</Label>
                  <Input
                    value={field.name}
                    onChange={(e) =>
                      handleFieldUpdate(index, { name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Field Label</Label>
                  <Input
                    value={field.label}
                    onChange={(e) =>
                      handleFieldUpdate(index, { label: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Field Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value: any) =>
                      handleFieldUpdate(index, { type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {field.type === 'select' && (
                  <div>
                    <Label>Options (one per line)</Label>
                    <Textarea
                      value={field.options?.map(opt => `${opt.value}|${opt.label}`).join('\n')}
                      onChange={(e) => {
                        const options = e.target.value.split('\n').map(line => {
                          const [value, label] = line.split('|');
                          return { value, label: label || value };
                        });
                        handleFieldUpdate(index, { options });
                      }}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      handleFieldUpdate(index, { required: e.target.checked })
                    }
                  />
                  <Label>Required</Label>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SlideTypeEditor;
