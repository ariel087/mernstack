export const getAll = async () => {
  try {
    const response = await fetch('https://mernstack-1-wsna.onrender.com', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const text = await response.text();  // Get the raw response text
    console.log(text);  // Log the raw response to inspect what is being returned

    // If the response is valid JSON, you can parse it
    const data = JSON.parse(text);  // or response.json() if it looks like JSON
    return data;
  } catch (error) {
    console.error('Error in getAll:', error);
  }
};
