import { Application } from 'express';
import axios from 'axios';
import { API_CONFIG } from '../config/api';

export default function (app: Application): void {
  // GET record to prefill fields
  app.get('/edit/:id', async (req, res) => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK_BY_ID(req.params.id)}`);
      res.render('edit', { example: response.data });
    } catch (error) {
      console.error('Error fetching task:', error);
      res.redirect('/');
    }
  });

  // Make request to update record
  app.post('/edit/:id', async (req, res) => {
    try {
      await axios.put(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK_BY_ID(req.params.id)}`, req.body);
      res.redirect('/');
    } catch (error) {
      console.error('Error updating task:', error);
      res.render('edit', { 
        example: { ...req.body, id: req.params.id },
        error: 'Failed to update task'
      });
    }
  });
}
