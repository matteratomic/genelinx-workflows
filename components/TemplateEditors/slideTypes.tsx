// slideTypes.ts
export interface SlideTypeField {
  name: string;
  type: 'text' | 'textarea' | 'url' | 'html' | 'boolean' | 'select' | 'color';
  label: string;
  defaultValue?: any;
  options?: { label: string; value: string; }[];
  required?: boolean;
}

export interface SlideType {
  id: string;
  name: string;
  description: string;
  fields: SlideTypeField[];
  renderComponent?: string; // Name of the component to use for rendering
}

// Default slide types
export const defaultSlideTypes: SlideType[] = [
  {
    id: 'success',
    name: 'Success Message',
    description: 'A simple success message with optional icon',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description',
      },
      {
        name: 'showIcon',
        type: 'boolean',
        label: 'Show Success Icon',
        defaultValue: true,
      },
      {
        name: 'iconColor',
        type: 'color',
        label: 'Icon Color',
        defaultValue: '#4CAF50',
      },
    ],
  },
  {
    id: 'pdf',
    name: 'PDF Document',
    description: 'Display a PDF document',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
      },
      {
        name: 'pdfUrl',
        type: 'url',
        label: 'PDF URL',
        required: true,
      },
      {
        name: 'showToolbar',
        type: 'boolean',
        label: 'Show PDF Toolbar',
        defaultValue: false,
      },
    ],
  },
  {
    id: 'html',
    name: 'Custom HTML',
    description: 'Custom HTML content',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
      },
      {
        name: 'htmlContent',
        type: 'html',
        label: 'HTML Content',
        required: true,
      },
    ],
  },
];

// Template interface
export interface SuccessTemplate {
  slideTypes: SlideType[];
  slides: any[];
  styles: {
    backgroundColor: string;
    primaryColor: string;
    maxWidth: string;
    borderRadius: string;
  };
}

// Utility functions for slide type management
export const createSlideType = (slideType: Omit<SlideType, 'id'>): SlideType => {
  return {
    id: `type-${Date.now()}`,
    ...slideType,
  };
};

export const createSlideFromType = (slideType: SlideType): any => {
  const slide = {
    id: `slide-${Date.now()}`,
    type: slideType.id,
  };

  // Initialize default values for all fields
  slideType.fields.forEach(field => {
    slide[field.name] = field.defaultValue ?? '';
  });

  return slide;
};

export const validateSlide = (slide: any, slideType: SlideType): string[] => {
  const errors: string[] = [];

  slideType.fields
    .filter(field => field.required)
    .forEach(field => {
      if (!slide[field.name]) {
        errors.push(`${field.label} is required`);
      }
    });

  return errors;
};
