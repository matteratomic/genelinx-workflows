import { useState } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"

const healthConditions = [
  { id: 1, label: "Stillbirths/Multiple miscarriages (≥2)" },
  { id: 2, label: "Sudden Infant Death Syndrome" },
  { id: 3, label: "Autoimmune disease" },
  { id: 4, label: "Thyroid disease" },
  { id: 5, label: "Hypertension" },
  { id: 6, label: "Neurodegenerative disease" },
  { id: 7, label: "Cardiovascular disease" },
  { id: 8, label: "Birth defects" },
  { id: 9, label: "Early onset hearing loss" },
  { id: 10, label: "Intellectual disability" },
  { id: 11, label: "Hemophilia or another bleeding disorder" },
  { id: 12, label: "Neuromuscular disease (e.g., muscular dystrophy)" },
  { id: 13, label: "Autism (may be severe or could be Asperger's)" },
  { id: 14, label: "Diabetes" },
  { id: 15, label: "Cancer" },
  { id: 16, label: "Very high cholesterol (e.g., LDL > 190 mg/dl or Total cholesterol > 310 mg/dl)" },
  { id: 17, label: "Other" },
  { id: 18, label: "None of the above" }
];

export const MedicalHistory = ({
  errors,
  register,
  setValue,
}) => {

  const [selectedItems, setSelectedItems] = useState(["recents", "home"])

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }
  return <>
    <CardHeader>
      <CardTitle>Patient Details</CardTitle>
      <CardDescription>Please enter your personal and medical information.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-primary" htmlFor="name">Current Weight</Label>
          <Input
            placeholder="Your current weight" 
            id="name"
          />
          <p className="text-sm italic">e.g. 58.5 Kgs</p>
          {/* {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>} */}
        </div>
        <div className="space-y-2">
          <Label className="text-primary" htmlFor="name">Current Height</Label>
          <Input
            placeholder="Your current height" 
            id="name"
          />
          <p className="text-sm italic">e.g. 165 Cms</p>
          {/* {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>} */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-primary">Have you received a bone marrow/ stem cell transplantation</Label>
          <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="he/him" id="he/him" />
              <Label htmlFor="male">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="she/her" id="she/her" />
              <Label htmlFor="female">No</Label>
            </div>
          </RadioGroup>
          <div className="text-sm italic pt-2 text-neutral-600">
            This is important in case a test is recommended after your session
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-primary">Have you ever smoked tobacco</Label>
          <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes-now/him" id="yes-now" />
              <Label htmlFor="male">Yes, currently</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes-before" id="yes-before" />
              <Label htmlFor="female">Yes, previously</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="female">No</Label>
            </div>
          </RadioGroup>
          {/* <div className="text-sm italic pt-2 text-neutral-600"> */}
          {/*   This is important in case a test is recommended after your session */}
          {/* </div> */}
        </div>

        <div className="space-y-2">
          <Label className="text-primary">Do you drink alcohol?</Label>
          <RadioGroup className="flex flex-row space-x-2" 
            // onValueChange={(value) => setValue('appointmentType', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes-now" id="he/him" />
              <Label htmlFor="male">Yes, currently</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes-before" id="she/her" />
              <Label htmlFor="female">Yes, previously</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="she/her" />
              <Label htmlFor="female">No</Label>
            </div>
          </RadioGroup>
          {/* <div className="text-sm italic pt-2 text-neutral-600"> */}
          {/*   This is important in case a test is recommended after your session */}
          {/* </div> */}
        </div>

        <div className="space-y-2">
          <Label className="text-primary">Have you ever taken the oral contraceptive (birth control) pill?</Label>
          <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="he/him" id="he/him" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="she/her" id="she/her" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
          {/* <div className="text-sm italic pt-2 text-neutral-600"> */}
          {/*   This is important in case a test is recommended after your session */}
          {/* </div> */}
        </div>
      </div>

      <div className="w-full h-3"></div>
      <h1 className="font-medium text-sm">Medical History</h1>
      <Separator />

      <div className="space-y-2">
        <Label className="text-primary">
          Does your personal history include any of the following diseases or health conditions? *
        </Label>
        <div className="grid grid-cols-2 gap-4">
          {healthConditions.map((item) => (
            <div key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={() => handleCheckboxChange(item.id)}
              />
              <Label className="text-sm font-normal">
                {item.label}
              </Label>
            </div>
          ))}
        </div>
        <div className="text-sm italic pt-2 text-neutral-600">
          We ask this question as the risks for some conditions depend on this information </div>
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="reasonForAppointment">
          Please provide additional details if you checked any of the above
        </Label>
        <Textarea
          id="reasonForAppointment"
          placeholder=""
          {...register("reasonForAppointment")}
        />
        {/* {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress.message}</p>} */}
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="reasonForAppointment">
          Please upload any relevant health records pertaining to the conditions above
        </Label>
        <Input id="picture" type="file" />
        {/* <Textarea */}
        {/*   id="reasonForAppointment" */}
        {/*   placeholder="" */}
        {/*   {...register("reasonForAppointment")} */}
        {/* /> */}
        {/* {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress.message}</p>} */}
      </div>

      <div className="w-full h-3"></div>
      <h1 className="text-sm font-medium">Genetic Testing</h1>
      <Separator />

      <div className="space-y-2">
        <Label className="text-primary">Have you had genetic testing?</Label>
        <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="he/him" id="he/him" />
            <Label htmlFor="male">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="she/her" id="she/her" />
            <Label htmlFor="female">No</Label>
          </div>
        </RadioGroup>
        <div className="text-sm italic pt-2 text-neutral-600">
          Genetic testing looks for changes or mutations in your DNA. It typically requires a blood or saliva sample.
        </div>
      </div>
    </CardContent >
  </>
}
