import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

const WorkflowModal = ({ onClose }: { onClose: () => void }) => {
  const workflowBlocks = [
    { id: 1, title: 'OTP Code', gradient: 'from-[#b12a75] to-[#318762]' },
    { id: 2, title: 'Book a Consultation', gradient: 'from-[#b12a75] to-[#318762]' },
    { id: 3, title: 'Payment Request', gradient: 'from-[#b12a75] to-[#318762]' },
    { id: 3, title: 'Schedule Appointment', gradient: 'from-[#b12a75] to-[#318762]' },
    { id: 4, title: 'Consultation Form', gradient: 'from-purple-600 to-green-400' },
    { id: 5, title: 'Question & Answer', gradient: 'from-purple-600 to-green-400' },
  ];

  return (
    <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl px-6 pt-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-green-900">Create a new workflow</h2>
              <p className="w-10/12 mt-2">Set the name and description as well as add blocks to your workflow from here</p>
            </div>
            <Button className="bg-green-800 text-white hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add new block
            </Button>
          </div>

          <div className="mt-12 flex gap-4 overflow-x-auto pb-6">
            {workflowBlocks.map((block) => (
              <Card
                role="button"
                style={{
                  backgroundImage: "url('/workflow-block-image.png')"
                }}
                key={block.id} className={`cursor-pointer bg-cover bg-center flex-shrink-0 w-32 h-32 relative bg-gradient-to-br ${block.gradient} text-white`}>
                <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full border border-white text-white flex items-center justify-center font-semibold text-sm">
                    {block.id}
                  </div>
                  <p className="text-center text-sm mt-4">{block.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                placeholder="Name of workflow"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="A description of the workflow"
                className="w-full"
                rows={4}
              />
            </div>
          </div>

          <div className="mt-6 space-x-3 flex justify-end">
            <Button onClick={onClose} variant="outline">Close</Button>
            <Button className="bg-green-800 text-white hover:bg-green-700">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowModal;
