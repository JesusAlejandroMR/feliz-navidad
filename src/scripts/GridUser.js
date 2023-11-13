import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import '../styles/GridUser.css';
import avatar from '../img/superman.png';
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

    //Manejo delk checkbox
    const [checkboxValues, setCheckboxValues] = useState(Array(clavesRepetidas.length).fill(false));
    const escogerCandidato = (index, clave, selectedUsuario) => {
        const newCheckboxValues = [...checkboxValues];
        newCheckboxValues[index] = !newCheckboxValues[index];

        // Aquí verificamos si el valor ha cambiado antes de actualizar el estado
        if (newCheckboxValues[index] !== checkboxValues[index]) {
            setCheckboxValues(newCheckboxValues);
            console.log(`Checkbox marcado para clave: ${clave.Descripcion} y usuario: ${selectedUsuario.Nombre}`);
            const updatedContextData = contextData.map(item => {
                if (item.Codigo === clave.Codigo) {
                    return {
                        ...item,
                        Votos: 1,
                        Usuario: selectedUsuario.Nombre,
                        idUsuario: selectedUsuario.idUsuario,
                    };
                }
                return item;
            });
            setContextData(updatedContextData);
        }
    };

    return (
        <div className="grid-container">
            <div className="grid">
                {datos.length > 0 &&
                    datos.map((usuario, index) => (
                        <div key={index} className="grid-item" onClick={() => openModal(usuario)}>
                            {/*<img src={avatar} className="avatar" alt={usuario.Nombre} />*/}
                            <img src={usuario.urlFoto} className="avatar" />
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
                            <div className='ListCategorias' key={`div${index}`}>
                                <p>
                                    <input
                                        key={index}
                                        id={`chb${index}`}
                                        type='checkbox'
                                        //checked={checkboxValues[index]}
                                        onChange={() => escogerCandidato(index, clave, selectedUsuario)}
                                        value={clave.Descripcion}
                                    />
                                    {clave.Descripcion}
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
