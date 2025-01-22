import { MoveDown, MoveUp, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

export const QuestionEditor = ({ question, index, onUpdate, onDelete, onMove, totalQuestions }) => {
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

      {/* <div> */}
      {/*   <Label>Question Text</Label> */}
      {/*   <Textarea */}
      {/*     value={localQuestion.question} */}
      {/*     onChange={(e) => updateField('question', e.target.value)} */}
      {/*   /> */}
      {/* </div> */}


      {localQuestion.type === 'questionnaire' ? (<div className="space-y-4">
        <div>
          <Label>Questions</Label>
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
              Add Question
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

        <p className="text-sm text-gray-500 italic mt-2">
          Note: These options are shared across all questionnaire sub-questions.
        </p>
      </div>) :
        <div>
          <Label>Question Text</Label>
          <Textarea
            value={localQuestion.question}
            onChange={(e) => updateField('question', e.target.value)}
          />
        </div>
      }

      <div className="flex items-center space-x-2">
        <Switch
          checked={localQuestion.required}
          onCheckedChange={(checked) => updateField('required', checked)}
        />
        <Label>Required</Label>
      </div>

      {
        (localQuestion.type === 'radio' || localQuestion.type === 'checkbox') && (
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
        )
      }

      {
        localQuestion.type === 'questionnaire' && (
          <div className="space-y-4">
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

            <p className="text-sm text-gray-500 italic mt-2">
              Note: These options are shared across all questionnaire sub-questions.
            </p>
          </div>
        )
      }
    </Card >
  );
};
