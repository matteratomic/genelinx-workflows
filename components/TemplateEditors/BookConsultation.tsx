import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FormBlock from './FormBlock';
import { BookingConsultationTemplate } from './constants';
import { GripVertical } from 'lucide-react';

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
          className={`step-item flex items-center ${draggedIndex === index ? 'opacity-40' : ''}`}
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

const FormContainer = ({ data, isWorkflowBlock, onTemplateChange }) => {
  const [template, setTemplate] = useState(data || BookingConsultationTemplate);
  // const [steps, setSteps] = useState(BookingConsultationTemplate.steps);
  const steps = template.steps
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const templateRef = useRef<any>();

  // Load initial data if provided
  useEffect(() => {
    if (data) {
      setTemplate(data);
    }
  }, [data]);

  const handleReorder = (newSteps) => {
    // console.log('here are the old steps', steps)
    // console.log('here are the new steps', newSteps)
    // setSteps(newSteps);
    const updatedTemplate = { ...template, steps: newSteps }
    setTemplate(updatedTemplate);
    onTemplateChange(updatedTemplate);

  };

  const handleSave = () => {
    setIsEditing(false);
    // Notify parent of template changes
    onTemplateChange(template);
  };


  const updateTemplate = (field: string, value: string) => {
    const updatedTemplate = { ...template, [field]: value };
    setTemplate(updatedTemplate);
    // Notify parent of template changes
    onTemplateChange(updatedTemplate);
  };

  const renderStepIndicator = () => {
    return (
      <div className="relative custom-scrollbar flex items-center gap-2 mb-6 overflow-x-auto pb-4">
        {/* <div className="absolute h-full w-1/12 bg-gradient-to-tr from-transparent via-white/50 to-white right-0"></div> */}
        {template?.steps ? template.steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Button
              variant={currentStep === index ? "default" : "outline"}
              className="text-sm"
              onClick={() => setCurrentStep(index)}>
              {step.title}
            </Button>
            {index < template.steps.length - 1 && (
              <span className="text-gray-400">›</span>
            )}
          </React.Fragment>
        )) : null}
      </div>
    );
  };

  const renderHeader = () => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-emerald-800 font-semibold text-xl">GeneLinx</div>
      </div>
      <h1 className="text-2xl font-bold text-emerald-900 mb-4">{template.steps[currentStep].title}</h1>
      {/* {JSON.stringify(template.steps[currentStep].template)} */}
      <p className="text-gray-600 mb-4">{template.steps[currentStep].template.subtitle}</p>
      {template.steps[currentStep].template.notes ? template.steps[currentStep].template.notes.map((note, index) => (
        <p key={index} className="text-gray-600 mb-2">
          <strong className="font-semibold">Please note: </strong>
          {note}
        </p>
      )) : null}
    </div>
  );


  const handleTemplateChange = (index: number, newState: any) => {
    console.log('addding to master state', newState)
    const newTemplateState = {
      ...template,
      steps: template.steps.map((step, i) => i === index ? {
        ...step,
        template: newState
      } : step)
    }
    templateRef.current = newTemplateState;
    setTemplate(newTemplateState);
    onTemplateChange(newTemplateState);
    console.log('here it is', newTemplateState)
  };
  const renderCurrentStep = () => {
    return (
      <div className="mb-6">
        {template?.steps ? template.steps.map((_, i) => {
          return <FormBlock
            key={i}
            hidden={i !== currentStep}
            data={template?.steps[i].template}
            watchData={template?.steps[i].template}
            isEditing={isEditing}
            isWorkflowBlock={isWorkflowBlock}
            onSave={() => setIsEditing(false)}
            onTemplateChange={(state) => handleTemplateChange(i, state)}
          />
        }) : null}
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
          onClick={() => setCurrentStep(Math.min(template?.steps?.length - 1, currentStep + 1))}
          disabled={currentStep === template?.steps?.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full mb-auto p-6">
      <Card>
        <CardContent className="p-8">
          {isWorkflowBlock ? renderStepIndicator() : <DraggableSteps
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onReorder={handleReorder}
          />
          }
          {/* {steps[currentStep]?.id === 'welcome' ? renderHeader() : renderCurrentStep()} */}
          {renderCurrentStep()}
          <p className="text-gray-600 italic text-sm mb-6">{BookingConsultationTemplate.contactInfo}</p>
          {renderFooter()}
        </CardContent>
      </Card>
      <style jsx global>{`
.custom-scrollbar::-webkit-scrollbar {
  {/* width: 12px; */}
height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; /* Track color */
  border-radius: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1c6461; /* Thumb color */
  border-radius: 6px;
}
`}</style>
    </div>
  );
};

export default FormContainer;
