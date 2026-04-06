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
        console.log('was a success');
        res.json({ success: true });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.error('Error creating task:', error.response?.data);
      
      if (req.is('application/json')) {
        let errorMessage = 'Failed to create task';
        let allErrors: Array<{field: string; message: string}> = [];
        
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
        let errorMessage = 'Failed to create task';
        let allErrors: any[] = [];
        
        if (error.response && error.response.data) {
          const apiError = error.response.data;
          
          if (apiError.message) {
            errorMessage = apiError.message;
          }
          
          if (apiError.errors && Array.isArray(apiError.errors)) {
            allErrors = apiError.errors;
          }
        }
        console.log('errors', allErrors);
        res.render('add', { 
          example: req.body,
          error: errorMessage,
          allErrors: allErrors
        });
      }
    }
  });
}
