import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request: Request) {
  const { question, answer, stack } = await request.json()

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are an expert technical interviewer for ${stack} developers. 
        Analyze the candidate's answer and provide feedback in JSON format only.
        Response must be valid JSON with these exact fields:
        {
          "score": number (0-100),
          "strengths": string[],
          "weaknesses": string[],
          "better_answer": string,
          "summary": string
        }`
      },
      {
        role: 'user',
        content: `Interview question: ${question}\n\nCandidate's answer: ${answer}`
      }
    ],
    temperature: 0.7,
  })

  const text = completion.choices[0].message.content || ''
  
  try {
    const clean = text.replace(/```json|```/g, '').trim()
    const feedback = JSON.parse(clean)
    return NextResponse.json({ feedback })
  } catch {
    return NextResponse.json({ error: 'Parse error' }, { status: 500 })
  }
}