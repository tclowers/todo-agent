import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getChatCompletion(messages: { role: 'user' | 'assistant'; content: string }[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant. Provide clear, concise responses.',
      },
      ...messages,
    ],
    model: 'gpt-4o',
  })

  return completion.choices[0].message.content
} 