'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import BookingConfirmation from '@/components/BookingConfirmation';
import SummaryReportEmail from '@/components/SummaryReport';
import Carousel from '@/components/Carousel';

const Success = ({ proceed }) => {
  return <Card className="h-72 w-full max-w-md mx-auto mt-24">
    <CardHeader className="flex justify-center py-6">
      <div className="mx-auto bg-primary p-3 w-16 h-16 flex items-center justify-center rounded-full">
        <CheckCircle size={32} color="white" />
      </div>
    </CardHeader>
    <CardContent className="text-center">
      <CardTitle className="text-2xl font-medium">Thank You!</CardTitle>
      <p className="mt-4">
        {proceed === "true"
          ? "Thank you for participating in the study. The coordinator will be in touch about kit shipment."
          : "Thank you for participating. You will be placed back on the clinic waiting list."
        }
      </p>
    </CardContent>
  </Card>
}

const FormSuccessScreen = () => {
  const searchParams = useSearchParams()
  const proceed = searchParams.get('proceed')
  return (
    <>

      {/* <BookingConfirmation /> */}
      {/* <SummaryReportEmail /> */}
      <Carousel
        items={[
          { id: 1, content: () => <Success proceed={proceed} /> },
          { id: 2, content: BookingConfirmation },
          { id: 3, content: () => <embed src="/consent.pdf#toolbar=0&navpanes=0&scrollbar=0" width="100%" height="100%" type="application/pdf" /> },
          { id: 4, content: SummaryReportEmail },
          { id: 5, content: () => <embed src="/summary.pdf#toolbar=0&navpanes=0&scrollbar=0" width="100%" height="100%" type="application/pdf" /> },
        ]}
      />
    </>
  );
};

const Page = () => {
  return <Suspense>
    <FormSuccessScreen />
  </Suspense>
}

export default Page;
