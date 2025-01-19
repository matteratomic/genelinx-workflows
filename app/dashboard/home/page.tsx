'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import CreateWorkflowModal from '@/components/CreateWorkflowModal';
import Link from 'next/link';

const Dashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleModal = () => setDialogOpen(!dialogOpen)

  const workflows = [
    {
      title: 'Telegenetics',
      description: 'Virtual genetic consultation to discuss family history and potential inherited health conditions.',
      image: '/digital-telegenetics-image.png'
    },
    {
      title: 'Digital Education',
      description: 'Virtual genetic consultation to discuss family history and potential inherited health conditions.',
      image: '/digital-education-image.png'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <svg className="absolute opacity-80 scale-y-105" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1422 800"><g shape-rendering="crispEdges" stroke-linejoin="round" fill="#ffffff"><polygon points="1422,0 1422,200 1066.5,200"></polygon><polygon points="1066.5,0 1066.5,200 711,200"></polygon><polygon points="888.75,200 1066.5,300 888.75,300"></polygon><polygon points="888.75,200 888.75,300 711,200"></polygon><polygon points="888.75,300 888.75,400 711,400"></polygon><polygon points="1066.5,300 1066.5,400 888.75,400"></polygon><polygon points="1422,200 1422,400 1066.5,400"></polygon><polygon points="711,200 711,0 355.5,0"></polygon><polygon points="355.5,0 355.5,200 0,200"></polygon><polygon points="355.5,200 355.5,400 0,200"></polygon><polygon points="711,400 355.5,200 711,200"></polygon><polygon points="711,600 355.5,400 355.5,600"></polygon><polygon points="355.5,600 0,400 0,600"></polygon><polygon points="355.5,800 0,800 0,600"></polygon><polygon points="355.5,800 711,600 711,800"></polygon><polygon points="1066.5,400 1422,600 1066.5,600"></polygon><polygon points="1066.5,400 888.75,500 888.75,400"></polygon><polygon points="888.75,400 888.75,500 711,400"></polygon><polygon points="888.75,500 711,600 888.75,600"></polygon><polygon points="1066.5,500 1066.5,600 888.75,600"></polygon><polygon points="711,600 1066.5,800 1066.5,600"></polygon><polygon points="1422,600 1066.5,800 1422,800"></polygon></g><g fill="hsl(220, 62%, 45%)" stroke-width="3" stroke="hsl(220, 43%, 13%)"></g></svg>
      {dialogOpen ? <CreateWorkflowModal onClose={toggleModal} /> : null}
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
            onClick={toggleModal}
            className="hover:bg-teal-700 bg-teal-800">
            + Add new workflow
          </Button>
        </header>

        {/* Main Content */}
        <div className="mt-20">
          <h2 className="text-xl font-semibold text-teal-900 mb-6">Workflows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-24">
            {workflows.map((workflow, index) => (
              <Card key={index} className="overflow-hidden">
                <img src={workflow.image} className="h-32 w-full object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{workflow.title}</h3>
                  <p className="text-slate-600 mb-4 w-10/12">{workflow.description}</p>
                  <div className='flex justify-end space-x-3'>
                    <Button variant="outline">
                      Edit
                    </Button>
                    <Link
                      href="/dashboard/telegenetics">
                      <Button
                        className="text-white bg-teal-700 hover:bg-teal-600">
                        Open
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
