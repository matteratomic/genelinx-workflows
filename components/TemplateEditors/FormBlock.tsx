import React, { useState, useEffect, useRef } from 'react';
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
import FileQuestion from './FileQuestion';
import DateQuestion from './DateQuestion';

const QuestionnaireInput = ({ question }) => {
  return (
    <div className="space-y-4">
      {question.subQuestions?.map((subQuestion, index) => (
        <div key={`${question.id}-sub-${index}`}>
          <RadioGroup
            style={{
              gridTemplateColumns: `2fr ${' 1fr'.repeat(question.options?.length || 0)}`,
            }}
            className="grid gap-4 items-center">
            <div>
              <Label className="text-base text-green-800 leading-tight">
                {subQuestion.text}
                {question.required && <span className="text-green-800 ml-1">*</span>}
              </Label>
            </div>
            {question.options?.map((option) => (
              <div key={option} className="flex justify-center">
                <RadioGroupItem
                  value={option}
                  id={`${question.id}-${subQuestion.id}-${option}`}
                  className="h-5 w-5"
                />
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

const QuestionnaireHeader = ({ options = [] }) => {
  return (
    <div
      style={{
        gridTemplateColumns: `2fr ${' 1fr'.repeat(options.length)}`,
      }}
      className="grid gap-4 my-8">
      <div></div>
      {options.map((option) => (
        <div key={option} className="text-center px-2">
          <span className="text-sm font-medium whitespace-normal">
            {option}
          </span>
        </div>
      ))}
    </div>
  );
};

const QuestionEditor = ({ question, index, onUpdate, onDelete, onMove, totalQuestions }) => {
  const [localQuestion, setLocalQuestion] = useState(question);

  useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  const updateField = (field, value) => {
    const updatedQuestion = {
      ...localQuestion,
      [field]: value
    };
    setLocalQuestion(updatedQuestion);
    onUpdate(index, updatedQuestion);
  };

  const updateOption = (optionIndex, newValue) => {
    const newOptions = [...localQuestion.options];
    newOptions[optionIndex] = newValue;
    updateField('options', newOptions);
  };

  const addOption = () => {
    const newOptions = [...(localQuestion.options || []), `Option ${(localQuestion.options?.length || 0) + 1}`];
    updateField('options', newOptions);
  };

  const removeOption = (optionIndex) => {
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

      {localQuestion.type === 'text' && (
        <div className="flex items-center space-x-2">
          <Switch
            checked={localQuestion.multiline}
            onCheckedChange={(checked) => updateField('multiline', checked)}
          />
          <Label>Multiline</Label>
        </div>
      )}

      {localQuestion.type === 'questionnaire' && (
        <div className="space-y-4">
          <div>
            <Label>Shared Options</Label>
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

          <div>
            <Label>Sub-Questions</Label>
            <div className="space-y-2 mt-2">
              {localQuestion.subQuestions?.map((subQuestion, subIndex) => (
                <div key={`${localQuestion.id}-subq-${subIndex}`} className="flex gap-2">
                  <Input
                    value={subQuestion.text}
                    onChange={(e) => {
                      const newSubQuestions = [...(localQuestion.subQuestions || [])];
                      newSubQuestions[subIndex] = {
                        ...newSubQuestions[subIndex],
                        text: e.target.value
                      };
                      updateField('subQuestions', newSubQuestions);
                    }}
                    placeholder="Enter sub-question text"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newSubQuestions = localQuestion.subQuestions.filter((_, idx) => idx !== subIndex);
                      updateField('subQuestions', newSubQuestions);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  const newSubQuestions = [
                    ...(localQuestion.subQuestions || []),
                    {
                      id: `subq-${(localQuestion.subQuestions?.length || 0) + 1}`,
                      text: `Sub-question ${(localQuestion.subQuestions?.length || 0) + 1}`
                    }
                  ];
                  updateField('subQuestions', newSubQuestions);
                }}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sub-Question
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

const FormBlock = ({
  data,
  onTemplateChange,
  isWorkflowBlock,
  hidden
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState(data || {
    title: '',
    subtitle: '',
    questions: []
  });

  const [editingTemplate, setEditingTemplate] = useState(template);

  useEffect(() => {
    if (data) {
      setTemplate(data);
      setEditingTemplate(data);
    }
  }, [data]);

  const handleQuestionUpdate = (index, updatedQuestion) => {
    const newTemplate = {
      ...editingTemplate,
      questions: [...editingTemplate.questions]
    };
    newTemplate.questions[index] = updatedQuestion;
    setEditingTemplate(newTemplate);
    onTemplateChange(newTemplate);
  };

  const updateTemplate = (field, update) => {
    const newTemplate = {
      ...editingTemplate,
      [field]: field === 'notes' ? [update] : update
    };
    setEditingTemplate(newTemplate);
    onTemplateChange(newTemplate);
  };

  const handleQuestionDelete = (index) => {
    const newTemplate = {
      ...editingTemplate,
      questions: editingTemplate.questions.filter((_, i) => i !== index)
    };
    setEditingTemplate(newTemplate);
    onTemplateChange(newTemplate);
  };

  const handleQuestionMove = (index, direction) => {
    const newTemplate = {
      ...editingTemplate,
      questions: [...editingTemplate.questions]
    };
    const temp = newTemplate.questions[index];
    newTemplate.questions[index] = newTemplate.questions[index + direction];
    newTemplate.questions[index + direction] = temp;
    setEditingTemplate(newTemplate);
    onTemplateChange(newTemplate);
  };

  const addNewQuestion = (type) => {
    const newQuestion = {
      id: `q${editingTemplate.questions.length + 1}`,
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
        ] : undefined,
      subQuestions: type === 'questionnaire' ? [
        {
          id: 'subq-1',
          text: 'Sub-question 1'
        }
      ] : undefined
    };

    const newTemplate = {
      ...editingTemplate,
      questions: [...editingTemplate.questions, newQuestion]
    };
    setEditingTemplate(newTemplate);
    onTemplateChange(newTemplate);
  };

  const handleSave = () => {
    setTemplate(editingTemplate);
    setIsEditing(false);
    onTemplateChange(editingTemplate);
  };

  const handleRevert = () => {
    setEditingTemplate(template);
    setIsEditing(false);
  };

  return (
    <div className={`${hidden ? "hidden" : "block"} w-full mx-auto p-4 space-y-4 overflow-x-auto min-h-screen`}>
      {!isWorkflowBlock && (
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
      )}

      <div className="grid grid-cols-1 gap-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              {!editingTemplate?.notes?.length ?
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
                : null}
            </div>

            <div className="space-y-4">

              <>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={template.title}
                    onChange={(e) => updateTemplate('title', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={template.subtitle}
                    onChange={(e) => updateTemplate('subtitle', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Note</Label>
                  <Input
                    value={template.notes[0]}
                    onChange={(e) => updateTemplate('notes', e.target.value)}
                  />
                </div>
              </>

              {editingTemplate.questions.map((question, index) => (
                <QuestionEditor
                  key={question.id}
                  question={question}
                  index={index}
                  onUpdate={handleQuestionUpdate}
                  onDelete={handleQuestionDelete}
                  onMove={handleQuestionMove}
                  totalQuestions={editingTemplate.questions.length}
                />
              ))}

            </div>
          </div>
        ) : (
          <Card className="overflow-x-scroll">
            <CardContent className="p-6 space-y-6">
              {!template?.notes?.length ?
                <div>
                  <h1 className="text-xl font-semibold">{template.title}</h1>
                  <p className="text-gray-600">{template.subtitle}</p>
                </div>
                : null}

              <div className="space-y-6">
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
                        <Textarea
                          defaultValue={question.defaultValue}
                          placeholder="Enter your answer" />
                      ) : (<Input
                        defaultValue={question.defaultValue}
                        placeholder="Enter your answer" />
                      )
                    )}

                    {question.type === 'questionnaire' && (
                      <div className="mb-8">
                        <QuestionnaireHeader options={question.options} />
                        <QuestionnaireInput question={question} />
                      </div>
                    )}

                    {question.type === 'file' && (
                      <FileQuestion question={question} />
                    )}

                    {question.type === 'date' && (
                      <DateQuestion question={question} />
                    )}
                  </div>
                ))}
              </div>

              {template?.notes?.length ?
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-emerald-800 font-semibold text-xl">GeneLinx</div>
                  </div>
                  <h1 className="text-2xl font-bold text-emerald-900 mb-4">{template.title}</h1>
                  {/* {JSON.stringify(template.steps[currentStep].template)} */}
                  <p className="text-gray-600 mb-4">{template.subtitle}</p>
                  {/* {template.notes ? template.notes.map((note, index) => ( */}
                  {/*   <p key={index} className="text-gray-600 mb-2"> */}
                  {/*     <strong className="font-semibold">Please note: </strong> */}
                  {/*     {note} */}
                  {/*   </p> */}
                  {/* )) : null} */}
                  {template.notes ?
                    <p className="text-gray-600 mb-2">
                      <strong className="font-semibold">Please note: </strong>
                      {template.notes[0]}
                    </p>
                    : null}
                </div>
                : null}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FormBlock;
