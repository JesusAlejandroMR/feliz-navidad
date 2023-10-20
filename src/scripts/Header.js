import React from 'react';
import '../styles/Header.css';
import logo from '../img/arbolnavidad.png';

function Header(props) {
  const datosUsuario = props.usuario;
  let mensaje = '';  
  if(datosUsuario.length > 0){
    mensaje =`Bienvenid@ ${datosUsuario[0].NOMBRES}`;
    {/*mensaje =`Bienvenido ${datosUsuario[0].NOMBRES}`;*/}
  }else{
    mensaje = 'Portal de votaciones navideñas';
    {/*mensaje = 'Título genérico 1';*/}
  }

  return (
    <div className="title-div">

      <img src={logo} className="App-logo" alt="logo" />
      <label className='principal'>{mensaje}</label>
      <img src={logo} className="App-logo" alt="logo" />

    </div>
  );
}

export default Header;
