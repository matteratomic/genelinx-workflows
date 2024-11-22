'use client'
import {useState,useCallback} from 'react'
import {useRouter} from 'next/navigation'
import DateTimePicker from '../../components/DateTimePicker'
import BookingForm from '../../components/BookingForm.tsx'
import {ChevronDown,Check,Calendar,Info,NotebookPen} from 'lucide-react'
import { Separator } from "../../components/ui/separator"

export default function Page(){
  const router = useRouter()
  const [step,setStep] = useState(0)
  const [bookingState,setBookingState] = useState({
    service:"Initial Consult - Cancer | 30 mins | 249 EUR",
    date:"",
  })

  const [loading,setLoading] = useState(false)

  const sleep = (time)=>{
    return new Promise((resolve)=>{
      setTimeout(resolve,time)
    })
  }

  const handlePayment = useCallback(async ()=>{
    setLoading(true)
    await sleep(3000)
    setLoading(false)
    router.push('/payment')
  }
,[router]) 

const ConsultationItem = () => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shrink-0 bg-neutral-50 cursor-pointer">
      {/* Left section with icon and title */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl font-semibold text-gray-600">
          I
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-gray-900">Initial Consult - Cancer</span>
          <Check className="w-5 h-5 text-emerald-500" />
        </div>
      </div>
      
      {/* Right section with price and duration */}
      <div className="flex flex-col items-end">
        <span className="font-semibold text-lg">249 EUR</span>
        <span className="text-sm text-gray-500">30 mins</span>
      </div>
    </div>
  );
};

  const AccordionItem = ({step,currentStep,title,Icon})=>{
    return <div 
      onClick={()=>setStep(step)}
      className="cursor-pointer mx-auto w-2/3 rounded-md border border-neutral-200 p-8">
      <div className={`w-full flex items-center justify-between`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center bg-[#0D9488] rounded-full shrink-0 w-12 h-12">
          <Icon className="text-white w-5 h-5"/>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[#0D9488] font-semibold">{title}</h3>
        {bookingState[title.toLowerCase()]}</div>
      </div>
      <div>
        <ChevronDown className="w-6 h-6 text-[#0D9488]"/>
      </div>
    </div>
     {currentStep === step ? 
        <div>
          <Separator className="my-3"/>
            <div className="mt-6">
              {renderStep()}
            </div>
        </div>
     : null } 
    </div>
  }

  const formatTime = (date,time)=>{
return `${new Date(`${new Date().getMonth()+1} ${date} ${new Date().getFullYear()}`).toLocaleDateString('en-GB',{
        day:'2-digit',
        month:'short',
        year:'numeric'
      })} | ${time}`
  }

  const handleDateTimeChange = useCallback(({date,time})=>{
    console.log('there',date,time)
    if(formatTime(date,time) !== bookingState.date){
    setBookingState({
      ...bookingState,
      date:formatTime(date,time)
      })
    }
  },[bookingState,setBookingState])

  const renderStep = useCallback(()=>{
    switch(step){
      case 0:
        return <ConsultationItem/>
      case 1:
        return <DateTimePicker 
          onChange={handleDateTimeChange}/>
      case 2:
        return <BookingForm onSubmit={handlePayment}/>
      break;
    }
  }
,[handleDateTimeChange,step,handlePayment]) 

return <>
   {loading? 
    <div className="flex items-center justify-center fixed bg-black/50 inset-0 z-10">
      <div className="w-24 h-24 border-8 border-white rounded-full shrink-0 border-b-primary animate-spin"/>
    </div>
   : null} 
    <div className="h-full space-y-6 pt-8">
    {/* {renderStep()} */}
  {/* <AccordionItem currentStep={step} step={0}/>   */}
  <div className="mx-auto w-2/3">
<h3 className="text-primary text-3xl font-bold">Book a Consultation</h3>
        <p className="mt-2">
You can book your appointment with a genetic expert in a few simple steps.
Please carefully select the time zone you are based in and make sure that the contact details provided are correct. 
Speak with you soon!</p>
  </div>
  <AccordionItem 
      currentStep={step} 
      step={0} 
      title="Service"
      Icon={NotebookPen}
      />  
  <AccordionItem 
      currentStep={step} 
      step={1} 
      title="Date & Time"
      Icon={Calendar}
    />
  <AccordionItem 
      currentStep={step} 
      step={2} 
      title="Info"
      Icon={Info}
    />
  {/* <AccordionItem currentStep={step} step={3}/>*/}
  </div>
  </>
}
