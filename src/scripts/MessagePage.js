import React, { useState } from 'react';
import '../styles/MessagePage.css';
import vigilante from '../img/te-observo.png';

function MessagePage() {

  const [cedula, setCedula] = useState('');

  return (
    <div className="error-div">
      <p className='msjError'>Usuario ya registró sus candidatos por esta elección</p>
      <img src={vigilante} className="vigilante" />
    </div>
  );
}

export default MessagePage;
