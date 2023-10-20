import React from 'react';
import '../styles/GridUser.css';
import avatar from '../img/batman.png';

function GridUser(props) {
    const datos = props.ListadoUsuarios;
    return (
        <div className="grid-container">
            <div className="grid">
                {datos.length > 0 &&
                    datos.map((usuario, index) => (
                        <div key={index} className="grid-item">
                            <img src={avatar} className="avatar"/>
                            <p>{usuario.Nombre}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default GridUser;
