import React, { useContext, useEffect, useState } from 'react';
import '../styles/Header.css';
import logo from '../img/arbolnavidad.png';
import Swal from 'sweetalert2';
import { DataContext } from '../context/dataContext';

function Header(props) {
  const datosUsuario = props.usuario;
  const [mensaje, setMensaje] = useState([]);
  const { contextData, setContextData } = useContext(DataContext);


  const showToast = (icon, title, timer = 2000) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: icon,
      title: title,
    });
  };

  const loadCategories = () => {
    fetch('/api/Empleado/EmpleadosVotacion/CATEGORIAS-NOMINACION/A')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setContextData(data);
        } else {
          showToast('warning', 'Sin datos para mostrar');
        }
      })
      .catch((error) => {
        Swal.fire('Error en la solicitud!', error.message, 'error');
      });
  }

  useEffect(() => {
    if (datosUsuario.length > 0) {
      setMensaje(`Bienvenid@ ${datosUsuario[0].NOMBRES}`);
      loadCategories();
    } else {
      setMensaje('Portal de votaciones');
    }
  }, [datosUsuario]);

  return (
    <div className="title-div">
      {datosUsuario.length === 0 ? (
        <div className="flex">
          <img src={logo} className="App-logo" alt="logo" />
          <label className='principal'>{mensaje}</label>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      ) : (
        <label className='principal'>{mensaje}</label>
      )}
      <div className="grid-cat">
        {contextData.length > 0 && contextData.map((dato, index) => (
          <div className='alertaNominacion' key={index}>
            <label className='lblCat' id={`lbl${index}`}>{dato.Descripcion}</label>
            {dato.Votos === 1 ? <p>{dato.Usuario}</p> : <p>Sin Asignar</p>}
          </div>
        ))}
      </div>
    </div>
  );
} 

export default Header;