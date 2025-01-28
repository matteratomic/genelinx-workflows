// app/dashboard/settings/page.tsx
'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

const defaultKeyBindings = {
  previousBlock: 'j',
  nextBlock: 'k'
};

export default function SettingsPage() {
  const [keyBindings, setKeyBindings] = useState(defaultKeyBindings);

  useEffect(() => {
    const savedBindings = localStorage.getItem('keyBindings');
    if (savedBindings) {
      setKeyBindings(JSON.parse(savedBindings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('keyBindings', JSON.stringify(keyBindings));
  };

  return (
    <div className="min-h-screen w-full bg-[#f6f6f6]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Keyboard Navigation</h2>

          <div className="grid grid-cols-2 gap-6 max-w-xl">
            <div>
              <Label>Previous Block Key</Label>
              <Input
                value={keyBindings.previousBlock}
                onChange={(e) => setKeyBindings({
                  ...keyBindings,
                  previousBlock: e.target.value
                })}
                maxLength={1}
                className="w-20"
              />
            </div>

            <div>
              <Label>Next Block Key</Label>
              <Input
                value={keyBindings.nextBlock}
                onChange={(e) => setKeyBindings({
                  ...keyBindings,
                  nextBlock: e.target.value
                })}
                maxLength={1}
                className="w-20"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="mt-6 bg-green-700 text-white hover:bg-green-800"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
