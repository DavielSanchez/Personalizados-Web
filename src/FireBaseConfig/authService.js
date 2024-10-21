import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updateEmail, updatePhoneNumber } from 'firebase/auth';
import { auth } from './FireBaseConfig';

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

export const userUpdate = (newFirstName, newLastName, newEmail, newPhone) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        updateProfile(user, {
            displayName: `${newFirstName} ${newLastName}`,
            photoURL: "https://example.com/photo.jpg"
        }).then(() => {
            console.log("Perfil actualizado exitosamente");
        }).catch((error) => {
            console.error("Error al actualizar el perfil:", error);
        });
        updateEmail(auth.currentUser, newEmail).then(() => {
            // Email updated!
            // ...
        }).catch((error) => {
            console.error("Error al actualizar el perfil:", error);
        });
        updatePhoneNumber(auth.currentUser, newPhone).then(() => {
            // Email updated!
            // ...
        }).catch((error) => {
            console.error("Error al actualizar el perfil:", error);
        });
    }
}