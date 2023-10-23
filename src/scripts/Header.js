import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import logo from '../img/arbolnavidad.png';
import axios from 'axios';
import Swal from 'sweetalert2';

function Header(props) {
  const datosUsuario = props.usuario;
  let mensaje = '';
  const [seleccionados, setSeleccionados] = useState([]); // Utilizar el estado local

  // Función reutilizable para mostrar notificaciones tipo "toast"
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
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `/api/Empleado/EmpleadosVotacion/CATEGORIAS-NOMINACION/A`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        let resp = response.data;
        if (resp.length > 0) {
          setSeleccionados(resp);
        } else {
          showToast('warning', 'Sin datos para mostrar');
        }
      })
      .catch((error) => {
        Swal.fire('Error en la solicitud!', error.message, 'error');
      });
  }


  if (datosUsuario.length > 0) {
    {/*mensaje =`Bienvenid@ ${datosUsuario[0].NOMBRES}`;*/ }
    mensaje = `Bienvenido ${datosUsuario[0].NOMBRES}`;
    loadCategories();
  } else {
    {/*mensaje = 'Portal de votaciones';*/ }
    mensaje = 'Título genérico 1';
  }

  return (
    <div className="title-div">
      {/*<img src={logo} className="App-logo" alt="logo" />*/}
      <label className='principal'>{mensaje}</label>
      {/*<img src={logo}  className="App-logo" alt="logo" />*/}

      <div className="grid-cat">
        {seleccionados.length > 0 &&
          seleccionados.map((categorias, index) => (            
            <label className='lblCat' id={`lbl${index}`}>{categorias.Descripcion}</label>
          ))}
      </div>
    </div>

  );
}

export default Header;
