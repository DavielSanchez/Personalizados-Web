import { getDatabase, ref, set } from "firebase/database";

export function writeUserData(userFirstName, userLastName, userName, userPassword, userEmail, phoneNumber, userRegistrationDate, lastLogin, userRole, userAccountStatus, profileImageUrl, firebaseUID) {
    const db = getDatabase();
    set(ref(db, 'Users/' + firebaseUID), {
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
    });
}