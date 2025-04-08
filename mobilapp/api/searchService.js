import axios from 'axios';

const API_URL = 'http://localhost:3000/telephones'; // Backend URL-je

export const searchService = {
  async search(searchText) {
    try {
      if (!searchText || searchText.length < 2) {
        return [];
      }
      
      // A search paramétert használjuk a query helyett
      const response = await axios.get(`${API_URL}/kereses`, {
        params: { search: searchText },
      });
      
      return response.data;
    } catch (error) {
      console.error('Keresési hiba:', error);
      throw error;
    }
  }
};