import React, { useState } from 'react';
import axios from 'axios';
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
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/api/Empleado/EmpleadosVotacion/DISPONIBILIDAD-EMPLEADO/${cedula}`,
                headers: {},
            };

            axios
                .request(config)
                .then((response) => {
                    let resp = response.data; 
                    if(resp.length > 0){
                    showToast('success', 'Ok');
                    onButtonClick(response.data);
                    }else{
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
            <div className='identify-box'>
                <label>Ingreso al sistema</label>
                <input
                    type="number"
                    id="txtCedula"
                    className="form-control"
                    placeholder="Ingrese su cedula"
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
