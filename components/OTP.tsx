'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function SimulatedOTPConfirmation() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email') // 'email' or 'otp'
  const [message, setMessage] = useState({ type: '', content: '' })
  const [generatedOTP, setGeneratedOTP] = useState('')

  const simulateSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: '', content: '' })

    // Simulate OTP generation
    // const newOTP = Math.floor(100000 + Math.random() * 900000).toString()
    const newOTP = '1234'
    setGeneratedOTP(newOTP)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    setStep('otp')
    setMessage({ type: 'success', content: `OTP sent to ${email}. For this demo, the OTP is: ${newOTP}` })
  }

  const simulateVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp === generatedOTP) return
    setMessage({ type: '', content: '' })

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (otp === generatedOTP) {
      setMessage({ type: 'success', content: 'Email confirmed successfully!' })
    } else {
      setMessage({ type: 'error', content: 'Invalid OTP. Please try again.' })
    }
  }

  return (
    <div className="bg-[#D6EDE8]/40 min-h-screen flex items-center justify-center">
      <svg className="absolute scale-y-105" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1422 800"><g shape-rendering="crispEdges" stroke-linejoin="round" fill="#ffffff"><polygon points="1422,0 1422,200 1066.5,200"></polygon><polygon points="1066.5,0 1066.5,200 711,200"></polygon><polygon points="888.75,200 1066.5,300 888.75,300"></polygon><polygon points="888.75,200 888.75,300 711,200"></polygon><polygon points="888.75,300 888.75,400 711,400"></polygon><polygon points="1066.5,300 1066.5,400 888.75,400"></polygon><polygon points="1422,200 1422,400 1066.5,400"></polygon><polygon points="711,200 711,0 355.5,0"></polygon><polygon points="355.5,0 355.5,200 0,200"></polygon><polygon points="355.5,200 355.5,400 0,200"></polygon><polygon points="711,400 355.5,200 711,200"></polygon><polygon points="711,600 355.5,400 355.5,600"></polygon><polygon points="355.5,600 0,400 0,600"></polygon><polygon points="355.5,800 0,800 0,600"></polygon><polygon points="355.5,800 711,600 711,800"></polygon><polygon points="1066.5,400 1422,600 1066.5,600"></polygon><polygon points="1066.5,400 888.75,500 888.75,400"></polygon><polygon points="888.75,400 888.75,500 711,400"></polygon><polygon points="888.75,500 711,600 888.75,600"></polygon><polygon points="1066.5,500 1066.5,600 888.75,600"></polygon><polygon points="711,600 1066.5,800 1066.5,600"></polygon><polygon points="1422,600 1066.5,800 1422,800"></polygon></g><g fill="hsl(220, 62%, 45%)" stroke-width="3" stroke="hsl(220, 43%, 13%)"></g></svg>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full -mt-32 max-w-md"
      >
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Email Confirmation</h2>
            <p className="mb-6">We'd like to confirm your email address before proceeding further</p>

            <AnimatePresence mode="wait">
              {message.content && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
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
              {step === 'email' ? (
                <motion.form
                  key="email-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={simulateSendOTP}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                    Send OTP
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="otp-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={simulateVerifyOTP}
                  className="space-y-6"
                >
                  {otp !== generatedOTP ?
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium text-gray-700">One-Time Password</Label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    : null}
                  {/* <Button */}
                  {/*   type="submit" */}
                  {/*   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"> */}
                  {/*   {otp !== generatedOTP ? <> */}
                  {/*     Verify OTP */}
                  {/*     <CheckCircle className="w-5 h-5 ml-2" /> */}
                  {/*   </> : "Continue"} */}
                  {/* </Button> */}

                  {otp !== generatedOTP ?
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                      Verify OTP
                      <CheckCircle className="w-5 h-5 ml-2" />
                    </Button>
                    :
                    <Link href="/digital-education"><Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                      Continue
                    </Button>
                    </Link>
                  }
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
