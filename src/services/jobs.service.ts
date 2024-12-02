import axios from 'axios';

const JOBS_API_URL = process.env.REACT_APP_JOBS_API_URL;

export const jobsService = {
  getPositions: async (): Promise<string[]> => {
    const response = await axios.get(`${JOBS_API_URL}`);
    return response.data.positions;
  }
};