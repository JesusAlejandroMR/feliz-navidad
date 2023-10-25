import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import GridUser from './GridUser';
import '../styles/ListUser.css';

function ListUser(props) {
  const datosUsuario = props.usuario;
  const [content, setContent] = useState(null);

  //Equivalente a onLoad
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
      fetch(`/api/Empleado/EmpleadosVotacion/EMPLEADOS-HABILITADOS-NOMINACION/A`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            setContent(<GridUser ListadoUsuarios={data} />);
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