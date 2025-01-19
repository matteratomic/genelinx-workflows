

import React, { useState } from 'react';
import { Settings2, Save, Undo, Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

//Replacement
const QuestionnaireInput = ({ question }) => {
  const defaultOptions = [
    "Strongly Agree",
    "Somewhat Agree",
    "Neither Agree or Disagree",
    "Somewhat Disagree",
    "Strongly Disagree",
    "Not Applicable"
  ];

  const options = question.options || defaultOptions;
  return (
    <div>
      <RadioGroup className="grid grid-cols-7 gap-4 items-center">
        <div className="col-span-1">
          <Label className="text-base text-green-800 leading-tight">
            {question.question}
            {question.required && <span className="text-green-800 ml-1">*</span>}
          </Label>
        </div>
        {options.map((option) => (
          <div key={option} className="flex justify-center">
            <RadioGroupItem
              value={option}
              id={`${question.id}-${option}`}
              className="h-5 w-5"
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};


// // New Questionnaire Components
// const QuestionnaireInput = ({ question }) => {
//   const defaultOptions = [
//     "Strongly Agree",
//     "Somewhat Agree",
//     "Neither Agree or Disagree",
//     "Somewhat Disagree",
//     "Strongly Disagree",
//     "Not Applicable"
//   ];
//
//   const options = question.options || defaultOptions;
//
//   return (
//     <div className="bg-green-100 w-full">
//       <div className="grid grid-cols-7 gap-4">
//         <div className="col-span-3">
//           <Label className="text-gray-800">{question.question}</Label>
//         </div>
//         {options.map((option, idx) => (
//           <RadioGroup className="flex bg-red-100">
//             {/* <div key={idx} className="flex justify-center items-center"> */}
//             {/* </div> */}
//
//             <RadioGroupItem key={idx} value={option} id={`${question.id}-${option}`} />
//           </RadioGroup>
//         ))}
//
//       </div>
//     </div>
//   );
// };
//new
const QuestionnaireHeader = ({ options }) => {
  const defaultOptions = [
    "Strongly Agree",
    "Somewhat Agree",
    "Neither Agree or Disagree",
    "Somewhat Disagree",
    "Strongly Disagree",
    "Not Applicable"
  ];

  const displayOptions = options || defaultOptions;

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-1"></div>
      {displayOptions.map((option) => (
        <div key={option} className="text-center">
          <span className="text-sm font-medium whitespace-pre-line">
            {option}
          </span>
        </div>
      ))}
    </div>
  );
};


const QuestionEditor = ({ question, index, onUpdate, onDelete, onMove, totalQuestions }) => {
  const [localQuestion, setLocalQuestion] = useState(question);

  const updateField = (field, value) => {
    const updatedQuestion = {
      ...localQuestion,
      [field]: value
    };
    setLocalQuestion(updatedQuestion);
    onUpdate(index, updatedQuestion);
  };

  const updateOption = (optionIndex, newValue) => {
    if (localQuestion.type === 'questionnaire') {
      onUpdate(index, localQuestion, {
        type: 'UPDATE_QUESTIONNAIRE_OPTION',
        optionIndex,
        newValue
      });
      return;
    }

    const newOptions = [...localQuestion.options];
    newOptions[optionIndex] = newValue;
    updateField('options', newOptions);
  };

  const addOption = () => {
    if (localQuestion.type === 'questionnaire') {
      const newOptions = [...localQuestion.options, `Option ${localQuestion.options.length + 1}`];
      onUpdate(index, localQuestion, {
        type: 'ADD_QUESTIONNAIRE_OPTION',
        newOption: `Option ${localQuestion.options.length + 1}`
      });
      return;
    }

    const newOptions = [...(localQuestion.options || []), `Option ${(localQuestion.options?.length || 0) + 1}`];
    updateField('options', newOptions);
  };

  const removeOption = (optionIndex) => {
    if (localQuestion.type === 'questionnaire') {
      onUpdate(index, localQuestion, {
        type: 'REMOVE_QUESTIONNAIRE_OPTION',
        optionIndex
      });
      return;
    }

    const newOptions = localQuestion.options.filter((_, idx) => idx !== optionIndex);
    updateField('options', newOptions);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onMove(index, -1)}
            disabled={index === 0}
          >
            <MoveUp className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onMove(index, 1)}
            disabled={index === totalQuestions - 1}
          >
            <MoveDown className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <Label>Question Text</Label>
        <Textarea
          value={localQuestion.question}
          onChange={(e) => updateField('question', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={localQuestion.required}
          onCheckedChange={(checked) => updateField('required', checked)}
        />
        <Label>Required</Label>
      </div>

      {(localQuestion.type === 'radio' || localQuestion.type === 'checkbox') && (
        <div>
          <Label>Options</Label>
          <div className="space-y-2 mt-2">
            {localQuestion.options?.map((option, optIndex) => (
              <div key={`${localQuestion.id}-option-${optIndex}`} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(optIndex, e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeOption(optIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addOption}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        </div>
      )}

      {localQuestion.type === 'questionnaire' && (
        <div>
          <Label>Shared Questionnaire Options</Label>
          <div className="space-y-2 mt-2">
            {localQuestion.options?.map((option, optIndex) => (
              <div key={`${localQuestion.id}-option-${optIndex}`} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(optIndex, e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeOption(optIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addOption}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Shared Option
            </Button>
            <p className="text-sm text-gray-500 italic mt-2">
              Note: These options are shared across all questionnaire questions.
              To add a new questionnaire question, use the "Add new question" dropdown above and select "Add Questionnaire Grid".
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

const PatientFormEditor = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState(data);
  const [savedTemplate, setSavedTemplate] = useState({ ...template });

  const handleSave = () => {
    setSavedTemplate({ ...template });
    setIsEditing(false);
  };

  const handleRevert = () => {
    setTemplate({ ...savedTemplate });
    setIsEditing(false);
  };

  // const handleQuestionUpdate = (index, updatedQuestion) => {
  //   setTemplate(prevTemplate => {
  //     const newQuestions = [...prevTemplate.questions];
  //     newQuestions[index] = updatedQuestion;
  //     return { ...prevTemplate, questions: newQuestions };
  //   });
  // };
  //
  // Update the handleQuestionUpdate in PatientFormEditor:
  const handleQuestionUpdate = (index, updatedQuestion, action = null) => {
    setTemplate(prevTemplate => {
      if (action) {
        const newQuestions = [...prevTemplate.questions];

        switch (action.type) {
          case 'UPDATE_QUESTIONNAIRE_OPTION': {
            const { optionIndex, newValue } = action;
            return {
              ...prevTemplate,
              questions: newQuestions.map(q => {
                if (q.type === 'questionnaire') {
                  const newOptions = [...q.options];
                  newOptions[optionIndex] = newValue;
                  return { ...q, options: newOptions };
                }
                return q;
              })
            };
          }

          case 'ADD_QUESTIONNAIRE_OPTION': {
            return {
              ...prevTemplate,
              questions: newQuestions.map(q => {
                if (q.type === 'questionnaire') {
                  return { ...q, options: [...q.options, action.newOption] };
                }
                return q;
              })
            };
          }

          case 'REMOVE_QUESTIONNAIRE_OPTION': {
            const { optionIndex } = action;
            return {
              ...prevTemplate,
              questions: newQuestions.map(q => {
                if (q.type === 'questionnaire') {
                  const newOptions = q.options.filter((_, idx) => idx !== optionIndex);
                  return { ...q, options: newOptions };
                }
                return q;
              })
            };
          }
        }
      }
      // Handle regular question updates
      const newQuestions = [...prevTemplate.questions];
      newQuestions[index] = updatedQuestion;
      return { ...prevTemplate, questions: newQuestions };
    });
  };

  const handleQuestionDelete = (index) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      questions: prevTemplate.questions.filter((_, i) => i !== index)
    }));
  };

  const handleQuestionMove = (index, direction) => {
    setTemplate(prevTemplate => {
      const newQuestions = [...prevTemplate.questions];
      const temp = newQuestions[index];
      newQuestions[index] = newQuestions[index + direction];
      newQuestions[index + direction] = temp;
      return { ...prevTemplate, questions: newQuestions };
    });
  };

  const addNewQuestion = (type) => {
    const newQuestion = {
      id: `q${template.questions.length + 1}`,
      type: type,
      question: 'New Question',
      required: false,
      options: type === 'radio' || type === 'checkbox' ? ['Option 1'] :
        type === 'questionnaire' ? [
          "Strongly Agree",
          "Somewhat Agree",
          "Neither Agree or Disagree",
          "Somewhat Disagree",
          "Strongly Disagree",
          "Not Applicable"
        ] : undefined
    };

    setTemplate(prevTemplate => ({
      ...prevTemplate,
      questions: [...prevTemplate.questions, newQuestion]
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex space-x-2">
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Settings2 className="w-4 h-4 mr-2" />
          {isEditing ? 'Editing Mode' : 'Edit Template'}
        </Button>
        {isEditing && (
          <>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={handleRevert} variant="outline">
              <Undo className="h-4 w-4 mr-2" />
              Revert Changes
            </Button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isEditing && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Select onValueChange={addNewQuestion}>
                <SelectTrigger>
                  <SelectValue placeholder="Add new question..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radio">Add Radio Question</SelectItem>
                  <SelectItem value="checkbox">Add Checkbox Question</SelectItem>
                  <SelectItem value="text">Add Text Question</SelectItem>
                  <SelectItem value="questionnaire">Add Questionnaire Grid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {template.questions.map((question, index) => (
                <QuestionEditor
                  key={question.id}
                  question={question}
                  index={index}
                  onUpdate={handleQuestionUpdate}
                  onDelete={handleQuestionDelete}
                  onMove={handleQuestionMove}
                  totalQuestions={template.questions.length}
                />
              ))}
            </div>
          </div>
        )}

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h1 className="text-xl font-semibold">{template.title}</h1>
              <p className="text-gray-600">{template.subtitle}</p>
            </div>

            <div className="space-y-6">
              {/*   <QuestionnaireHeader options={template.questions.find(q => q.type === 'questionnaire')?.options} /> */}
              {/* {template.questions.some(q => q.type === 'questionnaire') && ( */}
              {/* )} */}

              {template.questions.filter(q => q.type === 'questionnaire').length > 0 && (
                <div className="mb-8">
                  <QuestionnaireHeader options={template.questions.find(q => q.type === 'questionnaire')?.options} />
                </div>
              )}
              {template.questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  {question.type !== 'questionnaire' && (
                    <Label className="text-emerald-800">
                      {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                  )}

                  {question.type === 'radio' && (
                    <RadioGroup>
                      {question.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                          <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {question.type === 'checkbox' && (
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox id={`${question.id}-${option}`} />
                          <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'text' && (
                    question.multiline ? (
                      <Textarea placeholder="Enter your answer" />
                    ) : (
                      <Input placeholder="Enter your answer" />
                    )
                  )}

                  {question.type === 'questionnaire' && (
                    <QuestionnaireInput question={question} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientFormEditor;
