import React, { useContext, useEffect, useState } from 'react';
import '../styles/Header.css';
import logo from '../img/arbolnavidad.png';
import logoEnvio from '../img/enviar.png';
import Swal from 'sweetalert2';
import { DataContext } from '../context/dataContext';

function Header(props) {
  const datosUsuario = props.usuario;
  const [mensaje, setMensaje] = useState([]);
  const { contextData, setContextData } = useContext(DataContext);
  const [isSaving, setIsSaving] = useState(false);

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
    fetch('http://192.168.0.31:8006/api/Empleado/EmpleadosVotacion/CATEGORIAS-NOMINACION/A')
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

  const saveToDatabase = () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    const transformedData = contextData.map(item => {
      return {
        idEmpleado: item.idUsuario,
        idCategoria: item.Codigo/* Aquí proporciona el valor correcto */,
        periodo: "3",
        estado: "A",
        cedulaUsuarioRegistro: datosUsuario[0].CEDULA,
        opcion: "Insert",
      };
    });
    console.log(transformedData);
    if (transformedData.some(item => typeof item.idEmpleado === 'undefined')) {
      showToast('error', 'Categoría sin escoger');
      setIsSaving(false);
      return;
    }

    fetch('http://192.168.0.31:8006/api/Empleado/RegistrarVotos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData), // Envía los datos a guardar en el cuerpo de la solicitud.
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        showToast('success', 'Datos guardados con éxito');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
          <label className="principal">{mensaje}</label>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      ) : datosUsuario[0] && datosUsuario[0].Estado === true ? (
        <div>
          <label className="principal">{mensaje}</label>
          <img
            src={logoEnvio}
            alt="Enviar"
            className="enviar-button"
            onClick={saveToDatabase}
          />
        </div>
      ) : null}
      {datosUsuario[0] && datosUsuario[0].Estado === true ? (
        <div className="grid-cat">
          {contextData.length > 0 &&
            contextData.map((dato, index) => (
              <div className="alertaNominacion" key={index}>
                <label className="lblCat" id={`lbl${index}`}>
                  {dato.Descripcion}
                </label>
                {dato.Votos === 1 ? <p>{dato.Usuario}</p> : <p>Sin Asignar</p>}
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );


}

export default Header;