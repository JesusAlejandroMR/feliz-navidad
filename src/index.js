import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from '../src/scripts/Header';
import ListUser from '../src/scripts/ListUser';
import Identify from '../src/scripts/Identify';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

let cedula = '';
let usuario = [];

const handleButtonClick = (cedulaValue) => {
  cedula = cedulaValue;
  usuario = cedulaValue;

  reactRoot.render(
    <React.StrictMode>
      <div className='principal-content'>
        <div className='header'>
          <Header usuario={usuario} />
        </div>
        {cedula.length > 0 ? (
          <ListUser usuario={usuario} />
        ) : (
          <Identify onButtonClick={handleButtonClick} />
        )}
      </div>
    </React.StrictMode>
  );
};

reactRoot.render(
  <React.StrictMode>
    <div className='principal-content'>
      <div className='header'>
        <Header usuario={usuario} />
      </div>
      <Identify onButtonClick={handleButtonClick} />
    </div>
  </React.StrictMode>
);

reportWebVitals();
