# HMCTS Dev Test Frontend
This will be the frontend for the brand new HMCTS case management system. As a potential candidate we are leaving
this in your hands. Please refer to the brief for the complete list of tasks! Complete as much as you can and be
as creative as you want.

To begin with, you should be able to run this by running:
1) `yarn install`
2) `yarn webpack`
3) `yarn start:dev` or navigate to package.json and run the script manually

You can change the structure however you like! 

## Recent Enhancements

### API Configuration
- Added centralized API configuration in `src/main/config/api.ts`
- Configurable base URL and endpoints for tasks management
- Environment variable support for API base URL

### Error Handling & Validation
- Added support for displaying multiple validation errors
- Enhanced user experience with detailed error messages and field highlighting

### Add Case Functionality
- Added form to include record on DB
- Real-time validation error display
- Field-specific error styling and focus management

### Edit Case Functionality  
- AJAX form submission with validation error display
- Proper error extraction and display from API responses
- Added GET request for pre-filling forms

### Frontend Features
- Dynamic error summary generation
- Responsive error display

The application now provides a robust user experience with comprehensive error handling and validation feedback. 
