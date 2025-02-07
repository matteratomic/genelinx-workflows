import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OTPTemplateEditor from './TemplateEditors/OTP';
import PaymentTemplateEditor from './TemplateEditors/Payment';
import FormBlock from './TemplateEditors/FormBlock';
import {
  OTPTemplate,
  PaymentTemplate,
  BookingTemplate,
  ConsentFormTemplate,
  CourseBlockTemplate,
  LandingPageTemplate,
  FamilyHistoryTemplate,
  MedicalHistoryTemplate,
  PatientDetailsTemplate,
  SubmissionResultTemplate,
  BookingConsultationTemplate,
  ScheduleAppointmentTemplate,
  ScreeningQuestinnaireTemplate,
  OptionalQuestionnaireTemplate,
} from './TemplateEditors/constants';
import BookConsultation from './TemplateEditors/BookConsultation';
import ScheduleAppointment from './TemplateEditors/ScheduleAppointment';
import Booking from './TemplateEditors/BookingForm';
import LandingPage from './TemplateEditors/LandingPage';
import CourseBlock from './Course';
import SubmissionResult from './TemplateEditors/SubmissionResult';
import ConsentForm from './TemplateEditors/ConsentForm';

const templateMap = {
  'OTP Code': {
    template: OTPTemplateEditor,
    data: OTPTemplate
  },
  'Payment Request': {
    template: PaymentTemplateEditor,
    data: PaymentTemplate
  },
  'Patient Details': {
    template: FormBlock,
    data: PatientDetailsTemplate
  },
  'Medical History': {
    template: FormBlock,
    data: MedicalHistoryTemplate
  },
  'Family Details': {
    template: FormBlock,
    data: FamilyHistoryTemplate
  },
  'Make a Course': {
    template: CourseBlock,
    data: CourseBlockTemplate
  },
  'Screening Questionnaire': {
    template: FormBlock,
    data: ScreeningQuestinnaireTemplate
  },
  'Landing Page': {
    template: LandingPage,
    data: LandingPageTemplate
  },
  'Book a Consultation': {
    template: BookConsultation,
    data: BookingConsultationTemplate,
  },
  'Optional Questionnaire': {
    template: FormBlock,
    data: OptionalQuestionnaireTemplate
  },
  'Schedule Appointment': {
    template: ScheduleAppointment,
    data: ScheduleAppointmentTemplate
  },
  'Consultation Form': {
    template: Booking,
    data: BookingTemplate
  },
  'Submission Result': {
    template: SubmissionResult,
    data: SubmissionResultTemplate
  },
  'Consent Form': {
    template: ConsentForm,
    data: ConsentFormTemplate
  },
}

interface CreateNewBlockProps {
  onClose: () => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  onSave: (name: string, templateData: any) => void;
  existingBlock?: any;
}

const CreateNewBlock: React.FC<CreateNewBlockProps> = ({
  onClose,
  selectedTemplate,
  setSelectedTemplate,
  onSave,
  existingBlock
}) => {
  const [blockName, setBlockName] = useState('');
  const [templateState, setTemplateState] = useState<any>(null);
  const templateRef = useRef<any>();

  useEffect(() => {
    if (existingBlock) {
      setBlockName(existingBlock.name);
      // Load the saved template state
      setTemplateState(existingBlock.template);
    } else {
      // console.log('This is the selectedTemplate', selectedTemplate)
      // console.log('This is what is being set in templateState', templateMap[selectedTemplate]?.data)
      // For new blocks, use the default template data
      setTemplateState(templateMap[selectedTemplate]?.data);
    }
  }, [existingBlock, selectedTemplate]);

  const Template = templateMap[selectedTemplate]?.template;

  const handleSave = () => {
    if (!blockName.trim()) {
      alert('Please enter a block name');
      return;
    }

    // Get the latest template state
    const currentTemplateState = templateRef.current || templateState;
    console.log(`SelectedTemplate ${blockName}`, selectedTemplate)
    console.log(`Calling handleSave ${blockName}`, templateRef.current)
    console.log(`Calling handleSave 2 ${blockName}`, templateState)
    // Save both the name and template state
    onSave(blockName, currentTemplateState);
  };

  const handleTemplateChange = (newState: any) => {
    console.log('addding to master state', newState)
    templateRef.current = newState;
    setTemplateState(newState);
    console.log('here it is', templateState)
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg w-full max-h-[84%] max-w-5xl overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="py-2 px-6">
              <h2 className="text-3xl font-bold text-green-900">
                {existingBlock ? `Edit ${existingBlock.name}` : selectedTemplate ? `${selectedTemplate} Block` : "Choose a block template"}
              </h2>
              <p className="w-full mt-2">
                {selectedTemplate ? "Edit the template and save to create a custom block" : "Select a template which you would like your custom block to use"}
              </p>
            </div>
          </div>

          {selectedTemplate && (
            <div className="mb-4 px-6">
              <label className="block text-sm font-medium mb-1">Block Name</label>
              <Input
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
                placeholder="Enter a name for this block"
                className="w-full max-w-md"
              />
            </div>
          )}

          {Template && (
            <Template
              blockName={blockName}
              setBlockName={setBlockName}
              data={templateState}
              onTemplateChange={handleTemplateChange}
            />
          )}
          {/* {JSON.stringify(templateState.questions, null, 3)} */}
        </div>
        <div className="sticky bottom-0 right-0 left-0 bg-gray-100 p-4 mt-6 space-x-3 flex justify-end">
          <Button onClick={onClose} variant="outline">Close</Button>
          {selectedTemplate && (
            <Button onClick={handleSave} className="bg-green-800 text-white hover:bg-green-700">
              {existingBlock ? "Update" : "Save"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNewBlock;
