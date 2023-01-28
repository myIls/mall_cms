let BASE_URL = ''
const BASE_TIMEOUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'produciton') {
  BASE_URL = 'http://152.136.185.210:5000/'
} else {
  BASE_URL = 'http://152.136.185.210:5000/'
  // BASE_URL = 'http://123.207.32.32:8000'
}

export { BASE_URL, BASE_TIMEOUT }
