'use client'

import CreateNewBlock from "@/components/CreateNewBlock";
import { Button } from "@/components/ui/button";
import { Cuboid, Eye, Grid2X2, Plus } from "lucide-react";
import { useState, useEffect } from "react";

// Type for a saved block
interface SavedBlock {
  id: string;
  name: string;
  type: string;
  template: any;
  createdAt: Date;
}

const workflowBlocks = [
  { id: 1, title: 'OTP Code', description: "Creates an OTP Code block" },
  { id: 2, title: 'Book a Consultation', description: "Creates a consultation booking block" },
  { id: 3, title: 'Payment Request', description: "Creates a payment request block" },
  { id: 4, title: 'Patient Details', description: "Creates a patient details block" },
  { id: 5, title: 'Medical History', description: "Creates a medical history block" },
  { id: 6, title: 'Family Details', description: "Creates a family details block" },
  { id: 7, title: 'Screening Questionnaire', description: "Creates a questionnaire block" },
  { id: 8, title: 'Optional Questionnaire', description: "Creates a optional questionnaire block" },
  { id: 9, title: 'Payment Request', description: "Creates a payment request block" },
  { id: 10, title: 'Schedule Appointment', description: "Creates a schedule appointment block" },
  { id: 11, title: 'Consultation Form', description: "Creates a consultation form block" },
  { id: 12, title: 'Question & Answer', description: "Creates a question and answer block" },
];

const Block = ({ block, onEdit }: { block: SavedBlock; onEdit: () => void }) => {
  return <div className="px-4 flex items-center justify-between w-full bg-white h-20 rounded-md shadow-md">
    <div className="flex items-center justify-between space-x-4">
      <div
        style={{ backgroundImage: "url(/ellipse.png)" }}
        className="w-9 h-9 rounded-full bg-cover bg-center flex items-center justify-center text-white font-semibold">
        <p>{block.id}</p>
      </div>
      <div>
        <p className="font-semibold">{block.name}</p>
        <p className="text-sm text-gray-500">{block.type}</p>
      </div>
    </div>
    <div className="flex items-center justify-center space-x-4">
      <Button size="lg" type="button" onClick={onEdit}>Edit</Button>
      <Eye />
    </div>
  </div>
}

export default function Blocks() {
  const [tab, setTab] = useState('templates')
  const [createBlockDialogOpen, setCreateBlockDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [savedBlocks, setSavedBlocks] = useState<SavedBlock[]>([])
  const [selectedBlock, setSelectedBlock] = useState<SavedBlock | null>(null)

  // Load saved blocks from localStorage on mount
  useEffect(() => {
    const loadedBlocks = localStorage.getItem('savedBlocks')
    if (loadedBlocks) {
      setSavedBlocks(JSON.parse(loadedBlocks))
    }
  }, [])

  // Save blocks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedBlocks', JSON.stringify(savedBlocks))
  }, [savedBlocks])

  const toggleModal = () => {
    setCreateBlockDialogOpen(!createBlockDialogOpen)
    if (!createBlockDialogOpen) {
      setSelectedBlock(null)
    }
  }

  const handleSaveBlock = (blockName: string, template: any) => {
    if (selectedBlock) {
      // Update existing block
      setSavedBlocks(blocks => blocks.map(block =>
        block.id === selectedBlock.id
          ? { ...block, name: blockName, template }
          : block
      ))
    } else {
      // Create new block
      const newBlock: SavedBlock = {
        id: (savedBlocks.length + 1).toString(),
        name: blockName,
        type: selectedTemplate,
        template,
        createdAt: new Date()
      }
      setSavedBlocks([...savedBlocks, newBlock])
    }
    setTab('saved')
    toggleModal()
  }

  const handleEditBlock = (block: SavedBlock) => {
    setSelectedBlock(block)
    setSelectedTemplate(block.type)
    setCreateBlockDialogOpen(true)
  }

  return <div className="min-h-screen p-8 bg-[#f6f6f6] w-full">
    <div>
      <h1 className="text-4xl font-bold text-teal-900">Blocks</h1>
      <p className="text-slate-600 mt-3 w-6/12">
        Create and edit blocks from templates to be used in the workflows
      </p>
    </div>
    <div className="rounded-md h-12 w-1/3 bg-white my-6 p-2 flex items-center justify-between space-x-4">
      <div
        role="button"
        onClick={() => setTab('templates')}
        className={`rounded-md ${tab === 'templates' ? 'bg-black text-white font-semibold' : 'text-black font-medium'} w-1/2 h-full flex items-center justify-center cursor-pointer`}>
        Templates
      </div>
      <div
        role="button"
        onClick={() => setTab('saved')}
        className={`rounded-md ${tab !== 'templates' ? 'bg-black text-white font-semibold' : 'text-black font-medium'} w-1/2 h-full flex items-center justify-center cursor-pointer`}>
        Saved Blocks
      </div>
    </div>

    <div className={`${tab !== 'templates' && !savedBlocks.length ? "flex" : "grid grid-cols-3"} w-full gap-4 relative`}>
      {tab === 'templates' ?
        workflowBlocks.map((block, i) => {
          return <div
            role="button"
            onClick={() => {
              setSelectedTemplate(block.title)
              toggleModal()
            }}
            key={i}
            style={{
              backgroundSize: "150%",
              backgroundImage: "url('/workflow-block-image.png')"
            }}
            className="bg-center duration-100 hover:scale-105 relative cursor-pointer flex flex-col items-center justify-center rounded-md w-auto h-48 font-medium bg-cover bg-no-repeat text-white text-xl">
            <div className="top-2 mb-4 left-2 w-8 h-8 rounded-full bg-white text-teal-800 flex items-center justify-center font-semibold">
              {block.id}
            </div>
            {block.title}
            <p className="font-normal text-sm">
              {block.description}
            </p>
          </div>
        })
        :
        savedBlocks.length ?
          <div className="flex flex-col space-y-6 w-10/12">
            {savedBlocks.map((block) => (
              <Block
                key={block.id}
                block={block}
                onEdit={() => handleEditBlock(block)}
              />
            ))}
          </div>
          :
          <div className="relative w-full flex flex-col items-center justify-center h-96">
            <Cuboid strokeWidth={1} className="w-32 h-32 text-gray-800" />
            <div className="mt-4 text-xl font-medium text-gray-800">No custom blocks saved</div>
            <div className="mt-1 font-medium text-gray-400 w-96 text-center">
              To get started, create and save a custom block from the templates provided
            </div>
            <Button onClick={toggleModal} className="mt-6 bg-green-800 text-white hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add new block
            </Button>
          </div>
      }
    </div>

    {createBlockDialogOpen && (
      <CreateNewBlock
        onClose={toggleModal}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onSave={handleSaveBlock}
        existingBlock={selectedBlock}
      />
    )}
  </div>
}
