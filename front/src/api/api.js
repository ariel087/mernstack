export const getAll = async () => {
  try {
    // Make the GET request
    const response = await fetch('https://mernstack-1-wsna.onrender.com', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get the raw response text (before parsing as JSON)
    const responseText = await response.text();

    // Check if the response is in JSON format
    try {
      const data = JSON.parse(responseText);  // Try parsing the response as JSON
      return data;
    } catch (e) {
      console.error("Received non-JSON response:", responseText);  // Log the raw response if it's not JSON
      throw new Error("Response is not valid JSON");
    }
  } catch (error) {
    console.error('Error in getAll:', error);  // Log the error
  }
};
