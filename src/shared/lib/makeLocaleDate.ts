import { format } from 'date-fns'

export const makeLocaleDate = (date: Date) => format(new Date(date), 'dd.MM.yyyy')
