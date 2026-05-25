import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email tələb olunur').email('Düzgün email daxil edin'),
  password: z.string().min(6, 'Şifrə minimum 6 simvol olmalıdır'),
})

export const signUpSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Ad minimum 2 simvol olmalıdır'),
  terms: z.literal(true, {
    message: 'Şərtləri qəbul etməlisiniz',
  }),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>