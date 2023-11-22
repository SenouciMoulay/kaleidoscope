import ms from 'ms'

import { put } from '@vercel/blob'

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? '' : ' ago'
    }`
}

