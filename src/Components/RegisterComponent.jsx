import { useState } from 'react';
import { registerUser } from '../FireBaseConfig/authService';
// import { db } from '../FireBaseConfig/FireBaseConfig';
// import { doc, setDoc } from 'firebase/firestore';
// import { Auth } from '../FireBaseConfig/Authentication';
import { writeUserData } from '../FireBaseConfig/DataBaseUsers';
import {getAuth, updateProfile } from 'firebase/auth';
import '../../public/css/Register.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';// Asegúrate de que el archivo de estilo esté disponible o ajusta según corresponda.

function Register() {

  // if (Auth) {
  //   window.location.replace("/");
  // }

  const MySwal = withReactContent(Swal)


  const err1 = "FirebaseError: Firebase: Error (auth/email-already-in-use)."
  const err2 = "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."
  
  const [userFirstName, setUserFirstName] = useState('Nuevo');
  const [userLastName, setUserLastName] = useState('Invitado');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRegistrationDate, setUserRegistrationDate] = useState(new Date());
  const [lastLogin, setLastLogin] = useState(new Date());
  const [userRole, setUserRole] = useState('cliente');
  const [userAccountStatus, setUserAccountStatus] = useState('activo');
  const [profileImageUrl, setProfileImageUrl] = useState('https://firebasestorage.googleapis.com/v0/b/personalizados-api.appspot.com/o/UsersPhotos%2FDefault%20Avatar.jpg?alt=media&token=a6480b3f-f680-4a35-a8b5-37a0fe04687f');
  // const [firebaseUID, setFirebaseUID] = useState('');
  

  const isFormValid = userName && userEmail && userPassword;

  const handleUsernameChange = (e) => setUserName(e.target.value);
  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handlePasswordChange = (e) => setUserPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Registrar el usuario en Firebase Auth
      const userCredential = await registerUser(userEmail, userPassword);
      const user = userCredential.user;
      const firebaseUID = user.uid;
      // setFirebaseUID(user.uid)
      console.log(firebaseUID, "Hello" ,user.uid)

      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: `${userName}`,
        photoURL: `${profileImageUrl}`})



      const data = {
    userFirstName: userFirstName,
    userLastName: userLastName,
    userName: userName,
    userPassword: userPassword,
    userEmail: userEmail,
    phoneNumber: phoneNumber,
    userRegistrationDate: userRegistrationDate,
    lastLogin: lastLogin,
    userRole: userRole,
    userAccountStatus: userAccountStatus,
    profileImageUrl: profileImageUrl,
    firebaseUID: firebaseUID,
  }

  writeUserData(userFirstName, userLastName, userName, userPassword, userEmail, phoneNumber, userRegistrationDate, lastLogin, userRole, userAccountStatus, profileImageUrl, firebaseUID)

      window.location.replace("/");


      // 2. Guardar el username y otros datos en Firestore
      // await setDoc(doc(db, 'users', user.uid), {
      //   uid: user.uid,
      //   userName: username,
      //   userEmail: user.email,
      //   createdAt: new Date(), // Puedes agregar más campos aquí
      // });
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/users/add`, {
          method: 'POST', // Especificar el método POST
          headers: {
            'Content-Type': 'application/json', // Especificar el tipo de contenido
          },
          body: JSON.stringify(data), // Convertir los datos a formato JSON
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar el post');
        }
  
        const responseData  = await response.json(); // Obtener la respuesta en formato JSON
        console.log('Post creado:', responseData );
        // Puedes actualizar el estado o mostrar un mensaje de éxito aquí
      } catch (error) {
        console.error('Error:', error);
      }



    } catch (err) {
      if(err == err1){
        MySwal.fire("Ha ocurrido un problema", "Correo electronico en uso.", "error");
      }else if(err == err2){
        MySwal.fire("Ha ocurrido un problema", "La contraseña debe tener al menos 6 caracteres.", "error");
      }
      else{
        MySwal.fire({
          title: "Ha ocurrido un problema",
          text: `${err}`,
          icon: "error"
        });
        console.log(err)
      }
      
    }
  };

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={handleSubmit}>
        <ul className="login-nav">
          <li className="login-nav__item active">
            <a href="#">Sign Up</a>
          </li>
        </ul>

        <label htmlFor="login-input-user" className="login__label">Username</label>
        <input 
          id="login-input-user" 
          className="login__input" 
          type="text" 
          value={userName} 
          onChange={handleUsernameChange} 
        />

        <label htmlFor="login-input-email" className="login__label">Email</label>
        <input 
          id="login-input-email" 
          className="login__input" 
          type="email" 
          value={userEmail} 
          onChange={handleEmailChange} 
        />

        <label htmlFor="login-input-password" className="login__label">Password</label>
        <input 
          id="login-input-password" 
          className="login__input" 
          type="password" 
          value={userPassword} 
          onChange={handlePasswordChange} 
        />

        <button className="login__submit" type="submit" disabled={!isFormValid}>Sign Up</button>

      </form>
    </div>
  );
}

export default Register;
