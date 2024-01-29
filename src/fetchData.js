export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error fetchData.js: ${response.status} - ${data.message}`
      );
    }

    return data;
  } catch (error) {
    console.error("Error in the request", error.message);
    throw error;
  }
};
