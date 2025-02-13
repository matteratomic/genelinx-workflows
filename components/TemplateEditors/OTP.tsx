import React, { useState, useEffect } from 'react';
import { Settings2, Save, Undo, Mail, Lock, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

const OTPTemplateEditor = ({
  data,
  onTemplateChange,
  isWorkflowBlock
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email');
  const [message, setMessage] = useState({ type: '', content: '' });
  const [generatedOTP] = useState('1234');

  const [template, setTemplate] = useState({
    title: 'Email Confirmation',
    description: "We'd like to confirm your email address before proceeding further",
    emailLabel: 'Email',
    buttonText: 'Send OTP',
    placeholderText: 'Enter your email',
    otpTitle: 'Enter Verification Code',
    otpDescription: 'Please enter the verification code sent to your email',
    otpLabel: 'One-Time Password',
    otpPlaceholder: 'Enter OTP',
    otpButtonText: 'Verify OTP'
  });

  useEffect(() => {
    if (data) {
      setTemplate(data);
    }
  }, [data]);

  const handleSave = () => {
    setIsEditing(false);
    onTemplateChange(template);
  };

  const handleRevert = () => {
    setTemplate(data || {
      title: 'Email Confirmation',
      description: "We'd like to confirm your email address before proceeding further",
      emailLabel: 'Email',
      buttonText: 'Send OTP',
      placeholderText: 'Enter your email',
      otpTitle: 'Enter Verification Code',
      otpDescription: 'Please enter the verification code sent to your email',
      otpLabel: 'One-Time Password',
      otpPlaceholder: 'Enter OTP',
      otpButtonText: 'Verify OTP'
    });
    setIsEditing(false);
  };

  const updateTemplate = (field, value) => {
    const updatedTemplate = { ...template, [field]: value };
    setTemplate(updatedTemplate);
    onTemplateChange(updatedTemplate);
  };

  const renderEditingForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          value={template.title}
          onChange={(e) => updateTemplate('title', e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input
          value={template.description}
          onChange={(e) => updateTemplate('description', e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email Label</label>
        <Input
          value={template.emailLabel}
          onChange={(e) => updateTemplate('emailLabel', e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Button Text</label>
        <Input
          value={template.buttonText}
          onChange={(e) => updateTemplate('buttonText', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-4">OTP Verification Step</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">OTP Title</label>
            <Input
              value={template.otpTitle}
              onChange={(e) => updateTemplate('otpTitle', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">OTP Description</label>
            <Input
              value={template.otpDescription}
              onChange={(e) => updateTemplate('otpDescription', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">OTP Button Text</label>
            <Input
              value={template.otpButtonText}
              onChange={(e) => updateTemplate('otpButtonText', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailStep = () => (
    <motion.form
      key="email-form"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={(e) => {
        e.preventDefault();
        setStep('otp');
        setMessage({
          type: 'success',
          content: `OTP sent to ${email}. For this demo, the OTP is: ${generatedOTP}`
        });
      }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">{template.title}</h2>
      <p className="text-gray-600">{template.description}</p>
      <div className="space-y-2">
        <Label className="text-gray-700">{template.emailLabel}</Label>
        <div className="relative">
          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={template.placeholderText}
            className="pl-10 w-full"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        {template.buttonText}
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.form>
  );

  const renderOTPStep = () => (
    <motion.form
      key="otp-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={(e) => {
        e.preventDefault();
        if (otp === generatedOTP) {
          setMessage({ type: 'success', content: 'OTP verified successfully!' });
        } else {
          setMessage({ type: 'error', content: 'Invalid OTP. Please try again.' });
        }
      }}
      className="space-y-6"
    >
      {/* <Button */}
      {/*   type="button" */}
      {/*   variant="ghost" */}
      {/*   onClick={() => setStep('email')} */}
      {/*   className="mb-4" */}
      {/* > */}
      {/*   ← Back to Email */}
      {/* </Button> */}

      <h2 className="text-2xl font-bold text-gray-900">{template.otpTitle}</h2>
      <p className="text-gray-600">{template.otpDescription}</p>
      <div className="space-y-2">
        <Label className="text-gray-700">{template.otpLabel}</Label>
        <div className="relative">
          <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder={template.otpPlaceholder}
            className="pl-10 w-full"
            maxLength={4}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        {template.otpButtonText}
        <CheckCircle className="w-5 h-5 ml-2" />
      </Button>

      <div
        onClick={() => setStep('email')}
        className="cursor-pointer w-full text-center text-xs mx-auto text-green-700 underline">
        Back to email
      </div>

    </motion.form>
  );

  return (
    <div className="w-full max-w-xl p-6 pt-0 space-y-4">
      <div className="flex justify-start space-x-2">
        {!isWorkflowBlock && (
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings2 className="w-4 h-4 mr-2" />
            {isEditing ? 'Editing Mode' : 'Edit Template'}
          </Button>
        )}
        {isEditing && (
          <>
            <Button onClick={handleSave} variant="default">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={handleRevert} variant="outline">
              <Undo className="w-4 h-4 mr-2" />
              Revert
            </Button>
          </>
        )}
      </div>

      <Card className="w-full bg-white shadow-lg">
        <CardContent className="p-6">
          {isEditing ? (
            renderEditingForm()
          ) : (
            <>
              {/* {step !== "email" ? */}
              {/*   <Button */}
              {/*     type="button" */}
              {/*     // variant="ghost" */}
              {/*     onClick={() => setStep('email')} */}
              {/*     className="mb-4"> */}
              {/*     <ArrowLeft className="w-4 h-4" /> */}
              {/*     Back */}
              {/*   </Button> */}
              {/*   : null} */}
              <AnimatePresence mode="wait">
                {message.content && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}>
                    <Alert className={`mb-6 ${message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                      <AlertDescription className="flex items-center">
                        {message.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
                        {message.content}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {step === 'email' ? renderEmailStep() : renderOTPStep()}
              </AnimatePresence>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPTemplateEditor;
