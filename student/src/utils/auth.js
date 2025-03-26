// src/utils/auth.js

export const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect to the homepage and replace the current history entry
    window.location.replace('/');  // Replaces the current page in the history stack, preventing the user from going back
  };
  
  export const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to the homepage if there's no token and replace the current history entry
      window.location.replace('/');  // This ensures the user is redirected and can't go back to the protected page
    }
  };
  