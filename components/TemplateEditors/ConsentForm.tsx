// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Settings2, Save, Undo } from 'lucide-react';
// import Signature from '@/components/Signature';
//
// const StudyHeader = ({ isEditing, headerData, onHeaderChange }) => {
//   return (
//     <Card className="w-full max-w-4xl border-2">
//       <CardHeader className="p-0">
//         <CardTitle className="text-center py-4 text-xl border-b-2">
//           {isEditing ? (
//             <Input
//               value={headerData.title}
//               onChange={(e) => onHeaderChange('title', e.target.value)}
//               className="text-center"
//             />
//           ) : (
//             headerData.title
//           )}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6 space-y-6">
//         <img src="/logos.png" />
//         {headerData.studyInfo.map((item, index) => (
//           <div key={index} className="grid grid-cols-[300px_1fr] gap-4">
//             <div className="font-medium">
//               {isEditing ? (
//                 <Input
//                   value={item.label}
//                   onChange={(e) => {
//                     const newInfo = [...headerData.studyInfo];
//                     newInfo[index].label = e.target.value;
//                     onHeaderChange('studyInfo', newInfo);
//                   }}
//                 />
//               ) : (
//                 item.label
//               )}
//             </div>
//             <div>
//               {isEditing ? (
//                 Array.isArray(item.value) ? (
//                   item.value.map((line, i) => (
//                     <Input
//                       key={i}
//                       value={line}
//                       className="mb-2"
//                       onChange={(e) => {
//                         const newInfo = [...headerData.studyInfo];
//                         newInfo[index].value[i] = e.target.value;
//                         onHeaderChange('studyInfo', newInfo);
//                       }}
//                     />
//                   ))
//                 ) : (
//                   <Input
//                     value={item.value}
//                     onChange={(e) => {
//                       const newInfo = [...headerData.studyInfo];
//                       newInfo[index].value = e.target.value;
//                       onHeaderChange('studyInfo', newInfo);
//                     }}
//                   />
//                 )
//               ) : (
//                 Array.isArray(item.value) ? (
//                   item.value.map((line, i) => (
//                     <div key={i}>{line}</div>
//                   ))
//                 ) : (
//                   item.value
//                 )
//               )}
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };
//
// const ConsentForm = ({ data, onFormChange }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     title: 'Access to Cascade Genetic Testing (AGCT) Study Consent Form',
//     studyInfo: [
//       {
//         label: "Principal investigator's name:",
//         value: "Rosie O Shea"
//       },
//       {
//         label: "Principal investigator's title:",
//         value: "Principal Genetic Counsellor, Cancer Genetic Service and Assistant Professor, Trinity College Dublin"
//       },
//       {
//         label: "Telephone number of principal investigator:",
//         value: "+353 1 4103759"
//       },
//       {
//         label: "Consultant co-investigator's name:",
//         value: "Professor Karen Cadoo"
//       },
//       {
//         label: "Consultant co-investigator's title:",
//         value: "Consultant Oncologist and Cancer Geneticist, Clinical Lead of Cancer Genetic Service"
//       },
//       {
//         label: "Data Controller's/joint Controller's Identity:",
//         value: [
//           "St James Hospital",
//           "Dublin, Ireland"
//         ]
//       }
//     ],
//     generalQuestions: [
//       "I confirm that I read and understood the Information Leaflet for the above study and have been given a copy to keep.",
//       "The project information has been explained and I have the opportunity to discuss and ask questions about the study.",
//       "I understand that the study is entirely voluntary and I can stop taking part in this study at any time without giving a reason. I understand that not taking part will not affect my future medical care.",
//       "I understand that my medical notes and records may be looked at by the study team at St James Hospital where it is relevant to do research. I agree that these individuals can access my medical records. I understand that all information will be kept private and confidential.",
//       "I understand the data related to the study will be processed by GeneLinx for the research to be carried out",
//       "I understand that I will not be paid for taking part in the study.",
//       "I know how to contact the research team if I need to",
//       "I agree to be contacted by researchers by email and telephone as part of this study",
//       "I consent to take part in this research study"
//     ],
//     dataProtectionQuestions: [
//       "I give my explicit consent to have my data processed as part of this research study"
//     ]
//   });
//
//   useEffect(() => {
//     if (data) {
//       setFormData(data);
//     }
//   }, [data]);
//
//   const handleHeaderChange = (field, value) => {
//     const updatedForm = { ...formData, [field]: value };
//     setFormData(updatedForm);
//     onFormChange?.(updatedForm);
//   };
//
//   const handleQuestionChange = (section, index, value) => {
//     const updatedForm = { ...formData };
//     updatedForm[section][index] = value;
//     setFormData(updatedForm);
//     onFormChange?.(updatedForm);
//   };
//
//   const handleSave = () => {
//     setIsEditing(false);
//     onFormChange?.(formData);
//   };
//
//   const handleRevert = () => {
//     setFormData(data || {
//       title: 'Access to Cascade Genetic Testing (AGCT) Study Consent Form',
//       studyInfo: [],  // Original study info data
//       generalQuestions: [],  // Original general questions
//       dataProtectionQuestions: []  // Original data protection questions
//     });
//     setIsEditing(false);
//   };
//


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings2, Save, Undo, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import Signature from '@/components/Signature';
import { ConsentFormTemplate } from './constants';

const StudyHeader = ({ isEditing, headerData, onHeaderChange }) => {
  return (
    <Card className="w-full max-w-4xl border-2">
      <CardHeader className="p-0">
        <CardTitle className="text-center py-4 text-xl border-b-2">
          {isEditing ? (
            <Input
              value={headerData.title}
              onChange={(e) => onHeaderChange('title', e.target.value)}
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
                    onHeaderChange('logos', newLogos);
                  }}
                  placeholder="Logo URL"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newLogos = headerData.logos.filter((_, i) => i !== index);
                    onHeaderChange('logos', newLogos);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => onHeaderChange('logos', [...headerData.logos, ''])}
              className="w-full"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Add Logo
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            {headerData.logos.map((logo, index) => (
              <img key={index} src={logo} alt={`Logo ${index + 1}`} className="h-16" />
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
                    onHeaderChange('studyInfo', newInfo);
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
                        onHeaderChange('studyInfo', newInfo);
                      }}
                    />
                  ))
                ) : (
                  <Input
                    value={item.value}
                    onChange={(e) => {
                      const newInfo = [...headerData.studyInfo];
                      newInfo[index].value = e.target.value;
                      onHeaderChange('studyInfo', newInfo);
                    }}
                  />
                )
              ) : (
                Array.isArray(item.value) ? (
                  item.value.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))
                ) : (
                  item.value
                )
              )}
            </div>
            {isEditing && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newInfo = headerData.studyInfo.filter((_, i) => i !== index);
                  onHeaderChange('studyInfo', newInfo);
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
              const newInfo = [...headerData.studyInfo, { label: '', value: '' }];
              onHeaderChange('studyInfo', newInfo);
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

const QuestionSection = ({ title, questions, onQuestionsChange, isEditing }) => (
  <div>
    <div className="bg-gray-100 px-4 py-2 font-semibold border-b-2">
      {title}
    </div>
    {questions.map((question, index) => (
      <div key={index} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 border-b last:border-b-0">
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
        onClick={() => onQuestionsChange([...questions, ''])}
        className="w-full m-4"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Question
      </Button>
    )}
  </div>
);

const ConsentForm = ({ data, onFormChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSignature, setShowSignature] = useState(true);
  const [formData, setFormData] = useState(
    data || ConsentFormTemplate
  );

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleHeaderChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);
    onFormChange?.(updatedForm);
  };

  const handleSave = () => {
    setIsEditing(false);
    onFormChange?.(formData);
  };

  const handleRevert = () => {
    setFormData(data || {
      title: 'Access to Cascade Genetic Testing (AGCT) Study Consent Form',
      logos: ['/logos.png'],
      studyInfo: [],
      generalQuestions: [],
      dataProtectionQuestions: []
    });
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex justify-between">
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
            {showSignature ? 'Hide' : 'Show'} Signature
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
            onQuestionsChange={(questions) => handleHeaderChange('generalQuestions', questions)}
            isEditing={isEditing}
          />
          <QuestionSection
            title="Data Protection"
            questions={formData.dataProtectionQuestions}
            onQuestionsChange={(questions) => handleHeaderChange('dataProtectionQuestions', questions)}
            isEditing={isEditing}
          />
          {showSignature && <Signature />}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentForm;
