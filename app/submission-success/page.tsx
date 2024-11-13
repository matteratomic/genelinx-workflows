'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const FormSuccessScreen = () => {
  const searchParams = useSearchParams()
  const proceed = searchParams.get('proceed')
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="-mt-16 w-full max-w-md mx-auto">
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
          {/* {showConfetti && ( */}
          {/*   <div className="mt-4 animate-confetti"> */}
          {/*     <span className="inline-block w-2 h-2 bg-green-500 rounded-full mx-1 animate-bounce"></span> */}
          {/*     <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mx-1 animate-bounce"></span> */}
          {/*     <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mx-1 animate-bounce"></span> */}
          {/*   </div> */}
          {/* )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSuccessScreen;
