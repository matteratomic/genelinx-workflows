import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const QuestionnaireInput = ({ question }) => {
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

