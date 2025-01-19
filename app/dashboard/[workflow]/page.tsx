import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const arr = [
  'OTP Code',
  'Book a Consultation',
  'Payment Request',
  'Schedule Appointment',
  'Consultation Form',
  'Question & Answer'
]

export default function WorkflowPage() {
  return (
    <div className="p-8 bg-[#f6f6f6] w-full">
      <div>
        <h1 className="text-4xl font-bold text-teal-900">Telegenetics</h1>
        <p className="text-slate-600 mt-3 w-6/12">
          Virtual genetic consultation to discuss family history and potential inherited health conditions.
        </p>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-teal-900 mb-6">Blocks</h2>
      </div>
      <div className="flex flex-col space-y-6 w-10/12">
        {arr.map((x, i) => {
          return <div key={i} className="px-4 flex items-center justify-between w-full bg-white h-20 rounded-md shadow-md">
            <div className="flex items-center justify-between space-x-4">
              <div
                style={{ backgroundImage: "url(/ellipse.png)" }}
                className="w-9 h-9 rounded-full bg-cover bg-center flex items-center justify-center text-white font-semibold">
                <p>{i + 1}</p>
              </div>
              <p className="font-semibold">{x}</p>
            </div>
            <div className="flex items-center justify-center space-x-4">

              <Button size="lg" type="button">Edit</Button>
              <Eye />
            </div>
          </div>
        })}
      </div>
    </div>
  );
}
