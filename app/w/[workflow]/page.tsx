'use client';

import React, { useState, useEffect } from 'react';
import { use } from 'react'; // Import `use` for unwrapping promises
import { Progress } from '@/components/ui/progress';
import OTPTemplateEditor from '@/components/TemplateEditors/OTP';
import PaymentTemplateEditor from '@/components/TemplateEditors/Payment';
import FormBlock from '@/components/TemplateEditors/FormBlock';
import {
  BookingConsultationTemplate,
  BookingTemplate,
  FamilyHistoryTemplate,
  MedicalHistoryTemplate,
  OptionalQuestionnaireTemplate,
  PatientDetailsTemplate,
  ScheduleAppointmentTemplate,
  ScreeningQuestinnaireTemplate,
} from '@/components/TemplateEditors/constants';
import BookConsultation from '@/components/TemplateEditors/BookConsultation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Booking from '@/components/TemplateEditors/BookingForm';
import ScheduleAppointment from '@/components/TemplateEditors/ScheduleAppointment';

const blockComponents = {
  'OTP Code': {
    component: OTPTemplateEditor
  },
  'Payment Request': {
    component: PaymentTemplateEditor
  },
  'Patient Details': {
    component: FormBlock,
    data: PatientDetailsTemplate,
  },
  'Medical History': {
    component: FormBlock,
    data: MedicalHistoryTemplate,
  },
  'Family Details': {
    component: FormBlock,
    data: FamilyHistoryTemplate,
  },
  'Screening Questionnaire': {
    component: FormBlock,
    data: ScreeningQuestinnaireTemplate,
  },
  'Book a Consultation': {
    component: BookConsultation,
    data: BookingConsultationTemplate,
  },
  'Optional Questionnaire': {
    component: FormBlock,
    data: OptionalQuestionnaireTemplate,
  },
  'Consultation Form': {
    component: Booking,
    data: BookingTemplate,
  },
  'Schedule Appointment': {
    component: ScheduleAppointment,
    data: ScheduleAppointmentTemplate,
  },

};


export default function WorkflowPage({ params }) {
  const unwrappedParams = use(params); // Use `use` to unwrap the params Promise
  const [workflow, setWorkflow] = useState(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [workflowData, setWorkflowData] = useState({});
  const [keyBindings, setKeyBindings] = useState({
    previousBlock: 'j',
    nextBlock: 'k'
  });

  useEffect(() => {
    // Load workflow
    try {
      const decodedWorkflow = JSON.parse(decodeURIComponent(unwrappedParams.workflow));
      setWorkflow(decodedWorkflow);
    } catch (e) {
      console.error('Failed to decode workflow:', e);
    }

    // Load key bindings
    const savedBindings = localStorage.getItem('keyBindings');
    if (savedBindings) {
      setKeyBindings(JSON.parse(savedBindings));
    }
  }, [unwrappedParams.workflow]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const { key } = e;
      const { activeElement } = document;

      // Don't trigger if user is typing in an input
      if (activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (key === keyBindings.previousBlock) {
        handlePrevious();
      } else if (key === keyBindings.nextBlock) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keyBindings, currentBlockIndex]);

  const handlePrevious = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(prev => prev - 1);
      toast.info('Navigated to previous block');
    }
  };

  const handleNext = () => {
    if (currentBlockIndex < workflow?.blocks.length - 1) {
      setCurrentBlockIndex(prev => prev + 1);
      toast.info('Navigated to next block');
    }
  };

  if (!workflow) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const currentBlock = workflow.blocks[currentBlockIndex];
  const progress = ((currentBlockIndex + 1) / workflow.blocks.length) * 100;

  const BlockComponent = blockComponents[currentBlock.title]?.component;
  const defaultData = blockComponents[currentBlock.title]?.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={progress} className="h-1" />
        <div className="absolute top-2 right-4 text-sm text-gray-500">
          Press {keyBindings.previousBlock} for previous, {keyBindings.nextBlock} for next
        </div>
      </div>

      <div className="min-h-screen pt-8 flex items-center justify-center">
        {BlockComponent && (
          <BlockComponent
            data={workflowData[currentBlock.id] || defaultData}
            onComplete={(data) => {
              setWorkflowData({
                ...workflowData,
                [currentBlock.id]: data
              });
              handleNext();
            }}
            workflowData={workflowData}
            isWorkflowBlock={true}
          />
        )}
      </div>

      {/* Optional: Visual navigation buttons */}
      <div className="fixed bottom-4 right-4 space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentBlockIndex === 0}
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous ({keyBindings.previousBlock})
        </button>
        <button
          onClick={handleNext}
          disabled={currentBlockIndex === workflow.blocks.length - 1}
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next ({keyBindings.nextBlock})
        </button>
      </div>
    </div>
  );
}
