import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Plus } from 'lucide-react';
import OTPTemplateEditor from './TemplateEditors/OTP';
import PaymentTemplateEditor from './TemplateEditors/Payment';
import FormBlock from './TemplateEditors/FormBlock';
import { FamilyHistoryTemplate, MedicalHistoryTemplate, PatientDetailsTemplate } from './TemplateEditors/constants';

const templateMap = {
  'OTP Code': { template: OTPTemplateEditor },
  'Payment Request': { template: PaymentTemplateEditor },
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
  }

}

const BlocksModal = ({
  onClose,
  onSave,
  selectedTemplate,
  setSelectedTemplate,
  blocks,
  setBlocks
}: {
  onClose: () => void,
  setSelectedTemplate: () => void,
  selectedTemplate: string
}) => {
  const [step, setStep] = useState(0)
  const [blockName, setBlockName] = useState('')
  const Template = templateMap[selectedTemplate].template
  const workflowBlocks = [
    { id: 1, title: 'OTP Code', gradient: 'from-[#b12a75] to-[#318762]' },
    { id: 2, title: 'Book a Consultation', gradient: 'from-[#b12a75] to-[#318762]' },
    { id: 3, title: 'Payment Request', gradient: 'from-[#b12a75] to-[#318762]' },
    { id: 4, title: 'Schedule Appointment', gradient: 'from-[#b12a75] to-[#318762]' },
    { id: 6, title: 'Consultation Form', gradient: 'from-purple-600 to-green-400' },
    { id: 7, title: 'Question & Answer', gradient: 'from-purple-600 to-green-400' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg w-full max-h-[84%] max-w-4xl overflow-y-auto">
        <div className="p-6">
          {/* <div className="flex justify-between items-center mb-8"> */}
          <div className="flex justify-between items-center mb-2">
            <div className="py-2 px-6">
              <h2 className="text-3xl font-bold text-green-900">{selectedTemplate ? `${selectedTemplate} Block` : "Choose a block template"}</h2>
              <p className="w-full mt-2">{selectedTemplate ? "Edit the template and save to create a custom block" : "Select a template which you would like your custom block to use"}</p>
            </div>
          </div>

          {selectedTemplate ?
            <div className='overflow-y-auto pb-8'>
              <Template
                {...{
                  blockName,
                  setBlockName,
                  data: templateMap[selectedTemplate]?.data
                }}
              />
            </div>
            :
            <div className="mt-3 flex flex-wrap gap-4 overflow-y-auto h-72 py-2 pb-6 pl-6 justify-evenly">
              {/* <div className="mt-3 flex flex-wrap gap-4 overflow-y-auto h-72 py-2 pb-6 pl-6 justify-evenly overflow-x-hidden"> */}
              {workflowBlocks.map((block) => (
                <Card
                  onClick={() => {
                    setSelectedTemplate(block.title)
                  }}
                  role="button"
                  style={{ backgroundImage: "url('/workflow-block-image.png')" }}
                  key={block.id} className={`duration-100 hover:scale-105 rounded-md cursor-pointer bg-cover bg-center flex-shrink-0 w-64 h-32 relative bg-gradient-to-br ${block.gradient} text-white`}>
                  <CardContent className="p-4 flex flex-col justify-center items-center h-full">
                    <div className={` w-6 h-6 rounded-full ${selectedTemplate === block.title ? "bg-[#b82e7d] text-white border-2 border-white" : "bg-white text-teal-800 "} flex items-center justify-center font-semibold text-sm`}>
                      {block.id}
                    </div>
                    <p className="text-center text-base mt-4">{block.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        </div>
        <div className="sticky bottom-0 right-0 left-0 bg-gray-100 p-4 mt-6 space-x-3 flex justify-end">
          <Button onClick={onClose} variant="outline">Close</Button>
          {selectedTemplate === ''
            ? null
            : <Button onClick={() => {
              setSelectedTemplate('')
            }}
              variant="outline">Previous</Button>
          }
          <Button
            onClick={() => onSave(blockName)}
            className="bg-green-800 text-white hover:bg-green-700">
            {selectedTemplate ? "Save" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlocksModal;
