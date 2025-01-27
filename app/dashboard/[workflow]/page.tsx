'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import OTPTemplateEditor from '@/components/TemplateEditors/OTP';
import PaymentTemplateEditor from '@/components/TemplateEditors/Payment';
import FormBlock from '@/components/TemplateEditors/FormBlock';
import { BookingConsultationTemplate, FamilyHistoryTemplate, MedicalHistoryTemplate, OptionalQuestionnaireTemplate, PatientDetailsTemplate, ScreeningQuestinnaireTemplate } from '@/components/TemplateEditors/constants';
import BookConsultation from '@/components/TemplateEditors/BookConsultation';
import { useRouter } from 'next/navigation';

const blockComponents = {
  'OTP Code': { component: OTPTemplateEditor },
  'Payment Request': { component: PaymentTemplateEditor },
  'Patient Details': {
    component: FormBlock,
    data: PatientDetailsTemplate
  },
  'Medical History': {
    component: FormBlock,
    data: MedicalHistoryTemplate
  },
  'Family Details': {
    component: FormBlock,
    data: FamilyHistoryTemplate
  },
  'Screening Questionnaire': {
    component: FormBlock,
    data: ScreeningQuestinnaireTemplate
  },
  'Book a Consultation': {
    component: BookConsultation,
    data: BookingConsultationTemplate,
  },
  'Optional Questionnaire': {
    component: FormBlock,
    data: OptionalQuestionnaireTemplate
  },
};

export default function WorkflowViewer({ params }) {
  const [workflow, setWorkflow] = useState(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [blockData, setBlockData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Load workflow from localStorage
    const workflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const currentWorkflow = workflows.find(w => w.id === params.workflow);
    if (currentWorkflow) {
      setWorkflow(currentWorkflow);
    }
  }, [params.workflow]);

  if (!workflow) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const currentBlock = workflow.blocks[currentBlockIndex];
  const progress = ((currentBlockIndex + 1) / workflow.blocks.length) * 100;

  const BlockComponent = blockComponents[currentBlock.title]?.component;
  const defaultData = blockComponents[currentBlock.title]?.data;

  const handleNext = () => {
    if (currentBlockIndex < workflow.blocks.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
    } else {
      router.push('/dashboard/home');
    }
  };

  const handlePrevious = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };

  const handleBlockDataChange = (data) => {
    setBlockData({
      ...blockData,
      [currentBlock.id]: data
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] w-full">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-900">{workflow.name}</h1>
          <p className="text-gray-600 mt-2">{workflow.description}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Block {currentBlockIndex + 1} of {workflow.blocks.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Block Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {workflow.blocks.map((block, index) => (
            <button
              key={block.id}
              onClick={() => setCurrentBlockIndex(index)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${index === currentBlockIndex
                ? 'bg-teal-800 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              {block.title}
            </button>
          ))}
        </div>

        {/* Current Block */}
        <Card className="mb-8">
          {BlockComponent && (
            <BlockComponent
              data={blockData[currentBlock.id] || defaultData}
              onTemplateChange={handleBlockDataChange}
              isPreview={true}
            />
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentBlockIndex === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="bg-teal-800 text-white hover:bg-teal-700"
          >
            {currentBlockIndex === workflow.blocks.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
