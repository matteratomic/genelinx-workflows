import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"

export const FamilyDetails = ({
  register,
  setValue,
  errors
}) => {
  return <>
    <CardHeader>
      <CardTitle>Family Tree</CardTitle>
      <CardDescription>
        This might require additional information about your family members and could take some time to complete. So if you do not have the info at hand please save and resume later.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label className="text-primary">Were you adopted?</Label>
          <RadioGroup onValueChange={(value) => setValue('appointmentType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="he/him" id="he/him" />
              <Label htmlFor="male">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="she/her" id="she/her" />
              <Label htmlFor="female">Yes and I have information about my biological relatives</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="she/her" id="she/her" />
              <Label htmlFor="female">
                Yes and I do not have information about my biological relatives
              </Label>
            </div>
          </RadioGroup>
          <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-primary">Is your maternal grandfather still living?</Label>
        <RadioGroup onValueChange={(value) => setValue('appointmentType', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="he/him" id="he/him" />
            <Label htmlFor="male">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="she/her" id="she/her" />
            <Label htmlFor="female">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="she/her" id="she/her" />
            <Label htmlFor="female">Unknown</Label>
          </div>
        </RadioGroup>
        <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div>
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="name">How old is he currently?</Label>
        <Input
          className="w-1/3"
          id="name" {...register('name', { required: 'Name is required' })} />
        {/* {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>} */}
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="name">Age of Death</Label>
        <Input
          className="w-1/3"
          id="name" {...register('name', { required: 'Name is required' })} />
        {/* {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>} */}
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="reasonForAppointment">Cause of Death</Label>
        <Textarea
          className="w-1/3"
          id="reasonForAppointment"
          placeholder=""
          {...register("reasonForAppointment")}
        />
        {/* {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress.message}</p>} */}
      </div>

      <div className="space-y-2">
        <Label className="text-primary">Is your maternal mother still living?</Label>
        <RadioGroup onValueChange={(value) => setValue('appointmentType', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="he/him" id="he/him" />
            <Label htmlFor="male">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="she/her" id="she/her" />
            <Label htmlFor="female">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="she/her" id="she/her" />
            <Label htmlFor="female">Unknown</Label>
          </div>
        </RadioGroup>
        <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div>
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="name">How old is she currently?</Label>
        <Input
          className="w-1/3"
          id="name" {...register('name', { required: 'Name is required' })} />
        {/* {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>} */}
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="name">Age of Death</Label>
        <Input
          className="w-1/3"
          id="name" {...register('name', { required: 'Name is required' })} />
        {/* {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>} */}
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="reasonForAppointment">Cause of Death</Label>
        <Textarea
          className="w-1/3"
          id="reasonForAppointment"
          placeholder=""
          {...register("reasonForAppointment")}
        />
        {/* {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress.message}</p>} */}
      </div>



      <div className="w-full h-3"></div>
      <h1 className="font-medium text-sm">Aunts, Uncles and Cousins</h1>
      <Separator />


      {/* <div className="w-full h-3"></div> */}
      {/* <h1 className="text-sm font-medium">Genetic Testing</h1> */}
      {/* <Separator /> */}


    </CardContent >

  </>
}
