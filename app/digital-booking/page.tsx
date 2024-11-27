// http://localhost:3000/course-section?booking=true

'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CalendarIcon, CreditCard, User, ChevronRight, Clock, Info, Compass, ClipboardList } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PatientDetails } from '@/components/Form/PatientDetails'
import { MedicalHistory } from '@/components/Form/MedicalHistory'
import { FamilyDetails } from '@/components/Form/FamilyDetails'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

type FormData = {
  name: string
  email: string
  phone: string
  dateOfBirth: Date
  gender: string
  medicalHistory: string
  date: Date
  time: string
  appointmentType: string
  cardNumber: string
  expiryDate: string
  cvv: string
  billingAddress: string
  agreeToTerms: boolean
}

const steps = [
  { id: 1, name: 'Welcome', icon: User },
  { id: 2, name: 'Patient Details', icon: User },
  { id: 3, name: 'Medical History', icon: User },
  { id: 4, name: 'Family Details', icon: CalendarIcon },
  { id: 5, name: 'Optional Questionaire', icon: CreditCard },
  // { id: 5, name: 'Screening Questionnaire', icon: CreditCard },
]

function Breadcrumb({ currentStep }: { currentStep: number }) {
  return (
    <nav className="flex items-center space-x-2 mb-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              "flex items-center space-x-2",
              currentStep >= step.id ? "text-primary" : "text-muted-foreground"
            )}
          >
            {/* <step.icon className="w-4 h-4" /> */}
            <span className="text-sm font-medium">{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
          )}
        </div>
      ))}
    </nav>
  )
}

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

const relations = [
  'Self', 'Partner', 'Mother', 'Father', 'Brother', 'Sister', 'Half-sister', 'Half-brother', 'Son', 'Daughter', 'Grandmother', 'Grandfather', 'Uncle', 'Aunt', 'Grandson', 'Granddaughter', 'Niece', 'Nephew', 'Cousin (Male)', 'Cousin (Female)', 'Other']

function formatDate(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}

export default function AppointmentForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>()
  const [selectedItems, setSelectedItems] = useState(["recents", "home"])
  const router = useRouter()

  useEffect(() => {
    const currentDate = new Date();
    toast("Consent form was signed successfully", {
      description: formatDate(currentDate),
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    })
  }, [])

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 4000))
    console.log(data)
    setIsSubmitting(false)
    // router.push('/course-section')
    router.push('/course-section?booking=true')
    // alert('Appointment booked successfully!')
  }

  const watchDate = watch('date')
  const watchDateOfBirth = watch('dateOfBirth')

  const renderStep = () => {
    switch (step) {
      case 1:
        return <>
          <CardHeader>
            <img className="w-24 mb-2" src="https://gene-linx.com/wp-content/uploads/2023/02/Logo-files2-01-1.svg" />
            <h1 className="text-2xl font-bold text-primary">
              Let's prepare you for your GeneLinx Genetic Consultation
            </h1>
            {/* <p className="text-neutral-500 w-5/6 font-medium "> */}
            {/*   To make the most out of your time with GeneLinx and our genetic experts, we would like you to answer the questions in this intake form at least 72 hours prior to your appointment */}
            {/* </p> */}
            <p className="w-10/12">
              This form includes questions about your health, your family members' health and any genetic testing you might have previously had. So please do have as much of this information as possible on hand before starting to fill out the form. The more specific information we have, the better our genetic experts can prepare for your session.
              You will need about 10-15 minutes to complete this form.
            </p>

            {/* <p> */}
            {/*   You will need about 10-15 minutes to complete this form. */}
            {/* </p> */}
            <br />
            <p className="w-10/12">
              <strong>Please note:</strong> The form can be saved and completed in multiple sittings. If you choose to save the form, a link will be emailed to you which can later be used to access the form and resume where you left off.
            </p>

            <p>You can also review and edit your responses before submission.</p>
            {/* <p>If you have any questions please do not hesitate to contact us at appointments@gene-linx.com with your last name and booking ID.</p> */}
            {/* <CardTitle>Select Service Details</CardTitle> */}
            {/* <CardDescription>What service are you interested in?</CardDescription> */}

          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-primary font-bold" htmlFor="name">Booking ID</Label>
              <Input className="bg-neutral-100 border-none" placeholder="e.g. GL-xxxxxx" id="booking-id" />
              <p className="text-sm italic">If you have any questions please do not hesitate to contact us at appointments@gene-linx.com with your last name and booking ID.</p>
            </div>
          </CardContent>
        </>
      case 2:
        return <PatientDetails
          {...{
            register,
            errors,
            watch,
            setValue
          }}
        />
      case 3:
        return (
          <MedicalHistory {...{
            register,
            setValue,
            errors
          }} />
        )
      case 4:
        return (
          <FamilyDetails
            {...{ register, setValue, errors }}
          />
        )
      case 5:
        return (
          <>
            <CardHeader>
              {/* <img className="w-24 mb-2" src="https://gene-linx.com/wp-content/uploads/2023/02/Logo-files2-01-1.svg" /> */}
              <h1 className="text-2xl font-bold text-primary">
                These are optional consents and will not affect the service provided by GeneLinx. You can revoke your consent at any time. Please refer to our <a className="underline" href="http://www.gene-linx.com/privacy-policy">privacy policy</a> for further information.
              </h1>
              {/* <p className="text-neutral-500 w-5/6 font-medium "> */}
              {/*   To make the most out of your time with GeneLinx and our genetic experts, we would like you to answer the questions in this intake form at least 72 hours prior to your appointment */}
              {/* </p> */}

              <div className="w-full h-4"></div>
              <Label className="text-primary font-bold text-lg" htmlFor="name">Use of data for Scientific Research</Label>
              <p className="w-10/12">
                Scientific Research focuses on the cause, early detection and / or treatment of rare diseases in general. The data will be used in the interest of the greatest possible benefit to the general public for research which aims to improve the prevention, detection and treatment of rare diseases. Such includes but is not limited to disease areas such as oncology, metabolic disorders, neurodegenerative disorders, cardiac disorders and malformations as well as to diseases and genetic relationships that are still unknown today. As in any research on rare diseases — particularly due to the latest findings in genetic diagnostics — it is usually not possible to predict in detail which research questions and matters will be addressed in the future. Therefore, the specific research purpose cannot be detailed herein, and the data may also be used for medical research projects that cannot be foreseen today.
              </p>
              <br />

            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 pb-4">
                <Label className="text-primary">
                  I consent to my information being used for scientific research and I understand that I will not receive any compensation in return. This consent can be revoked with effect in the future. More information can be found in our privacy policy *
                </Label>
                <RadioGroup className="flex flex-row space-x-2" onValueChange={(value) => setValue('appointmentType', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="illMemberYes" />
                    <Label htmlFor="illMemberYes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="illMemberNo" />
                    <Label htmlFor="illMemberNo">No</Label>
                  </div>
                </RadioGroup>
                {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
              </div>
              <div className="space-y-2">
                <Label className="text-primary" htmlFor="reasonForAppointment">
                  Anything else you would like us to know that was not covered in this form?
                </Label>
                <Textarea
                  className="w-2/3"
                  id="reasonForAppointment"
                  placeholder=""
                  {...register("reasonForAppointment")}
                />
                {/* {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress.message}</p>} */}
                <div className="text-sm italic pt-2 text-neutral-600">
                  By submitting this form you acknowledge that you have answered all questions accurately to the best of your knowledge and that the consents in the last section are optional and us providing the service does not depend on your responses to these.
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-primary"
                  htmlFor="reasonForAppointment">Terms and Conditions</Label>
                <Textarea
                  value={`Terms and Conditions 
These terms and conditions outline the rules and regulations for the use of GeneLinx GmbH’s Website, located at www.gene-linx.com. By accessing this website we assume you accept these terms and conditions. Do not continue to use GeneLinx if you do not agree to take all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same. Cookies We employ the use of cookies. By accessing GeneLinx, you agreed to use cookies in agreement with the GeneLinx GmbH’s Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies. License Unless otherwise stated, GeneLinx GmbH and/or its licensors own the intellectual property rights for all material on GeneLinx. All intellectual property rights are reserved. You may access this from GeneLinx for your own personal use subjected to restrictions set in these terms and conditions. You must not: Republish material from GeneLinx Sell, rent or sub-license material from GeneLinx Reproduce, duplicate or copy material from GeneLinx Redistribute content from GeneLinx This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Free Terms and Conditions Generator. Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. GeneLinx GmbH does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of GeneLinx GmbH,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, GeneLinx GmbH shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website. GeneLinx GmbH reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions. You warrant and represent that: You are entitled to post the Comments on our website and have all necessary licenses and consents to do so; The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party; The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity. You hereby grant GeneLinx GmbH a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media. Hyperlinking to our Content
                  The following organizations may link to our Website without prior written approval:

                  Government agencies;
                  Search engines;
                  News organizations;
                  Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and
                  System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
                  These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.

                  We may consider and approve other link requests from the following types of organizations:

                  commonly-known consumer and/or business information sources;
                  dot.com community sites;
                  associations or other groups representing charities;
                  online directory distributors;
                  internet portals;
                  accounting, law and consulting firms; and
                  educational institutions and trade associations.
                  We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of GeneLinx GmbH; and (d) the link is in the context of general resource information.

                  These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.

                  If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to GeneLinx GmbH at privacy@gene-linx.com. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.

                  Approved organizations may hyperlink to our Website as follows:

                  By use of our corporate name; or
                  By use of the uniform resource locator being linked to; or
                  By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.
                  No use of GeneLinx GmbH’s logo or other artwork will be allowed for linking absent a trademark license agreement.

                  iFrames
                  Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.

                  Content Liability
                  We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.

                  Your Privacy
                  Please read Privacy Policy

                  Reservation of Rights
                  We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.

                  Removal of links from our website
                  If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment at privacy@gene-linx.com. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.

                  We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.

                  Disclaimer
                  To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:

                  limit or exclude our or your liability for death or personal injury;
                  limit or exclude our or your liability for fraud or fraudulent misrepresentation;
                  limit any of our or your liabilities in any way that is not permitted under applicable law; or
                  exclude any of our or your liabilities that may not be excluded under applicable law.
                  The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.

                  As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.

                  You can reach out to us at privacy@gene-linx.com if you have any questions or comments regarding the use of our website and these terms and conditions.

                  Last updated on 17 March 2023
                
`}
                  className="text-left w-2/3"
                  id="reasonForAppointment"
                  placeholder=""

                />
                <div className="pt-4 flex flex-row items-start space-x-3 space-y-0">
                  <Checkbox
                  // checked={selectedItems.includes(item.id)}
                  // onCheckedChange={() => handleCheckboxChange(item.id)}
                  />
                  <Label className="text-sm font-normal">
                    I accept the Terms and Conditions
                  </Label>
                </div>
                {/* {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress.message}</p>} */}
                {/* <div className="text-sm italic pt-2 text-neutral-600"> */}
                {/*   By submitting this form you acknowledge that you have answered all questions accurately to the best of your knowledge and that the consents in the last section are optional and us providing the service does not depend on your responses to these. */}
                {/* </div> */}
              </div>
            </CardContent>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#9C3B72]/5 grid">
      <svg className="fixed scale-y-105" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1422 800"><g shape-rendering="crispEdges" stroke-linejoin="round" fill="#ffffff"><polygon points="1422,0 1422,200 1066.5,200"></polygon><polygon points="1066.5,0 1066.5,200 711,200"></polygon><polygon points="888.75,200 1066.5,300 888.75,300"></polygon><polygon points="888.75,200 888.75,300 711,200"></polygon><polygon points="888.75,300 888.75,400 711,400"></polygon><polygon points="1066.5,300 1066.5,400 888.75,400"></polygon><polygon points="1422,200 1422,400 1066.5,400"></polygon><polygon points="711,200 711,0 355.5,0"></polygon><polygon points="355.5,0 355.5,200 0,200"></polygon><polygon points="355.5,200 355.5,400 0,200"></polygon><polygon points="711,400 355.5,200 711,200"></polygon><polygon points="711,600 355.5,400 355.5,600"></polygon><polygon points="355.5,600 0,400 0,600"></polygon><polygon points="355.5,800 0,800 0,600"></polygon><polygon points="355.5,800 711,600 711,800"></polygon><polygon points="1066.5,400 1422,600 1066.5,600"></polygon><polygon points="1066.5,400 888.75,500 888.75,400"></polygon><polygon points="888.75,400 888.75,500 711,400"></polygon><polygon points="888.75,500 711,600 888.75,600"></polygon><polygon points="1066.5,500 1066.5,600 888.75,600"></polygon><polygon points="711,600 1066.5,800 1066.5,600"></polygon><polygon points="1422,600 1066.5,800 1422,800"></polygon></g><g fill="hsl(220, 62%, 45%)" stroke-width="3" stroke="hsl(220, 43%, 13%)"></g></svg>
      <form className="w-full relative z-1 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-5xl mx-auto">
          <CardHeader className="h-16">
            <Breadcrumb currentStep={step} />
          </CardHeader>
          {renderStep()}
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button size="lg" type="button" variant="outline" onClick={() => {
                window.scrollTo({ behavior: 'smooth', top: 0 })
                setStep(step - 1)
              }}>
                Previous
              </Button>
            ) : <Button size="lg" type="button" variant="outline"
              onClick={() => { }}>
              Save
            </Button>}
            {step < 5 ? (
              <Button size="lg" type="button" onClick={async () => {
                window.scrollTo({ behavior: 'smooth', top: 0 })
                step > 3 && await new Promise(resolve => setTimeout(resolve, 1000))
                setStep(step + 1)
              }}>
                {step === 1 ? "Next" : "Next"}
              </Button>
            ) : (
              <Button
                size="lg" type="submit" disabled={isSubmitting}>
                Finish
              </Button>
            )}
          </CardFooter>
        </Card>
        {/* https://zfrmz.eu/EEdx8WPyJmrAER51NIuG */}
        {/* https://gene-linx.com/access-to-cascade-genetic-testing */}
        {/*Booking*/}{/* Make a report */}
        {/*education*/}{/* testing*/}{/*sign over*/}{/*Sample kit*/}
      </form>
      {/* contract */}
      {/* presentation */}
      {/* email templates */}
      {/* consent */}
      {/* report */}
      {/*education module*/}
    </div>
  )
}




{/* <RadioGroup onValueChange={(value) => setValue('gender', value)}> */ }
{/*   <div className="flex items-center space-x-2"> */ }
{/*     <RadioGroupItem value="male" id="male" /> */ }
{/*     <Label htmlFor="male">Male</Label> */ }
{/*   </div> */ }
{/*   <div className="flex items-center space-x-2"> */ }
{/*     <RadioGroupItem value="female" id="female" /> */ }
{/*     <Label htmlFor="female">Female</Label> */ }
{/*   </div> */ }
{/*   <div className="flex items-center space-x-2"> */ }
{/*     <RadioGroupItem value="other" id="other" /> */ }
{/*     <Label htmlFor="other">Other</Label> */ }
{/*   </div> */ }
{/* </RadioGroup> */ }


{/* <RadioGroup onValueChange={(value) => setValue('appointmentType', value)}> */ }
{/*   <div className="flex items-center space-x-2"> */ }
{/*     <RadioGroupItem value="he/him" id="he/him" /> */ }
{/*     <Label htmlFor="he/him">He/Him</Label> */ }
{/*   </div> */ }
{/*   <div className="flex items-center space-x-2"> */ }
{/*     <RadioGroupItem value="she/her" id="she/her" /> */ }
{/*     <Label htmlFor="she/her">She/Her</Label> */ }
{/*   </div> */ }
{/*   <div className="flex items-center space-x-2"> */ }
{/*     <RadioGroupItem value="they/them" id="they/them" /> */ }
{/*     <Label htmlFor="they/them">They/Them</Label> */ }
{/*   </div> */ }
{/*   <div className="flex items-center space-x-2"> */ }
{/*     <RadioGroupItem value="other" id="other" /> */ }
{/*     <Label htmlFor="other">Other</Label> */ }
{/*   </div> */ }
{/* </RadioGroup> */ }
{/* xBqZ9b32nQ*/ }



{/* <CardHeader> */ }
{/*              <CardTitle>Select Service Details</CardTitle> */ }
{/*              <CardDescription>What service are you interested in?</CardDescription> */ }
{/*            </CardHeader> */ }
{/*            <CardContent className="space-y-4"> */ }
{/*              <div */ }
{/*                onClick={() => setStep(step + 1)} */ }
{/*                className="cursor-pointer border border-neutral-300 rounded-md p-6 flex items-center space-x-6"> */ }
{/*                <div className="bg-[#922663] rounded-full w-16 h-16 shrink-0 flex items-center justify-center"> */ }
{/*                  <Compass className="w-8 h-8 text-white" /> */ }
{/*                </div> */ }
{/*                <div className="flex flex-col"> */ }
{/*                  <h2 className="font-bold mb-1">Guidance on selecting the appropriate genetic test</h2> */ }
{/*                  <p className="text-neutral-500 w-5/6 font-medium text-sm">This is my first visit with a GeneLinx counselor and I do not have prior genetic test results to discuss</p> */ }
{/*                </div> */ }
{/*              </div> */ }

{/*              <div */ }
{/*                onClick={() => setStep(step + 1)} */ }
{/*                className="cursor-pointer border border-neutral-300 rounded-md p-6 flex items-center space-x-6"> */ }
{/*                <div className="bg-[#922663] rounded-full w-16 h-16 shrink-0 flex items-center justify-center"> */ }
{/*                  <ClipboardList className="w-8 h-8 text-white" /> */ }
{/*                </div> */ }
{/*                <div className="flex flex-col"> */ }
{/*                  <h2 className="font-bold mb-1">Get in-depth information about your previous test results</h2> */ }
{/*                  <p className="text-neutral-500 w-5/6 font-medium text-sm">This is my first visit with a GeneLinx counselor and I have prior genetic test results to discuss</p> */ }
{/*                </div> */ }
{/*              </div> */ }

{/*            </CardContent> */ }



// const onSubmit = async (data: FormData) => {
//   setIsSubmitting(true)
//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 4000))
//   console.log(data)
//   router.push('/course-section?booking=true')
//   setIsSubmitting(false)
//   // alert('Appointment booked successfully!')
// }
