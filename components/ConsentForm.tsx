import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Signature from './Signature';

const ConsentForm = () => {
  const generalQuestions = [
    "I confirm that I read and understood the Information Leaflet for the above study and have been given a copy to keep.",
    "The project information has been explained and I have the opportunity to discuss and ask questions about the study.",
    "I understand that the study is entirely voluntary and I can stop taking part in this study at any time without giving a reason. I understand that not taking part will not affect my future medical care.",
    "I understand that my medical notes and records may be looked at by the study team at St James Hospital where it is relevant to do research. I agree that these individuals can access my medical records. I understand that all information will be kept private and confidential.",
    "I understand the data related to the study will be processed by GeneLinx for the research to be carried out",
    "I understand that I will not be paid for taking part in the study.",
    "I know how to contact the research team if I need to",
    "I agree to be contacted by researchers by email and telephone as part of this study",
    "I consent to take part in this research study"
  ];

  const dataProtectionQuestions = [
    "I give my explicit consent to have my data processed as part of this research study"
  ];

  return (
    <Card className="w-full max-w-4xl border-2">
      {/* <div className="text-center py-4 text-xl font-bold border-b-2"> */}
      {/*   ACGT Study */}
      {/* </div> */}
      <CardContent className="p-0">
        {/* General Section */}
        <div className="border-b-2">
          <div className="bg-gray-100 px-4 py-2 font-semibold border-b-2">
            General
          </div>
          {generalQuestions.map((question, index) => (
            <div key={index} className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 border-b last:border-b-0">
              <Label className="text-sm">{question}</Label>
              <div className="flex items-center gap-2 px-4">
                <Label>YES</Label>
                <Checkbox />
              </div>
              <div className="flex items-center gap-2 px-4">
                <Label>NO</Label>
                <Checkbox />
              </div>
            </div>
          ))}
        </div>

        {/* Data Protection Section */}
        <div>
          <div className="bg-gray-100 px-4 py-2 font-semibold border-b-2">
            Data Protection
          </div>
          {dataProtectionQuestions.map((question, index) => (
            <div key={index} className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3">
              <Label className="text-sm">{question}</Label>
              <div className="flex items-center gap-2 px-4">
                <Label>YES</Label>
                <Checkbox />
              </div>
              <div className="flex items-center gap-2 px-4">
                <Label>NO</Label>
                <Checkbox />
              </div>
            </div>
          ))}
        </div>
        <Signature />
      </CardContent>
    </Card>
  );
};

export default ConsentForm;
