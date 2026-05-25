'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpFormData } from '@/src/lib/validations/auth'
import { FormInput } from '../../components/ui/Forms/FormInput'
import FullnameIcon from '../ui/Icons/FullnameIcon'
import EmailIcon from '../ui/Icons/EmailIcon'
import PasswordIcon from '../ui/Icons/PasswordIcon'

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => Promise<void>
  loading: boolean
}

export const SignUpForm = ({ onSubmit, loading }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <FormInput
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon=<FullnameIcon/>
        error={errors.fullName?.message}
        {...register('fullName')}
      />

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

      <div className="flex items-start gap-2 mt-1">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 rounded accent-purple-500 mt-0.5"
          {...register('terms')}
        />
        <label htmlFor="terms" className="text-xs text-[#cbc4d2]">
          I agree to the{' '}
          <a href="#" className="hover:underline text-[#cfbcff]">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="hover:underline text-[#cfbcff]">Privacy Policy</a>
        </label>
      </div>
      {errors.terms && <p className="text-xs text-[#ffb4ab]">{errors.terms.message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg font-semibold text-base transition-all disabled:opacity-50 mt-1 bg-linear-to-br from-[#6750a4] to-[#cfbcff] text-[#22005d]"
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(207,188,255,0.4)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(207,188,255,0)')}
      >
        {loading ? 'Gözlə...' : 'Create Account'}
      </button>
    </form>
  )
}