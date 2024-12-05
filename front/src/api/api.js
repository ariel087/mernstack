// api.js
export const getAll = async () => {
    try {
      const response = await fetch('https://mernstack-50m1.onrender.com/record/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getAll:', error);
    }
  };
  
