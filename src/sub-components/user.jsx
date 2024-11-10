import { Avatar, Button, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { logoutUser, saveUserIdToStorage } from "../FireBaseConfig/authService";
import { Auth } from "../FireBaseConfig/useAuthState";
import { getAuth, onAuthStateChanged  } from "firebase/auth";




function User() {
  const user = Auth(); // Obtiene el estado de autenticación
  const [anchorEl, setAnchorEl] = useState(null);
  // const [userResults, setUserResults] = useState()
  const open = Boolean(anchorEl);

  const auth = getAuth();
  // const uid = auth.currentUser.uid
  
  useEffect(() => {
    const auth = getAuth(); // Obtener la instancia de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario autenticado, obtener el UID
        const uid = user.uid;
        saveUserIdToStorage(uid); // Guardar el UID en el almacenamiento local
      } else {
        saveUserIdToStorage(null);
      }
    });
    return () => unsubscribe();
  }, []);
  

  // const url = `http://localhost:3000/user/uid/${uid}`

  //   useEffect(() => {
  //       fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //       try{
  //           const response = await fetch(url)
  //           const result = await response.json()
  //         //   setUserFirstName(result[0].userFirstName);
  //         // setUserLastName(result[0].userLastName);
  //         // setUserName(result[0].userName);
  //         // setUserEmail(result[0].userEmail);
  //         // setUserPassword(result[0].userPassword);
  //         // setPhoneNumber(result[0].phoneNumber);
  //         // setUserRegistrationDate(result[0].userRegistrationDate);
  //         // setLastLogin(result[0].lastLogin);
  //         // setUserRole(result[0].userRole);
  //         // setUserAccountStatus(result[0].userAccountStatus);
  //         // setProfileImageUrl(result[0].profileImageUrl);
  //         // setFirebaseUID(result[0].firebaseUID);
            
  //       }
  //       catch (error){
  //           console.error(error)
  //       }
  //   }

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // window.location.replace("/account")
  };

  // function stringToColor(string) {
  //       let hash = 0;
  //       let i;
    
  //       for (i = 0; i < string.length; i += 1) {
  //         hash = string.charCodeAt(i) + ((hash << 5) - hash);
  //       }
    
  //       let color = '#';
    
  //       for (i = 0; i < 3; i += 1) {
  //         const value = (hash >> (i * 8)) & 0xff;
  //         color += `00${value.toString(16)}`.slice(-2);
  //       }
    
  //       return color;
  //     }
    
      // function stringAvatar(name) {
      //   return {
      //     sx: {
      //       bgcolor: stringToColor(name),
      //     },
      //     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      //   };
      // }

  if (!user) {
        return <Button sx={{
          backgroundColor: '#fd7e14', // Color de fondo
          '&:hover': {
          backgroundColor: '#FEBE00',
          color: 'white' // Color de fondo cuando el botón está en hover
          },
          color: 'white', // Color del texto
      }} href="/login">Login</Button>; // Muestra el botón de login si no está autenticado
      }
  return (
    <>
      {/* <Avatar
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            {...stringAvatar(`${auth.currentUser.displayName}`)}
          /> */}
        <Avatar
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            src={auth.currentUser.photoURL}
          />
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={()=>window.location.replace("/account")}>
              <Avatar 
              src={auth.currentUser.photoURL}
              // {...stringAvatar('Daviel Sanchez')} 
              /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={logoutUser}>
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
    </>
  );
}

export default User;
