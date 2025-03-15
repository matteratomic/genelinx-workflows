"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Settings2,
  Save,
  Undo,
  Check,
  Calendar,
  ChevronDown,
  Info,
  NotebookPen,
  MoveRightIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingConsultationEditor = ({
  data,
  blockName,
  setBlockName,
  isWorkflowBlock,
  onTemplateChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState(
    data || {
      title: "Book a Consultation",
      subtitle:
        "You can book your appointment with a genetic expert in a few simple steps. Please carefully select the time zone you are based in and make sure that the contact details provided are correct. Speak with you soon!",
      service: {
        title: "Initial Consult - Cancer",
        price: "249 EUR",
        duration: "30 mins",
      },
      calendar: {
        timezones: [
          { value: "london", label: "Europe/London - GMT (+00:00)" },
          { value: "nairobi", label: "Africa/Nairobi - EAT (+03:00)" },
          { value: "newyork", label: "America/New_York - EST (-05:00)" },
        ],
        morningSlots: ["11:00", "11:15"],
        nightSlots: ["22:00", "22:15", "22:30", "22:45", "23:00", "23:15"],
      },
      form: {
        fields: [
          {
            id: "firstName",
            label: "Patient's First Name",
            placeholder: "Patient's First Name",
            type: "text",
            required: true,
          },
          {
            id: "lastName",
            label: "Last Name",
            placeholder: "Last Name",
            type: "text",
            required: true,
          },
          { id: "dob", label: "Date of Birth", type: "date", required: true },
          {
            id: "email",
            label: "Email",
            placeholder: "Email",
            type: "email",
            required: true,
          },
          {
            id: "phone",
            label: "Phone Number",
            placeholder: "Contact Number",
            type: "tel",
            required: true,
          },
          {
            id: "country",
            label: "Country of Residence",
            type: "select",
            required: true,
            options: [
              { value: "kenya", label: "Kenya" },
              { value: "uganda", label: "Uganda" },
              { value: "tanzania", label: "Tanzania" },
            ],
          },
        ],
        countryCode: {
          default: "+254",
          options: [
            { value: "+254", label: "+254" },
            { value: "+256", label: "+256" },
            { value: "+255", label: "+255" },
          ],
        },
      },
      consent: {
        contract:
          "I acknowledge and agree that I forfeit my right to revoke the contract once GeneLinx starts providing the service with my consent and I understand that the 48 hour cancellation policy of GeneLinx will still apply",
        health:
          "I consent to the processing of my health data and genetic data in the form of medical and family history for this purpose - This consent can be withdrawn in the future - Please refer to our privacy policy",
        transfer:
          "I consent to my data including health and genetic data to be transferred to the assigned Genetic Expert in order to schedule an appointment - This consent can be withdrawn in the future - Please refer to our privacy policy",
        terms:
          "I acknowledge that I have read, understood and agree to GeneLinx's terms of service and privacy policy",
      },
    },
  );
  const [savedTemplate, setSavedTemplate] = useState({ ...template });

  const updateTemplate = (field, value) => {
    const updatedTemplate = { ...template, [field]: value };
    setTemplate(updatedTemplate);
    onTemplateChange(updatedTemplate);
  };

  const handleSave = () => {
    setSavedTemplate({ ...template });
    setIsEditing(false);
  };

  const handleRevert = () => {
    setTemplate({ ...savedTemplate });
    setIsEditing(false);
  };

  // const updateOption = (optionIndex, newValue) => {
  //   const newOptions = [...question.options];
  //   newOptions[optionIndex] = newValue;
  //   updateField("options", newOptions);
  // };

  const addOption = (fieldIndex: number) => {
    const oldOptions = template.form.fields[fieldIndex].options;
    const newOptions = [
      ...template.form.fields[fieldIndex].options,
      {
        value: `Option-${oldOptions.length + 1}`,
        text: `Option-${oldOptions.length + 1}`,
      },
    ];
    const newFields = [...template.form.fields];

    newFields[fieldIndex] = {
      ...template.form.fields[fieldIndex],
      options: newOptions,
    };

    updateTemplate("form", {
      ...template.form,
      fields: newFields,
    });
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const newOptions = template?.form?.fields[fieldIndex].options.filter(
      (_, idx) => idx !== optionIndex,
    );
    const newFields = [...template.form.fields];

    newFields[fieldIndex] = {
      ...template?.form?.fields[fieldIndex],
      options: newOptions,
    };

    updateTemplate("form", {
      ...template.form,
      fields: newFields,
    });
  };
  //
  // Load initial data if provided
  useEffect(() => {
    if (data) {
      setTemplate(data);
    }
  }, [data]);

  return (
    <div className="w-full p-6 pt-0 space-y-4">
      <div className="flex justify-start space-x-2">
        {!isWorkflowBlock && (
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings2 className="w-4 h-4 mr-2" />
            {isEditing ? "Editing Mode" : "Edit Template"}
          </Button>
        )}
        {isEditing && (
          <>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={handleRevert} variant="outline">
              <Undo className="h-4 w-4 mr-2" />
              Revert
            </Button>
          </>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">General Settings</h3>
            <div>
              <Label>Block Name</Label>
              <Input
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
                placeholder="Enter a name for this block"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={template.title}
                // onChange={(e) => setTemplate({ ...template, title: e.target.value })}
                onChange={(e) => updateTemplate("title", e.target.value)}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={template.subtitle}
                // onChange={(e) => setTemplate({ ...template, subtitle: e.target.value })}

                onChange={(e) => updateTemplate("subtitle", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Service Settings</h3>
            <div>
              <Label>Service Title</Label>
              <Input
                value={template.service.title}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   service: { ...template.service, title: e.target.value }
                // })}

                onChange={(e) =>
                  updateTemplate("service", {
                    ...template.service,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                value={template.service.price}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   service: { ...template.service, price: e.target.value }
                // })}
                onChange={(e) =>
                  updateTemplate("service", {
                    ...template.service,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input
                value={template.service.duration}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   service: { ...template.service, duration: e.target.value }
                // })}
                onChange={(e) =>
                  updateTemplate("service", {
                    ...template.service,
                    duration: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Calendar Settings</h3>
            <div>
              <Label>Morning Time Slots (comma-separated)</Label>
              <Input
                value={template.calendar.morningSlots.join(", ")}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   calendar: {
                //     ...template.calendar,
                //     morningSlots: e.target.value.split(",").map(s => s.trim())
                //   }
                // })}
                onChange={(e) =>
                  updateTemplate("calendar", {
                    ...template.calendar,
                    morningSlots: e.target.value
                      .split(",")
                      .map((s) => s.trim()),
                  })
                }
              />
            </div>
            <div>
              <Label>Night Time Slots (comma-separated)</Label>
              <Input
                value={template.calendar.nightSlots.join(", ")}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   calendar: {
                //     ...template.calendar,
                //     nightSlots: e.target.value.split(",").map(s => s.trim())
                //   }
                // })}

                onChange={(e) =>
                  updateTemplate("calendar", {
                    ...template.calendar,
                    nightSlots: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Form Settings</h3>
            {template.form.fields.map((field, index) => (
              <div key={field.id} className="space-y-2 p-4 border rounded">
                <div className="flex justify-between items-center">
                  <Label>Field {index + 1}</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    // onChange={(e) => updateTemplate('service', { ...template.service, price: e.target.value })}
                    onClick={() => {
                      const newFields = [...template.form.fields];
                      newFields.splice(index, 1);
                      // setTemplate({
                      //   ...template,
                      //   form: { ...template.form, fields: newFields }
                      // });
                      updateTemplate("form", {
                        ...template.form,
                        fields: newFields,
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <Input
                  placeholder="Label"
                  value={field.label}
                  onChange={(e) => {
                    const newFields = [...template.form.fields];
                    newFields[index] = { ...field, label: e.target.value };
                    // setTemplate({
                    //   ...template,
                    //   form: { ...template.form, fields: newFields }
                    // });
                    updateTemplate("form", {
                      ...template.form,
                      fields: newFields,
                    });
                  }}
                />
                <Input
                  placeholder="Placeholder"
                  value={field.placeholder || ""}
                  onChange={(e) => {
                    const newFields = [...template.form.fields];
                    newFields[index] = {
                      ...field,
                      placeholder: e.target.value,
                    };
                    // setTemplate({
                    //   ...template,
                    //   form: { ...template.form, fields: newFields }
                    // });
                    updateTemplate("form", {
                      ...template.form,
                      fields: newFields,
                    });
                  }}
                />

                {template?.form?.fields[index]?.options?.map(
                  (option, optIndex) => (
                    <div key={`option-${optIndex}`} className="flex gap-2">
                      <Input
                        value={option.value}
                        //onChange={(e) => updateOption(optIndex, e.target.value)}
                        onChange={(e) => {
                          const newOptions = [
                            ...template.form.fields[index].options,
                          ];

                          newOptions[optIndex] = {
                            label: e.target.value,
                            value: e.target?.value
                              ?.toLowerCase()
                              .replace(" ", "-"),
                          };

                          const newFields = [...template.form.fields];

                          newFields[index] = {
                            ...field,
                            options: newOptions,
                          };
                          updateTemplate("form", {
                            ...template.form,
                            fields: newFields,
                          });
                        }}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeOption(index, optIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ),
                )}

                {template?.form?.fields[index]?.options?.length ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      addOption(index);
                    }}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                ) : null}

                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.required}
                    onCheckedChange={(checked) => {
                      const newFields = [...template.form.fields];
                      newFields[index] = { ...field, required: checked };
                      // setTemplate({
                      //   ...template,
                      //   form: { ...template.form, fields: newFields }
                      // });
                      updateTemplate("form", {
                        ...template.form,
                        fields: newFields,
                      });
                    }}
                  />
                  <Label>Required</Label>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newField = {
                  id: `field-${template.form.fields.length + 1}`,
                  label: "New Field",
                  placeholder: "",
                  type: "text",
                  required: false,
                };
                // setTemplate({
                //   ...template,
                //   form: {
                //     ...template.form,
                //     fields: [...template.form.fields, newField]
                //   }
                // });

                updateTemplate("form", {
                  ...template.form,
                  fields: [...template.form.fields, newField],
                });
              }}
            >
              Add Field
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Consent Settings</h3>
            <div>
              <Label>Contract Consent Text</Label>
              <Input
                value={template.consent.contract}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   consent: { ...template.consent, contract: e.target.value }
                // })}

                onChange={(e) =>
                  updateTemplate("consent", {
                    ...template.consent,
                    contract: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Health Data Consent Text</Label>
              <Input
                value={template.consent.health}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   consent: { ...template.consent, health: e.target.value }
                // })}
                onChange={(e) =>
                  updateTemplate("consent", {
                    ...template.consent,
                    health: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Data Transfer Consent Text</Label>
              <Input
                value={template.consent.transfer}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   consent: { ...template.consent, transfer: e.target.value }
                // })}
                onChange={(e) =>
                  updateTemplate("consent", {
                    ...template.consent,
                    transfer: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Terms Consent Text</Label>
              <Input
                value={template.consent.terms}
                // onChange={(e) => setTemplate({
                //   ...template,
                //   consent: { ...template.consent, terms: e.target.value }
                // })}
                onChange={(e) =>
                  updateTemplate("consent", {
                    ...template.consent,
                    terms: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <BookingForm template={template} />
      )}
    </div>
  );
};

function BookingForm({ template }) {
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingState, setBookingState] = useState({
    service: `${template.service.title} | ${template.service.duration} | ${template.service.price}`,
    date: "",
  });

  const ConsultationItem = () => (
    <div className="flex items-center justify-between p-4 rounded-lg shrink-0 bg-neutral-50 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl font-semibold text-gray-600">
          I
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-gray-900">
            {template.service.title}
          </span>
          <Check className="w-5 h-5 text-emerald-500" />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-semibold text-lg">{template.service.price}</span>
        <span className="text-sm text-gray-500">
          {template.service.duration}
        </span>
      </div>
    </div>
  );

  const AccordionItem = ({ step: itemStep, currentStep, title, Icon }) => (
    <div
      onClick={() => setStep(itemStep)}
      className="cursor-pointer mx-auto w-2/3 rounded-md border border-neutral-200 p-8"
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center bg-primary rounded-full shrink-0 w-12 h-12">
            <Icon className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-primary font-semibold">{title}</h3>
            {bookingState[title.toLowerCase()]}
          </div>
        </div>
        <ChevronDown className="w-6 h-6 text-primary" />
      </div>
      {currentStep === itemStep && (
        <div>
          <div className="border-t my-3" />
          <div className="mt-6">
            {itemStep === 0 && <ConsultationItem />}
            {itemStep === 1 && (
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <CalendarComponent
                    mode="single"
                    defaultMonth={new Date(2025, 0)}
                    selected={new Date(2025, 0, selectedDate)}
                    onSelect={(date) => setSelectedDate(date?.getDate())}
                  />
                </div>
                <div>
                  <div className="mb-6">
                    <Label>Timezone</Label>
                    <Select defaultValue="london">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {template.calendar.timezones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="mb-4">
                      <Label>Morning</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setSelectedTimeSlot(
                              template.calendar.morningSlots[0],
                            )
                          }
                        >
                          {template.calendar.morningSlots[0]}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            setSelectedTimeSlot(
                              template.calendar.morningSlots[1],
                            )
                          }
                        >
                          {template.calendar.morningSlots[1]}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Night</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {template.calendar.nightSlots.map((time) => (
                          <Button
                            key={time}
                            variant="outline"
                            onClick={() => setSelectedTimeSlot(time)}
                            className={
                              selectedTimeSlot === time
                                ? "bg-primary text-white"
                                : ""
                            }
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {itemStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{template.form.fields[0].label} *</Label>
                    <Input placeholder="Patient's First Name" />
                  </div>
                  <div>
                    <Label>{template.form.fields[1].label} *</Label>
                    <Input placeholder="Last Name" />
                  </div>
                </div>
                <div>
                  <Label>{template.form.fields[2].label} *</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>{template.form.fields[3].label} *</Label>
                  <Input type="email" placeholder="Email" />
                </div>
                <div>
                  <Label>{template.form.fields[4].label} *</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="+254">
                      <SelectTrigger className="w-24">
                        <SelectValue
                          placeholder={
                            template.form?.countryCode?.options[0].value
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {template.form?.countryCode?.options?.length
                          ? template.form?.countryCode?.options?.map(
                              (option) => {
                                return (
                                  <SelectItem value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                );
                              },
                            )
                          : null}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Contact Number" className="flex-1" />
                  </div>
                </div>
                <div>
                  <Label>{template.form.fields[5].label} *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                      {template.form.fields[5].options
                        ? template.form?.fields[5]?.options?.map((option) => {
                            return (
                              <SelectItem value={option.value}>
                                {option.label}
                              </SelectItem>
                            );
                          })
                        : null}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Checkbox id="contract" />
                    <Label htmlFor="contract" className="text-sm leading-none">
                      {template.consent.contract} *
                    </Label>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox id="healthData" />
                    <Label
                      htmlFor="healthData"
                      className="text-sm leading-none"
                    >
                      {template.consent.health} *
                    </Label>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox id="transfer" />
                    <Label htmlFor="transfer" className="text-sm leading-none">
                      {template.consent.transfer} *
                    </Label>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-md text-center">
                  <span className="font-medium">
                    Payment Amount: {template.service.price}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm leading-none">
                    {template.consent.terms}
                  </Label>
                </div>
                <Button className="w-full">Pay and Schedule Appointment</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 pt-8">
      <div className="mx-auto w-2/3">
        <h3 className="text-primary text-3xl font-bold">{template.title}</h3>
        <p className="mt-2">{template.subtitle}</p>
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
      <AccordionItem currentStep={step} step={2} title="Info" Icon={Info} />
    </div>
  );
}

export default BookingConsultationEditor;
