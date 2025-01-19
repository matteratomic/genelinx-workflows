'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const SettingsPage = () => {

  return (
    <div className="min-h-screen w-full bg-[#f6f6f6]">
      <svg className="absolute opacity-80 scale-y-105" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1422 800"><g shape-rendering="crispEdges" stroke-linejoin="round" fill="#ffffff"><polygon points="1422,0 1422,200 1066.5,200"></polygon><polygon points="1066.5,0 1066.5,200 711,200"></polygon><polygon points="888.75,200 1066.5,300 888.75,300"></polygon><polygon points="888.75,200 888.75,300 711,200"></polygon><polygon points="888.75,300 888.75,400 711,400"></polygon><polygon points="1066.5,300 1066.5,400 888.75,400"></polygon><polygon points="1422,200 1422,400 1066.5,400"></polygon><polygon points="711,200 711,0 355.5,0"></polygon><polygon points="355.5,0 355.5,200 0,200"></polygon><polygon points="355.5,200 355.5,400 0,200"></polygon><polygon points="711,400 355.5,200 711,200"></polygon><polygon points="711,600 355.5,400 355.5,600"></polygon><polygon points="355.5,600 0,400 0,600"></polygon><polygon points="355.5,800 0,800 0,600"></polygon><polygon points="355.5,800 711,600 711,800"></polygon><polygon points="1066.5,400 1422,600 1066.5,600"></polygon><polygon points="1066.5,400 888.75,500 888.75,400"></polygon><polygon points="888.75,400 888.75,500 711,400"></polygon><polygon points="888.75,500 711,600 888.75,600"></polygon><polygon points="1066.5,500 1066.5,600 888.75,600"></polygon><polygon points="711,600 1066.5,800 1066.5,600"></polygon><polygon points="1422,600 1066.5,800 1422,800"></polygon></g><g fill="hsl(220, 62%, 45%)" stroke-width="3" stroke="hsl(220, 43%, 13%)"></g></svg>
      <div className="relative p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-teal-900">Settings</h1>
            <p className="text-slate-600 mt-3">
              Edit the username and password credentials for authentication
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-teal-900 mb-6">Account settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-md space-y-4">
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
              <div className="mt-6 space-x-3 flex justify-end">
                <Button onClick={() => { }} variant="outline">Close</Button>
                <Button className="bg-green-800 text-white hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
