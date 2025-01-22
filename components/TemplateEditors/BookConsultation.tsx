import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PatientFormEditor from './FormBlock';
import { PatientDetails } from '../Form/PatientDetails';
import { BookingConsultationTemplate, MedicalHistoryTemplate, PatientDetailsTemplate } from './constants';
import { GripVertical } from 'lucide-react';
// import PatientFormEditor from './PatientFormEditor';

const DraggableSteps = ({ steps, currentStep, onStepChange, onReorder }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index, e) => {
    setDraggedIndex(index);
    // Required for Firefox
    e.dataTransfer.setData('text/plain', index);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragOver = (index, e) => {
    e.preventDefault();
    const dragOverItem = e.currentTarget;
    dragOverItem.style.borderTop =
      draggedIndex < index ? '2px solid #10b981' : 'none';
    dragOverItem.style.borderBottom =
      draggedIndex > index ? '2px solid #10b981' : 'none';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.borderTop = 'none';
    e.currentTarget.style.borderBottom = 'none';
  };

  const handleDrop = (dropIndex, e) => {
    e.preventDefault();
    e.currentTarget.style.borderTop = 'none';
    e.currentTarget.style.borderBottom = 'none';

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newSteps = [...steps];
    const [draggedStep] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(dropIndex, 0, draggedStep);
    onReorder(newSteps);
    setDraggedIndex(null);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
    // Clean up any remaining drag styling
    document.querySelectorAll('.step-item').forEach(item => {
      item.style.borderTop = 'none';
      item.style.borderBottom = 'none';
    });
  };

  return (
    <div className="pb-4 flex items-center gap-2 mb-6 overflow-x-auto">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`step-item flex items-center ${draggedIndex === index ? 'opacity-40' : ''
            }`}
          draggable="true"
          onDragStart={(e) => handleDragStart(index, e)}
          onDragOver={(e) => handleDragOver(index, e)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(index, e)}
          onDragEnd={handleDragEnd}>
          <div className={`
            flex items-center rounded-lg 
            ${currentStep === index ? 'bg-emerald-800' : 'bg-white'}
            border border-gray-200 hover:border-gray-300 transition-colors
          `}>
            <div className="px-2 cursor-grab border-r">
              <GripVertical className={`h-4 w-4 ${currentStep === index ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <Button
              variant="ghost"
              className={`rounded-l-none ${currentStep === index
                ? 'text-white hover:bg-emerald-50 hover:text-emerald-800'
                : 'text-gray-700'
                }`}
              onClick={() => onStepChange(index)}>
              {step.title}
            </Button>
          </div>
          {index < steps.length - 1 && (
            <span className="text-gray-400 mx-1">›</span>
          )}
        </div>
      ))}
    </div>
  );
};

const FormContainer = () => {
  const [steps, setSteps] = useState(BookingConsultationTemplate.steps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleReorder = (newSteps) => {
    // console.log('here are the old steps', steps)
    // console.log('here are the new steps', newSteps)
    setSteps(newSteps);

  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center gap-2 mb-6">
        {BookingConsultationTemplate.steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Button
              variant={currentStep === index ? "default" : "outline"}
              className="text-sm"
              onClick={() => setCurrentStep(index)}
            >
              {step.title}
            </Button>
            {index < BookingConsultationTemplate.steps.length - 1 && (
              <span className="text-gray-400">›</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderHeader = () => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-emerald-800 font-semibold text-xl">GeneLinx</div>
      </div>
      <h1 className="text-2xl font-bold text-emerald-900 mb-4">{BookingConsultationTemplate.title}</h1>
      <p className="text-gray-600 mb-4">{BookingConsultationTemplate.subtitle}</p>
      {BookingConsultationTemplate.notes.map((note, index) => (
        <p key={index} className="text-gray-600 mb-2">
          <strong className="font-semibold">Please note: </strong>
          {note}
        </p>
      ))}
    </div>
  );

  const renderCurrentStep = () => {
    const currentTemplate = BookingConsultationTemplate.steps[currentStep].template;
    return (
      <div className="mb-6">
        {steps.map((_, i) => {
          return <><PatientFormEditor
            hidden={i !== currentStep}
            // data={BookingConsultationTemplate.steps[i].template}
            // data={BookingConsultationTemplate.steps[currentStep].template}
            data={steps[i].template}
            watchData={steps[i].template}
            isEditing={isEditing}
            onSave={() => setIsEditing(false)}
          />
            {/* {currentStep} */}
            {/* <pre>{JSON.stringify(steps[currentStep].title, null, 3)}</pre> */}
          </>
        })}
      </div>
    );
  };

  const renderFooter = () => (
    <div className="flex justify-between items-center mt-8">
      <Button
        variant="outline"
        onClick={() => { }}
      >
        Save
      </Button>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(BookingConsultationTemplate.steps.length - 1, currentStep + 1))}
          disabled={currentStep === BookingConsultationTemplate.steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardContent className="p-8">
          {/* {renderStepIndicator()} */}
          {/* {renderHeader()} */}
          <DraggableSteps
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onReorder={handleReorder}
          />
          {renderCurrentStep()}
          <p className="text-gray-600 italic text-sm mb-6">{BookingConsultationTemplate.contactInfo}</p>
          {renderFooter()}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormContainer;
