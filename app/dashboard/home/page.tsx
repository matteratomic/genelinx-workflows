'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, LayoutDashboard, Plus, Settings, Share2, Trash } from 'lucide-react';
import CreateWorkflowModal from '@/components/CreateWorkflowModal';
import Link from 'next/link';
import { generateWorkflowShareLink } from '@/utils/workflowLink';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import Loader from '@/components/Loader';

interface SavedWorkflow {
  id: string;
  name: string;
  description: string;
  blocks: any[];
  createdAt: Date;
}

export function WorkflowCard({ workflow, onEdit, onDelete }) {
  const handleShare = () => {
    const link = generateWorkflowShareLink(workflow);
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  };

  return (
    <Card className="overflow-hidden relative ">
      <Button
        onClick={() => {
          const response = window.confirm('Would you like to delete this workflow?')
          response && onDelete(workflow.id);
        }}
        className="absolute top-4 right-4 bg-white hover:bg-white" size="icon">
        <Trash
          className="text-red-500 w-4 h-4" />
      </Button>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{workflow.name}</h3>
        <p className="text-slate-600 mb-4 w-10/12">{workflow.description}</p>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Blocks:</h4>
          <div className="flex flex-wrap gap-2">
            {workflow.blocks.map((block) => (
              <span
                key={block.id}
                className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-sm"
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
            <Button className="text-white bg-green-700 hover:bg-green-600">
              Open
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [workflows, setWorkflows] = useState<SavedWorkflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<SavedWorkflow | null>(null);

  const supabase = createClient()

  const saveWorkflow = async (workflow: Omit<SavedWorkflow, 'id' | 'createdAt'>) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('workflows')
      .insert({
        name: workflow.name,
        description: workflow.description,
        blocks: workflow.blocks
      })
      .select()
      .single();

    setLoading(false)
    if (error) throw error;
    return data;
  }

  const updateWorkflow = async (workflow: SavedWorkflow) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('workflows')
      .update({
        name: workflow.name,
        description: workflow.description,
        blocks: workflow.blocks
      })
      .eq('id', workflow.id)
      .select()
      .single();

    setLoading(false)
    if (error) throw error;
    return data;
  }

  const listWorkflows = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('workflows')
      .select()
      .order('created_at', { ascending: false });

    setLoading(false)
    if (error) throw error;
    return data;
  }

  const deleteWorkflow = async (id: string) => {
    setLoading(true)
    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', id);

    setWorkflows(currentWorkflows => {
      return currentWorkflows.filter(w => w.id !== id);
    })
    setLoading(false)
    if (error) throw error;
  }

  // Load saved workflows on mount
  useEffect(() => {
    const loadWorkflows = async () => {
      const workflows = await listWorkflows();
      setWorkflows(workflows);
    }

    loadWorkflows();
  }, []);


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

    if (selectedWorkflow) {
      return updateWorkflow(workflow);
    } else {
      return saveWorkflow(workflow);
    }

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
            <h1 className="text-4xl font-bold text-green-900">Dashboard</h1>
            <p className="text-slate-600 mt-3">
              Manage your workflows and account settings from the dashboard
            </p>
          </div>
          {workflows.length ? <Button onClick={() => toggleModal()} className="mt-6 bg-green-700 text-white hover:bg-green-800">
            <Plus className="w-4 h-4 mr-2" />
            Add new workflow
          </Button> : null}
        </header>

        {/* Main Content */}
        <div className="">
          <h2 className="text-xl font-semibold text-green-900 mb-6">Workflows</h2>
          {workflows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflows.map((workflow) => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onEdit={toggleModal}
                  onDelete={deleteWorkflow}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <LayoutDashboard strokeWidth={1} className="mx-auto w-32 h-32 text-gray-800" />
                <div className="mt-4 text-xl font-medium text-gray-800">No workflows yet</div>
                <div className="mt-1 font-medium text-gray-400 text-center w-1/3 mx-auto">
                  You haven't created any workflows yet.
                </div>
                <Button onClick={() => toggleModal()} className="mt-6 bg-green-700 text-white hover:bg-green-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add new workflow
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {loading ? <Loader /> : null}
    </div>
  );
};

export default Dashboard;
