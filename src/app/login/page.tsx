'use client'

import { createClient } from '../../lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GithubIcon, GoogleIcon } from '@/src/components/ui/Icons'
import { SignUpForm } from '@/src/components/auth/SignUpForm'
import { LoginForm } from '@/src/components/auth/LoginForm'
import { LoginFormData, SignUpFormData } from '@/src/lib/validations/auth'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

 const handleLogin = async (data: LoginFormData) => {
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleSignUp = async (data: SignUpFormData) => {
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setError('Emaili yoxla, təsdiq linki göndərildi!')
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  const handleGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  return (
    <div
      className="hero-bg flex flex-col"
      
    >
      <main className="grow flex items-center justify-center px-4 md:px-10 py-12">
        <div className="max-w-275 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          <div className="hidden md:flex md:col-span-5 flex-col gap-6 pr-8">
            <div className="flex items-center gap-2">
              {/* bura logo ola biler */}
              <span className="text-2xl font-bold tracking-tight" style={{ color: '#cfbcff' }}>
                Devlance
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight" style={{ color: '#e6e0e9' }}>
              {isSignUp ? 'Build faster, together.' : 'Welcome back.'}
            </h1>

            <p className="text-base leading-relaxed max-w-md" style={{ color: '#cbc4d2' }}>
              {isSignUp
                ? 'Join over 10,000+ developers leveraging AI-powered mock interviews to land their dream job.'
                : 'Continue your AI-powered interview preparation and track your progress.'}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-[rgba(29,27,32,0.6)] border border-[rgba(255,255,255,0.08)]">
                <div className="text-xs font-medium uppercase tracking-wider mb-1 text-[#948e9c]">Speed</div>
                <div className="text-2xl font-bold text-[#e6e0e9]">10x</div>
              </div>
              <div className="p-4 rounded-xl bg-[rgba(29,27,32,0.6)] border border-[rgba(255,255,255,0.08)]">
                <div className="text-xs font-medium uppercase tracking-wider mb-1 text-[#948e9c]">Community</div>
                <div className="text-2xl font-bold text-[#e6e0e9]">10k+</div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                    {[
                      { bg: 'bg-[#6750a4]', letter: 'A' },
                      { bg: 'bg-[#cfbcff]', letter: 'B' },
                      { bg: 'bg-[#4d4465]', letter: 'C' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full ring-2 ring-bg-primary flex items-center justify-center text-xs font-bold text-[#e6e0e9] ${item.bg}`}
                      >
                        {item.letter}
                      </div>
                    ))}
                </div>
              <span className="text-xs text-[#cbc4d2]">Used by top engineers worldwide</span>
            </div>
          </div>
{/* sag */}
          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <div
              className="p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden bg-[rgba(29,27,32,0.6)] backdrop-blur-lg border border-[rgba(255,255,255,0.08)]"            >
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none bg-[rgba(207,188,255,0.08)] blur-[60px]" />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Mobile logo */}
                {/* <div className="flex md:hidden items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: '#cfbcff' }}>Devlance</span>
                </div> */}

                <div className="mb-2">
                  <h2 className="text-3xl font-semibold tracking-tight text-[#e6e0e9]">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </h2>
                  <p className="text-sm mt-1 text-[#cbc4d2]">
                    {isSignUp ? 'Start your journey with Devlance AI today.' : 'Welcome back! Please enter your details.'}
                  </p>
                </div>

                {error && (
                  <p className="text-sm p-3 rounded-lg bg-[rgba(255,180,171,0.1)] text-[#ffb4ab]">{error}</p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGitHub}
                    className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all bg-[#2b292f] border border-[rgba(148,142,156,0.3)] text-[#e6e0e9]"
                    onMouseEnter={e => (e.currentTarget.style.background = '#3b383e')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#2b292f')}
                  >
                    <GithubIcon/>
                    GitHub
                  </button>
                  <button
                    onClick={handleGoogle}
                    className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all bg-[#2b292f] border border-[rgba(148,142,156,0.3)] text-[#e6e0e9]"
                    onMouseEnter={e => (e.currentTarget.style.background = '#3b383e')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#2b292f')}
                  >
                    <GoogleIcon />
                    Google
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-[rgba(73,69,81,0.4)]" />
                  <span className="text-xs font-medium tracking-wider text-[#948e9c]">
                    OR CONTINUE WITH EMAIL
                  </span>
                  <div className="flex-1 h-px bg-[rgba(73,69,81,0.4)]" />
                </div>

                {isSignUp ? (
                  <SignUpForm onSubmit={handleSignUp} loading={loading} />
                ) : (
                  <LoginForm onSubmit={handleLogin} loading={loading} />
                )}

                <div className="pt-4 mt-2 text-center border-t border-t-[rgba(73,69,81,0.2)]">
                  <p className="text-sm text-[#cbc4d2]">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      onClick={() => { setIsSignUp(!isSignUp); setError('') }}
                      className="font-bold hover:underline ml-1 text-[#cfbcff]"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}