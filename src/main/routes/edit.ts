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

  app.post('/edit/:id', async (req, res) => {
    try {
      await axios.put(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK_BY_ID(req.params.id)}`, req.body);
      
      if (req.is('application/json')) {
        console.log('was a success');
        res.json({ success: true });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.error('Error updating task:', error.response?.data);
      
      if (req.is('application/json')) {
        let errorMessage = 'Failed to update task';
        let allErrors: any = {};
        
        if (error.response && error.response.data) {
          const apiError = error.response.data;
          
          if (apiError.message) {
            errorMessage = apiError.message;
          }
          
          if (apiError.errors) {
            allErrors = apiError.errors;
          }
        }
        
        res.status(422).json({ 
          success: false, 
          error: errorMessage,
          allErrors: allErrors
        });
      } else {
        let errorMessage = 'Failed to update task';
        let allErrors: any[] = [];
        
        if (error.response && error.response.data) {
          const apiError = error.response.data;
          
          if (apiError.message) {
            errorMessage = apiError.message;
          }
          
          if (apiError.errors) {
            allErrors = apiError.errors;
          }
        }
        
        console.log('errors', allErrors);
        res.render('edit', { 
          example: { ...req.body, id: req.params.id },
          error: errorMessage,
          allErrors: allErrors
        });
      }
    }
  });
}
