import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import '../styles/GridUser.css';
import avatar from '../img/batman.png';
import { DataContext } from '../context/dataContext';

Modal.setAppElement('#root');

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
        setSelectedUsuario(null);
        setModalIsOpen(false);
    };

    const modalClass = modalIsOpen ? 'custom-modal modal-opened' : 'custom-modal';
    const overlayClass = modalIsOpen ? 'custom-overlay overlay-opened' : 'custom-overlay';

    const { contextData, setContextData } = useContext(DataContext);

    let parsedData = [];
    if (selectedUsuario !== null) {
        parsedData = JSON.parse(selectedUsuario.Categorias);
    }

    const clavesRepetidas = [];
    contextData.forEach(item1 => {
        if (parsedData.some(item2 => item2.codigo === item1.Codigo)) {
            clavesRepetidas.push(item1);
        }
    });

    return (
        <div className="grid-container">
            <div className="grid">
                {datos.length > 0 &&
                    datos.map((usuario, index) => (
                        <div key={index} className="grid-item" onClick={() => openModal(usuario)}>
                            <img src={avatar} className="avatar" alt={usuario.Nombre} />
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
                className={modalClass}
                overlayClassName={overlayClass}
            >
                <center><h2>Categorías disponibles</h2></center>
                {selectedUsuario && (
                    <div id='bodyModal'>
                        <p>{selectedUsuario.Nombre}</p>
                        {clavesRepetidas.map((clave, index) =>
                            <div className='ListCategorias'>
                                <p>
                                    <input key={index} type='checkbox' /> {clave.Descripcion}
                                </p>
                            </div>)
                        }
                    </div>
                )}
                <button onClick={closeModal}>Cerrar</button>
            </Modal>
        </div>
    );
}

export default GridUser;
