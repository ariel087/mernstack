export const getAll = async () => {
    try {
      const response = await fetch('https://mernstack-wsna.onrender.com/record/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
@@ -18,4 +18,4 @@ export const getAll = async () => {
      console.error('Error in getAll:', error);
    }
  };
