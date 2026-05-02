
const config = {
  // Use the local backend URL for development
  // In production, this should be replaced with your deployed backend URL (e.g., https://your-app.herokuapp.com/api)
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  
  // Base URL for the invitation links
  BASE_URL: window.location.origin + window.location.pathname
};

export default config;
