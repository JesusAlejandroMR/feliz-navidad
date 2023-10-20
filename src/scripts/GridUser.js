import React, { useState } from 'react';
import Modal from 'react-modal'; // Importa la biblioteca 'react-modal'
import '../styles/GridUser.css';
import avatar from '../img/batman.png';
import Swal from 'sweetalert2';

function GridUser(props) {
    const datos = props.ListadoUsuarios;

    // Estado para controlar si el modal está abierto o cerrado
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    const openModal = (usuario) => {
        setSelectedUsuario(usuario);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="grid-container">
            <div className="grid">
                {datos.length > 0 &&
                    datos.map((usuario, index) => (
                        <div key={index} className="grid-item" onClick={() => openModal(usuario)}>
                            <img src={avatar} className="avatar" alt={usuario.Nombre}/>
                            <p>{usuario.Nombre}</p>
                            <p className='lblLinea'>{usuario.Linea}</p>                            
                        </div>
                    ))}
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Usuario Modal"
            >
                <center><h2>Categorías disponiles</h2></center>
                {selectedUsuario && (
                    <div>
                        <p>Nombre: {selectedUsuario.Nombre}</p>
                        <p>Línea: {selectedUsuario.Linea}</p>
                        {/*insertar las categor'ias ac'a*/}
                    </div>
                )}
                <button onClick={closeModal}>Cerrar</button>
            </Modal>
        </div>
    );
}

export default GridUser;
