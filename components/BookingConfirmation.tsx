import React from 'react';
import { CalendarDays } from 'lucide-react';

const CancellationPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6 font-sans">
      {/* Main Content */}
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Cancellation and Rescheduling Policy</h1>

        <p className="text-gray-800">
          You can always{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800">cancel</a>
          {' '}or{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800">reschedule</a>
          {' '}your appointment until 48 hours prior to the session. Otherwise we will need to charge the amount in full as outlined in the cancellation and rescheduling policy in our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800">Terms of services</a>.
        </p>

        <p className="text-gray-800">
          Incase of any questions, please don't hesitate to contact us at{' '}
          <a href="mailto:appointments@gene-linx.com" className="font-medium">
            appointments@gene-linx.com
          </a>.
        </p>

        <p className="text-gray-800">
          We look forward to seeing you soon and are committed to helping you gain a deeper understanding of your genetic information from the comfort of your home.
        </p>

        <p className="text-gray-800">
          Regards,<br />
          Your GeneLinx Team
        </p>
      </div>

      {/* Footer Section */}
      <div className="bg-green-50 p-4 mt-8 rounded-lg">
        <div className="text-center space-y-2 text-gray-700 text-sm">
          <p>GeneLinx GmbH, Keibelstrasse 4, 10178 Berlin, Germany</p>
          <p>
            Registered at Charlottenburg, Berlin HRB 249270 B , Managing Directors: Alekhya Narravula, Aastha Jain
          </p>
          <p>
            <a href="https://www.gene-linx.com" className="text-blue-600 hover:text-blue-800">www.gene-linx.com</a>
            {' | '}
            <a href="mailto:contact@gene-linx.com" className="text-blue-600 hover:text-blue-800">contact@gene-linx.com</a>
            {' | '}
            <span>VAT ID: DE358928644</span>
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-pink-600 hover:text-pink-700">
            {/* <Instagram size={24} /> */}
            <img className="size-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" />
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700">
            <img className="size-8" src="https://www.facebook.com/images/fb_icon_325x325.png" />
            {/* <Linkedin size={24} /> */}
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700">
            <img className="size-8" src="https://rkycareers.com/wp-content/uploads/2022/09/174857.png" />
            {/* <Facebook size={24} /> */}
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Copyright 2024. GeneLinx GmbH, All rights reserved.
        </div>
      </div>
    </div>
  );
};

const BookingConfirmation = () => {
  return (
    <div className="mt-6 pt-6 max-w-3xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex justify-center mb-6">
        <img src="https://gene-linx.com/wp-content/uploads/2023/02/Logo-files2-01-1.svg" alt="GeneLinx Logo" className="h-10" />
      </div>

      {/* Booking Banner */}
      <div className="bg-[#e0f0f0] p-3 mb-6">
        <h1 className="text-center text-primary text-2xl">Booking confirmation</h1>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <p>Dear Test User,</p>
        <p className="mt-2">We are happy to confirm your appointment with GeneLinx for the Initial Consult - Other scheduled on 24-Dec-2024 at 20:15 (Singapore GMT +08:00)</p>
        <p className="mt-2">Booking ID: UL-059747</p>
      </div>

      {/* Next Steps Section */}
      <h2 className="text-xl text-green-700 mb-4">Next Steps...</h2>

      {/* Medical History Form Section */}
      <div className="bg-[#f4f4f1] p-8 flex items-start gap-4">
        <div className="w-72">
          {/* <Users className="w-16 h-16 text-green-600" /> */}
          <img src="b1.png" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Complete the Medical and Family History Form</h3>
          <p className="mb-2">Fill out the Medical and Family History Form at least 72 hours prior to your appointment to help us make the most out of your session.</p>
          <p className="mb-3">For an optimal experience, we recommend using a desktop or laptop to fill the form.</p>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700">
            Fill form
          </button>
        </div>
      </div>

      {/* Appointment Details Section */}
      <div className="bg-[#e9e1e6] p-8 flex items-start gap-4">
        <div className="w-72">
          <img src="b2.png" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Appointment details</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Service:</span> Initial Consult - Other</p>
            <p><span className="font-semibold">Date:</span> 24-Dec-2024</p>
            <p><span className="font-semibold">Time:</span> 20:15 (Singapore GMT +08:00)</p>
            <p><span className="font-semibold">GeneLinx Counsellor:</span> Andrea Hendricks</p>
            <p className="text-blue-600 underline mt-4">Join Meeting Link</p>
          </div>

          <div className="mt-4 pr-4 rounded">
            <p className="mb-2">If you have issues joining via the meeting link above, you have the option to dial into the session via your phone using these instructions:</p>
            <p className="font-semibold mb-2">How to access the audio using your phone</p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Find your country's dial-in number below or email for the meeting weblink.</li>
              <li>Select the phone option for audio instructions.</li>
              <li>A popup window will display the audio numbers for your country; an access code will also be provided.</li>
              <li>Dial into the local number shown as if making a regular phone call. You can skip the initial country menu if you are calling a toll number by quickly pressing #.</li>
              <li>Enter the PIN if requested and press #</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Calendar Buttons */}
      <p className="my-4">Add the appointment to your calendar</p>
      <div className="flex gap-4 mb-8">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          Add to Google Calendar
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          Add to Outlook
        </button>
      </div>
      <CancellationPolicy />
    </div>
  );
};

export default BookingConfirmation;
