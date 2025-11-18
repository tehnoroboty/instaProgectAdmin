import { ERROR_MESSAGES } from '@/src/shared/lib/constants/error-messages'
import { EMAIL_REGEX } from '@/src/shared/lib/constants/regex'
import { z } from 'zod'

export const schema = z.object({
  email: z
    .string()
    .nonempty(ERROR_MESSAGES.EMAIL.REQUIRED)
    .min(1, ERROR_MESSAGES.EMAIL.REQUIRED)
    .email(ERROR_MESSAGES.EMAIL.INVALID)
    .trim()
    .regex(EMAIL_REGEX, ERROR_MESSAGES.EMAIL.FORMAT),

  password: z
    .string()
    .nonempty(ERROR_MESSAGES.PASSWORD.REQUIRED)
    .min(3, ERROR_MESSAGES.PASSWORD.MIN)
    .max(20, ERROR_MESSAGES.PASSWORD.MAX)
    .trim(),
})

export type FormType = z.infer<typeof schema>
