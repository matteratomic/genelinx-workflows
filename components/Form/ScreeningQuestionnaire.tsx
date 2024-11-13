import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Separator } from "../ui/separator"

const Questions = [
  {
    q: "The disease for which I am at risk is currently causing a significant disruption in my family life *",
    headers: ['Strongly Agree', 'Somewhat Agree', 'Neither Agree or Disagree', 'Somewhat Disagree', 'Strongly Disagree', 'Not Applicable']
  },
  { q: "I am worried that my test result will impact on my relationship with my significant other (or future partner) *" },
  { q: "I am worried about talking to my children (young or adult) about the heritable nature of the disease for which I am being tested *" },
  { q: "My worries about the disease affect my daily mood *" },
  { q: "I worry about my risk of getting the disease *" },
  { q: "I feel guilty that I might pass on the disease risk to my children *" },
  { q: "If I learn that i have a genetic mutation, I believe that I will have more problems in my life*" },
  { q: "If I learn that i have a genetic mutation, i will change plans for my career/profession *" },
  { q: "If I learn that i have a genetic mutation, I will have difficulties in my family relationships *" },
]

const Questions2 = [
  {
    q: "I have generally felt sad in the last month *	",
    headers: ['Almost all of the time', 'Often', 'Sometimes', 'Hardly ever', 'Not at all']
  },
  { q: "I have generally felt nervous and anxious in the past month *	" },
]


const Questions3 = [
  {
    q: "I have had emotional problems in the past *	",
    headers: ['Yes', 'No',]
  },
  { q: "I have had counselling with a counsellor and/or a mental health professional in the past *" },
  { q: "I have been diagnosed with a depressive or anxiety disorder in the past *" },
  { q: "I have had emotional problems that led me to have thoughts about suicide *" },
  { q: "I am now seeing a counsellor for one or more of these emotional concerns *" },
  { q: "I am interested in talking with a counsellor about one or more of these concerns *" },
]

export const ScreeningQuestionnaire = ({
  setValue
}) => {
  const Question = ({
    title,
    length,
    headers,
    showHeader
  }) => {
    return <>
      <Label className="text-primary leading-5 w-1/4">{title}</Label>
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
  return <>
    <CardHeader>
      <CardTitle>Screening Questionnaire</CardTitle>
      <CardDescription>
        The purpose of this questionnaire is to help identify individuals who may need additional support while going through genetic testing. The questions are about your life experiences and feelings about the disease for which you are receiving genetic testing/counselling. Please note that whenever the word 'disease' is used, it is referring to the disease for which you are having genetic testing and/or counselling. Please read each statement carefully, then respond by checking the most appropriate space.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2 pb-4">
        <Label className="text-primary">
          I have/had a personal diagnosis of the disease for which I am receiving counselling/testing *
        </Label>
        <RadioGroup className="flex flex-row space-x-2"
        // onValueChange={(value) => setValue('appointmentType', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="personalDiagnosis" />
            <Label htmlFor="personalDiagnosis">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="No" />
            <Label htmlFor="female">No</Label>
          </div>
        </RadioGroup>
        {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
      </div>
      <div className="space-y-2 pb-4">
        <Label className="text-primary">
          I have taken care of a very ill parent or another close family member (e.g sibling) *
        </Label>
        <RadioGroup className="flex flex-row space-x-2"
        // onValueChange={(value) => setValue('appointmentType', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="illMemberYes" />
            <Label htmlFor="illMemberYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="illMemberNo" />
            <Label htmlFor="illMemberNo">No</Label>
          </div>
        </RadioGroup>
        {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
      </div>
      <div className="space-y-2 pb-4">
        <Label className="text-primary">
          I lost a close family member (e.g parent/sibling) to the disease for which I am receiving counselling/testing *
        </Label>
        <RadioGroup className="flex flex-row space-x-2"
        // onValueChange={(value) => setValue('appointmentType', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="memberDeadYes" />
            <Label htmlFor="memberDeadYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="memberDeadNo" />
            <Label htmlFor="memberDeadNo">No</Label>
          </div>
        </RadioGroup>
        {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
      </div>
      <div className="w-full h-16"></div>
      <h1 className="font-medium text-sm">Please answer the questions below</h1>
      <Separator />
      <div className="pt-12 flex flex-row flex-wrap space-y-6 items-baseline">
        {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
        {Questions.map((q, i) => {
          const length = Questions[0]?.headers?.length
          return <Question
            title={q.q} length={length} headers={q?.headers} showHeader={i === 0} key={i} />
        })}
      </div>
      <div className="w-full h-16"></div>
      <h1 className="font-medium text-sm">Please answer the questions below</h1>
      <Separator />

      <div className="pt-12 flex flex-row flex-wrap space-y-6 items-baseline">
        {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
        {Questions2.map((q, i) => {
          const length = Questions2[0]?.headers?.length
          return <Question
            title={q.q} length={length} headers={q?.headers} showHeader={i === 0} key={i} />
        })}
      </div>
      <div className="w-full h-16"></div>
      <h1 className="font-medium text-sm">Please answer the questions below</h1>
      <Separator />
      <div className="pt-16 flex flex-col flex-wrap space-y-3 justify-center">
        {/* <div className="text-sm italic pt-2 text-neutral-600">We ask this question as the risks for some conditions depend on this information </div> */}
        {Questions3.map((q, i) => {
          const length = Questions3[0]?.headers?.length
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
    </CardContent>
  </>
}
