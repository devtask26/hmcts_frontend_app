import { Application } from 'express';
import axios from 'axios';
import { API_CONFIG } from '../config/api';

export default function (app: Application): void {
  app.get('/add', (req, res) => {
    res.render('add', { example: {} });
  });

  app.post('/add', async (req, res) => {
    try {
      let data = req.body;
      
      if (req.is('application/json')) {
        data = req.body;
      } else {
        data.user_id = 1;
      }
      
      await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}`, data);
      
      if (req.is('application/json')) {
        res.json({ success: true });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      
      if (req.is('application/json')) {
        res.status(500).json({ 
          success: false, 
          error: 'Failed to create task' 
        });
      } else {
        res.render('add', { 
          example: req.body,
          error: 'Failed to create task'
        });
      }
    }
  });
}
