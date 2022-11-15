const { PORT } = process.env

export const configuration = () => ({
  port: parseInt(PORT, 10) || 3000
})
