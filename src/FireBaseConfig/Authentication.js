import { auth } from './FireBaseConfig';
import { onAuthStateChanged } from 'firebase/auth';


export const Auth = () => {

    const userStateChanged = (user) => {
        if (user) {
            // User is logged in
            //   window.location.replace("/");
            //   console.log(user.displayName)
        } else {
            // show the login container when no one is logged in
            window.location.replace("/login");
            console.log('No one is logged in')
        }
    }
    onAuthStateChanged(auth, userStateChanged)
}