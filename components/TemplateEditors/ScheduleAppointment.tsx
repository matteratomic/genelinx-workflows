import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings2, Save, Undo } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const ConsultationBlock = ({ blockName, setBlockName, isWorkflowBlock }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [template, setTemplate] = useState({
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
  });

  const [savedTemplate, setSavedTemplate] = useState({ ...template });

  const handleSave = () => {
    setSavedTemplate({ ...template });
    setIsEditing(false);
  };

  const handleRevert = () => {
    setTemplate({ ...savedTemplate });
    setIsEditing(false);
  };

  const ServiceCard = ({ section }) => (
    <Card className="overflow-hidden bg-[#F8F9FA]">
      <div className="h-48">
        <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
          <span className="text-gray-600">{section.price}</span>
        </div>
        <ul className="text-sm text-primary grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {section.items.map((item, index) => (
            <li key={index} className="flex items-start bg-white gap-3 p-2">
              <img className="w-8" src={section.inlineImage} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <button className="text-primary hover:text-teal-700">Read more</button>
          <Button className="bg-primary text-white hover:bg-teal-900">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      {/* Edit Controls */}
      <div className="flex justify-start space-x-2">
        {!isWorkflowBlock && (<Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Settings2 className="w-4 h-4 mr-2" />
          {isEditing ? 'Editing Mode' : 'Edit Template'}
        </Button>)}
        {isEditing && (
          <>
            <Button onClick={handleSave}>
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

      {isEditing ? (
        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div>
              <Label>Block Name</Label>
              <Input
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
                placeholder="Enter block name"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={template.title}
                onChange={(e) => setTemplate({ ...template, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={template.subtitle}
                onChange={(e) => setTemplate({ ...template, subtitle: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-4">
            {template.sections.map((section, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label>Section Title</Label>
                    <Input
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...template.sections];
                        newSections[index].title = e.target.value;
                        setTemplate({ ...template, sections: newSections });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input
                      value={section.price}
                      onChange={(e) => {
                        const newSections = [...template.sections];
                        newSections[index].price = e.target.value;
                        setTemplate({ ...template, sections: newSections });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={section.image}
                      onChange={(e) => {
                        const newSections = [...template.sections];
                        newSections[index].image = e.target.value;
                        setTemplate({ ...template, sections: newSections });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Items</Label>
                    {section.items.map((item, itemIndex) => (
                      <Input
                        key={itemIndex}
                        className="mt-2"
                        value={item}
                        onChange={(e) => {
                          const newSections = [...template.sections];
                          newSections[index].items[itemIndex] = e.target.value;
                          setTemplate({ ...template, sections: newSections });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <div>
              <Label>FAQ Title</Label>
              <Input
                value={template.faq.title}
                onChange={(e) => setTemplate({
                  ...template,
                  faq: { ...template.faq, title: e.target.value }
                })}
              />
            </div>
            {template.faq.questions.map((faq, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => {
                        const newQuestions = [...template.faq.questions];
                        newQuestions[index].question = e.target.value;
                        setTemplate({
                          ...template,
                          faq: { ...template.faq, questions: newQuestions }
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Input
                      value={faq.answer}
                      onChange={(e) => {
                        const newQuestions = [...template.faq.questions];
                        newQuestions[index].answer = e.target.value;
                        setTemplate({
                          ...template,
                          faq: { ...template.faq, questions: newQuestions }
                        });
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">{template.title}</h1>
            <p className="mb-8 text-gray-700">
              {template.subtitle}
              <a href="#" className="text-primary hover:underline"> {template.learnMoreLinkText}</a>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {template.sections.map((section) => (
              <ServiceCard key={section.id} section={section} />
            ))}
          </div>

          <div className="mt-16 bg-[#D6EDE8] p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-teal-900 mb-4">{template.unsureSection.title}</h2>
            <div className="text-center">
              <a href="#" className="text-teal-600 hover:text-teal-700 text-lg font-semibold underline">
                {template.unsureSection.contactLink}
              </a>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-teal-900 mb-8">{template.faq.title}</h2>
            <div className="space-y-4">
              {template.faq.questions.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </button>
                  {openFAQ === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      <div className="pt-2 border-t border-gray-200">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationBlock;
