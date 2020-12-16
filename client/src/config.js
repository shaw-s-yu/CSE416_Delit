export const API_URL = 
process.env.NODE_ENV === 'production'
    ? 'https://delit.shaw-yu.com'
    : 'http://localhost:5000'