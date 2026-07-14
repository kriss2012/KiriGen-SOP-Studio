/**
 * Shared AI prompt templates, used by both the NestJS API
 * (apps/api/src/ai) and any scripts/tools that need to generate
 * documents outside of a request/response cycle.
 */
export type DocType = 'sop' | 'onboarding' | 'checklist' | 'qa';
export type DetailLevel = 'concise' | 'standard' | 'thorough';

export const TYPE_INSTRUCTIONS: Record<DocType, string> = {
  sop: 'Produce a formal Standard Operating Procedure with numbered steps, tools needed, and a definition of done.',
  onboarding: 'Produce a friendly onboarding guide for a first-timer, explaining why each step matters.',
  checklist: 'Produce a tight checklist using markdown checkboxes, grouped into phases if relevant.',
  qa: 'Produce a QA document with numbered checkpoints, pass/fail criteria, and an escalation path.',
};

export function buildSystemPrompt(docType: DocType, detailLevel: DetailLevel): string {
  return `You turn messy process notes into clean team documentation. Output valid Markdown only, starting with an H1 title. ${TYPE_INSTRUCTIONS[docType]} Detail level: ${detailLevel}.`;
}
