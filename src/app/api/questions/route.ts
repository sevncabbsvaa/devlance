import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request: Request) {
  const { stack, difficulty } = await request.json()

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are a technical interviewer. Generate interview questions for developers.
        Respond with valid JSON only, no extra text:
        {
          "questions": [
            { "id": 1, "question": string, "topic": string }
          ]
        }`
      },
      {
        role: 'user',
        content: `Generate 5 ${difficulty} level interview questions for ${stack} developer.`
      }
    ],
    temperature: 0.8,
  })

  const text = completion.choices[0].message.content || ''
  
  try {
    const clean = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(clean)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Parse error' }, { status: 500 })
  }
}