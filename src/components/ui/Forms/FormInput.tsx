import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: ReactNode
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-[#cbc4d2]">{label}</label>
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#948e9c]">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full py-3 ${icon ? 'pl-10' : 'pl-4'} pr-4 rounded-lg text-sm outline-none transition-all bg-[#1d1b20] border text-[#e6e0e9] focus:border-[#cfbcff] ${
              error ? 'border-[#ffb4ab]' : 'border-[rgba(73,69,81,0.4)]'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-[#ffb4ab] mt-1">{error}</p>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'