
/**
 * MAIN APPLICATION ENTRY POINT
 * =============================
 * 
 * This is the starting point of our Form Builder application.
 * Think of this as the ignition key that starts the entire application.
 * 
 * What happens here:
 * 1. We find the HTML element where our app will live (the "root" div)
 * 2. We create a React application root
 * 3. We start the entire Form Builder application
 * 
 * React.StrictMode helps us catch potential problems during development
 * by running some checks twice to ensure our code is solid.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Find the HTML element where our entire application will be displayed
// This element has id="root" and exists in the index.html file
const container = document.getElementById("root");

// Safety check: Make sure the root element exists
// If it doesn't exist, stop everything and show an error
if (!container) {
  throw new Error("Root element not found - the application cannot start without a place to display");
}

// Create the React application root and start the Form Builder application
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
