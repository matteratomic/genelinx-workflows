import React from 'react';

const SummaryReportEmail = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      {/* Header */}
      <div className="bg-[#d7ede8] p-4 mb-8">
        <h1 className="text-2xl text-teal-800 text-center font-medium">Summary report ready</h1>
      </div>

      {/* Email Content */}
      <div className="space-y-6">
        <p className="text-gray-800">Dear Ms. Doe</p>

        <p className="text-gray-700">
          Attached is your <span className="underline">summary report</span> with all the discussion points and next steps from your appointment.
        </p>

        <p className="text-gray-700">
          If you had requested to <span className="underline">proceed with testing</span>, you should have received the <span className="underline">consent form</span> to review, sign and return via an e-signature tool. (Please also check your spam folder)
        </p>

        <p className="text-gray-700">
          Please download the attachment and save it for your records as this <span className="font-medium">secure email will expire after 1 month for security reasons</span>.
        </p>

        <p className="text-gray-700">
          If you have any questions, please do not hesitate to contact us at{' '}
          <a href="mailto:appointments@gene-linx.com" className="underline text-blue-600 hover:underline">
            appointments@gene-linx.com
          </a>
          . We are here to provide support and address any concerns you may have.
        </p>

        <p className="font-bold text-gray-800">
          DO NOT REPLY to this email as this mailbox is not monitored.
        </p>

        <p className="text-gray-700">
          Lastly, please provide us with your <span className="underline">feedback</span> regarding the session if you have not already done so, so that we can continue to improve our service.
        </p>

        {/* Signature */}
        <div className="pt-4">
          <p className="text-gray-700">Regards,</p>
          <p className="text-gray-700">Your GeneLinx Team</p>
        </div>

        {/* Footer */}
        <div className="bg-[#d7ede8] pt-8 pb-4 text-center text-sm text-gray-600 space-y-2 border-t border-gray-200">
          <p>GeneLinx GmbH, Keibelstrasse 4, 10178 Berlin, Germany</p>
          <p>Registered at Charlottenburg, Berlin HRB 249270 B , CEO: Alekhya Narravula</p>
          <div className="flex justify-center space-x-2">
            <a href="http://www.gene-linx.com" className="text-blue-600 hover:underline">www.gene-linx.com</a>
            <span>|</span>
            <a href="mailto:contact@gene-linx.com" className="text-blue-600 hover:underline">contact@gene-linx.com</a>
            <span>|</span>
            <span>VAT ID: DE358928644</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReportEmail;
