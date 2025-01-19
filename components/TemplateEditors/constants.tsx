export const PatientDetailsTemplate = {
  title: 'Patient Details',
  subtitle: 'Please enter your personal and medical information.',

  measurements: {
    weight: {
      label: 'Current Weight',
      placeholder: 'Your current weight',
      example: 'e.g. 58.5 Kgs'
    },
    height: {
      label: 'Current Height',
      placeholder: 'Your current height',
      example: 'e.g. 165 Cms'
    }
  },

  questions: [
    {
      id: 'q1',
      type: 'radio',
      question: 'Have you received a bone marrow/ stem cell transplantation',
      helperText: 'This is important in case a test is recommended after your session',
      options: ['Yes', 'No'],
      required: true
    },
    {
      id: 'q2',
      type: 'radio',
      question: 'Have you ever smoked tobacco',
      options: ['Yes, currently', 'Yes, previously', 'No'],
      required: true
    },
    {
      id: 'q3',
      type: 'checkbox',
      question: 'Does your personal history include any of the following diseases or health conditions?',
      options: [
        'Neurodegenerative disease',
        'Intellectual disability',
        'Hemophilia or another bleeding disorder',
        'None of the above'
      ],
      required: true
    },
    {
      id: 'q4',
      type: 'text',
      question: 'Please provide additional details if you checked any of the above',
      multiline: true,
      required: false
    }
  ]
}


export const MedicalHistoryTemplate = {
  title: "Medical History",
  subtitle: "Please enter your personal and medical information.",

  questions: [
    {
      id: "measurements",
      type: "measurements",
      fields: {
        weight: {
          label: "Current Weight",
          placeholder: "Your current weight",
          example: "e.g. 58.5 Kgs"
        },
        height: {
          label: "Current Height",
          placeholder: "Your current height",
          example: "e.g. 165 Cms"
        }
      }
    },
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
      id: "13",
      type: "text",
      question: "Cause of Death",
      required: false,
      multiline: true,
      dependsOn: {
        questionId: "q2",
        value: "No"
      }
    },
  ]
};
