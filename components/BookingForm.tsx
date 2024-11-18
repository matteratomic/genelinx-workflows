import React, { useState } from 'react';
import {router} from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MedicalAppointmentForm = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    country: '',
    acknowledgeContract: false,
    consentHealth: false,
    consentTransfer: false,
    acknowledgeTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <>
    <Card className="shadow-none border-none w-full max-w-lg mx-auto p-6">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-center mb-6">Please enter your details</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                Patient's First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="Patient's First Name"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <Select defaultValue="+254">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="+254" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+254">+254</SelectItem>
                  {/* Add more country codes as needed */}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                placeholder="Contact Number"
                required
                className="flex-1 ml-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              Country of Residence <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kenya">Kenya</SelectItem>
                {/* Add more countries as needed */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox id="contract" required />
              <Label htmlFor="contract" className="text-sm">
                I acknowledge and agree that I forfeit my right to revoke the contract once GeneLinx starts providing the service with my consent and I understand that the 48 hour cancellation policy of GeneLinx will still apply <span className="text-red-500">*</span>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="healthConsent" required />
              <Label htmlFor="healthConsent" className="text-sm">
                I consent to the processing of my health data and genetic data in the form of medical and family history for this purpose - This consent can be withdrawn in the future - Please refer to our privacy policy <span className="text-red-500">*</span>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="transferConsent" required />
              <Label htmlFor="transferConsent" className="text-sm">
                I consent to my data including health and genetic data to be transferred to the assigned Genetic Expert in order to schedule an appointment - This consent can be withdrawn in the future - Please refer to our privacy policy <span className="text-red-500">*</span>
              </Label>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-center font-medium">Payment Amount: 249 EUR</p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm">
              I acknowledge that I have read, understood and agree to GeneLinx's{' '}
              <a href="#" className="text-blue-600 hover:underline">terms of service</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">privacy policy</a>
            </Label>
          </div>

          <Button onClick={onSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
            Pay and Schedule Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
    </>
  );
};

export default MedicalAppointmentForm;
