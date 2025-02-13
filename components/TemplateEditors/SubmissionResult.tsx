import React, { useState, useEffect } from 'react';
import { Settings2, Save, Undo, ChevronLeft, ChevronRight, CheckCircle, Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { defaultSlideTypes as slideTypes } from './slideTypes';

const defaultTemplate = {
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
  ],
  styles: {
    backgroundColor: 'white',
    primaryColor: 'emerald-500',
    maxWidth: '3xl',
    borderRadius: 'lg',
  },
};

const initialSlideTypes = {
  success: {
    name: 'Success Message',
    fields: [
      { name: 'title', type: 'text', label: 'Title', required: true },
      { name: 'description', type: 'textarea', label: 'Description' },
      { name: 'showIcon', type: 'boolean', label: 'Show Icon' },
      { name: 'iconColor', type: 'color', label: 'Icon Color' }
    ]
  },
  pdf: {
    name: 'PDF Document',
    fields: [
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'pdfUrl', type: 'url', label: 'PDF URL', required: true },
      { name: 'showToolbar', type: 'boolean', label: 'Show Toolbar' }
    ]
  },
  html: {
    name: 'Custom HTML',
    fields: [
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'htmlContent', type: 'html', label: 'HTML Content', required: true }
    ]
  }
};

const SuccessTemplateEditor = ({ data, onTemplateChange, isWorkflowBlock }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState(data || defaultTemplate);
  const [slideTypes, setSlideTypes] = useState(initialSlideTypes);
  const [editingSlideType, setEditingSlideType] = useState(null); const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (data) {
      setTemplate(data);
    }
  }, [data]);

  const handleSave = () => {
    onTemplateChange?.(template);
    setIsEditing(false);
  };

  const updateSlide = (index, updates) => {
    const newSlides = [...template.slides];
    newSlides[index] = { ...newSlides[index], ...updates };
    setTemplate({ ...template, slides: newSlides });
    onTemplateChange({ ...template, slides: newSlides });

  };

  const addSlide = () => {
    setTemplate({
      ...template,
      slides: [
        ...template.slides,
        {
          id: `slide-${Date.now()}`,
          type: 'success',
          title: 'New Slide',
          description: '',
          primaryButtonText: 'Next',
          secondaryButtonText: 'Previous',
        },
      ],
    });
  };

  const deleteSlide = (index) => {
    if (template.slides.length > 1) {
      const newSlides = template.slides.filter((_, i) => i !== index);
      setTemplate({ ...template, slides: newSlides });
      setCurrentSlideIndex((prev) => Math.min(prev, newSlides.length - 1));
    }
  };

  // const renderSlide = (slide) => {
  //   switch (slide.type) {
  //     case 'success':
  //       return (
  //         <Card className="w-full max-w-md mx-auto mt-24">
  //           <CardHeader className="text-center">
  //             <CheckCircle size={40} className={`mx-auto text-${template.styles.primaryColor}`} />
  //             <CardTitle className="mt-4 text-2xl font-medium">{slide.title}</CardTitle>
  //           </CardHeader>
  //           <CardContent className="text-center">{slide.description}</CardContent>
  //         </Card>
  //       );
  //     case 'pdf':
  //       return <embed className="w-full h-screen" src={slide.pdfUrl} type="application/pdf" />;
  //     default:
  //       return <p>Unsupported slide type</p>;
  //   }
  // };
  //

  const renderSlide = (slide) => {
    const slideType = slideTypes[slide.type];
    if (!slideType) return null;

    switch (slide.type) {
      case 'success':
        return (
          <Card className="h-72 w-2/3 mx-auto mt-24">
            <CardHeader className="flex justify-center py-6">
              {/* {slide.showIcon && ( */}
              <div
                className="mx-auto p-3 w-16 h-16 flex items-center justify-center rounded-full"
                style={{ backgroundColor: slide.iconColor || '#035450' }}>
                <CheckCircle size={32} color="white" />
              </div>
              {/* )} */}
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-2xl font-medium">{slide.title}</CardTitle>
              <p className="mt-4 w-2/3 mx-auto">{slide.description}</p>
            </CardContent>
          </Card>
        );

      case 'pdf':
        return (
          <div className="h-[600px] w-[800px]">
            <embed
              src={`${slide.pdfUrl}${slide.showToolbar ? '' : '#toolbar=0&navpanes=0&scrollbar=0&zoom=100'}`}
              width="100%"
              height="100%"
              type="application/pdf"
            />
          </div>
        );

      case 'html':
        return (
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium mb-4">{slide.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: slide.htmlContent }} />
          </div>
        );

      default:
        return (
          <Card className="w-full max-w-3xl mx-auto p-6">
            <CardHeader>
              <CardTitle>{slide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {slideType.fields.map((field, index) => {
                switch (field.type) {
                  case 'html':
                    return (
                      <div key={index} dangerouslySetInnerHTML={{ __html: slide[field.name] }} />
                    );
                  case 'textarea':
                  case 'text':
                    return <p key={index}>{slide[field.name]}</p>;
                  case 'image':
                    return <img key={index} src={slide[field.name]} alt={field.label} />;
                  case 'boolean':
                    return slide[field.name] ? (
                      <div key={index} className="text-green-500">Enabled</div>
                    ) : (
                      <div key={index} className="text-red-500">Disabled</div>
                    );
                  default:
                    return null;
                }
              })}
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-4">
        {!isWorkflowBlock && (<Button onClick={() => setIsEditing((prev) => !prev)}>
          <Settings2 className="mr-2" />
          {isEditing ? 'Exit Editing' : 'Edit Template'}
        </Button>)}
        {isEditing && (
          <>
            <Button onClick={handleSave}>
              <Save className="mr-2" />
              Save
            </Button>
          </>
        )}
      </div>

      {isEditing ? (
        <Tabs defaultValue="slides">
          <TabsList>
            <TabsTrigger value="slides">Slides</TabsTrigger>
            <TabsTrigger value="styles">Styles</TabsTrigger>
          </TabsList>
          <TabsContent value="slides">
            <ScrollArea className="space-y-4">
              {template.slides.map((slide, index) => (
                <Card key={slide.id} className="p-4 relative">
                  <Button
                    variant="destructive"
                    className="absolute top-2 right-2"
                    size="icon"
                    onClick={() => deleteSlide(index)}
                  >
                    <Trash />
                  </Button>
                  <CardHeader>
                    <CardTitle>Slide {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label>Type</Label>
                    <Select
                      value={slide.type}
                      onValueChange={(type) => updateSlide(index, { type })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select slide type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="mt-4">
                      <Label>Title</Label>
                      <Input
                        value={slide.title}
                        onChange={(e) => updateSlide(index, { title: e.target.value })}
                      />
                    </div>
                    {slide.type === 'success' && (
                      <div className="mt-4">
                        <Label>Description</Label>
                        <Input
                          value={slide.description}
                          onChange={(e) => updateSlide(index, { description: e.target.value })}
                        />
                      </div>
                    )}
                    {slide.type === 'pdf' && (
                      <div className="mt-4">
                        <Label>PDF URL</Label>
                        <Input
                          value={slide.pdfUrl}
                          onChange={(e) => updateSlide(index, { pdfUrl: e.target.value })}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              <Button onClick={addSlide} className="w-full">
                <Plus className="mr-2" />
                Add Slide
              </Button>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="styles">
            <Card className="p-4">
              <Label>Primary Color</Label>
              <Input
                value={template.styles.primaryColor}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    styles: { ...template.styles, primaryColor: e.target.value },
                  })
                }
              />
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="relative">
          {renderSlide(template.slides[currentSlideIndex])}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft />
            </Button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Button
              onClick={() =>
                setCurrentSlideIndex((prev) => Math.min(prev + 1, template.slides.length - 1))
              }
              disabled={currentSlideIndex === template.slides.length - 1}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessTemplateEditor;
