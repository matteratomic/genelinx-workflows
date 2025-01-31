'use client';

import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { Progress } from '@/components/ui/progress';
import OTPTemplateEditor from '@/components/TemplateEditors/OTP';
import PaymentTemplateEditor from '@/components/TemplateEditors/Payment';
import FormBlock from '@/components/TemplateEditors/FormBlock';
import {
  BookingConsultationTemplate,
  BookingTemplate,
  CourseBlockTemplate,
  FamilyHistoryTemplate,
  LandingPageTemplate,
  MedicalHistoryTemplate,
  OptionalQuestionnaireTemplate,
  PatientDetailsTemplate,
  ScheduleAppointmentTemplate,
  ScreeningQuestinnaireTemplate,
  SubmissionResultTemplate,
} from '@/components/TemplateEditors/constants';
import BookConsultation from '@/components/TemplateEditors/BookConsultation';
import { toast } from 'sonner';
import Booking from '@/components/TemplateEditors/BookingForm';
import ScheduleAppointment from '@/components/TemplateEditors/ScheduleAppointment';
import LandingPage from '@/components/TemplateEditors/LandingPage';
import CourseBlock from '@/components/Course';
import SubmissionResult from '@/components/TemplateEditors/SubmissionResult';

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
  'Make a Course': {
    component: CourseBlock,
    data: CourseBlockTemplate
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
  'Landing Page': {
    component: LandingPage,
    data: LandingPageTemplate
  },
  'Submission Result': {
    component: SubmissionResult,
    data: SubmissionResultTemplate
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

  // const BlockComponent = blockComponents[currentBlock?.title]?.component;
  const BlockComponent = blockComponents[currentBlock?.title]?.component;
  const defaultData = blockComponents[currentBlock?.title]?.data;

  if (!BlockComponent) return <></>

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={progress} className="h-1" />
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

      <div className="fixed bottom-4 right-4 space-x-2">
        <div className="text-sm text-gray-500">
          Press {keyBindings.previousBlock} for previous, {keyBindings.nextBlock} for next
        </div>
      </div>

    </div>
  );
}
