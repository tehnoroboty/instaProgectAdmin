export const ERROR_MESSAGES = {
  EMAIL: {
    FORMAT: 'The email must match the format example@example.com',
    INVALID: 'Invalid email address',
    REQUIRED: 'Email is required',
  },
  PASSWORD: {
    CONFIRM: 'Confirm your password',
    FORMAT: 'The password must contain at least 3 character.',
    MAX: 'Max 20 characters long',
    MIN: 'Min 6 characters long',
    MISMATCH: 'Passwords do not match',
    REQUIRED: 'Enter password',
  },
} as const
