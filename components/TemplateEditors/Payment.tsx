import React, { useState } from 'react';
import { Settings2, Save, Undo } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const PaymentTemplateEditor = ({ blockName, setBlockName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [template, setTemplate] = useState({
    blockName: '',
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

  return (
    <div className="w-full max-w-2xl pt-0 p-4 space-y-4">
      <div className="flex justify-start space-x-2">
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Settings2 className="w-4 h-4 mr-2" />
          {isEditing ? 'Editing Mode' : 'Edit Template'}
        </Button>
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

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                  <Label>Block Name</Label>
                  <Input
                    value={blockName}
                    // value={template.blockName}
                    // onChange={(e) => setTemplate({ ...template, blockName: e.target.value })}
                    onChange={(e) => setBlockName(e.target.value)}
                    placeholder="Enter a name for this block"
                  />
                </div>
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={template.companyName}
                    onChange={(e) => setTemplate({ ...template, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Page Title</Label>
                  <Input
                    value={template.pageTitle}
                    onChange={(e) => setTemplate({ ...template, pageTitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Amount Label</Label>
                  <Input
                    value={template.amountLabel}
                    onChange={(e) => setTemplate({ ...template, amountLabel: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Reference Prefix</Label>
                  <Input
                    value={template.referencePrefix}
                    onChange={(e) => setTemplate({ ...template, referencePrefix: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Reference Format</Label>
                  <Input
                    value={template.referenceFormat}
                    onChange={(e) => setTemplate({ ...template, referenceFormat: e.target.value })}
                  />
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4">
                <div>
                  <Label>Amount</Label>
                  <Input
                    value={template.amount}
                    onChange={(e) => setTemplate({ ...template, amount: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Currency Symbol</Label>
                  <Input
                    value={template.currency}
                    onChange={(e) => setTemplate({ ...template, currency: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Payment Methods</Label>
                  {Object.entries(template.paymentMethods).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 mt-2">
                      <Switch
                        checked={value.enabled}
                        onCheckedChange={(checked) =>
                          setTemplate({
                            ...template,
                            paymentMethods: {
                              ...template.paymentMethods,
                              [key]: { ...value, enabled: checked }
                            }
                          })
                        }
                      />
                      <Input
                        value={value.label}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            paymentMethods: {
                              ...template.paymentMethods,
                              [key]: { ...value, label: e.target.value }
                            }
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="styling" className="space-y-4">
                <div>
                  <Label>Primary Color</Label>
                  <Input
                    value={template.colors.primary}
                    onChange={(e) => setTemplate({
                      ...template,
                      colors: { ...template.colors, primary: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Header Background</Label>
                  <Input
                    value={template.colors.headerBg}
                    onChange={(e) => setTemplate({
                      ...template,
                      colors: { ...template.colors, headerBg: e.target.value }
                    })}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : null}

        {/* Preview Panel */}
        {!isEditing ?
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
                <h2 className="text-teal-800 font-medium mb-4">Payment Information</h2>

                <div className="flex gap-8 mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      // checked={selectedPayment === 'card'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-primary"
                    />
                    <span className="font-bold text-primary">Card</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="ideal"
                      // checked={selectedPayment === 'ideal'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-teal-800"
                    />
                    <span className="text-primary font-bold">iDEAL</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="klarna"
                      // checked={selectedPayment === 'klarna'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-primary"
                    />
                    <span className="text-primary font-bold">Klarna</span>
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  disabled
                  type="text"
                  placeholder="Card Number"
                  className="w-full border rounded px-3 py-2 pr-20" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  Autofill <span className="text-green-500">link</span>
                </button>
              </div>

              <div className="flex gap-4">
                <input
                  disabled
                  type="text"
                  placeholder="MM / YY"
                  className="flex-1 border rounded px-3 py-2"
                />
                <input
                  disabled
                  type="text"
                  placeholder="CVV"
                  className="flex-1 border rounded px-3 py-2"
                />
              </div>


              <Button
                className={`w-full bg-${template.colors.primary}-600 bg-emerald-800 hover:bg-${template.colors.primary}-700 text-white py-6`}
              >
                {template.payButtonText}
              </Button>
            </CardContent>
          </Card>
          : null}
      </div>
    </div>
  );
};

export default PaymentTemplateEditor;
