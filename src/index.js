import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import Header from './scripts/Header';
import ListUser from './scripts/ListUser';
import Identify from './scripts/Identify';
import MessagePage from './scripts/MessagePage';
import reportWebVitals from './reportWebVitals';
import { DataContextProvider } from './context/dataContext';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

const App = () => {
  const [cedula, setCedula] = useState('');
  const [usuario, setUsuario] = useState([]);

  console.log(cedula);
  console.log(usuario);

  const handleButtonClick = (cedulaValue) => {
    setCedula(cedulaValue);
    setUsuario(cedulaValue);
  };

  {/*useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      const confirmationMessage = '¿Seguro que deseas recargar la página?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  */}

  return (
    <React.StrictMode>
      <div className='principal-content'>
        <DataContextProvider>
          <div className='header'>
            <Header usuario={usuario} />
          </div>
          <div className='body'>
          {cedula.length > 0 ? (
            cedula[0].Estado == true ? (
              <ListUser usuario={usuario} />
            ) : (
              <MessagePage usuario={usuario} />
            )
          ) : (
            <Identify onButtonClick={handleButtonClick} />
          )}
          </div>
        </DataContextProvider>
      </div>
    </React.StrictMode>
  );
};

reactRoot.render(<App />);

reportWebVitals();
