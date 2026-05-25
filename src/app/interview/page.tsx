'use client'

import { useState } from 'react'

const STACKS = ['React', 'Node.js', 'Python', 'Vue', 'Angular', 'Next.js']
const LEVELS = ['Junior', 'Middle', 'Senior']

type Question = { id: number; question: string; topic: string }
type Feedback = {
  score: number
  strengths: string[]
  weaknesses: string[]
  better_answer: string
  summary: string
}

export default function InterviewPage() {
  const [stack, setStack] = useState('React')
  const [difficulty, setDifficulty] = useState('Junior')
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState<'setup' | 'interview' | 'feedback'>('setup')

  const startInterview = async () => {
    setLoading(true)
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stack, difficulty })
    })
    const data = await res.json()
    setQuestions(data.questions)
    setStage('interview')
    setLoading(false)
  }

  const submitAnswer = async () => {
    setLoading(true)
    const res = await fetch('/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: questions[current].question,
        answer,
        stack
      })
    })
    const data = await res.json()
    setFeedback(data.feedback)
    setStage('feedback')
    setLoading(false)
  }

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      setAnswer('')
      setFeedback(null)
      setStage('interview')
    } else {
      window.location.href = '/dashboard'
    }
  }

  // Setup ekranı
  if (stage === 'setup') {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-white text-2xl font-bold mb-2">Müsahibəni Qur</h1>
          <p className="text-gray-400 text-sm mb-6">Stack və səviyyəni seç</p>

          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">Texnologiya</label>
            <div className="grid grid-cols-3 gap-2">
              {STACKS.map(s => (
                <button
                  key={s}
                  onClick={() => setStack(s)}
                  className={`py-2 rounded-xl text-sm font-medium transition ${
                    stack === s
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Səviyyə</label>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map(l => (
                <button
                  key={l}
                  onClick={() => setDifficulty(l)}
                  className={`py-2 rounded-xl text-sm font-medium transition ${
                    difficulty === l
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startInterview}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'Suallar hazırlanır...' : 'Başla →'}
          </button>
        </div>
      </div>
    )
  }

  // Interview ekranı
  if (stage === 'interview') {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <span className="text-white font-bold">Devlance</span>
          <span className="text-gray-400 text-sm">
            Sual {current + 1} / {questions.length}
          </span>
          <span className="text-purple-400 text-sm bg-purple-500/10 px-3 py-1 rounded-full">
            {stack} · {difficulty}
          </span>
        </div>

        {/* Progress */}
        <div className="w-full bg-white/5 h-1">
          <div
            className="bg-purple-600 h-1 transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex gap-6 p-8 max-w-6xl mx-auto w-full">
          {/* Sual */}
          <div className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
            <span className="text-purple-400 text-xs font-medium uppercase tracking-wider">
              {questions[current]?.topic}
            </span>
            <p className="text-white text-lg mt-3 leading-relaxed">
              {questions[current]?.question}
            </p>
          </div>

          {/* Cavab */}
          <div className="flex-1 flex flex-col gap-4">
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Cavabını bura yaz..."
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-purple-500 min-h-75"
            />
            <button
              onClick={submitAnswer}
              disabled={loading || !answer.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? 'Analiz edilir...' : 'Cavabı göndər →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Feedback ekranı
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <div className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <span className="text-white font-bold">Devlance</span>
        <span className="text-gray-400 text-sm">Sual {current + 1} / {questions.length}</span>
      </div>

      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        {/* Xal */}
        <div className="flex items-center gap-6 mb-8">
          <div className={`text-6xl font-bold ${
            feedback!.score >= 70 ? 'text-green-400' :
            feedback!.score >= 40 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {feedback!.score}
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{feedback!.summary}</p>
            <p className="text-gray-400 text-sm">{stack} · {difficulty}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Güclü tərəflər */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <h3 className="text-green-400 font-semibold mb-3">✓ Güclü tərəflər</h3>
            <ul className="space-y-2">
              {feedback!.strengths.map((s, i) => (
                <li key={i} className="text-gray-300 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Zəif tərəflər */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <h3 className="text-red-400 font-semibold mb-3">✗ Zəif tərəflər</h3>
            <ul className="space-y-2">
              {feedback!.weaknesses.map((w, i) => (
                <li key={i} className="text-gray-300 text-sm">{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Daha yaxşı cavab */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 mb-6">
          <h3 className="text-purple-400 font-semibold mb-3">💡 Daha yaxşı cavab</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{feedback!.better_answer}</p>
        </div>

        <button
          onClick={nextQuestion}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
        >
          {current + 1 < questions.length ? 'Növbəti sual →' : 'Dashboard-a qayıt'}
        </button>
      </div>
    </div>
  )
}