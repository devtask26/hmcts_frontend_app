import { Application } from 'express';
import axios from 'axios';
import { API_CONFIG } from '../config/api'

export default function (app: Application): void {
  app.get('/', async (req, res) => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}`);
      if (Array.isArray(response.data)) {
        res.render('home', { "examples": response.data});
      } else {
        console.log('No data found')
      }
    } catch (error) {
      console.error('Error making request:', error);
      res.render('home', {});
    }
  });
}
