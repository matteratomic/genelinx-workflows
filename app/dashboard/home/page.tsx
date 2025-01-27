'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Settings, Share2 } from 'lucide-react';
import CreateWorkflowModal from '@/components/CreateWorkflowModal';
import Link from 'next/link';
import { generateWorkflowShareLink } from '@/utils/workflowLink';
import { toast } from 'sonner';

interface SavedWorkflow {
  id: string;
  name: string;
  description: string;
  blocks: any[];
  createdAt: Date;
}

export function WorkflowCard({ workflow, onEdit }) {
  const handleShare = () => {
    const link = generateWorkflowShareLink(workflow);
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{workflow.name}</h3>
        <p className="text-slate-600 mb-4 w-10/12">{workflow.description}</p>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Blocks:</h4>
          <div className="flex flex-wrap gap-2">
            {workflow.blocks.map((block) => (
              <span
                key={block.id}
                className="px-2 py-1 bg-teal-50 text-teal-700 rounded-md text-sm"
              >
                {block.title}
              </span>
            ))}
          </div>
        </div>
        <div className='flex justify-end space-x-3'>
          <Button
            variant="outline"
            onClick={() => onEdit(workflow)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Link href={generateWorkflowShareLink(workflow)}>
            <Button className="text-white bg-teal-700 hover:bg-teal-600">
              Open
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

const Dashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [workflows, setWorkflows] = useState<SavedWorkflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<SavedWorkflow | null>(null);

  // Load saved workflows on mount
  useEffect(() => {
    const savedWorkflows = localStorage.getItem('workflows');
    if (savedWorkflows) {
      setWorkflows(JSON.parse(savedWorkflows));
    }
  }, []);

  // Save workflows whenever they change
  useEffect(() => {
    localStorage.setItem('workflows', JSON.stringify(workflows));
  }, [workflows]);

  const toggleModal = (workflow?: SavedWorkflow) => {
    setSelectedWorkflow(workflow || null);
    setDialogOpen(!dialogOpen);
  };

  const handleSaveWorkflow = (workflow: SavedWorkflow) => {
    setWorkflows(currentWorkflows => {
      if (selectedWorkflow) {
        // Update existing workflow
        return currentWorkflows.map(w =>
          w.id === workflow.id ? workflow : w
        );
      } else {
        // Add new workflow
        return [...currentWorkflows, workflow];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] w-full">
      <svg className="absolute opacity-80 scale-y-105" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1422 800">
        <g shape-rendering="crispEdges" stroke-linejoin="round" fill="#ffffff">
          {/* SVG paths */}
        </g>
      </svg>
      {dialogOpen && (
        <CreateWorkflowModal
          onClose={() => toggleModal()}
          existingWorkflow={selectedWorkflow}
          onSave={handleSaveWorkflow}
        />
      )}
      <div className="p-8 relative">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-teal-900">Dashboard</h1>
            <p className="text-slate-600 mt-3">
              Manage your workflows and account settings from the dashboard
            </p>
          </div>
          <Button
            onClick={() => toggleModal()}
            className="hover:bg-teal-700 bg-teal-800">
            + Add new workflow
          </Button>
        </header>

        {/* Main Content */}
        <div className="mt-20">
          <h2 className="text-xl font-semibold text-teal-900 mb-6">Workflows</h2>
          {workflows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-24">
              {workflows.map((workflow) => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onEdit={toggleModal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">No workflows yet</h3>
              <p className="mt-2 text-gray-500">Get started by creating your first workflow</p>
              <Button
                onClick={() => toggleModal()}
                className="mt-4 hover:bg-teal-700 bg-teal-800">
                + Add new workflow
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

{/* <Card key={workflow.id} className="overflow-hidden"> */ }
{/*   <CardContent className="p-6"> */ }
{/*     <h3 className="text-xl font-semibold mb-2">{workflow.name}</h3> */ }
{/*     <p className="text-slate-600 mb-4 w-10/12">{workflow.description}</p> */ }
{/*     <div className="mb-4"> */ }
{/*       <h4 className="text-sm font-medium text-gray-500 mb-2">Blocks:</h4> */ }
{/*       <div className="flex flex-wrap gap-2"> */ }
{/*         {workflow.blocks.map((block) => ( */ }
{/*           <span */ }
{/*             key={block.id} */ }
{/*             className="px-2 py-1 bg-teal-50 text-teal-700 rounded-md text-sm" */ }
{/*           > */ }
{/*             {block.title} */ }
{/*           </span> */ }
{/*         ))} */ }
{/*       </div> */ }
{/*     </div> */ }
{/*     <div className='flex justify-end space-x-3'> */ }
{/*       <Button */ }
{/*         variant="outline" */ }
{/*         onClick={() => toggleModal(workflow)} */ }
{/*       > */ }
{/*         Edit */ }
{/*       </Button> */ }
{/*       <Link href={`/dashboard/${workflow.id}`}> */ }
{/*         <Button className="text-white bg-teal-700 hover:bg-teal-600"> */ }
{/*           Open */ }
{/*         </Button> */ }
{/*       </Link> */ }
{/*     </div> */ }
{/*   </CardContent> */ }
{/* </Card> */ }
