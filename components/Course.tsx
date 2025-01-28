import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings2, Save, Undo, Plus, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';

const CourseBlock = ({ blockName, setBlockName, data, onTemplateChange, isWorkflowBlock }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState(data || {
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
  });
  const [currentSection, setCurrentSection] = useState("fundamentals");
  const [savedTemplate, setSavedTemplate] = useState(null);

  useEffect(() => {
    if (data) {
      setTemplate(data);
      setSavedTemplate(data);
    }
  }, [data]);

  const handleSave = () => {
    setSavedTemplate({ ...template });
    setIsEditing(false);
    if (onTemplateChange) {
      onTemplateChange(template);
    }
  };

  const handleRevert = () => {
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
    setIsEditing(false);
  };

  const CourseSection = ({ section }) => (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{section.content.title}</h2>
            <p className="text-gray-600">{section.content.description}</p>
          </div>

          <div className="bg-neutral-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Key Topics:</h3>
            <ul className="space-y-2">
              {section.content.topics.map((topic, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <div className="relative rounded-lg overflow-hidden bg-neutral-100 aspect-video">
              <iframe
                className="w-full h-full"
                src={section.content.videoUrl}
                title="Educational Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const QuestionsSection = ({ section }) => (
    <div className="space-y-6">
      {section.questions.map((question, index) => (
        <div key={index} className="space-y-2">
          <Label className="text-primary text-base">{question.text}</Label>
          <RadioGroup className="flex space-x-3 pt-3">
            {question.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${index}-${option}`} />
                <Label htmlFor={`${index}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );

  const progress = {
    fundamentals: 0,
    questions: 60,
    proceed: 80
  };

  return (
    <div className={`w-full min-h-screen bg-background ${isWorkflowBlock && "-mt-8"}`}>
      {!isWorkflowBlock && (
        <div className="flex space-x-2 mb-4">
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings2 className="w-4 h-4 mr-2" />
            {isEditing ? 'Editing Mode' : 'Edit Template'}
          </Button>
          {isEditing && (
            <>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleRevert} variant="outline">
                <Undo className="h-4 w-4 mr-2" />
                Revert Changes
              </Button>
            </>
          )}
        </div>
      )}

      {isEditing ? (
        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div>
              <Label>Course Title</Label>
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
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => {
                  const newSection = {
                    id: `section-${template.sections.length + 1}`,
                    title: `New Section ${template.sections.length + 1}`,
                    type: "content", // Default type
                    content: {
                      title: "New Section",
                      description: "Section description",
                      topics: [],
                      videoUrl: ""
                    }
                  };
                  setTemplate({
                    ...template,
                    sections: [...template.sections, newSection]
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
            {template.sections.map((section, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => {
                          const newSections = [...template.sections];
                          newSections[index] = {
                            ...newSections[index],
                            title: e.target.value
                          };
                          setTemplate({ ...template, sections: newSections });
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newSections = template.sections.filter((_, i) => i !== index);
                          setTemplate({ ...template, sections: newSections });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Section Type</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={section.type || (section.content ? "content" : section.questions ? "questions" : "proceed")}
                      onChange={(e) => {
                        const newSections = [...template.sections];
                        const type = e.target.value;

                        // Initialize appropriate structure based on type
                        if (type === "content") {
                          newSections[index] = {
                            ...newSections[index],
                            type: "content",
                            content: {
                              title: "New Content Section",
                              description: "",
                              topics: [],
                              videoUrl: ""
                            },
                            questions: undefined,
                            question: undefined,
                            options: undefined
                          };
                        } else if (type === "questions") {
                          newSections[index] = {
                            ...newSections[index],
                            type: "questions",
                            questions: [],
                            content: undefined,
                            question: undefined,
                            options: undefined
                          };
                        } else if (type === "proceed") {
                          newSections[index] = {
                            ...newSections[index],
                            type: "proceed",
                            question: "Would you like to proceed?",
                            options: ["Yes", "No"],
                            content: undefined,
                            questions: undefined
                          };
                        }

                        setTemplate({ ...template, sections: newSections });
                      }}
                    >
                      <option value="content">Content Section</option>
                      <option value="questions">Questions Section</option>
                      <option value="proceed">Proceed Section</option>
                    </select>
                  </div>

                  {section.content && (
                    <div className="space-y-4">
                      <div>
                        <Label>Content Title</Label>
                        <Input
                          value={section.content.title}
                          onChange={(e) => {
                            const newSections = [...template.sections];
                            newSections[index] = {
                              ...newSections[index],
                              content: {
                                ...newSections[index].content,
                                title: e.target.value
                              }
                            };
                            setTemplate({ ...template, sections: newSections });
                          }}
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Input
                          value={section.content.description}
                          onChange={(e) => {
                            const newSections = [...template.sections];
                            newSections[index] = {
                              ...newSections[index],
                              content: {
                                ...newSections[index].content,
                                description: e.target.value
                              }
                            };
                            setTemplate({ ...template, sections: newSections });
                          }}
                        />
                      </div>

                      <div>
                        <Label>Topics</Label>
                        {section.content.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex gap-2 mt-2">
                            <Input
                              value={topic}
                              onChange={(e) => {
                                const newSections = [...template.sections];
                                newSections[index].content.topics[topicIndex] = e.target.value;
                                setTemplate({ ...template, sections: newSections });
                              }}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                const newSections = [...template.sections];
                                newSections[index].content.topics = newSections[index].content.topics.filter(
                                  (_, i) => i !== topicIndex
                                );
                                setTemplate({ ...template, sections: newSections });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => {
                            const newSections = [...template.sections];
                            newSections[index].content.topics.push("New Topic");
                            setTemplate({ ...template, sections: newSections });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Topic
                        </Button>
                      </div>

                      <div>
                        <Label>Video URL</Label>
                        <Input
                          value={section.content.videoUrl}
                          onChange={(e) => {
                            const newSections = [...template.sections];
                            newSections[index] = {
                              ...newSections[index],
                              content: {
                                ...newSections[index].content,
                                videoUrl: e.target.value
                              }
                            };
                            setTemplate({ ...template, sections: newSections });
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {section.questions && (
                    <div className="space-y-4">
                      {section.questions.map((question, questionIndex) => (
                        <Card key={questionIndex} className="p-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <Label>Question Text</Label>
                                <Input
                                  value={question.text}
                                  onChange={(e) => {
                                    const newSections = [...template.sections];
                                    newSections[index].questions[questionIndex].text = e.target.value;
                                    setTemplate({ ...template, sections: newSections });
                                  }}
                                />
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="ml-2"
                                onClick={() => {
                                  const newSections = [...template.sections];
                                  newSections[index].questions = newSections[index].questions.filter(
                                    (_, i) => i !== questionIndex
                                  );
                                  setTemplate({ ...template, sections: newSections });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div>
                              <Label>Options</Label>
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex gap-2 mt-2">
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const newSections = [...template.sections];
                                      newSections[index].questions[questionIndex].options[optionIndex] = e.target.value;
                                      setTemplate({ ...template, sections: newSections });
                                    }}
                                  />
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => {
                                      const newSections = [...template.sections];
                                      newSections[index].questions[questionIndex].options = question.options.filter(
                                        (_, i) => i !== optionIndex
                                      );
                                      setTemplate({ ...template, sections: newSections });
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                className="mt-2"
                                onClick={() => {
                                  const newSections = [...template.sections];
                                  newSections[index].questions[questionIndex].options.push("New Option");
                                  setTemplate({ ...template, sections: newSections });
                                }}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Option
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newSections = [...template.sections];
                          newSections[index].questions.push({
                            text: "New Question",
                            options: ["Option 1", "Option 2"]
                          });
                          setTemplate({ ...template, sections: newSections });
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                      </Button>
                    </div>
                  )}

                  {section.question && (
                    <div className="space-y-4">
                      <div>
                        <Label>Proceed Question</Label>
                        <Input
                          value={section.question}
                          onChange={(e) => {
                            const newSections = [...template.sections];
                            newSections[index].question = e.target.value;
                            setTemplate({ ...template, sections: newSections });
                          }}
                        />
                      </div>

                      <div>
                        <Label>Options</Label>
                        {section.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex gap-2 mt-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newSections = [...template.sections];
                                newSections[index].options[optionIndex] = e.target.value;
                                setTemplate({ ...template, sections: newSections });
                              }}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                const newSections = [...template.sections];
                                newSections[index].options = section.options.filter(
                                  (_, i) => i !== optionIndex
                                );
                                setTemplate({ ...template, sections: newSections });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => {
                            const newSections = [...template.sections];
                            newSections[index].options.push("New Option");
                            setTemplate({ ...template, sections: newSections });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Option
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <div className="bg-primary text-primary-foreground py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-2">{template.title}</h1>
              <p className="text-xl opacity-90">{template.subtitle}</p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Course Progress</span>
                <span>{progress[currentSection]}%</span>
              </div>
              <Progress value={progress[currentSection]} className="h-2" />
            </div>
          </div>

          <div className="container mx-auto px-4">
            <ScrollArea className="w-full">
              <div className="flex space-x-2 mb-6">
                {template.sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={currentSection === section.id ? "default" : "outline"}
                    onClick={() => setCurrentSection(section.id)}
                  >
                    {section.title}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            {template.sections.map((section) => (
              <div
                key={section.id}
                className={currentSection === section.id ? "block" : "hidden"}
              >
                {section.content && <CourseSection section={section} />}
                {section.questions && <QuestionsSection section={section} />}
                {section.question && (
                  <div className="space-y-2 pl-4">
                    <Label className="text-primary text-lg">{section.question}</Label>
                    <div className="pt-2">
                      <RadioGroup>
                        {section.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <Button className="mt-8" size="lg">Submit</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBlock;
