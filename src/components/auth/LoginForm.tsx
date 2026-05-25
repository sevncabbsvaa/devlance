'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/src/lib/validations/auth'
import { FormInput } from '../../components/ui/Forms/FormInput'
import EmailIcon from '../ui/Icons/EmailIcon'
import PasswordIcon from '../ui/Icons/PasswordIcon'

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
  loading: boolean
}

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', 
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <FormInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        icon={<EmailIcon className="mt-2" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <FormInput
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<PasswordIcon/>}
        error={errors.password?.message}
        {...register('password')}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg font-semibold text-base transition-all disabled:opacity-50 mt-1 bg-linear-to-br from-[#6750a4] to-[#cfbcff] text-[#22005d]"
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(207,188,255,0.4)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(207,188,255,0)')}
      >
        {loading ? 'Gözlə...' : 'Sign In'}
      </button>
    </form>
  )
}