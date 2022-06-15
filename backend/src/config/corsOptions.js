import { allowedOrigins } from './allowedOrigins.js'

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Origin not allowed'))
    }
  },
  optionsSuccessStatus: 200
}

export default corsOption
