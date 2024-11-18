'use client'
import React,{useState} from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {ChevronDown} from 'lucide-react'
import Link from 'next/link'

const FAQAccordion = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "What is genetic counselling and who provides this?",
      answer: "Genetic counselling is a healthcare service that provides information and support to people who have, or may be at risk for, genetic conditions. It is provided by certified genetic counsellors who have specialized training in medical genetics and counselling."
    },
    {
      id: 2,
      question: "Who should have genetic counselling?",
      answer: "Genetic counselling may be beneficial for individuals who have a personal or family history of genetic conditions, are planning a pregnancy, have experienced multiple miscarriages, or are interested in understanding their genetic health risks."
    },
    {
      id: 3,
      question: "Are GeneLinx's services available in my country?",
      answer: "GeneLinx provides services in multiple regions. Please contact us directly to confirm availability in your specific location."
    },
    {
      id: 4,
      question: "What clinical specialties do you offer services in?",
      answer: "We offer genetic counselling services in multiple specialties including cancer genetics, reproductive genetics, pediatric genetics, and preventive genetic health."
    },
    {
      id: 5,
      question: "Can GeneLinx order clinical genetic testing for me?",
      answer: "Yes, GeneLinx can coordinate genetic testing through our network of certified laboratories when clinically appropriate."
    },
    {
      id: 6,
      question: "Do I need to be referred by my physician to schedule an appointment with GeneLinx?",
      answer: "No, you can schedule a consultation directly with GeneLinx without a physician referral."
    },
    {
      id: 7,
      question: "How can a healthcare provider (HCP) or a partner refer a patient to your service?",
      answer: "Healthcare providers can refer patients through our secure online referral portal or by contacting our professional services team directly."
    },
    {
      id: 8,
      question: "How is my data secured and who will have access to it?",
      answer: "We maintain strict confidentiality and comply with all relevant data protection regulations. Your information is encrypted and only accessible to your dedicated healthcare team."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-teal-900 mb-8">Frequently asked questions</h2>
      
      <div className="space-y-4">
        {faqItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
              onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <ChevronDown 
 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openItem === item.id ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            
            {openItem === item.id && (
              <div className="px-4 pb-4 text-gray-600">
                <div className="pt-2 border-t border-gray-200">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className="mt-8 flex gap-4 justify-center"> */}
      {/*   <button className="px-6 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-50 transition-colors"> */}
      {/*     Find more answers here */}
      {/*   </button> */}
      {/*   <button className="px-6 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-50 transition-colors"> */}
      {/*     Contact us */}
      {/*   </button> */}
      {/* </div> */}
    </div>
  );
};

const ConsultationBooking = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-4">Book an initial consultation</h1>

      <p className="mb-8 text-gray-700">
        Understand your risks, if genetic testing is right for you and which test might help you.
        To learn more about your journey with GeneLinx,
        <a href="#" className="text-primary hover:text-teal-700"> click here</a>
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Cancer Section */}
        <Card className="overflow-hidden bg-[#F8F9FA]">
          <div className="h-48">
            <img
              src="https://gene-linx.com/wp-content/uploads/2024/06/Image-217-1.png"
              alt="Child waving"
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">Cancer</h2>
              <span className="text-gray-600">€249</span>
            </div>
            <ul className="text-sm text-primary grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" src="https://gene-linx.com/wp-content/uploads/2024/06/cencer.png"/> 
                <span>I was diagnosed with cancer</span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" src="https://gene-linx.com/wp-content/uploads/2024/06/cencer.png"/> 
                <span>I have a family history of cancer</span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" src="https://gene-linx.com/wp-content/uploads/2024/06/cencer.png"/> 
                <span>I need to be tested for a familial cancer genetic change</span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" src="https://gene-linx.com/wp-content/uploads/2024/06/cencer.png"/> 
                <span>I need to be tested for a familial cancer genetic change</span>
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <button className="text-primary hover:text-teal-700">Read more</button>
              <Link href="/otp?booking=true">
              <button className="bg-primary text-white px-6 py-2 rounded hover:bg-teal-900">Book Now</button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Reproductive Section */}
        <Card className="overflow-hidden bg-[#F8F9FA]">
          <div className="h-48">
            <img
              src="https://gene-linx.com/wp-content/uploads/2024/06/2566956f-1c28-4b79-aa7c-d02a303949f1-scaled.jpg"
              alt="Happy couple"
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">Reproductive</h2>
              <span className="text-gray-600">€249</span>
            </div>
            <ul className="text-sm text-primary grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-7" 
              src="https://gene-linx.com/wp-content/uploads/2024/06/health.png"
                /> 
                <span>
I am planning a pregnancy and want to know my risks
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-7" 
              src="https://gene-linx.com/wp-content/uploads/2024/06/health.png"
                /> 
                <span>
I have a history of stillbirths or miscarriages
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img 
                  className="w-7" 
              src="https://gene-linx.com/wp-content/uploads/2024/06/health.png"
                /> 
                <span>
                  I want to understand genetic test options in pregnancy
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img 
                  className="w-7" 
              src="https://gene-linx.com/wp-content/uploads/2024/06/health.png"
                /> 
                <span>
I have a family history of disease and want to know the risks to my future pregnancy
                </span>
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <button className="text-teal-600 hover:text-teal-700">Read more</button>
              <Link href="/otp?booking=true">
              <button className="bg-primary text-white px-6 py-2 rounded hover:bg-teal-900">Book Now</button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Proactive Section */}
        <Card className="overflow-hidden bg-[#F8F9FA]">
          <div className="h-48">
            <img
              src="https://gene-linx.com/wp-content/uploads/2024/06/da10fbd7-db1e-4dd8-83b6-acfe473b24d3-scaled-e1724788042727.jpg"
              alt="Person exercising"
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-teal-900">Proactive</h2>
              <span className="text-gray-600">€249</span>
            </div>
            <ul className="text-sm text-primary grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" 
                  src="https://gene-linx.com/wp-content/uploads/2024/06/pro.png"
                /> 
                <span>
I am healthy and curious about genetic testing for preventive health
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" 
                  src="https://gene-linx.com/wp-content/uploads/2024/06/pro.png"
                /> 
                <span>
I want to know my risk for common genetic diseases
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" 
                  src="https://gene-linx.com/wp-content/uploads/2024/06/pro.png"
                /> 
                <span>
I need guidance on the right preventive genetic test
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" 
                  src="https://gene-linx.com/wp-content/uploads/2024/06/pro.png"
                /> 
                <span>
I have results from a genetic test and want to discuss my results
                </span>
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <button className="text-teal-600 hover:text-teal-700">Read more</button>
              <Link href="/otp?booking=true">
              <button className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-900">Book Now</button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Other Indications Section */}
        <Card className="overflow-hidden bg-[#F8F9FA]">
          <div className="h-48 bg-gray-200">
            <img
              src="https://gene-linx.com/wp-content/uploads/2024/06/1d1e6d3e-a83c-4575-b458-e2583f9bf4d0-scaled-e1724787499961.jpg"
              alt="Group of people"
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-teal-900">Other Indications</h2>
              <span className="text-gray-600">€249</span>
            </div>
            <ul className="text-sm text-primary grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" 
              src="https://gene-linx.com/wp-content/uploads/2024/06/other.png"
                /> 
                <span>
I have a genetic disease that is not cancer
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" 
              src="https://gene-linx.com/wp-content/uploads/2024/06/other.png"
                /> 
                <span>
I have a family history of a disease that could be genetic (not cancer)
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" 
              src="https://gene-linx.com/wp-content/uploads/2024/06/other.png"
                /> 
                <span>
There is a disease-causing genetic change in my family (not cancer)
                </span>
              </li>
              <li className="flex items-start bg-white gap-3 p-2">
               <img className="w-8" 
              src="https://gene-linx.com/wp-content/uploads/2024/06/other.png"
                /> 
                <span>
I want to discuss my previous test results (not cancer or proactive)
                </span>
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <button className="text-teal-600 hover:text-teal-700">Read more</button>
              <Link href="/otp?booking=true">
              <button className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-900">Book Now</button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-[#D6EDE8] p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">Unsure of which service to choose?</h2>
        <div className="text-center">
          <a href="#" className="text-teal-600 hover:text-teal-700 text-lg font-semibold underline">
            Contact us
          </a>
        </div>
      </div>
      <FAQAccordion/>
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-50">
          Find more answers here
        </button>
        <button className="px-6 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-50">
          Contact us
        </button>
      </div>
    </div>
  );
};

export default ConsultationBooking;
