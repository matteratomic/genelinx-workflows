import { Calendar, Info, NotebookPen } from "lucide-react";
import { useSelectMultiple } from "react-day-picker";

export const OTPTemplate = {
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

}

export const PaymentTemplate = {
  companyName: 'GeneLinx GmbH',
  pageTitle: 'Appointment Booking',
  amountLabel: 'Amount',
  referencePrefix: 'Pay For Appointment',
  referenceFormat: 'GL-000466',
  amount: '249,00',
  currency: '€',
  discountLabel: 'Discount Code',
  discountButtonText: 'Apply',
  totalLabel: 'Total',
  paymentSectionTitle: 'Payment Information',
  paymentMethods: {
    card: { enabled: true, label: 'Card' },
    ideal: { enabled: true, label: 'iDEAL' },
    klarna: { enabled: true, label: 'Klarna' }
  },
  cardFields: {
    cardNumber: { placeholder: 'Card Number', showAutofill: true },
    expiry: { placeholder: 'MM / YY' },
    cvv: { placeholder: 'CVV' }
  },
  payButtonText: 'Pay Now',
  colors: {
    primary: 'emerald',
    headerBg: 'emerald-50'
  }
}

export const WelcomeTemplate = {
  title: "Let's prepare you for your GeneLinx Genetic Consultation",
  subtitle: "This form includes questions about your health, your family members' health and any genetic testing you might have previously had. So please do have as much of this information as possible on hand before starting to fill out the form. The more specific information we have, the better our genetic experts can prepare for your session. You will need about 10-15 minutes to complete this form.",
  notes: [
    "The form can be saved and completed in multiple sittings. If you choose to save the form, a link will be emailed to you which can later be used to access the form and resume where you left off.",
    "You can also review and edit your responses before submission."
  ],
  questions: []
}

export const PatientDetailsTemplate = {
  title: "Patient Details",
  subtitle: "Please enter your personal and medical information.",
  questions: [
    // {
    //   id: "name_group",
    //   type: "group",
    //   questions: [
    //     {
    //       id: "first_name",
    //       type: "text",
    //       question: "First Name",
    //       required: true,
    //       placeholder: "First Name"
    //     },
    //     {
    //       id: "middle_name",
    //       type: "text",
    //       question: "Middle Name",
    //       required: false,
    //       placeholder: "Middle Name"
    //     },
    //     {
    //       id: "last_name",
    //       type: "text",
    //       question: "Last Name",
    //       required: true,
    //       placeholder: "Last Name"
    //     }
    //   ]
    // },
    {
      id: "date_of_birth",
      type: "date",
      question: "Date of Birth",
      required: true
    },
    {
      id: "biological_sex",
      type: "radio",
      question: "What is your biological sex registered at birth?",
      required: true,
      options: ["Male", "Female"],
      helpText: "We ask this question as the risks for some conditions depend on this information"
    },
    {
      id: "pronouns",
      type: "radio",
      question: "Your preferred pronouns are",
      required: true,
      options: ["He/Him", "She/Her", "They/Them", "Other"]
    },
    {
      id: "maternal_ethnicity",
      type: "checkbox",
      question: "What is your ethnic background on your maternal (mother's) side?",
      required: true,
      helpText: "We ask this question as the risks for some conditions depend on this information",
      options: [
        "Asian",
        "Middle Eastern/North African",
        "White",
        "Native Hawaiian / Other Pacific Islander",
        "Don't know",
        "African",
        "Hispanic, Latino, or Spanish origin",
        "Native American / Alaskan Native",
        "Prefer not to say",
        "Other"
      ]
    },
    {
      id: "paternal_ethnicity",
      type: "checkbox",
      question: "What is your ethnic background on your paternal (father's) side?",
      required: true,
      helpText: "We ask this question as the risks for some conditions depend on this information",
      options: [
        "Asian",
        "Middle Eastern/North African",
        "White",
        "Native Hawaiian / Other Pacific Islander",
        "Don't know",
        "African",
        "Hispanic, Latino, or Spanish origin",
        "Native American / Alaskan Native",
        "Prefer not to say",
        "Other"
      ]
    },
    {
      id: "jewish_ancestry",
      type: "radio",
      question: "Is there Jewish ancestry in your family?",
      required: true,
      options: ["Yes", "No", "Don't know"]
    },
    {
      id: "polish_ancestry",
      type: "radio",
      question: "Is there Polish ancestry in your family?",
      required: true,
      options: ["Yes", "No", "Don't know"]
    },
    {
      id: "parents_cousins",
      type: "radio",
      question: "Are your parents blood relatives? (eg. cousins)",
      required: true,
      options: ["Yes", "No", "Don't know"]
    },
    {
      id: "genelinx_seen",
      type: "radio",
      question: "Have you or a family member been seen before at GeneLinx?*",
      required: true,
      options: ["Yes", "No", "Don't know"]
    },
    // { id: "relative_group",
    //   type: "group",
    //   questions: [
    //     {
    //       id: "relationship",
    //       type: "text",
    //       question: "Relationship to you",
    //       required: true,
    //       placeholder: "Relationship to you"
    //     },
    //     {
    //       id: "relative_first_name",
    //       type: "text",
    //       question: "First Name",
    //       required: true,
    //       placeholder: "Relative first name"
    //     },
    //     {
    //       id: "relative_last_name",
    //       type: "text",
    //       question: "Last Name",
    //       required: true,
    //       placeholder: "Relative last name"
    //     },
    //     {
    //       id: "relative_dob",
    //       type: "date",
    //       question: "Date of Birth of Relative",
    //       required: true
    //     }
    //   ]
    // },
    {
      id: "booking_id",
      type: "text",
      question: "Provide their Booking ID",
      required: true,
      multiline: true,
      placeholder: "Booking ID",
      helpText: "You can find this at the top right corner of the final summary letter since Dementia in your relative or in their appointment booking email. If you do not have this information please enter their First Name, Last Name and Date of Birth."
    },
    {
      id: "reason",
      type: "textarea",
      question: "Please tell us your reason for scheduling an appointment with GeneLinx, include any questions you would like to have answered during the session",
      required: true,
      multiline: true
    }
  ]
};

export const MedicalHistoryTemplate = {
  title: "Medical History",
  subtitle: "Please enter your personal and medical information.",
  questions: [
    // {
    //   id: "measurements",
    //   type: "measurements",
    //   fields: {
    //     weight: {
    //       label: "Current Weight",
    //       placeholder: "Your current weight",
    //       example: "e.g. 58.5 Kgs"
    //     },
    //     height: {
    //       label: "Current Height",
    //       placeholder: "Your current height",
    //       example: "e.g. 165 Cms"
    //     }
    //   }
    // },
    {
      id: "transplant",
      type: "radio",
      question: "Have you received a bone marrow/ stem cell transplantation",
      options: ["Yes", "No"],
      required: true,
      helperText: "This is important in case a test is recommended after your session"
    },
    {
      id: "tobacco",
      type: "radio",
      question: "Have you ever smoked tobacco",
      options: ["Yes, currently", "Yes, previously", "No"],
      required: true
    },
    {
      id: "alcohol",
      type: "radio",
      question: "Do you drink alcohol?",
      options: ["Yes, currently", "Yes, previously", "No"],
      required: true
    },
    {
      id: "contraceptive",
      type: "radio",
      question: "Have you ever taken the oral contraceptive (birth control) pill?",
      options: ["Yes", "No"],
      required: true
    },
    {
      id: "conditions",
      type: "checkbox",
      question: "Does your personal history include any of the following diseases or health conditions?",
      required: true,
      options: [
        "Stillbirths/Multiple miscarriages (≥2)",
        "Sudden Infant Death Syndrome",
        "Autoimmune disease",
        "Thyroid disease",
        "Hypertension",
        "Neurodegenerative disease",
        "Cardiovascular disease",
        "Birth defects",
        "Early onset hearing loss",
        "Intellectual disability",
        "Hemophilia or another bleeding disorder",
        "Neuromuscular disease (e.g., muscular dystrophy)",
        "Autism (may be severe or could be Asperger's)",
        "Diabetes",
        "Cancer",
        "Very high cholesterol (e.g., LDL > 190 mg/dl or Total cholesterol > 310 mg/dl)",
        "Other",
        "None of the above"
      ]
    },
    {
      id: "additionalDetails",
      type: "text",
      question: "Please provide additional details if you checked any of the above",
      multiline: true,
      required: false
    },
    {
      id: "fileUpload",
      type: "file",
      question: "Please upload any relevant health records pertaining to the conditions above",
      required: false
    },
    {
      id: "geneticTesting",
      type: "radio",
      question: "Have you had genetic testing?",
      options: ["Yes", "No"],
      required: true,
      helperText: "Genetic testing looks for changes or mutations in your DNA. It typically requires a blood or saliva sample."
    }
  ]
};


export const FamilyHistoryTemplate = {
  title: "Family Tree",
  subtitle: "This might require additional information about your family members and could take some time to complete. So if you do not have the info at hand please save and resume later.",

  questions: [
    {
      id: "q1",
      type: "radio",
      question: "Were you adopted?",
      options: [
        "No",
        "Yes and I have information about my biological relatives",
        "Yes and I do not have information about my biological relatives"
      ],
      required: true,
      helperText: "We ask this question as the risks for some conditions depend on this information"
    },
    {
      id: "q2",
      type: "radio",
      question: "Is your maternal grandfather still living?",
      options: ["Yes", "No", "Unknown"],
      required: true,
      helperText: "We ask this question as the risks for some conditions depend on this information"
    },
    {
      id: "q3",
      type: "text",
      question: "How old is he currently?",
      required: false,
      multiline: false,
      dependsOn: {
        questionId: "q2",
        value: "Yes"
      }
    },
    {
      id: "q4",
      type: "text",
      question: "Age of Death",
      required: false,
      multiline: false,
      dependsOn: {
        questionId: "q2",
        value: "No"
      }
    },
    {
      id: "q5",
      type: "text",
      question: "Cause of Death",
      required: false,
      multiline: true,
      dependsOn: {
        questionId: "q2",
        value: "No"
      }
    },
    {
      id: "q6",
      type: "radio",
      question: "Is your maternal grandmother still living?",
      options: ["Yes", "No", "Unknown"],
      required: true,
      helperText: "We ask this question as the risks for some conditions depend on this information"
    },
    {
      id: "q7",
      type: "text",
      question: "How old is she currently?",
      required: false,
      multiline: false,
      dependsOn: {
        questionId: "q6",
        value: "Yes"
      }
    },
    {
      id: "q8",
      type: "text",
      question: "Age of Death",
      required: false,
      multiline: false,
      dependsOn: {
        questionId: "q6",
        value: "No"
      }
    },
    {
      id: "q9",
      type: "text",
      question: "Cause of Death",
      required: false,
      multiline: true,
      dependsOn: {
        questionId: "q6",
        value: "No"
      }
    },
    {
      id: "q10",
      type: "radio",
      question: "Is your maternal grandmother still living?",
      options: ["Yes", "No", "Unknown"],
      required: true,
      helperText: "We ask this question as the risks for some conditions depend on this information"
    },
    {
      id: "q11",
      type: "text",
      question: "How old is she currently?",
      required: false,
      multiline: false,
      dependsOn: {
        questionId: "q2",
        value: "Yes"
      }
    },
    {
      id: "q12",
      type: "text",
      question: "Age of Death",
      required: false,
      multiline: false,
      dependsOn: {
        questionId: "q2",
        value: "No"
      }
    },
    {
      id: "q13",
      type: "text",
      question: "Cause of Death",
      required: false,
      multiline: true,
      dependsOn: {
        questionId: "q2",
        value: "No"
      }
    },
    {
      id: "q14",
      type: "questionnaire",
      question: "Treatment Experience",
      required: true,
      options: [
        "Strongly Agree",
        "Somewhat Agree",
        "Neither Agree nor Disagree",
        "Somewhat Disagree",
        "Strongly Disagree",
        "Not Applicable"
      ],
      subQuestions: [
        {
          id: "sq1",
          text: "The medical staff explained my treatment options clearly",
          required: true
        },
        {
          id: "sq2",
          text: "I felt comfortable asking questions about my treatment",
          required: true
        },
        {
          id: "sq3",
          text: "The treatment plan was tailored to my specific needs",
          required: true
        },
        {
          id: "sq4",
          text: "I was treated with respect and dignity",
          required: true
        }
      ]
    },
    {
      id: "q15",
      type: "text",
      question: "Do you have any additional comments about your treatment?",
      required: false,
      multiline: true
    }
  ]
};

export const ScreeningQuestinnaireTemplate = {
  title: "Screening Questionnaire",
  subtitle: "The purpose of this questionnaire is to help identify individuals who may need additional support while going through genetic testing. The questions are about your life experiences and feelings about the disease for which you are receiving genetic testing/counselling. Please note that whenever the word 'disease' is used, it is referring to the disease for which you are having genetic testing and/or counselling. Please read each statement carefully, then respond by checking the most appropriate space.",
  questions: [
    {
      id: "q1",
      type: "radio",
      question: "I have/had a personal diagnosis of the disease for which I am receiving counselling/testing",
      required: true,
      options: ["Yes", "No"]
    },
    {
      id: "q2",
      type: "radio",
      question: "I have taken care of a very ill parent or another close family member (e.g sibling)",
      required: true,
      options: ["Yes", "No"]
    },
    {
      id: "q3",
      type: "radio",
      question: "I lost a close family member (e.g parent/sibling) to the disease for which I am receiving counselling/testing",
      required: true,
      options: ["Yes", "No"]
    },
    {
      id: "q4",
      type: "questionnaire",
      question: "Please answer the questions below",
      required: true,
      options: [
        "Strongly Agree",
        "Somewhat Agree",
        "Neither Agree or Disagree",
        "Somewhat Disagree",
        "Strongly Disagree",
        "Not Applicable"
      ],
      subQuestions: [
        {
          id: "q4_1",
          text: "The disease for which I am at risk is currently causing a significant disruption in my family life"
        },
        {
          id: "q4_2",
          text: "I am worried that my test result will impact on my relationship with my significant other (or future partner)"
        },
        {
          id: "q4_3",
          text: "I am worried about talking to my children (young or adult) about the heritable nature of the disease for which I am being tested"
        },
        {
          id: "q4_4",
          text: "My worries about the disease affect my daily mood"
        },
        {
          id: "q4_5",
          text: "I worry about my risk of getting the disease"
        },
        {
          id: "q4_6",
          text: "I feel guilty that I might pass on the disease risk to my children"
        },
        {
          id: "q4_7",
          text: "If I learn that I have a genetic mutation, I believe that I will have more problems in my life"
        },
        {
          id: "q4_8",
          text: "If I learn that I have a genetic mutation, I will change plans for my career/profession"
        },
        {
          id: "q4_9",
          text: "If I learn that I have a genetic mutation, I will have difficulties in my family relationships"
        }
      ]
    },
    {
      id: "q5",
      type: "questionnaire",
      question: "Please answer the questions below",
      required: true,
      options: [
        "Almost all of the time",
        "Often",
        "Sometimes",
        "Hardly ever",
        "Not at all"
      ],
      subQuestions: [
        {
          id: "q5_1",
          text: "I have generally felt sad in the last month"
        },
        {
          id: "q5_2",
          text: "I have generally felt nervous and anxious in the past month"
        }
      ]
    },
    {
      id: "q6",
      type: "questionnaire",
      question: "Please answer the questions below",
      required: true,
      options: ["Yes", "No"],
      subQuestions: [
        {
          id: "q6_1",
          text: "I have had emotional problems in the past"
        },
        {
          id: "q6_2",
          text: "I have had counselling with a counsellor and/or a mental health professional in the past"
        },
        {
          id: "q6_3",
          text: "I have been diagnosed with a depressive or anxiety disorder in the past"
        },
        {
          id: "q6_4",
          text: "I have had emotional problems that led me to have thoughts about suicide"
        },
        {
          id: "q6_5",
          text: "I am now seeing a counsellor for one or more of these emotional concerns"
        },
        {
          id: "q6_6",
          text: "I am interested in talking with a counsellor about one or more of these concerns"
        }
      ]
    }
  ]
};

export const OptionalQuestionnaireTemplate = {
  title: "Consents and Terms",
  subtitle: "These are optional consents and will not affect the service provided by GeneLinx. You can revoke your consent at any time. Please refer to our privacy policy for further information.",
  questions: [
    // {
    //   id: "research_consent_section",
    //   type: "section",
    //   question: "Use of data for Scientific Research",
    //   content: `Scientific Research focuses on the cause, early detection and/or treatment of rare diseases in general. The data will be used in the interest of the greatest possible benefit to the general public for research which aims to improve the prevention, detection and treatment of rare diseases. Such includes but is not limited to disease areas such as oncology, metabolic disorders, neurodegenerative disorders, cardiac disorders and malformations as well as to diseases and genetic relationships that are still unknown today. As in any research on rare diseases — particularly due to the latest findings in genetic diagnostics — it is usually not possible to predict in detail which research questions and matters will be addressed in the future. Therefore, the specific research purpose cannot be detailed herein, and the data may also be used for medical research projects that cannot be foreseen today.`
    // },
    {
      id: "research_consent",
      type: "radio",
      question: "I consent to my information being used for scientific research and I understand that I will not receive any compensation in return. This consent can be revoked with effect in the future. More information can be found in our privacy policy",
      required: true,
      options: ["Yes", "No"]
    },
    {
      id: "additional_info",
      type: "text",
      question: "Anything else you would like us to know that was not covered in this form?",
      required: false,
      multiline: true
    },
    {
      id: "terms_section",
      question: "Terms and Conditions",
      type: "text",
      multiline: true,
      defaultValue: "Terms and Conditions These terms and conditions outline the rules and regulations for the use of GeneLinx GmbH’s Website, located at www.gene-linx.com. By accessing this website we assume you accept these terms and conditions. Do not continue to use GeneLinx if you do not agree to take all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same. Cookies We employ the use of cookies. By accessing GeneLinx, you agreed to use cookies in agreement with the GeneLinx GmbH’s Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies. License Unless otherwise stated, GeneLinx GmbH and/or its licensors own the intellectual property rights for all material on GeneLinx. All intellectual property rights are reserved. You may access this from GeneLinx for your own personal use subjected to restrictions set in these terms and conditions. You must not: Republish material from GeneLinx Sell, rent or sub-license material from GeneLinx Reproduce, duplicate or copy material from GeneLinx Redistribute content from GeneLinx This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Free Terms and Conditions Generator. Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. GeneLinx GmbH does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of GeneLinx GmbH,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, GeneLinx GmbH shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website. GeneLinx GmbH reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions. You warrant and represent that: You are entitled to post the Comments on our website and have all necessary licenses and consents to do so; The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party; The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity. You hereby grant GeneLinx GmbH a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media. Hyperlinking to our Content The following organizations may link to our Website without prior written approval: Government agencies; Search engines; News organizations; Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site. These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site. We may consider and approve other link requests from the following types of organizations: commonly-known consumer and/or business information sources; dot.com community sites; associations or other groups representing charities; online directory distributors; internet portals; accounting, law and consulting firms; and educational institutions and trade associations. We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of GeneLinx GmbH; and (d) the link is in the context of general resource information. These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site. If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to GeneLinx GmbH at privacy@gene-linx.com. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response. Approved organizations may hyperlink to our Website as follows: By use of our corporate name; or By use of the uniform resource locator being linked to; or By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site. No use of GeneLinx GmbH’s logo or other artwork will be allowed for linking absent a trademark license agreement. iFrames Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website. Content Liability We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights. Your Privacy Please read Privacy Policy Reservation of Rights We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions. Removal of links from our website If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment at privacy@gene-linx.com. We will consider requests to remove links but we are not obligated to or so or to respond to you directly. We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date. Disclaimer To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will: limit or exclude our or your liability for death or personal injury; limit or exclude our or your liability for fraud or fraudulent misrepresentation; limit any of our or your liabilities in any way that is not permitted under applicable law; or exclude any of our or your liabilities that may not be excluded under applicable law. The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty. As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature. You can reach out to us at privacy@gene-linx.com if you have any questions or comments regarding the use of our website and these terms and conditions. Last updated on 17 March 2023 "
    },
    {
      id: "terms_acceptance",
      type: "checkbox",
      question: "I accept the Terms and Conditions",
      required: true,
      options: [""]
    },
    // {
    //   id: "terms&conditions",
    //   type: "text",
    // }
  ],
  footer: {
    text: "By submitting this form you acknowledge that you have answered all questions accurately to the best of your knowledge and that the consents in the last section are optional and us providing the service does not depend on your responses to these."
  }
}

export const BookingConsultationTemplate = {
  title: "Let's prepare you for your GeneLinx Genetic Consultation",
  subtitle: "This form includes questions about your health, your family members' health and any genetic testing you might have previously had. So please do have as much of this information as possible on hand before starting to fill out the form. The more specific information we have, the better our genetic experts can prepare for your session. You will need about 10-15 minutes to complete this form.",
  notes: [
    "The form can be saved and completed in multiple sittings. If you choose to save the form, a link will be emailed to you which can later be used to access the form and resume where you left off.",
    "You can also review and edit your responses before submission."
  ],
  contactInfo: "If you have any questions please do not hesitate to contact us at appointments@gene-linx.com with your last name and booking ID.",
  steps: [
    {
      id: "welcome",
      title: "Welcome",
      template: WelcomeTemplate
    },
    {
      id: "patient_details",
      title: "Patient Details",
      template: PatientDetailsTemplate
    },
    {
      id: "medical_history",
      title: "Medical History",
      template: MedicalHistoryTemplate
    },
    {
      id: "family_details",
      title: "Family Details",
      template: FamilyHistoryTemplate
    },
    {
      id: "Screening_questionnaire",
      title: "Screening Questionnaire",
      template: ScreeningQuestinnaireTemplate
    },
    {
      id: "optional_questionnaire",
      title: "Optional Questionnaire",
      template: OptionalQuestionnaireTemplate
    },
  ]
};
;

export const BookingTemplate = {
  title: "Book a Consultation",
  subtitle: "You can book your appointment with a genetic expert in a few simple steps. Please carefully select the time zone you are based in and make sure that the contact details provided are correct. Speak with you soon!",
  service: {
    title: "Initial Consult - Cancer",
    price: "249 EUR",
    duration: "30 mins"
  },
  calendar: {
    timezones: [
      { value: "nairobi", label: "Africa/Nairobi - EAT (+03:00)" },
      { value: "london", label: "Europe/London - GMT (+00:00)" },
      { value: "newyork", label: "America/New_York - EST (-05:00)" }
    ],
    morningSlots: ["11:00", "11:15"],
    nightSlots: ["22:00", "22:15", "22:30", "22:45", "23:00", "23:15"]
  },
  form: {
    fields: [
      { id: "firstName", label: "Patient's First Name", placeholder: "Patient's First Name", type: "text", required: true },
      { id: "lastName", label: "Last Name", placeholder: "Last Name", type: "text", required: true },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "email", label: "Email", placeholder: "Email", type: "email", required: true },
      { id: "phone", label: "Phone Number", placeholder: "Contact Number", type: "tel", required: true },
      {
        id: "country", label: "Country of Residence", type: "select", required: true,
        options: [
          { value: "kenya", label: "Kenya" },
          { value: "uganda", label: "Uganda" },
          { value: "tanzania", label: "Tanzania" }
        ]
      }
    ],
    countryCode: {
      default: "+254",
      options: [
        { value: "+254", label: "+254" },
        { value: "+256", label: "+256" },
        { value: "+255", label: "+255" }
      ]
    }
  },
  consent: {
    contract: "I acknowledge and agree that I forfeit my right to revoke the contract once GeneLinx starts providing the service with my consent and I understand that the 48 hour cancellation policy of GeneLinx will still apply",
    health: "I consent to the processing of my health data and genetic data in the form of medical and family history for this purpose - This consent can be withdrawn in the future - Please refer to our privacy policy",
    transfer: "I consent to my data including health and genetic data to be transferred to the assigned Genetic Expert in order to schedule an appointment - This consent can be withdrawn in the future - Please refer to our privacy policy",
    terms: "I acknowledge that I have read, understood and agree to GeneLinx's terms of service and privacy policy"
  }
}

// export const ScheduleAppointmentTemplate = {
//   title: "Book an initial consultation",
//   subtitle: "Understand your risks, if genetic testing is right for you and which test might help you.",
//   learnMoreText: "To learn more about your journey with GeneLinx,",
//   learnMoreLinkText: "click here",
//   sections: [
//     {
//       id: 'cancer',
//       title: 'Cancer',
//       price: '€249',
//       image: 'https://gene-linx.com/wp-content/uploads/2024/06/Image-217-1.png',
//       items: [
//         "I was diagnosed with cancer",
//         "I have a family history of cancer",
//         "I need to be tested for a familial cancer genetic change",
//         "I need guidance on selecting the right test"
//       ]
//     },
//     {
//       id: 'reproductive',
//       title: 'Reproductive',
//       price: '€249',
//       image: 'https://gene-linx.com/wp-content/uploads/2024/06/2566956f-1c28-4b79-aa7c-d02a303949f1-scaled.jpg',
//       items: [
//         "I am planning a pregnancy and want to know my risks",
//         "I have a history of stillbirths or miscarriages",
//         "I want to understand genetic test options in pregnancy",
//         "I have a family history of disease and want to know the risks to my future pregnancy"
//       ]
//     },
//     {
//       id: 'proactive',
//       title: 'Proactive',
//       price: '€249',
//       image: 'https://gene-linx.com/wp-content/uploads/2024/06/da10fbd7-db1e-4dd8-83b6-acfe473b24d3-scaled-e1724788042727.jpg',
//       items: [
//         "I am healthy and curious about genetic testing for preventive health",
//         "I want to know my risk for common genetic diseases",
//         "I need guidance on the right preventive genetic test",
//         "I have results from a genetic test and want to discuss my results"
//       ]
//     },
//     {
//       id: 'other',
//       title: 'Other Indications',
//       price: '€249',
//       image: 'https://gene-linx.com/wp-content/uploads/2024/06/1d1e6d3e-a83c-4575-b458-e2583f9bf4d1-scaled-e1724787499961.jpg',
//       items: [
//         "I have a genetic disease that is not cancer",
//         "I have a family history of a disease that could be genetic (not cancer)",
//         "There is a disease-causing genetic change in my family (not cancer)",
//         "I want to discuss my previous test results (not cancer or proactive)"
//       ]
//     }
//   ],
//   faq: {
//     title: "Frequently asked questions",
//     questions: [
//       {
//         question: "What is genetic counselling and who provides this?",
//         answer: "Genetic counselling is a healthcare service that provides information and support to people who have, or may be at risk for, genetic conditions. It is provided by certified genetic counsellors who have specialized training in medical genetics and counselling."
//       },
//       {
//         question: "Who should have genetic counselling?",
//         answer: "Genetic counselling may be beneficial for individuals who have a personal or family history of genetic conditions, are planning a pregnancy, have experienced multiple miscarriages, or are interested in understanding their genetic health risks."
//       }
//       // Add more FAQ items as needed
//     ]
//   },
//   unsureSection: {
//     title: "Unsure of which service to choose?",
//     contactLink: "Contact us"
//   }
// }

export const ScheduleAppointmentTemplate = {
  title: "Book an initial consultation",
  subtitle: "Understand your risks, if genetic testing is right for you and which test might help you.",
  learnMoreText: "To learn more about your journey with GeneLinx,",
  learnMoreLinkText: "click here",
  sections: [
    {
      id: 'cancer',
      title: 'Cancer',
      price: '€249',
      image: 'https://gene-linx.com/wp-content/uploads/2024/06/Image-217-1.png',
      inlineImage: "https://gene-linx.com/wp-content/uploads/2024/06/cencer.png",
      items: [
        "I was diagnosed with cancer",
        "I have a family history of cancer",
        "I need to be tested for a familial cancer genetic change",
        "I need guidance on selecting the right test"
      ]
    },
    {
      id: 'reproductive',
      title: 'Reproductive',
      price: '€249',
      image: 'https://gene-linx.com/wp-content/uploads/2024/06/2566956f-1c28-4b79-aa7c-d02a303949f1-scaled.jpg',
      inlineImage: "https://gene-linx.com/wp-content/uploads/2024/06/health.png",
      items: [
        "I am planning a pregnancy and want to know my risks",
        "I have a history of stillbirths or miscarriages",
        "I want to understand genetic test options in pregnancy",
        "I have a family history of disease and want to know the risks to my future pregnancy"
      ]
    },
    {
      id: 'proactive',
      title: 'Proactive',
      price: '€249',
      image: 'https://gene-linx.com/wp-content/uploads/2024/06/da10fbd7-db1e-4dd8-83b6-acfe473b24d3-scaled-e1724788042727.jpg',
      inlineImage: "https://gene-linx.com/wp-content/uploads/2024/06/pro.png",
      items: [
        "I am healthy and curious about genetic testing for preventive health",
        "I want to know my risk for common genetic diseases",
        "I need guidance on the right preventive genetic test",
        "I have results from a genetic test and want to discuss my results"
      ]
    },
    {
      id: 'other',
      title: 'Other Indications',
      price: '€249',
      image: "https://gene-linx.com/wp-content/uploads/2024/06/1d1e6d3e-a83c-4575-b458-e2583f9bf4d0-scaled-e1724787499961.jpg",
      inlineImage: "https://gene-linx.com/wp-content/uploads/2024/06/other.png",
      items: [
        "I have a genetic disease that is not cancer",
        "I have a family history of a disease that could be genetic (not cancer)",
        "There is a disease-causing genetic change in my family (not cancer)",
        "I want to discuss my previous test results (not cancer or proactive)"
      ]
    }
  ],
  faq: {
    title: "Frequently asked questions",
    questions: [
      {
        question: "What is genetic counselling and who provides this?",
        answer: "Genetic counselling is a healthcare service that provides information and support to people who have, or may be at risk for, genetic conditions. It is provided by certified genetic counsellors who have specialized training in medical genetics and counselling."
      },
      {
        question: "Who should have genetic counselling?",
        answer: "Genetic counselling may be beneficial for individuals who have a personal or family history of genetic conditions, are planning a pregnancy, have experienced multiple miscarriages, or are interested in understanding their genetic health risks."
      }
      // Add more FAQ items as needed
    ]
  },
  unsureSection: {
    title: "Unsure of which service to choose?",
    contactLink: "Contact us"
  }
}

export const LandingPageTemplate = {
  hero: {
    title: "Access to Cascade Genetic Testing Study",
    description: "You are being invited to take part in the Access to Cascade Genetic Testing (ACGT) research study to be carried out at St. James's Hospital in partnership with Trinity College Dublin by Assistant Professor Rosie O Shea, Principal Genetic Counsellor and Professor Karen Cadoo.",
    buttonText: "Enroll Now",
    buttonLink: "/otp",
    image: "https://gene-linx.com/wp-content/uploads/2024/06/Image-195.png"
  },
  information: {
    title: "Information about the study",
    content: [
      "Before you decide whether or not you wish to take part, you should read the information provided in the leaflet carefully and, if you wish, discuss it with your family, friends or GP (doctor). Take time to ask questions – don't feel rushed and don't feel under pressure to make a quick decision.",
      "You should clearly understand the risks and benefits of taking part in this study so that you can make a decision that is right for you. This process is known as 'Informed Consent'.",
      "You do not have to take part in this study. If you decide not to take part, it won't affect your future medical care.",
      "You can change your mind about taking part in the study any time you like. Even if the study has started, you can still opt out. You don't have to give us a reason. If you do opt out, rest assured it won't affect the quality of treatment you get in the future.",
      "If you wish to opt out, please contact Rosie O Shea, Principal Genetic Counsellor (Phone 01-4103759, Email: rososhea@stjames.ie) who will be able to organise this for you."
    ],
    buttons: {
      primary: {
        text: "Information Leaflet",
        link: "https://gene-linx.com/wp-content/uploads/2024/10/Draft_Participant_Information_Leaflet-v4-23.08.24-Clean.pdf"
      },
      secondary: {
        text: "Enroll Now",
        link: "/otp"
      }
    }
  }
}

export const CourseBlockTemplate = {
  title: "Genetics and Hereditary Cancer",
  subtitle: "Understanding genetic testing and hereditary cancer syndromes",
  sections: [
    {
      id: "fundamentals",
      title: "Fundamentals",
      content: {
        title: "Fundamentals of Genetics and Genetic Testing",
        description: "Learn the basic principles of genetics, inheritance patterns, and the role of genetic testing in healthcare.",
        topics: [
          "DNA structure and function",
          "Inheritance patterns",
          "Types of genetic testing",
          "Understanding test results"
        ],
        videoUrl: "https://www.youtube.com/embed/lMSIwbAJf1I"
      }
    },
    {
      id: "questions",
      title: "Questions",
      questions: [
        {
          text: "Knowing about inherited risk (passed down within a family) can affect choices about cancer treatments (for examples, medications or surgery).",
          options: ["Agree", "Disagree"]
        },
        {
          text: "People with an inherited risk for cancer (and their at-risk relatives) are more likely to develop more than one type of cancer",
          options: ["Agree", "Disagree"]
        }
      ]
    },
    {
      id: "proceed",
      title: "Proceed to Testing",
      question: "After reviewing the information provided would you like to proceed to testing?",
      options: ["Yes", "No"]
    }
  ]
}

export const SubmissionResultTemplate = {
  slides: [
    {
      id: 'success',
      type: 'success',
      title: 'Thank You!',
      description: 'Thank you for participating in the study. The coordinator will be in touch about kit shipment.',
      icon: 'CheckCircle',
      primaryButtonText: 'Next',
      secondaryButtonText: 'Previous',
    },
    {
      id: 'booking-confirmation',
      type: 'booking',
      title: 'Booking Confirmation',
      description: 'Your appointment has been confirmed',
      showAppointmentDetails: true,
      primaryButtonText: 'Next',
      secondaryButtonText: 'Previous',
    },
    {
      id: 'consent-form',
      type: 'pdf',
      title: 'Consent Form',
      pdfUrl: '/consent.pdf',
      primaryButtonText: 'Next',
      secondaryButtonText: 'Previous',
    },
    {
      id: 'summary-report',
      type: 'summary',
      title: 'Summary Report',
      description: 'Here is your summary report',
      primaryButtonText: 'Next',
      secondaryButtonText: 'Previous',
    },
    {
      id: 'summary-pdf',
      type: 'pdf',
      title: 'Summary PDF',
      pdfUrl: '/summary.pdf',
      primaryButtonText: 'Finish',
      secondaryButtonText: 'Previous',
    }
  ],
  styles: {
    backgroundColor: 'white',
    primaryColor: 'emerald-500',
    maxWidth: '3xl',
    borderRadius: 'lg',
  }
}

export const ConsentFormTemplate = {
  title: 'Access to Cascade Genetic Testing (AGCT) Study Consent Form',
  logos: ['/logos.png'],
  studyInfo: [
    {
      label: "Principal investigator's name:",
      value: "Rosie O Shea"
    },
    {
      label: "Principal investigator's title:",
      value: "Principal Genetic Counsellor, Cancer Genetic Service and Assistant Professor, Trinity College Dublin"
    },
    {
      label: "Telephone number of principal investigator:",
      value: "+353 1 4103759"
    },
    {
      label: "Consultant co-investigator's name:",
      value: "Professor Karen Cadoo"
    },
    {
      label: "Consultant co-investigator's title:",
      value: "Consultant Oncologist and Cancer Geneticist, Clinical Lead of Cancer Genetic Service"
    },
    {
      label: "Data Controller's/joint Controller's Identity:",
      value: [
        "St James Hospital",
        "Dublin, Ireland"
      ]
    }
  ],
  generalQuestions: [
    "I confirm that I read and understood the Information Leaflet for the above study and have been given a copy to keep.",
    "The project information has been explained and I have the opportunity to discuss and ask questions about the study.",
    "I understand that the study is entirely voluntary and I can stop taking part in this study at any time without giving a reason. I understand that not taking part will not affect my future medical care.",
    "I understand that my medical notes and records may be looked at by the study team at St James Hospital where it is relevant to do research. I agree that these individuals can access my medical records. I understand that all information will be kept private and confidential.",
    "I understand the data related to the study will be processed by GeneLinx for the research to be carried out",
    "I understand that I will not be paid for taking part in the study.",
    "I know how to contact the research team if I need to",
    "I agree to be contacted by researchers by email and telephone as part of this study",
    "I consent to take part in this research study"
  ],
  dataProtectionQuestions: [
    "I give my explicit consent to have my data processed as part of this research study"
  ]
}
