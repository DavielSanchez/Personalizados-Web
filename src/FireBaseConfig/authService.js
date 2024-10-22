import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updateEmail, updatePhoneNumber } from 'firebase/auth';
import { auth } from './FireBaseConfig';

import { useState } from 'react';

// Registrar usuario
export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Iniciar sesión
export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Cerrar sesión
export const logoutUser = () => {
    return signOut(auth);
};

export const saveUserIdToStorage = (uid) => {
    localStorage.setItem('userUID', uid);
};

export const getUserIdFromStorage = () => {
    return localStorage.getItem('userUID');
};

export const userUpdate = (newFirstName, newLastName, newEmail, newPhone, imagePreview) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const UID = user.uid
    const url = `http://localhost:3000/user/uid/${UID}`;
    const [userData, setUserData] = useState()

    const [userFirstName, setNewFirstName] = useState('');
    const [userLastName, setNewLastName] = useState('');
    const [userName, setNewUserName] = useState('');
    const [userEmail, setNewUserEmail] = useState('');
    const [userPassword, setNewUserPassword] = useState('');
    const [phoneNumber, setNewPhoneNumber] = useState('');
    const [userRegistrationDate, setNewUserRegistrationDate] = useState('');
    const [lastLogin, setNewLastLogin] = useState('');
    const [userRole, setNewUserRole] = useState('');
    const [userAccountStatus, setNewUserAccountStatus] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [firebaseUID, setNewFirebaseUID] = useState('');

    if (user) {


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        updateProfile(user, {
            displayName: `${newFirstName} ${newLastName}`,
            photoURL: `${imagePreview}`
        }).then(() => {
            console.log("Perfil actualizado exitosamente");
        }).catch((error) => {
            console.error("Error al actualizar el perfil:", error);
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const fetchData = async() => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setUserData(result);
                setNewFirstName(result[0].userFirstName);
                setNewLastName(result[0].userLastName);
                setNewUserName(result[0].userName)
                setNewUserEmail(result[0].userEmail)
                setNewUserPassword(result[0].userPassword)
                setNewPhoneNumber(result[0].phoneNumber)
                setNewUserRegistrationDate(result[0].userRegistrationDate)
                setNewLastLogin(result[0].lastLogin)
                setNewUserRole(result[0].userRole)
                setNewUserAccountStatus(result[0].userAccountStatus)
                setProfileImageUrl(result[0].profileImageUrl)
                setNewFirebaseUID(result[0].firebaseUID)

            } catch (error) {
                console.error(error);
            }
        };

    }
}