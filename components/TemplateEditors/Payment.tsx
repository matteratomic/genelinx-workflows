import React, { useState, useEffect } from 'react';
import { Settings2, Save, Undo } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PaymentTemplate {
  companyName: string;
  pageTitle: string;
  amountLabel: string;
  referencePrefix: string;
  referenceFormat: string;
  amount: string;
  currency: string;
  discountLabel: string;
  discountButtonText: string;
  totalLabel: string;
  paymentSectionTitle: string;
  paymentMethods: {
    card: { enabled: boolean; label: string };
    ideal: { enabled: boolean; label: string };
    klarna: { enabled: boolean; label: string };
  };
  cardFields: {
    cardNumber: { placeholder: string; showAutofill: boolean };
    expiry: { placeholder: string };
    cvv: { placeholder: string };
  };
  payButtonText: string;
  colors: {
    primary: string;
    headerBg: string;
  };
}

const defaultTemplate: PaymentTemplate = {
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
};

const PaymentTemplateEditor = ({ blockName, setBlockName, data, onTemplateChange, isWorkflowBlock }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState<PaymentTemplate>(defaultTemplate);
  const [selectedPayment, setSelectedPayment] = useState('card');

  // Load initial data if provided
  useEffect(() => {
    if (data) {
      setTemplate(data);
    }
  }, [data]);

  const handleSave = () => {
    setIsEditing(false);
    onTemplateChange(template);
  };

  const handleRevert = () => {
    setTemplate(data || defaultTemplate);
    setIsEditing(false);
  };

  const updateTemplate = (path: string, value: any) => {
    const newTemplate = { ...template };
    const pathArray = path.split('.');
    let current: any = newTemplate;

    // Navigate to the nested property
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }

    // Update the value
    current[pathArray[pathArray.length - 1]] = value;

    setTemplate(newTemplate);
    onTemplateChange(newTemplate);
  };

  return (
    <div className="w-full max-w-2xl pt-0 p-4 space-y-4">
      <div className="flex justify-start space-x-2">
        {!isWorkflowBlock && <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Settings2 className="w-4 h-4 mr-2" />
          {isEditing ? 'Editing Mode' : 'Edit Template'}
        </Button>}
        {isEditing && (
          <>
            <Button onClick={handleSave} variant="default">
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

      <div className="grid grid-cols-1 gap-4">
        {isEditing ? (
          <div className="space-y-4">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="styling">Styling</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={template.companyName}
                    onChange={(e) => updateTemplate('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Page Title</Label>
                  <Input
                    value={template.pageTitle}
                    onChange={(e) => updateTemplate('pageTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Amount Label</Label>
                  <Input
                    value={template.amountLabel}
                    onChange={(e) => updateTemplate('amountLabel', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Reference Prefix</Label>
                  <Input
                    value={template.referencePrefix}
                    onChange={(e) => updateTemplate('referencePrefix', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Reference Format</Label>
                  <Input
                    value={template.referenceFormat}
                    onChange={(e) => updateTemplate('referenceFormat', e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4">
                <div>
                  <Label>Amount</Label>
                  <Input
                    value={template.amount}
                    onChange={(e) => updateTemplate('amount', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Currency Symbol</Label>
                  <Input
                    value={template.currency}
                    onChange={(e) => updateTemplate('currency', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Payment Methods</Label>
                  {Object.entries(template.paymentMethods).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 mt-2">
                      <Switch
                        checked={value.enabled}
                        onCheckedChange={(checked) =>
                          updateTemplate(`paymentMethods.${key}.enabled`, checked)
                        }
                      />
                      <Input
                        value={value.label}
                        onChange={(e) =>
                          updateTemplate(`paymentMethods.${key}.label`, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <Label>Pay Button Text</Label>
                  <Input
                    value={template.payButtonText}
                    onChange={(e) => updateTemplate('payButtonText', e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="styling" className="space-y-4">
                <div>
                  <Label>Primary Color</Label>
                  <Input
                    value={template.colors.primary}
                    onChange={(e) => updateTemplate('colors.primary', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Header Background</Label>
                  <Input
                    value={template.colors.headerBg}
                    onChange={(e) => updateTemplate('colors.headerBg', e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card className={`border-t-8 border-t-${template.colors.headerBg}`}>
            <CardContent className="p-6 space-y-6">
              <h1 className={`text-xl font-semibold text-${template.colors.primary}-800`}>
                {template.companyName} {template.pageTitle}
              </h1>

              <div className="flex justify-between items-center">
                <div>
                  <h2 className={`text-${template.colors.primary}-800 font-medium`}>
                    {template.amountLabel}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {template.referencePrefix}({template.referenceFormat})
                  </p>
                </div>
                <span className="text-lg font-medium">
                  {template.currency}{template.amount}
                </span>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder={template.discountLabel}
                  className="flex-grow"
                />
                <Button
                  className={`bg-${template.colors.primary}-600 hover:bg-${template.colors.primary}-700 text-white`}
                >
                  {template.discountButtonText}
                </Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className={`text-${template.colors.primary}-800 font-medium`}>
                    {template.totalLabel}
                  </span>
                  <span className={`text-lg font-medium text-${template.colors.primary}-800`}>
                    {template.currency}{template.amount}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-teal-800 font-medium mb-4">{template.paymentSectionTitle}</h2>
                <div className="flex gap-8 mb-4">
                  {Object.entries(template.paymentMethods)
                    .filter(([_, value]) => value.enabled)
                    .map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value={key}
                          checked={selectedPayment === key}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="text-primary"
                        />
                        <span className="font-bold text-primary">{value.label}</span>
                      </label>
                    ))}
                </div>
              </div>

              {selectedPayment === 'card' && (
                <>
                  <div className="relative">
                    <Input
                      disabled
                      placeholder={template.cardFields.cardNumber.placeholder}
                      className="w-full pr-20"
                    />
                    {template.cardFields.cardNumber.showAutofill && (
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                        Autofill <span className="text-green-500">link</span>
                      </button>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Input
                      disabled
                      placeholder={template.cardFields.expiry.placeholder}
                      className="flex-1"
                    />
                    <Input
                      disabled
                      placeholder={template.cardFields.cvv.placeholder}
                      className="flex-1"
                    />
                  </div>
                </>
              )}

              <Button
                className={`w-full bg-${template.colors.primary}-600 bg-emerald-800 hover:bg-${template.colors.primary}-700 text-white py-6`}
              >
                {template.payButtonText}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PaymentTemplateEditor;
