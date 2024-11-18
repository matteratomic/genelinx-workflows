import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Page(props: {}) {
  return (
    <div>
      <div className="flex px-8 bg-[#D6EDE8] justify-center items-center space-x-8">
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <h1 className="text-primary font-bold text-5xl">Access to Cascade Genetic Testing Study</h1>
          <p className="text-xl">
            You are being invited to take part in the Access to Cascade Genetic Testing (ACGT) research study to be carried out at St. James’s Hospital in partnership with Trinity College Dublin by Assistant Professor Rosie O Shea, Principal Genetic Counsellor and Professor Karen Cadoo.
          </p>
          <Link href="/otp?booking=true"><div className="cursor-pointer bg-primary flex items-center justify-center p-3 rounded-md text-white w-48 font-medium">Enroll Now</div></Link>
        </div>
        <div className="flex-1">
          <img src="https://gene-linx.com/wp-content/uploads/2024/06/Image-195.png" />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col p-16 space-y-6">
        <h1 className="text-primary font-bold text-4xl">Information about the study</h1>
        <p className="text-lg" dangerouslySetInnerHTML={{
          __html: `
          Before you decide whether or not you wish to take part, you should read the information provided in the leaflet carefully and, if you wish, discuss it with your family, friends or GP (doctor). Take time to ask questions – <strong>don’t feel rushed and don’t feel under pressure to make a quick decision.</strong>
<br/>
<br/>
          You should clearly understand the risks and benefits of taking part in this study so that you can make a decision that is right for you. This process is known as ‘Informed Consent’.
<br/>
<br/>
          You do not have to take part in this study. If you decide not to take part, it won’t affect your future medical care.
<br/>
<br/>
          You can change your mind about taking part in the study any time you like. Even if the study has started, you can still opt out. You don’t have to give us a reason. If you do opt out, rest assured it won’t affect the quality of treatment you get in the future.
<br/>
<br/>
          If you wish to opt out, please contact Rosie O Shea, Principal Genetic Counsellor (Phone 01-4103759, Email: rososhea@stjames.ie) who will be able to organise this for you.
        
`}}></p>
        <div className="mx-auto flex items-center justify-center space-x-6">
          <div className="cursor-pointer bg-primary flex items-center justify-center p-3 rounded-md text-white w-48 font-medium">Information Leaflet</div>
          <Link href="/otp"><div className="cursor-pointer bg-transparent border-2 border-primary text-primary flex items-center justify-center p-3 rounded-md w-48 font-medium">Enroll Now</div></Link>
        </div>
      </div>
      {/* Thank you for participating in the Access to Cascade Genetic Testing study.  */}
      {/* Please confirm your email address in the next steps. Once confirmed you will be provided with the consent form to enroll in the ACGT study. */}
      {/* start */}
      {/* first name */}
      {/* last name */}
      {/* unique patient ID* - Enter your patient ID from the hospital */}
      {/* email address* - Enter the email address that you want to register yourself with*/}


      {/* consent form  */}
      {/* Data processing consent - As part of the electronic signature, your writing speed, writing direction, writing pauses and, if appropriate, writing pressure (Special category data) are recorded and stored in encrypted form. This is to prove that you have written the signature. If you do not consent to the processing of this data, you have the option of signing on paper. You have the right to revoke your consent at any time. Revocation of consent does not affect the legality of the processing carried out on the basis of your consent until revocation. */}
      {/* No, I would like a paper copy, Yes, I give my consent */}
      {/* Toast message has been sent successfully */}
    </div>
  )
}


