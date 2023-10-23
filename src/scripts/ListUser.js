import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import GridUser from './GridUser'; // Ajusté la ruta al archivo GridUser
import '../styles/ListUser.css';

function ListUser(props) {
  const datosUsuario = props.usuario;
  const [content, setContent] = useState(null);

  // Equivalente a onLoad
  useEffect(() => {
    loadData();
  }, []);

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
      },
    });

    Toast.fire({
      icon: icon,
      title: title,
    });
  };

  const loadData = () => {
    if (datosUsuario.length === 0) {
      showToast('warning', 'Necesita identificarse primero');
    } else {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/Empleado/EmpleadosVotacion/EMPLEADOS-HABILITADOS-NOMINACION/A`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          let resp = response.data;
          if (resp.length > 0) {            
            setContent(<GridUser ListadoUsuarios={resp} />);
          } else {
            showToast('warning', 'Sin datos para mostrar');
          }
        })
        .catch((error) => {
          Swal.fire('Error en la solicitud!', error.message, 'error');
        });
    }
  }
  
  return (
    <div className="Principal-div">
      {content}
    </div>
  );
}

export default ListUser;
