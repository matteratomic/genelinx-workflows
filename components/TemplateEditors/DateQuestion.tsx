import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const DateQuestion = ({ question }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="space-y-2">
      {/* <Label className="text-emerald-800"> </Label> */}
      {/**/}
      <div className="flex items-center gap-2">
        <input
          type="date"
          id={`date-${question.id}`}
          className="border rounded-md px-4 py-2"
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default DateQuestion;
