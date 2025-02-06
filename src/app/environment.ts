if(!process.env.SALABLE_API_KEY) throw new Error('Missing env SALABLE_API_KEY')

export const salableApiKey = process.env.SALABLE_API_KEY
