import { Application } from 'express';
import axios from 'axios';
import { API_CONFIG } from '../config/api';

export default function (app: Application): void {
  app.post('/delete/:id', async (req, res) => {
    try {
      await axios.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}/${req.params.id}`);
      res.redirect('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      res.redirect('/?error=delete_failed');
    }
  });
}