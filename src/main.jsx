import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';
import { HashRouter as Router } from 'react-router-dom';
import base from '../base.js';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router basename={base}>
      <App />
    </Router>
  </Provider>,
);
