'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, CheckCircle } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import ConsentForm from '../ConsentForm';
import MedicalForm from './MedicalForm';


const Conflicts = [
  {
    q: "Do you feel sure about the best choice for you?",
    headers: ['Yes', 'No',]
  },
  { q: "Do you know the benefits and risks of each option?" },
  { q: "Are you clear about which benefits and risks matter most to you?" },
  { q: "Do you have enough support and advice to make a choice?" },
]

const AIM = [
  {
    q: "This alternate digital education pathway offered (in place of the appointment) met my approval",
    headers: ["Completely disagree", "Disagree", "Neither agree or disagree", "Agree", "Completely agree"]
  },
  { q: "The alternate digital education pathway is appealing to me" },
  { q: "I liked the alternate digital education pathway" },
  { q: "I welcome the alternate digital education pathway" },
]

const CourseSection = ({ title, description, topics, videoTitle, src }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="text-2xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="bg-neutral-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Key Topics:</h3>
          <ul className="space-y-2">
            {topics.map((topic, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <div className="relative rounded-lg overflow-hidden bg-neutral-100 aspect-video">
            {/* <div className="absolute inset-0 flex items-center justify-center"> */}
            {/*   <Button variant="outline" className="gap-2"> */}
            {/*     <PlayCircle className="h-5 w-5" /> */}
            {/*     Watch {videoTitle} */}
            {/*   </Button> */}
            {/* </div> */}
            <iframe
              className="w-full h-full"
              src={src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);


const progressMap = {
  fundamentals: 0,
  hboc: 20,
  lynch: 40,
  considerations: 60,
  review: 60,
  questions: 60,
  proceed: 80,
  conflict: 90,
  aim: 100,
};

const GeneticsCourse = () => {
  const [activeTab, setActiveTab] = useState("fundamentals");
  const [proceedTesting, setProceedTesting] = useState('No')
  const [hasSubmit, setHasSubmit] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const route = useRouter()

  const proceed = () => {
    setHasSubmit(true)
    if (proceedTesting === "Yes") {
      setActiveTab('conflict')
    } else {
      setActiveTab('aim')
      console.log('pass')
    }
  }

  const Question = ({
    title,
    length,
    headers,
    showHeader
  }) => {
    return <>
      <Label className="text-primary text-base leading-5 w-1/4">{title}</Label>
      <div className="flex flex-col ml-16 flex-1">
        {showHeader ?
          <div className="flex space-x-2 -translate-y-16 justify-center">
            {headers?.map((h, i) => {
              return <h3 key={i} className="text-sm text-center w-24">{h}</h3>
            })}
          </div>
          : null}
        <RadioGroup className={`${showHeader ? '-translate-y-8' : ''} justify-center flex flex-row space-x-20`}
        // onValueChange={(value) => setValue('appointmentType', value)}
        >
          {Array(length).fill(0).map((_, i) => {
            return <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem value={`${Math.random() * 100}`} id={`${Math.random() * 100}`} />
            </div>
          })}
        </RadioGroup>
      </div>
    </>
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Genetics and Hereditary Cancer</h1>
            <p className="text-xl opacity-90">Understanding genetic testing and hereditary cancer syndromes</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Course Progress</span>
              <span>{progressMap[activeTab]}%</span>
            </div>
            <Progress value={progressMap[activeTab]} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs
            value={activeTab}
            defaultValue="fundamentals"
            className="space-y-6"
            onValueChange={(value) => setActiveTab(value)}
          >
            <ScrollArea className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
                <TabsTrigger value="hboc">HBOC Syndrome</TabsTrigger>
                <TabsTrigger value="lynch">Lynch Syndrome</TabsTrigger>
                <TabsTrigger value="considerations">Considerations</TabsTrigger>
                <TabsTrigger value="review">Information Review</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="proceed">Proceed to Testing</TabsTrigger>
                {proceedTesting === "Yes" && hasSubmit ? <>
                  <TabsTrigger value="conflict">Decision Conflict Scale</TabsTrigger>
                </> : null}
                {hasSubmit ? <TabsTrigger value="aim">Acceptability Intervention Measure</TabsTrigger> : null}
              </TabsList>
            </ScrollArea>

            <TabsContent value="fundamentals">
              <CourseSection
                title="Fundamentals of Genetics and Genetic Testing"
                description="Learn the basic principles of genetics, inheritance patterns, and the role of genetic testing in healthcare."
                topics={[
                  "DNA structure and function",
                  "Inheritance patterns",
                  "Types of genetic testing",
                  "Understanding test results"
                ]}
                videoTitle="Introduction to Genetic Testing"
                src="https://www.youtube.com/embed/lMSIwbAJf1I?si=0OSr5FEfSTAsUcqd"
              />
            </TabsContent>

            <TabsContent value="hboc">
              <CourseSection
                title="Hereditary Breast and Ovarian Cancer Syndrome"
                description="Explore BRCA1/2 mutations and their impact on cancer risk assessment and management."
                topics={[
                  "BRCA1 and BRCA2 genes",
                  "Risk assessment",
                  "Prevention strategies",
                  "Management options"
                ]}
                videoTitle="Understanding BRCA Mutations"
                src="https://www.youtube.com/embed/C7IZE8y8o30?si=DCQ1YUTslxcyUvGE"
              />
            </TabsContent>

            <TabsContent value="lynch">
              <CourseSection
                title="Lynch Syndrome"
                description="Understanding hereditary colorectal cancer and associated cancer risks."
                topics={[
                  "MMR genes and their function",
                  "Cancer screening guidelines",
                  "Risk reduction strategies",
                  "Family history assessment"
                ]}
                videoTitle="Lynch Syndrome Explained"
                src="https://www.youtube.com/embed/LKANkNE6V2Q?si=1tio5YHD3uMKYCLg"
              />
            </TabsContent>

            <TabsContent value="considerations">
              <CourseSection
                title="Considerations for Genetic Testing"
                description="Important factors to consider before pursuing genetic testing."
                topics={[
                  "Psychological impact",
                  "Privacy and discrimination",
                  "Insurance considerations",
                  "Family communication"
                ]}
                videoTitle="Making Informed Decisions"
                src="https://www.youtube.com/embed/W8iiLTi6MiY?si=UYDss8Yv1w9dbaRg"
              />
            </TabsContent>

            <TabsContent value="review">
              <p>Let us review the information we have covered</p>
              <br />
              <p>Now that we've covered the key information about cancer genetics and testing, here are a few questions to help you remember the most important pieces of information.</p>
              <br />
              <p>This isn't a test – it's an opportunity to review the information and ensure everything is clear to you to help you make the right decision for you.</p>
              <br />
              <p> Before we begin:</p>
              <ul className="pl-8 list-disc">
                <li>Feel free to refer back to the information in the module if you need to.</li>
                <li>Take your time with each question. There's no rush.</li>
                <li>After each question, the right information is shown to help you check your understanding.</li>
              </ul>

              {/* <CourseSection */}
              {/*   title="Considerations for Genetic Testing" */}
              {/*   description="Important factors to consider before pursuing genetic testing." */}
              {/*   topics={[ */}
              {/*     "Psychological impact", */}
              {/*     "Privacy and discrimination", */}
              {/*     "Insurance considerations", */}
              {/*     "Family communication" */}
              {/*   ]} */}
              {/*   videoTitle="Making Informed Decisions" */}
              {/*   src="https://www.youtube.com/embed/W8iiLTi6MiY?si=UYDss8Yv1w9dbaRg" */}
              {/* /> */}
            </TabsContent>

            <TabsContent className="pl-4" value="questions">
              <div className="space-y-2">
                <Label className="text-primary text-base">
                  Knowing about inherited risk (passed down within a family) can affect choices about cancer treatments (for examples, medications or surgery).
                </Label>
                <RadioGroup
                  className="flex space-x-3 pt-3"
                // onValueChange={(value) => setValue('appointmentType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agree" id="agree" />
                    <Label htmlFor="male">Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disagree" id="disagree" />
                    <Label htmlFor="female">Disagree</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full h-4"></div>
              <Separator />
              <div className="w-full h-4"></div>

              <div className="space-y-2">
                <Label className="text-primary text-base">
                  People with an inherited risk for cancer (and their at-risk relatives) are more likely to develop more than one type of cancer
                </Label>
                <RadioGroup
                  className="flex space-x-3 pt-3"
                // onValueChange={(value) => setValue('appointmentType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agree" id="agree" />
                    <Label htmlFor="male">Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disagree" id="disagree" />
                    <Label htmlFor="female">Disagree</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full h-4"></div>
              <Separator />
              <div className="w-full h-4"></div>

              <div className="space-y-2">
                <Label className="text-primary text-base">
                  A person with inherited risk for cancer will definitely get cancer one day.
                </Label>
                <RadioGroup
                  className="flex space-x-3 pt-3"
                // onValueChange={(value) => setValue('appointmentType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agree" id="agree" />
                    <Label htmlFor="male">Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disagree" id="disagree" />
                    <Label htmlFor="female">Disagree</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full h-4"></div>
              <Separator />
              <div className="w-full h-4"></div>

              <div className="space-y-2">
                <Label className="text-primary text-base">
                  If inherited risk for cancer is found, there is nothing a person can do to change his/her cancer risk
                </Label>
                <RadioGroup
                  className="flex space-x-3 pt-3"
                // onValueChange={(value) => setValue('appointmentType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agree" id="agree" />
                    <Label htmlFor="male">Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disagree" id="disagree" />
                    <Label htmlFor="female">Disagree</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full h-4"></div>
              <Separator />
              <div className="w-full h-4"></div>

              <div className="space-y-2">
                <Label className="text-primary text-base">
                  The lifetime chance of getting cancer depends on which altered cancer gene is inherited.
                </Label>
                <RadioGroup
                  className="flex space-x-3 pt-3"
                // onValueChange={(value) => setValue('appointmentType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agree" id="agree" />
                    <Label htmlFor="male">Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disagree" id="disagree" />
                    <Label htmlFor="female">Disagree</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full h-4"></div>
              <Separator />
              <div className="w-full h-4"></div>

              <div className="space-y-2">
                <Label className="text-primary text-base">
                  People with an inherited risk for cancer may get cancer at a younger age than people with average risk.
                </Label>
                <RadioGroup
                  className="flex space-x-3 pt-3"
                // onValueChange={(value) => setValue('appointmentType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agree" id="agree" />
                    <Label htmlFor="male">Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disagree" id="disagree" />
                    <Label htmlFor="female">Disagree</Label>
                  </div>
                </RadioGroup>
              </div>

            </TabsContent>

            <TabsContent value="proceed">
              <div className="space-y-2 pl-4">
                <Label className="text-primary text-lg">After reviewing the information provided would you like to proceed to testing?</Label>
                <div className="pt-2" />
                <RadioGroup
                  value={proceedTesting}
                  onValueChange={(value) => setProceedTesting(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="Yes" />
                    <Label htmlFor="Yes">Yes</Label>
                  </div>
                  <div className="pt-3" />
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="No" />
                    <Label htmlFor="No">No</Label>
                  </div>
                </RadioGroup>
                {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
              </div>
              <Button onClick={() => {
                // setHasSubmit(true)
                proceed()
              }} className="mt-8" size="lg">Submit</Button>
            </TabsContent>

            <TabsContent className="pl-4" value="conflict">
              <div className="w-full h-16"></div>
              <h1 className="font-medium text-sm">Please answer the questions below</h1>
              <div className="w-full h-4"></div>
              <Separator />
              <div className="w-full h-4"></div>

              <div className="pt-16 flex flex-col flex-wrap space-y-3 justify-center">
                {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
                {Conflicts.map((q, i) => {
                  const length = Conflicts[0]?.headers?.length
                  return <div
                    key={i}
                    className="flex"><Question
                      title={q.q}
                      length={length}
                      headers={q?.headers}
                      showHeader={i === 0}
                    /></div>
                })}
              </div>

              <Button
                onClick={() => {
                  setActiveTab('aim')
                }}
                className="mt-8"
                size="lg">Submit</Button>
            </TabsContent>

            <TabsContent className="pl-4" value="aim">
              <div className="w-full h-16"></div>
              <h1 className="font-medium text-sm">Please answer the questions below</h1>
              <div className="w-full h-4"></div>
              <Separator />
              <div className="w-full h-4"></div>

              <div className="pt-16 flex flex-col flex-wrap space-y-3 justify-center">
                {AIM.map((q, i) => {
                  const length = AIM[0]?.headers?.length
                  return <div
                    key={i}
                    className="flex"><Question
                      title={q.q}
                      length={length}
                      headers={q?.headers}
                      showHeader={i === 0}
                    /></div>
                })}
              </div>

              {hasSubmit && proceedTesting === "Yes" ?
                <DialogTrigger asChild>
                  <Button
                    className="mt-8"
                    size="lg">
                    Submit
                  </Button>
                </DialogTrigger>
                :
                <Button
                  onClick={() => route.push('/submission-success?proceed=false')}
                  className="mt-8"
                  size="lg">
                  Submit
                </Button>
              }
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="bg-primary/10 py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">© 2024 GeneLinx. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <DialogContent className="max-w-4xl max-h-[90vh]">
        <ScrollArea className="max-h-[70vh] rounded-md">
          {/* <ConsentForm second/> */}
          <MedicalForm />
        </ScrollArea>
        <div className="flex justify-end space-x-4">
          <Button onClick={() => setDialogOpen(false)} variant="outline" type="button">Cancel</Button>
          {/* <Link href="/digital-education"> */}
          <Button
            onClick={() => route.push('/submission-success?proceed=true')}
            type="submit">Submit</Button>
          {/* </Link> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneticsCourse;
