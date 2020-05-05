export const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://delit.herokuapp.com'
    // ? 'http://localhost:5000'
    : 'http://localhost:5000'