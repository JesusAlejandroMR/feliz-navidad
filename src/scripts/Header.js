import '../styles/Header.css';
import logo from '../img/arbolnavidad.png';

function Header() {
  return (
    <div className="Principal-div">              
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Los más buscados</h1>       
    </div>
  );
}

export default Header;