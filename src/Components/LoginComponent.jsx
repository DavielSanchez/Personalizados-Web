import { useState } from 'react';
import { loginUser } from '../FireBaseConfig/authService';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import '../../public/css/Register.css'; // Asegúrate de que el archivo de estilo esté disponible o ajusta según corresponda.

function LogIn() {

  const MySwal = withReactContent(Swal)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email && password;

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await loginUser(email, password);
        window.location.replace("/shop");
      } catch (err) {
        MySwal.fire({
          title: "Intentalo nuevamente",
          text: "Contraseña o Email incorrectos",
          icon: "error"
        });

      }
    
  };

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={handleSubmit}>
        <ul className="login-nav">
          <li className="login-nav__item active">
            <a href="#">Sign in</a>
          </li>
        </ul>

        <label htmlFor="login-input-user" className="login__label">Email</label>
        <input 
          id="login-input-user" 
          className="login__input" 
          type="text" 
          value={email} 
          onChange={handleEmailChange} 
        />

        <label htmlFor="login-input-password" className="login__label">Password</label>
        <input 
          id="login-input-password" 
          className="login__input" 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
        />

        <button className="login__submit" type="submit" disabled={!isFormValid}>Sign in</button>
        <a href="/register" className="login__forgot">Aun no tienes cuenta?</a>
      </form>
    </div>
  );
}

export default LogIn;