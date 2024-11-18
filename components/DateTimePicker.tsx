import React, { useState,useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DateTimePicker = ({onChange}) => {
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  
  const morningSlots = ['11:00', '11:15'];
  const nightSlots = ['22:00', '22:15', '22:30', '22:45', '23:00', '23:15'];

  useEffect(()=>{
    // if(selectedDate && selectedTimeSlot){
    // onChange({date:selectedDate,time:selectedTimeSlot})
    // console.log(selectedDate,selectedTimeSlot)
    // }
  },[selectedDate,selectedTimeSlot,])

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(i);
    }
    return days;
  };

  const TimeSlot = ({ time }) => (
    <button
      className={`px-4 py-2 rounded border border-teal-500 hover:bg-teal-50 
        ${selectedTimeSlot === time ? 'bg-teal-500 text-white hover:bg-teal-600' : 'text-teal-500'}`}
      onClick={() => setSelectedTimeSlot(time)}>
      {time}
    </button>
  );

  return (
    <div className="max-w-5xl text-sm mx-auto p-4">
      {/* <div className="mb-2"> */}
      {/*   {new Date(`${new Date().getMonth()+1} ${selectedDate} ${new Date().getFullYear()}`).toLocaleDateString('en-GB',{ */}
      {/*   day:'2-digit', */}
      {/*   month:'short', */}
      {/*   year:'numeric' */}
      {/* })} | {selectedTimeSlot}</div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <ChevronLeft className="w-6 h-6 text-gray-500 cursor-pointer" />
              <span className="text-base">{new Date().toLocaleString('default',{month:'long'})} {new Date().getFullYear()}</span>
              <ChevronRight className="w-6 h-6 text-gray-500 cursor-pointer" />
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {generateCalendarDays().map(day => (
                <button
                  key={day}
                  className={`p-2 rounded-full hover:bg-gray-100
                    ${selectedDate === day ? 'bg-teal-500 text-white hover:bg-teal-600' : ''}
                    ${day === 25 ? 'bg-teal-500 text-white' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Slots Section */}
        <Card>
          <CardHeader>
            <CardTitle>Slot Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <Select defaultValue="nairobi">
              <SelectTrigger className="w-full mb-6">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uk">Europe/UK - GMT (+00:00)</SelectItem>
                <SelectItem value="berlin">Europe/Berlin - CET (+01:00)</SelectItem>
                <SelectItem value="nairobi">Africa/Nairobi - EAT (+03:00)</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-6">
              <div>
                <h3 className="text-right mb-4 text-gray-600">Morning</h3>
                <div className="flex gap-2 flex-wrap">
                  {morningSlots.map(time => (
                    <TimeSlot key={time} time={time} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-right mb-4 text-gray-600">Night</h3>
                <div className="flex gap-2 flex-wrap">
                  {nightSlots.map(time => (
                    <TimeSlot key={time} time={time} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DateTimePicker;
