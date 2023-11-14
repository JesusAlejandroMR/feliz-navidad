import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/Identify.css';

function Identify({ onButtonClick }) {
  // Estado para almacenar la cédula ingresada
  const [cedula, setCedula] = useState('');

  const handleCedulaChange = (event) => {
    // Actualizar el estado de la cédula cuando cambia el valor del input
    setCedula(event.target.value);
  };

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

  const handleClick = () => {
    if (cedula === '') {
      showToast('warning', 'Necesita ingresar su cédula');
    } else {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: { "Accept": "application/json" },
      };
      //fetch(`http://localhost:8006/api/Empleado/EmpleadosVotacion/DISPONIBILIDAD-EMPLEADO/${cedula}`, requestOptions)
      fetch(`http://192.168.0.31:8006/api/Empleado/EmpleadosVotacion/DISPONIBILIDAD-EMPLEADO/${cedula}`, requestOptions)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            showToast('success', 'Ok');
            onButtonClick(data);
          } else {
            showToast('warning', 'Colaborador no encontrado');
          }
        })
        .catch((error) => {
          Swal.fire('Error en la solicitud!', error.message, 'error');
        });
    }
  };

  return (
    <div className="principal-div">
      <div className="identify-box">
        <label>Ingreso al sistema</label>
        <input
          type="number"
          id="txtCedula"
          className="form-control"
          placeholder="Ingrese su cédula"
          value={cedula}
          onChange={handleCedulaChange}
          pattern="[0-9]*"
        />
        <button className="btn btn-primary" onClick={handleClick} id="btnIngreso">
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default Identify;
