import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from '../src/scripts/Header';
import ListUser from '../src/scripts/ListUser';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div className='principal-content'>
      <Header />
      <ListUser />
      <button className="btn btn-primary">Botón de Bootstrap</button>
    </div>
  </React.StrictMode>
);

reportWebVitals();

