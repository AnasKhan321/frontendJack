import axios from 'axios';

const API_URL = 'https://djay9v8s5uugf.cloudfront.net';


interface response {
  data : string
}
export const sendMessage = async (message: string): Promise<response> => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { prompt : message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};