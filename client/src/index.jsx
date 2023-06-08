import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './components/App';

// ReactDOM.createRoot(document.getElementById)('root')).render(<App />);
// Above is for the first way on line 2
createRoot(document.getElementById('root')).render(
  <App />,
); // for the method on line 4
