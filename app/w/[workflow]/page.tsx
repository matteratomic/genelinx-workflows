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
  ConsentFormTemplate,
  CourseBlockTemplate,
  FamilyHistoryTemplate,
  LandingPageTemplate,
  MedicalHistoryTemplate,
  OptionalQuestionnaireTemplate,
  OTPTemplate,
  PatientDetailsTemplate,
  PaymentTemplate,
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
import { createClient } from '@/utils/supabase/client';
import Loader from '@/components/Loader';
import ConsentForm from '@/components/TemplateEditors/ConsentForm';

const blockComponents = {
  'OTP Code': {
    component: OTPTemplateEditor,
    data: OTPTemplate,
  },
  'Payment Request': {
    component: PaymentTemplateEditor,
    data: PaymentTemplate,
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
  'Consent Form': {
    component: ConsentForm,
    data: ConsentFormTemplate
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
  const [loading, setLoading] = useState(false)

  const supabase = createClient()


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
  }, [keyBindings, currentBlockIndex, handleNext, handlePrevious]);

  useEffect(() => {

    const loadBlockData = async (id: string) => {
      const { data } = await supabase.from('blocks').select('template').eq('id', id).single()
      // console.log('this is the template data', data)
      return data?.template
    }

    const setBlockData = async (workflows: { id: string, blocks: any[], name: string }) => {
      const workflowsWithData = await Promise.all(workflows.blocks.map(async (b) => {
        if (b.custom) {
          const data = await loadBlockData(b.id)
          // console.log('This is the data for the block', data)
          return { ...b, type: b.type, data }
        }
        return b
      }))


      console.log('CHECK THIS OUT', workflowsWithData)

      setWorkflow({
        ...workflows,
        blocks: workflowsWithData
      });
      setLoading(false)
    }

    // loadBlockData()
    // Load workflow
    try {
      setLoading(true)
      const decodedWorkflow = JSON.parse(decodeURIComponent(unwrappedParams.workflow));
      console.log('This is the decoded workflow', decodedWorkflow)
      // setWorkflow(decodedWorkflow);
      setBlockData(decodedWorkflow)
    } catch (e) {
      setLoading(false)
      console.error('Failed to decode workflow:', e);
    }

    // Load key bindings
    const savedBindings = localStorage.getItem('keyBindings');
    if (savedBindings) {
      setKeyBindings(JSON.parse(savedBindings));
    }
  }, [unwrappedParams.workflow,]);



  if (!workflow) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const currentBlock = workflow.blocks[currentBlockIndex];
  const progress = ((currentBlockIndex + 1) / workflow.blocks.length) * 100;

  // const BlockComponent = blockComponents[currentBlock?.type]?.component;
  const isCustomBlock = currentBlock?.custom
  const BlockComponent = blockComponents[isCustomBlock ? currentBlock?.type : currentBlock.title]?.component;
  const defaultData = isCustomBlock ? currentBlock.data : blockComponents[currentBlock?.title]?.data;

  if (!BlockComponent) return <><div>{JSON.stringify(workflow, null, 3)}</div></>

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={progress} className="h-1" />
      </div>
      {/* <div className="fixed inset-0 bg-red-100 top-0 z-10 flex items-center justify-center"> */}
      {/*   <div> */}
      {/*     {JSON.stringify(currentBlock, null, 3)} */}
      {/*   </div> */}
      {/* </div> */}
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
      {loading ? <Loader /> : null}
    </div>
  );
}
