import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Settings2,
  Save,
  Undo,
  Plus,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import Signature from "@/components/Signature";
import { ConsentFormTemplate } from "./constants";

const StudyHeader = ({ isEditing, headerData, onHeaderChange }) => {
  return (
    <Card className="w-full max-w-4xl border-2">
      <CardHeader className="p-0">
        <CardTitle className="text-center py-4 text-xl border-b-2">
          {isEditing ? (
            <Input
              value={headerData.title}
              onChange={(e) => onHeaderChange("title", e.target.value)}
              className="text-center"
            />
          ) : (
            headerData.title
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {isEditing ? (
          <div className="space-y-2">
            {headerData?.logos?.map((logo, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={logo}
                  onChange={(e) => {
                    const newLogos = [...headerData.logos];
                    newLogos[index] = e.target.value;
                    onHeaderChange("logos", newLogos);
                  }}
                  placeholder="Logo URL"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newLogos = headerData.logos.filter(
                      (_, i) => i !== index,
                    );
                    onHeaderChange("logos", newLogos);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => onHeaderChange("logos", [...headerData.logos, ""])}
              className="w-full"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Add Logo
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            {headerData.logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-16"
              />
            ))}
          </div>
        )}
        {headerData.studyInfo.map((item, index) => (
          <div key={index} className="grid grid-cols-[300px_1fr_auto] gap-4">
            <div className="font-medium">
              {isEditing ? (
                <Input
                  value={item.label}
                  onChange={(e) => {
                    const newInfo = [...headerData.studyInfo];
                    newInfo[index].label = e.target.value;
                    onHeaderChange("studyInfo", newInfo);
                  }}
                />
              ) : (
                item.label
              )}
            </div>
            <div>
              {isEditing ? (
                Array.isArray(item.value) ? (
                  item.value.map((line, i) => (
                    <Input
                      key={i}
                      value={line}
                      className="mb-2"
                      onChange={(e) => {
                        const newInfo = [...headerData.studyInfo];
                        newInfo[index].value[i] = e.target.value;
                        onHeaderChange("studyInfo", newInfo);
                      }}
                    />
                  ))
                ) : (
                  <Input
                    value={item.value}
                    onChange={(e) => {
                      const newInfo = [...headerData.studyInfo];
                      newInfo[index].value = e.target.value;
                      onHeaderChange("studyInfo", newInfo);
                    }}
                  />
                )
              ) : Array.isArray(item.value) ? (
                item.value.map((line, i) => <div key={i}>{line}</div>)
              ) : (
                item.value
              )}
            </div>
            {isEditing && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newInfo = headerData.studyInfo.filter(
                    (_, i) => i !== index,
                  );
                  onHeaderChange("studyInfo", newInfo);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {isEditing && (
          <Button
            variant="outline"
            onClick={() => {
              const newInfo = [
                ...headerData.studyInfo,
                { label: "", value: "" },
              ];
              onHeaderChange("studyInfo", newInfo);
            }}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const QuestionSection = ({
  title,
  questions,
  onQuestionsChange,
  isEditing,
}) => (
  <div>
    <div className="bg-gray-100 px-4 py-2 font-semibold border-b-2">
      {title}
    </div>
    {questions.map((question, index) => (
      <div
        key={index}
        className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 border-b last:border-b-0"
      >
        {isEditing ? (
          <Input
            value={question}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index] = e.target.value;
              onQuestionsChange(newQuestions);
            }}
            className="text-sm"
          />
        ) : (
          <Label className="text-sm">{question}</Label>
        )}
        <div className="flex items-center gap-2 px-4">
          <Label>YES</Label>
          <Checkbox />
        </div>
        <div className="flex items-center gap-2 px-4">
          <Label>NO</Label>
          <Checkbox />
        </div>
        {isEditing && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newQuestions = questions.filter((_, i) => i !== index);
              onQuestionsChange(newQuestions);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    ))}
    {isEditing && (
      <Button
        variant="outline"
        onClick={() => onQuestionsChange([...questions, ""])}
        className="w-full m-4"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Question
      </Button>
    )}
  </div>
);

// const ConsentForm = ({ data, onFormChange }) => {
const ConsentForm = ({ data, onTemplateChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSignature, setShowSignature] = useState(true);
  const [formData, setFormData] = useState(data || ConsentFormTemplate);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleHeaderChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);
    onTemplateChange?.(updatedForm);
  };

  const handleSave = () => {
    setIsEditing(false);
    onTemplateChange?.(formData);
  };

  const handleRevert = () => {
    setFormData(
      data || {
        title: "Access to Cascade Genetic Testing (AGCT) Study Consent Form",
        logos: ["/logos.png"],
        studyInfo: [],
        generalQuestions: [],
        dataProtectionQuestions: [],
      },
    );
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          {!isEditing ? (
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              <Settings2 className="w-4 h-4 mr-2" />
              {isEditing ? "Editing Mode" : "Edit Template"}
            </Button>
          ) : null}
          {isEditing && (
            <>
              <Button onClick={handleSave} variant="default">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleRevert} variant="outline">
                <Undo className="w-4 h-4 mr-2" />
                Revert
              </Button>
            </>
          )}
        </div>
        {isEditing && (
          <Button
            variant="outline"
            onClick={() => setShowSignature(!showSignature)}
          >
            {showSignature ? "Hide" : "Show"} Signature
          </Button>
        )}
      </div>

      <StudyHeader
        isEditing={isEditing}
        headerData={formData}
        onHeaderChange={handleHeaderChange}
      />

      <Card className="w-full max-w-4xl border-2">
        <CardContent className="p-0">
          <QuestionSection
            title="General"
            questions={formData.generalQuestions}
            onQuestionsChange={(questions) =>
              handleHeaderChange("generalQuestions", questions)
            }
            isEditing={isEditing}
          />
          <QuestionSection
            title="Data Protection"
            questions={formData.dataProtectionQuestions}
            onQuestionsChange={(questions) =>
              handleHeaderChange("dataProtectionQuestions", questions)
            }
            isEditing={isEditing}
          />
          {showSignature && <Signature />}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentForm;
