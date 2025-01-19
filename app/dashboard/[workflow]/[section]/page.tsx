'use client'
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const EditButton = ({ secondary }: { secondary?: boolean }) => {
  return <div className={`cursor-pointer absolute -top-4 -right-3 w-8 h-8 rounded-full shadow-md ${secondary ? "bg-teal-800" : "bg-white "} flex items-center justify-center`}>
    <Pencil className={`w-4 h-4 ${secondary && "text-white"}`} />
  </div>
}

const Field = ({ heading, text = "First Name, Middle Name, Last Name, Date of Birth" }: { heading: string, text: string }) => {
  return <div className="bg-white shadow-md relative flex flex-col rounded-xl p-4 space-y-1">
    <EditButton secondary />
    <h3 className="font-bold">Text Fields</h3>
    <p className="text-slate-500">{text}</p>
  </div>
}

export default function Section() {
  return <div className="w-full bg-[#f6f6f6] min-h-screen">
    <div className="p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-start flex-col">
          <h1 className="inline relative text-4xl font-bold text-teal-900">
            <div className="absolute -top-4 -right-12 w-8 h-8 rounded-full shadow-md bg-white flex items-center justify-center">
              <Pencil className="w-4 h-4" />
            </div>
            Patient Details
          </h1>
          <p className="relative text-slate-600 mt-3 inline-flex">
            <div className="absolute -top-4 -right-12 w-8 h-8 rounded-full shadow-md bg-white flex items-center justify-center">
              <Pencil className="w-4 h-4" />
            </div>
            Please enter your personal and medical information.
          </p>
        </div>
        <Button
          onClick={() => { }}
          className="hover:bg-teal-700 bg-teal-800">
          + Add New Field
        </Button>
      </header>

      <div className="mt-8 w-full grid grid-cols-2 gap-8 pr-8 items-start">
        <Field />
        <Field />
        <Field />
        <Field />
        <Field text="First Name, Middle Name, Last Name, Date of Birth First Name, Middle Name, Last Name, Date of Birth" />
        <Field />
        <Field />
      </div>
    </div>
  </div>
}
