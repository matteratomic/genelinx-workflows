import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { SelectContent } from "@radix-ui/react-select"
import { Textarea } from "../ui/textarea"
import { format } from "date-fns"
import { useState } from "react"

const relations = [
  'Self', 'Partner', 'Mother', 'Father', 'Brother', 'Sister', 'Half-sister', 'Half-brother', 'Son', 'Daughter', 'Grandmother', 'Grandfather', 'Uncle', 'Aunt', 'Grandson', 'Granddaughter', 'Niece', 'Nephew', 'Cousin (Male)', 'Cousin (Female)', 'Other']

const ethnicity = [
  { id: "Asian", label: "Asian" },
  { id: "African", label: "African" },
  { id: "Middle Eastern/North African", label: "Middle Eastern/North African" },
  { id: "Hispanic, Latino, or Spanish origin", label: "Hispanic, Latino, or Spanish origin" },
  { id: "White", label: "White" },
  { id: "Native American/ Alaskan Native", label: "Native American / Alaskan Native" },
  { id: "Native Hawaii / Other Pacific Islander", label: "Native Hawaii / Other Pacific Islander" },
  { id: "Prefer not to say", label: "Prefer not to say" },
  { id: "Don't know", label: "Don't know" },
  { id: "Other", label: "Other" },
]

export const PatientDetails = ({
  register,
  errors,
  watch,
  setValue
}) => {

  const [selectedItems, setSelectedItems] = useState(["recents", "home"])
  // const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>()
  const watchDate = watch('date')
  const watchDateOfBirth = watch('dateOfBirth')


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
          <Label className="text-primary" htmlFor="name">First Name</Label>
          <Input placeholder="First Name" id="name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-primary" htmlFor="name">Middle Name</Label>
          <Input placeholder="Middle Name" id="name" 
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-primary" htmlFor="email">Last Name</Label>
          <Input placeholder="Last Name" id="lastName" type="text" 
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      {/* <div className="space-y-2"> */}
      {/*   <Label htmlFor="phone">Email</Label> */}
      {/*   <Input placeholder="Email address" id="email" {...register('email', { required: 'Email is required' })} /> */}
      {/*   {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>} */}
      {/* </div> */}

      <div className="grid grid-cols-3 gap-4">
        {/* <div className="space-y-2"> */}
        {/*   <Label htmlFor="phone">Phone Number</Label> */}
        {/*   <Input placeholder="Phone Number" id="phone" {...register('phone', { required: 'Phone number is required' })} /> */}
        {/*   {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>} */}
        {/* </div> */}
        <div className="space-y-2 col-span-1">
          <Label className="text-primary">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !watchDateOfBirth && "text-muted-foreground"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {watchDateOfBirth ? format(watchDateOfBirth, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={watchDateOfBirth}
                onSelect={(date) => setValue('dateOfBirth', date as Date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* <div className="space-y-2"> */}
        {/*   <Label>What is your biological sex registered at birth*</Label> */}
        {/*   <Select onValueChange={(value) => setValue('gender', value)}> */}
        {/*     <SelectTrigger id="gender"> */}
        {/*       <SelectValue placeholder="Choose your gender" /> */}
        {/*     </SelectTrigger> */}
        {/*     <SelectContent> */}
        {/*       <SelectItem value="male">Male</SelectItem> */}
        {/*       <SelectItem value="female">Female</SelectItem> */}
        {/*       <SelectItem value="intersex">Intersex</SelectItem> */}
        {/*       <SelectItem value="non-binary">Non Binary</SelectItem> */}
        {/*     </SelectContent> */}
        {/*   </Select> */}
        {/* </div> */}
      </div>

      <div className="pt-4 grid grid-cols-1 gap-8">
        <div className="space-y-2">
          <Label className="text-primary">What is your biological sex registered at birth*</Label>
          <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="he/him" id="he/him" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="she/her" id="she/her" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
          <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div>
        </div>
        <div className="space-y-2">
          <Label className="text-primary">Your prefered pronouns are:</Label>
          <RadioGroup className="flex flex-row space-x-2"
            onValueChange={(value) => setValue('appointmentType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="he/him" id="he/him" />
              <Label htmlFor="he/him">He/Him</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="she/her" id="she/her" />
              <Label htmlFor="she/her">She/Her</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="they/them" id="they/them" />
              <Label htmlFor="they/them">They/Them</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label className="text-primary"> What is your ethnic background on your maternal (mother's) side? *</Label>
          <div className="grid grid-cols-2 gap-4">
            {ethnicity.map((item) => (
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
          <Label className="text-primary"> What is your ethnic background on your maternal (fathers's) side? *</Label>
          <div className="grid grid-cols-2 gap-4">
            {ethnicity.map((item) => (
              <div key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                // checked={selectedItems.includes(item.id)}
                // onCheckedChange={() => handleCheckboxChange(item.id)}
                />
                <Label className="text-sm font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
          <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information</div>
        </div>

        <div className="grid grid-cols-2 gap-8 gap-x-2">
          <div className="space-y-2">
            <Label className="text-primary">Is there Jewish ancestry in your family*</Label>
            <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="he/him" id="he/him" />
                <Label htmlFor="he/him">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="she/her" id="she/her" />
                <Label htmlFor="she/her">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="they/them" id="they/them" />
                <Label htmlFor="they/them">Don't know</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-primary">Is there Polish ancestry in your family*</Label>
            <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="he/him" id="he/him" />
                <Label htmlFor="he/him">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="she/her" id="she/her" />
                <Label htmlFor="she/her">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="they/them" id="they/them" />
                <Label htmlFor="they/them">Don't know</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-primary"> Are your parents blood relatives? (eg. cousins) * </Label>
            <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="he/him" id="he/him" />
                <Label htmlFor="he/him">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="she/her" id="she/her" />
                <Label htmlFor="she/her">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="they/them" id="they/them" />
                <Label htmlFor="they/them">Don't know</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-primary"> Have you or a family member been seen before at GeneLinx? * </Label>
            <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="he/him" id="he/him" />
                <Label htmlFor="he/him">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="she/her" id="she/her" />
                <Label htmlFor="she/her">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-primary" htmlFor="time">Relationship to you*</Label>
            <Input placeholder="Relationship to you" id="relativeFirstName" type="text" {...register('relativeFirstName', { required: 'First name is required' })} />
            {/* <Select onValueChange={(value) => setValue('time', value)}> */}
            {/*   <SelectTrigger id="time"> */}
            {/*     <SelectValue placeholder="Select a time" /> */}
            {/*   </SelectTrigger> */}
            {/*   <SelectContent> */}
            {/*     {relations.map(relation => { */}
            {/*       return <SelectItem key={relation} value={relation}>{relation}</SelectItem> */}
            {/*     })} */}
            {/*   </SelectContent> */}
            {/* </Select> */}
            {/* {errors.time && <p className="text-sm text-red-500">{errors.time.message}</p>} */}
          </div>

          <div className="flex space-x-3">
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="email">First Name</Label>
              <Input placeholder="Relative first name" id="relativeFirstName" type="text" {...register('relativeFirstName', { required: 'First name is required' })} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-primary" htmlFor="relativeLastName">Last Name</Label>
              <Input placeholder="Relative last name" id="relativeLastName" type="text" {...register('relativeLastName', { required: 'Last name is required' })} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-primary" htmlFor="name">Provide their Booking ID</Label>
            <Input placeholder="Booking ID" id="name" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            <div className="text-sm italic pt-2 text-neutral-600">
              You can find this at the top right corner of the final summary letter issued by GeneLinx to your relative or in their appointment booking email. If you do not have this information please enter their First Name, Last Name and DOB below
            </div>
          </div>
          <div className="space-y-2 col-span-1">
            <Label className="text-primary">Date of Birth of Relative</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watchDateOfBirth && "text-muted-foreground"
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watchDateOfBirth ? format(watchDateOfBirth, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watchDateOfBirth}
                  onSelect={(date) => setValue('dateOfBirth', date as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-primary font-bold" htmlFor="reasonForAppointment">
            Please tell us your reason for scheduling an appointment with GeneLinx. Include any questions you would like to have answered during the session *
          </Label>
          <Textarea
            id="reasonForAppointment"
            placeholder=""
            {...register("reasonForAppointment")}
          />
          {/* {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress.message}</p>} */}
        </div>

        {/* <div className="space-y-2"> */}
        {/*   <Label> What is your ethnic background on your maternal (mother's) side? *</Label> */}
        {/*   <RadioGroup onValueChange={(value) => setValue('appointmentType', value)}> */}
        {/*     <div className="flex items-center space-x-2"> */}
        {/*       <RadioGroupItem value="he/him" id="he/him" /> */}
        {/*       <Label htmlFor="he/him">He/Him</Label> */}
        {/*     </div> */}
        {/*     <div className="flex items-center space-x-2"> */}
        {/*       <RadioGroupItem value="she/her" id="she/her" /> */}
        {/*       <Label htmlFor="she/her">She/Her</Label> */}
        {/*     </div> */}
        {/*     <div className="flex items-center space-x-2"> */}
        {/*       <RadioGroupItem value="they/them" id="they/them" /> */}
        {/*       <Label htmlFor="they/them">They/Them</Label> */}
        {/*     </div> */}
        {/*     <div className="flex items-center space-x-2"> */}
        {/*       <RadioGroupItem value="other" id="other" /> */}
        {/*       <Label htmlFor="other">Other</Label> */}
        {/*     </div> */}
        {/*   </RadioGroup> */}
        {/* </div> */}
      </div>

      {/* <div className="space-y-2"> */}
      {/*   <Label htmlFor="medicalHistory">Medical History</Label> */}
      {/*   <Textarea */}
      {/*     id="medicalHistory" */}
      {/*     placeholder="Please provide any relevant medical history or conditions" */}
      {/*     {...register('medicalHistory')} */}
      {/*   /> */}
      {/* </div> */}
    </CardContent>



  </>
}


{/* <Input placeholder="First Name" id="name"*/} 
{/*...register('name', { required: 'Name is required' })*/}

