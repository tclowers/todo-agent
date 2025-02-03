import OpenAI from 'openai'
import { RECEPTIONIST_SYSTEM_PROMPT } from '../prompts/receptionist'
import { EVALUATION_SYSTEM_PROMPT } from '../prompts/completeness'
import { TASK_EXTRACTION_PROMPT } from '../prompts/task-extraction'
import { TASK_COMPLETION_PROMPT } from '../prompts/task-completion'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getChatCompletion(messages: { role: 'user' | 'assistant'; content: string }[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: RECEPTIONIST_SYSTEM_PROMPT,
      },
      ...messages,
    ],
    model: 'gpt-4o',
  })

  return completion.choices[0].message.content
}

export async function evaluateChatCompletion(messages: { role: 'user' | 'assistant'; content: string }[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: EVALUATION_SYSTEM_PROMPT,
      },
      ...messages,
    ],
    model: 'gpt-4o',
    response_format: { type: "json_object" }
  })

  const response = completion.choices[0].message.content
  if (!response) {
    throw new Error("Received null content from OpenAI");
  }
  console.log("completed content:", response)
  return JSON.parse(response) as { completed: boolean }
}

export async function extractTasksFromChat(messages: { role: 'user' | 'assistant'; content: string }[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: TASK_EXTRACTION_PROMPT,
      },
      ...messages,
    ],
    model: 'gpt-4o',
    response_format: { type: "json_object" }
  })

  const response = completion.choices[0].message.content
  if (!response) {
    throw new Error("Received null content from OpenAI")
  }
  const parsedResponse = JSON.parse(response) as { tasks: { title: string; description: string; type: string }[] }
  return parsedResponse.tasks
}

export async function analyzeTaskCompletion(task: { title: string; description: string | null }) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: TASK_COMPLETION_PROMPT,
      },
      {
        role: 'user',
        content: `Task Title: ${task.title}\nDescription: ${task.description || 'No description provided'}`,
      },
    ],
    model: 'gpt-4o',
    response_format: { type: "json_object" }
  })

  const response = completion.choices[0].message.content
  if (!response) {
    throw new Error("Received null content from OpenAI")
  }
  return JSON.parse(response) as {
    can_complete: boolean
    action?: string
    parameters?: Record<string, any>
    reason: string
  }
} 