"use client";

import CreateNewBlock from "@/components/CreateNewBlock";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Cuboid, Eye, Grid2X2, Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";

// Type for a saved block
interface SavedBlock {
  id: string;
  name: string;
  type: string;
  description: string;
  template: any;
  created_at: Date;
  custom: boolean;
}

const workflowBlocks = [
  { id: 1, title: "OTP Code", description: "Creates an OTP Code block" },
  {
    id: 2,
    title: "Book a Consultation",
    description: "Creates a consultation booking block",
  },
  {
    id: 3,
    title: "Payment Request",
    description: "Creates a payment request block",
  },
  {
    id: 4,
    title: "Patient Details",
    description: "Creates a patient details block",
  },
  {
    id: 5,
    title: "Medical History",
    description: "Creates a medical history block",
  },
  {
    id: 6,
    title: "Family Details",
    description: "Creates a family details block",
  },
  { id: 7, title: "Make a Course", description: "Creates a course block" },
  {
    id: 14,
    title: "Landing Page",
    description: "Creates a landing page block",
  },
  {
    id: 8,
    title: "Screening Questionnaire",
    description: "Creates a questionnaire block",
  },
  {
    id: 9,
    title: "Optional Questionnaire",
    description: "Creates a optional questionnaire block",
  },
  // { id: 10, title: 'Payment Request', description: "Creates a payment request block" },
  {
    id: 11,
    title: "Schedule Appointment",
    description: "Creates a schedule appointment block",
  },
  {
    id: 12,
    title: "Consultation Form",
    description: "Creates a consultation form block",
  },
  {
    id: 14,
    title: "Submission Result",
    description: "Creates a submission result block",
  },
  {
    id: 15,
    title: "Consent Form",
    description: "Creates a consent form block",
  },
  // { id: 13, title: 'Question & Answer', description: "Creates a question and answer block" },
];

const Block = ({
  index,
  block,
  onEdit,
  onDelete,
}: {
  index: number;
  block: SavedBlock;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="px-4 flex items-center justify-between w-full bg-white h-20 rounded-md shadow-md">
      <div className="flex items-center justify-between space-x-4">
        <div
          style={{ backgroundImage: "url(/ellipse.png)" }}
          className="w-9 h-9 rounded-full bg-cover bg-center flex items-center justify-center text-white font-semibold"
        >
          <p>{index}</p>
        </div>
        <div>
          <p className="font-semibold">{block.name}</p>
          <p className="text-sm text-gray-500">{block.type}</p>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <Button size="lg" type="button" onClick={onEdit}>
          Edit
        </Button>
        <Button
          onClick={() => {
            const response = window.confirm(
              "Would you like to delete this block?",
            );
            response && onDelete();
          }}
          className="bg-white hover:bg-white"
          size="icon"
        >
          <Trash className="text-red-500 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default function Blocks() {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("templates");
  const [createBlockDialogOpen, setCreateBlockDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [savedBlocks, setSavedBlocks] = useState<SavedBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<SavedBlock | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const loadBlocks = async () => {
      const blocks = await listBlocks();
      setSavedBlocks(blocks);
    };
    loadBlocks();
  }, []);

  const toggleModal = () => {
    setCreateBlockDialogOpen(!createBlockDialogOpen);
    if (!createBlockDialogOpen) {
      setSelectedBlock(null);
    }
  };

  const createBlock = async (block: Omit<SavedBlock, "id" | "createdAt">) => {
    const { data, error } = await supabase
      .from("blocks")
      .insert({
        name: block.name,
        type: block.type,
        template: block.template,
        custom: true,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateBlock = async (block: SavedBlock) => {
    const { data, error } = await supabase
      .from("blocks")
      .update({
        name: block.name,
        type: block.type,
        template: block.template,
      })
      .eq("id", block.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteBlock = async (id: string) => {
    const { error } = await supabase.from("blocks").delete().eq("id", id);

    setSavedBlocks((currentSavedBlocks) => {
      return currentSavedBlocks.filter((b) => b.id !== id);
    });
    setLoading(false);
    if (error) throw error;
  };

  const listBlocks = async (type?: string) => {
    setLoading(true);
    let query = supabase
      .from("blocks")
      .select()
      .order("created_at", { ascending: false });

    if (type) {
      query = query.eq("type", type);
    }

    const { data, error } = await query;
    setSavedBlocks(data);
    setLoading(false);
    if (error) throw error;
    return data;
  };

  const handleSaveBlock = async (blockName: string, template: any) => {
    setLoading(true);
    try {
      if (selectedBlock) {
        // console.log('calling handleSaveBlock update')
        // Update existing block
        setSavedBlocks((blocks) =>
          blocks.map((block) =>
            block.id === selectedBlock.id
              ? { ...block, name: blockName, template }
              : block,
          ),
        );
        await updateBlock({ ...selectedBlock, name: blockName, template });
      } else {
        // Create new block
        // console.log('calling handleSaveBlock saving')
        const newBlock: SavedBlock = {
          id: (savedBlocks.length + 1).toString(),
          name: blockName,
          type: selectedTemplate,
          template,
          custom: true,
          created_at: new Date(),
        };
        setSavedBlocks([...savedBlocks, newBlock]);
        await createBlock(newBlock);
      }
      setTab("saved");
      toggleModal();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlock = (block: SavedBlock) => {
    setSelectedBlock(block);
    setSelectedTemplate(block.type);
    setCreateBlockDialogOpen(true);
  };

  const handleDeleteBlock = async (id: string) => {
    setLoading(true);
    await deleteBlock(id);
  };

  return (
    <div className="min-h-screen p-8 bg-[#f6f6f6] w-full">
      <div>
        <h1 className="text-4xl font-bold text-teal-900">Blocks</h1>
        <p className="text-slate-600 mt-3 w-6/12">
          Create and edit blocks from templates to be used in the workflows
        </p>
      </div>
      <div className="rounded-md h-12 w-1/3 bg-white my-6 p-2 flex items-center justify-between space-x-4">
        <div
          role="button"
          onClick={() => setTab("templates")}
          className={`rounded-md ${tab === "templates" ? "bg-black text-white font-semibold" : "text-black font-medium"} w-1/2 h-full flex items-center justify-center cursor-pointer`}
        >
          Templates
        </div>
        <div
          role="button"
          onClick={() => setTab("saved")}
          className={`rounded-md ${tab !== "templates" ? "bg-black text-white font-semibold" : "text-black font-medium"} w-1/2 h-full flex items-center justify-center cursor-pointer`}
        >
          Saved Blocks
        </div>
      </div>

      {/* <div className={`${(tab !== 'templates' && !savedBlocks.length) ? "flex" : "grid grid-cols-3"} w-full bg-green-500 gap-4 relative`}> */}
      <div
        className={`${tab !== "templates" ? "flex" : "grid grid-cols-3"} w-full gap-4 relative`}
      >
        {tab === "templates" ? (
          workflowBlocks.map((block, i) => {
            return (
              <div
                role="button"
                onClick={() => {
                  setSelectedTemplate(block.title);
                  toggleModal();
                }}
                key={i}
                style={{
                  backgroundSize: "150%",
                  backgroundImage: "url('/workflow-block-image.png')",
                }}
                className="bg-center duration-100 hover:scale-105 relative cursor-pointer flex flex-col items-center justify-center rounded-md w-auto h-48 font-medium bg-cover bg-no-repeat text-white text-xl"
              >
                <div className="top-2 mb-4 left-2 w-8 h-8 rounded-full bg-white text-teal-800 flex items-center justify-center font-semibold">
                  {block.id}
                </div>
                {block.title}
                <p className="font-normal text-sm">{block.description}</p>
              </div>
            );
          })
        ) : savedBlocks?.length ? (
          <div className="flex flex-1 flex-col space-y-6 w-full">
            {savedBlocks.map((block, i) => (
              <Block
                index={i + 1}
                key={block.id}
                block={block}
                onEdit={() => handleEditBlock(block)}
                onDelete={() => handleDeleteBlock(block.id)}
              />
            ))}
          </div>
        ) : (
          <div className="relative w-full flex flex-col items-center justify-center h-96">
            <Cuboid strokeWidth={1} className="w-32 h-32 text-gray-800" />
            <div className="mt-4 text-xl font-medium text-gray-800">
              No custom blocks saved
            </div>
            <div className="mt-1 font-medium text-gray-400 w-96 text-center">
              To get started, create and save a custom block from the templates
              provided
            </div>
            {/* <Button onClick={toggleModal} className="mt-6 bg-green-700 text-white hover:bg-green-800"> */}
            {/*   <Plus className="w-4 h-4 mr-2" /> */}
            {/*   Add new block */}
            {/* </Button> */}
          </div>
        )}
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
      {loading ? <Loader /> : null}
    </div>
  );
}
