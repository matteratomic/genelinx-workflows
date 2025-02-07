// utils/workflowLink.ts
export function generateWorkflowLink(workflow) {
  const workflowData = {
    id: workflow.id,
    name: workflow.name,
    blocks: workflow.blocks.map(block => ({
      id: block.id,
      title: block.title,
      type: block.type,
      custom: block.custom
    }))
  };

  const encodedWorkflow = encodeURIComponent(JSON.stringify(workflowData));
  return `/w/${encodedWorkflow}`;
}

export function generateWorkflowShareLink(workflow) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  return `${baseUrl}${generateWorkflowLink(workflow)}`;
}
