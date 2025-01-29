import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, GripVertical, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface WorkflowBlock {
  id: number;
  title: string;
  description: string;
}

interface SavedWorkflow {
  id: string;
  name: string;
  description: string;
  blocks: WorkflowBlock[];
  createdAt: Date;
}

const workflowBlocks: WorkflowBlock[] = [
  { id: 1, title: 'OTP Code', description: "Creates an OTP Code block" },
  { id: 2, title: 'Book a Consultation', description: "Creates a consultation booking block" },
  { id: 3, title: 'Payment Request', description: "Creates a payment request block" },
  { id: 4, title: 'Patient Details', description: "Creates a patient details block" },
  { id: 5, title: 'Medical History', description: "Creates a medical history block" },
  { id: 6, title: 'Family Details', description: "Creates a family details block" },
  { id: 14, title: 'Landing Page', description: "Creates a landing page block" },
  { id: 7, title: 'Make a Course', description: "Creates a Course block" },
  { id: 8, title: 'Screening Questionnaire', description: "Creates a questionnaire block" },
  { id: 9, title: 'Optional Questionnaire', description: "Creates a optional questionnaire block" },
  // { id: 10, title: 'Consultation Form', description: "Creates a consultation block" },
  { id: 11, title: 'Schedule Appointment', description: "Creates a schedule appointment block" },
  { id: 12, title: 'Consultation Form', description: "Creates a consultation form block" },
  { id: 15, title: 'Submission Result', description: "Creates a submission result block" },
  { id: 16, title: 'Consent Form', description: "Creates a consent form block" },
  // { id: 13, title: 'Question & Answer', description: "Creates a question and answer block" },
];

interface CreateWorkflowModalProps {
  onClose: () => void;
  existingWorkflow?: SavedWorkflow;
  onSave: (workflow: SavedWorkflow) => void;
}

const CreateWorkflowModal: React.FC<CreateWorkflowModalProps> = ({
  onClose,
  existingWorkflow,
  onSave
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBlocks, setSelectedBlocks] = useState<WorkflowBlock[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (existingWorkflow) {
      setName(existingWorkflow.name);
      setDescription(existingWorkflow.description);
      setSelectedBlocks(existingWorkflow.blocks);
    }
  }, [existingWorkflow]);

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter a workflow name');
      return;
    }

    if (selectedBlocks.length === 0) {
      setError('Please select at least one block');
      return;
    }

    const workflow: SavedWorkflow = {
      id: existingWorkflow?.id || Date.now().toString(),
      name,
      description,
      blocks: selectedBlocks,
      createdAt: existingWorkflow?.createdAt || new Date()
    };

    onSave(workflow);
    onClose();
  };

  const handleBlockToggle = (block: WorkflowBlock) => {
    setSelectedBlocks(blocks => {
      const exists = blocks.find(b => b.id === block.id);
      if (exists) {
        return blocks.filter(b => b.id !== block.id);
      } else {
        return [...blocks, block];
      }
    });
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= selectedBlocks.length) return;

    const newBlocks = [...selectedBlocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);
    setSelectedBlocks(newBlocks);
  };

  return (
    <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4 pt-20">
      <div
        className="custom-horizontal-scrollbar bg-white rounded-md w-full max-w-4xl max-h-[84vh] overflow-y-auto px-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-green-900">
                {existingWorkflow ? 'Edit Workflow' : 'Create a new workflow'}
              </h2>
              <p className="w-full mt-2">Set the name and description, then select blocks for your workflow</p>
            </div>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Label>Workflow Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workflow name"
                className="w-full"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your workflow"
                className="w-full"
                rows={4}
              />
            </div>

            <div>
              <Label className="mb-4 block">Available Blocks</Label>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {workflowBlocks.map((block) => (
                  <div
                    key={block.id}
                    className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={selectedBlocks.some(b => b.id === block.id)}
                      onCheckedChange={() => handleBlockToggle(block)}
                    />
                    <div>
                      <Label className="text-base font-medium">{block.title}</Label>
                      <p className="text-sm text-gray-500">{block.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedBlocks.length > 0 && (
              <div>
                <Label className="mb-4 block">Selected Blocks Order</Label>
                <div className="space-y-2">
                  {selectedBlocks.map((block, index) => (
                    <div
                      key={block.id}
                      className="flex items-center justify-between bg-white p-3 rounded-md border"
                    >
                      <div className="flex items-center space-x-3">
                        <GripVertical className="text-gray-400 cursor-move" />
                        <span>{block.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveBlock(index, index - 1)}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveBlock(index, index + 1)}
                          disabled={index === selectedBlocks.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBlockToggle(block)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 space-x-3 flex justify-end">
            <Button onClick={onClose} variant="outline">Cancel</Button>
            <Button onClick={handleSave} className="bg-green-800 text-white hover:bg-green-700">
              {existingWorkflow ? 'Update Workflow' : 'Create Workflow'}
            </Button>
          </div>
        </div>
      </div>
      <style jsx global>{`
.custom-horizontal-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-horizontal-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; /* Track color */
  border-radius: 6px;
}

.custom-horizontal-scrollbar::-webkit-scrollbar-thumb {
  background: #1c6461; /* Thumb color */
  border-radius: 6px;
}
`}</style>
    </div>
  );
};

export default CreateWorkflowModal;
