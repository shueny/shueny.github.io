import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);

// Wrap App in a component that handles the loader removal
const AppWithLoaderHandler = () => {
  useEffect(() => {
    // Remove the pre-loader when the React app mounts
    // Use requestAnimationFrame to batch DOM operations and avoid forced reflow
    requestAnimationFrame(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
        // Use requestAnimationFrame for removal to batch with other DOM operations
        requestAnimationFrame(() => {
      setTimeout(() => {
        loader.remove();
      }, 500); // Wait for transition
        });
    }
    });
  }, []);

  return <App />;
};

root.render(
    <AppWithLoaderHandler />
);