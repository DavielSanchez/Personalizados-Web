import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [userResults, setUserResults] = useState()
    const [userFirstName, setUserFirstName] = useState(''); // result[0].userFirstName
    const [userLastName, setUserLastName] = useState(''); // result[0].userLastName
    const [userName, setUserName] = useState(''); // result[0].userName
    const [userEmail, setUserEmail] = useState(''); // result[0].userEmail
    const [userPassword, setUserPassword] = useState(''); // result[0].userPassword
    const [phoneNumber, setPhoneNumber] = useState(''); // result[0].phoneNumber
    const [userRegistrationDate, setUserRegistrationDate] = useState(''); // result[0].userRegistrationDate
    const [lastLogin, setLastLogin] = useState(''); // result[0].lastLogin
    const [userRole, setUserRole] = useState(''); // result[0].userRole
    const [userAccountStatus, setUserAccountStatus] = useState(''); // result[0].userAccountStatus
    const [profileImageUrl, setProfileImageUrl] = useState(''); // result[0].profileImageUrl
    const [firebaseUID, setFirebaseUID] = useState('');

  const auth = getAuth();
  const uid = auth.currentUser.uid

  const url = `http://localhost:3000/user/uid/${uid}`

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const result = await response.json()
            setUserFirstName(result[0].userFirstName);
            setUserLastName(result[0].userLastName);
            setUserName(result[0].userName);
            setUserEmail(result[0].userEmail);
            setUserPassword(result[0].userPassword);
            setPhoneNumber(result[0].phoneNumber);
            setUserRegistrationDate(result[0].userRegistrationDate);
            setLastLogin(result[0].lastLogin);
            setUserRole(result[0].userRole);
            setUserAccountStatus(result[0].userAccountStatus);
            setProfileImageUrl(result[0].profileImageUrl);
            setFirebaseUID(result[0].firebaseUID);
            
        }
        catch (error){
            console.error(error)
        }
    }

  return (
    <UserContext.Provider
    value={{
        userResults,
        setUserResults,
        userFirstName,
        setUserFirstName,
        userLastName,
        setUserLastName,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
        phoneNumber,
        setPhoneNumber,
        userRegistrationDate,
        setUserRegistrationDate,
        lastLogin,
        setLastLogin,
        userRole,
        setUserRole,
        userAccountStatus,
        setUserAccountStatus,
        profileImageUrl,
        setProfileImageUrl,
        firebaseUID,
        setFirebaseUID,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUserContext = () => {
  return useContext(UserContext);
};