"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Settings2, Save, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";

// Dynamically import TipTap editor with no SSR
const TipTapEditor = dynamic(
  () => import("@/components/TemplateEditors/TipTapEditor"),
  {
    ssr: false,
  },
);

const LandingPageEditor = ({
  blockName,
  setBlockName,
  data,
  onTemplateChange,
  isWorkflowBlock,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState(
    data || {
      hero: {
        title: "Access to Cascade Genetic Testing Study",
        description:
          "You are being invited to take part in the Access to Cascade Genetic Testing (ACGT) research study to be carried out at St. James's Hospital in partnership with Trinity College Dublin by Assistant Professor Rosie O Shea, Principal Genetic Counsellor and Professor Karen Cadoo.",
        buttonText: "Enroll Now",
        buttonLink: "/otp",
        image: "https://gene-linx.com/wp-content/uploads/2024/06/Image-195.png",
      },
      information: {
        title: "Information about the study",
        content: [
          "Before you decide whether or not you wish to take part, you should read the information provided in the leaflet carefully and, if you wish, discuss it with your family, friends or GP (doctor). Take time to ask questions – don't feel rushed and don't feel under pressure to make a quick decision.",
          "You should clearly understand the risks and benefits of taking part in this study so that you can make a decision that is right for you. This process is known as 'Informed Consent'.",
          "You do not have to take part in this study. If you decide not to take part, it won't affect your future medical care.",
          "You can change your mind about taking part in the study any time you like. Even if the study has started, you can still opt out. You don't have to give us a reason. If you do opt out, rest assured it won't affect the quality of treatment you get in the future.",
          "If you wish to opt out, please contact Rosie O Shea, Principal Genetic Counsellor (Phone 01-4103759, Email: rososhea@stjames.ie) who will be able to organise this for you.",
        ],
        buttons: {
          primary: {
            text: "Information Leaflet",
            link: "https://gene-linx.com/wp-content/uploads/2024/10/Draft_Participant_Information_Leaflet-v4-23.08.24-Clean.pdf",
          },
          secondary: {
            text: "Enroll Now",
            link: "/otp",
          },
        },
      },
    },
  );

  const [savedTemplate, setSavedTemplate] = useState({ ...template });
  const [editorContent, setEditorContent] = useState("");
  const [isEditorUpdating, setIsEditorUpdating] = useState(false);

  useEffect(() => {
    if (data) {
      setTemplate(data);
      setSavedTemplate(data);
    }
  }, [data]);

  useEffect(() => {
    if (isEditing && !isEditorUpdating) {
      setEditorContent(contentToHtml(template.information.content));
    }
  }, [isEditing, isEditorUpdating, template.information.content]);

  const handleSave = () => {
    setSavedTemplate({ ...template });
    setIsEditing(false);
    if (onTemplateChange) {
      onTemplateChange(template);
    }
  };

  const handleRevert = () => {
    setTemplate({ ...savedTemplate });
    setIsEditing(false);
  };

  const updateTemplate = (field, value) => {
    const updatedTemplate = { ...template, [field]: value };
    setTemplate(updatedTemplate);
    // Notify parent of template changes
    if (onTemplateChange) {
      onTemplateChange(updatedTemplate);
    }
  };

  // Convert array content to HTML for the editor
  const contentToHtml = (contentArray) => {
    if (!contentArray || !Array.isArray(contentArray)) return "";
    return contentArray.map((paragraph) => `<p>${paragraph}</p>`).join("");
  };

  // // Convert HTML from the editor back to an array of paragraphs
  // const htmlToContent = (html) => {
  //   if (!html) return [];
  //
  //   // Create a DOM parser
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, "text/html");
  //
  //   // Extract text from paragraphs, preserving inline formatting
  //   const paragraphs = [];
  //   doc.body.childNodes.forEach((node) => {
  //     // Skip empty text nodes
  //     if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
  //       return;
  //     }
  //
  //     // If it's a paragraph, add its innerHTML
  //     if (node.nodeName === "P") {
  //       if (node.innerHTML.trim()) {
  //         paragraphs.push(node.innerHTML);
  //       }
  //     }
  //     // If it's a list or other block element
  //     else if (
  //       ["UL", "OL", "H1", "H2", "H3", "H4", "H5", "H6"].includes(node.nodeName)
  //     ) {
  //       paragraphs.push(node.outerHTML);
  //     }
  //     // For text nodes or other elements, wrap in p
  //     else if (node.textContent.trim()) {
  //       paragraphs.push(node.textContent);
  //     }
  //   });
  //
  //   return paragraphs.filter((p) => p.trim() !== "");
  // };
  //
  // // Handle editor content change
  // const handleEditorChange = useCallback(
  //   (html:string) => {
  //     // Set flag to prevent update loops
  //     setIsEditorUpdating(true);
  //     setEditorContent(html);
  //
  //     // Use setTimeout to break the render cycle
  //     setTimeout(() => {
  //       if (typeof window !== "undefined") {
  //         updateTemplate("information", {
  //           ...template.information,
  //           content: htmlToContent(html),
  //         });
  //       }
  //       setIsEditorUpdating(false);
  //     }, 0);
  //   },
  //   [template.information, updateTemplate],
  // );

  // Convert HTML from the editor back to an array of paragraphs
  const htmlToContent = (html) => {
    if (!html) return [];

    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract content, preserving structure
    const paragraphs = [];
    const processNode = (node) => {
      // Skip empty text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          paragraphs.push(`<p>${node.textContent}</p>`);
        }
        return;
      }

      // For element nodes
      if (node.nodeType === Node.ELEMENT_NODE) {
        // For block elements we want to preserve completely
        if (
          ["P", "UL", "OL", "LI", "H1", "H2", "H3", "H4", "H5", "H6"].includes(
            node.nodeName,
          )
        ) {
          paragraphs.push(node.outerHTML);
        }
        // For other elements, process their children
        else if (node.nodeName === "BODY") {
          Array.from(node.childNodes).forEach(processNode);
        }
        // For inline elements or unknown elements, add their HTML
        else if (node.innerHTML.trim()) {
          paragraphs.push(`<p>${node.outerHTML}</p>`);
        }
      }
    };

    // Process the body
    processNode(doc.body);

    return paragraphs.filter((p) => p.trim() !== "");
  };

  // Handle editor content change
  const handleEditorChange = useCallback(
    (html) => {
      // Set flag to prevent update loops
      setIsEditorUpdating(true);
      setEditorContent(html);

      // Use setTimeout to break the render cycle
      setTimeout(() => {
        if (typeof window !== "undefined") {
          // Don't transform the HTML - store it as is
          updateTemplate("information", {
            ...template.information,
            content: [html], // Store the entire HTML as one item or use htmlToContent(html)
          });
        }
        setIsEditorUpdating(false);
      }, 0);
    },
    [template.information, updateTemplate],
  );

  return (
    <div className={`w-full pt-0 space-y-4 ${isWorkflowBlock && "-mt-12"}`}>
      <div className="flex justify-start space-x-2">
        {!isWorkflowBlock && (
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings2 className="w-4 h-4 mr-2" />
            {isEditing ? "Editing Mode" : "Edit Template"}
          </Button>
        )}
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
        <Tabs defaultValue="hero">
          <TabsList>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="information">Information Section</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={template.hero.title}
                onChange={(e) =>
                  updateTemplate("hero", {
                    ...template.hero,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={template.hero.description}
                onChange={(e) =>
                  updateTemplate("hero", {
                    ...template.hero,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Button Text</Label>
              <Input
                value={template.hero.buttonText}
                onChange={(e) =>
                  updateTemplate("hero", {
                    ...template.hero,
                    buttonText: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Button Link</Label>
              <Input
                value={template.hero.buttonLink}
                onChange={(e) =>
                  updateTemplate("hero", {
                    ...template.hero,
                    buttonLink: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={template.hero.image}
                onChange={(e) =>
                  updateTemplate("hero", {
                    ...template.hero,
                    image: e.target.value,
                  })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="information" className="space-y-4">
            <div>
              <Label>Section Title</Label>
              <Input
                value={template.information.title}
                onChange={(e) =>
                  updateTemplate("information", {
                    ...template.information,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Content</Label>
              <div className="editor mt-2 border rounded-md">
                {typeof window !== "undefined" && (
                  <div className="editor-container">
                    <TipTapEditor
                      content={editorContent}
                      onChange={handleEditorChange}
                      className="min-h-64"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primary Button Text</Label>
                <Input
                  value={template.information.buttons.primary.text}
                  onChange={(e) =>
                    updateTemplate("information", {
                      ...template.information,
                      buttons: {
                        ...template.information.buttons,
                        primary: {
                          ...template.information.buttons.primary,
                          text: e.target.value,
                        },
                      },
                    })
                  }
                />
                <Label className="mt-2">Primary Button Link</Label>
                <Input
                  value={template.information.buttons.primary.link}
                  onChange={(e) =>
                    updateTemplate("information", {
                      ...template.information,
                      buttons: {
                        ...template.information.buttons,
                        primary: {
                          ...template.information.buttons.primary,
                          link: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label>Secondary Button Text</Label>
                <Input
                  value={template.information.buttons.secondary.text}
                  onChange={(e) =>
                    updateTemplate("information", {
                      ...template.information,
                      buttons: {
                        ...template.information.buttons,
                        secondary: {
                          ...template.information.buttons.secondary,
                          text: e.target.value,
                        },
                      },
                    })
                  }
                />
                <Label className="mt-2">Secondary Button Link</Label>
                <Input
                  value={template.information.buttons.secondary.link}
                  onChange={(e) =>
                    updateTemplate("information", {
                      ...template.information,
                      buttons: {
                        ...template.information.buttons,
                        secondary: {
                          ...template.information.buttons.secondary,
                          link: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <div className="flex p-8 bg-[#D6EDE8] justify-center items-center space-x-8">
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h1 className="text-primary font-bold text-5xl">
                {template.hero.title}
              </h1>
              <p className="text-xl">{template.hero.description}</p>
              <a href={template.hero.buttonLink}>
                <div className="cursor-pointer bg-primary flex items-center justify-center p-3 rounded-md text-white w-48 font-medium">
                  {template.hero.buttonText}
                </div>
              </a>
            </div>
            <div className="flex-1">
              <img src={template.hero.image} alt="Hero" />
            </div>
          </div>

          <div className="flex flex-col p-16 space-y-6">
            <h1 className="text-primary font-bold text-4xl">
              {template.information.title}
            </h1>
            {template.information.content.map((paragraph, index) => (
              <div
                key={index}
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
            <div className="mx-auto flex items-center justify-center space-x-6">
              <a href={template.information.buttons.primary.link}>
                <div className="cursor-pointer bg-primary flex items-center justify-center p-3 rounded-md text-white w-48 font-medium">
                  {template.information.buttons.primary.text}
                </div>
              </a>
              <a href={template.information.buttons.secondary.link}>
                <div className="cursor-pointer bg-transparent border-2 border-primary text-primary flex items-center justify-center p-3 rounded-md w-48 font-medium">
                  {template.information.buttons.secondary.text}
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPageEditor;
