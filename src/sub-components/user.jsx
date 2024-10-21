import { Avatar, Button, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import Logout from '@mui/icons-material/Logout';
import { logoutUser } from "../FireBaseConfig/authService";
import { Auth } from "../FireBaseConfig/useAuthState";
import { getAuth } from "firebase/auth";



function User() {
  const user = Auth(); // Obtiene el estado de autenticación
  const [anchorEl, setAnchorEl] = useState(null);
  const [userResults, setUserResults] = useState()
  // const [userFirstName, setUserFirstName] = useState(''); // result[0].userFirstName
  // const [userLastName, setUserLastName] = useState(''); // result[0].userLastName
  // const [userName, setUserName] = useState(''); // result[0].userName
  // const [userEmail, setUserEmail] = useState(''); // result[0].userEmail
  // const [userPassword, setUserPassword] = useState(''); // result[0].userPassword
  // const [phoneNumber, setPhoneNumber] = useState(''); // result[0].phoneNumber
  // const [userRegistrationDate, setUserRegistrationDate] = useState(''); // result[0].userRegistrationDate
  // const [lastLogin, setLastLogin] = useState(''); // result[0].lastLogin
  // const [userRole, setUserRole] = useState(''); // result[0].userRole
  // const [userAccountStatus, setUserAccountStatus] = useState(''); // result[0].userAccountStatus
  // const [profileImageUrl, setProfileImageUrl] = useState(''); // result[0].profileImageUrl
  // const [firebaseUID, setFirebaseUID] = useState('');
  const open = Boolean(anchorEl);

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
          //   setUserFirstName(result[0].userFirstName);
          // setUserLastName(result[0].userLastName);
          // setUserName(result[0].userName);
          // setUserEmail(result[0].userEmail);
          // setUserPassword(result[0].userPassword);
          // setPhoneNumber(result[0].phoneNumber);
          // setUserRegistrationDate(result[0].userRegistrationDate);
          // setLastLogin(result[0].lastLogin);
          // setUserRole(result[0].userRole);
          // setUserAccountStatus(result[0].userAccountStatus);
          // setProfileImageUrl(result[0].profileImageUrl);
          // setFirebaseUID(result[0].firebaseUID);
            
        }
        catch (error){
            console.error(error)
        }
    }

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // window.location.replace("/account")
  };

  function stringToColor(string) {
        let hash = 0;
        let i;
    
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        let color = '#';
    
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
    
        return color;
      }
    
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

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
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
    </>
  );
}

export default User;


// import { Avatar } from "@mui/material";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import { useState, useEffect } from "react";
// import { logoutUser } from "../FireBaseConfig/authService";
// import { Auth } from "../FireBaseConfig/Authentication"; // Asegúrate de que esto verifica el estado de autenticación correctamente

// function User() {
//   const user = ();
//   const [isAuth, setIsAuth] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // Actualiza el estado de autenticación una sola vez
//   useEffect(() => {
//     if (Auth) {
//       setIsAuth(true);
//     } else {
//       setIsAuth(false);
//     }
//   }, [Auth]); // La dependencia es 'Auth', para que reaccione cuando cambie

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   function stringToColor(string) {
//     let hash = 0;
//     let i;

//     for (i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     let color = '#';

//     for (i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.slice(-2);
//     }

//     return color;
//   }

//   function stringAvatar(name) {
//     return {
//       sx: {
//         bgcolor: stringToColor(name),
//       },
//       children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
//   }

//   if (!user) {
//     return <Button href="/login">Login</Button>; // Muestra el botón de login si no está autenticado
//   }

//   return (
//     <>
//       {isAuth ? (
//         <>
//           <Avatar
//             id="basic-button"
//             aria-controls={open ? 'basic-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? 'true' : undefined}
//             onClick={handleClick}
//             {...stringAvatar('Daviel Sanchez')}
//           />
//           <Menu
//             anchorEl={anchorEl}
//             id="account-menu"
//             open={open}
//             onClose={handleClose}
//             onClick={handleClose}
//             slotProps={{
//               paper: {
//                 elevation: 0,
//                 sx: {
//                   overflow: 'visible',
//                   filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                   mt: 1.5,
//                   '& .MuiAvatar-root': {
//                     width: 32,
//                     height: 32,
//                     ml: -0.5,
//                     mr: 1,
//                   },
//                   '&::before': {
//                     content: '""',
//                     display: 'block',
//                     position: 'absolute',
//                     top: 0,
//                     right: 14,
//                     width: 10,
//                     height: 10,
//                     bgcolor: 'background.paper',
//                     transform: 'translateY(-50%) rotate(45deg)',
//                     zIndex: 0,
//                   },
//                 },
//               },
//             }}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//           >
//             <MenuItem onClick={handleClose}>
//               <Avatar {...stringAvatar('Daviel Sanchez')} /> My account
//             </MenuItem>
//             <Divider />
//             <MenuItem onClick={handleClose}>
//               <ListItemIcon>
//                 <Settings fontSize="small" />
//               </ListItemIcon>
//               Settings
//             </MenuItem>
//             <MenuItem onClick={logoutUser}>
//               <ListItemIcon>
//                 <Logout fontSize="small" />
//               </ListItemIcon>
//               Logout
//             </MenuItem>
//           </Menu>
//         </>
//       ) : (
//         <>
//           <Avatar
//             id="basic-button"
//             aria-controls={open ? 'basic-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? 'true' : undefined}
//             onClick={handleClick}
//           />
//           <Menu
//             anchorEl={anchorEl}
//             id="account-menu"
//             open={open}
//             onClose={handleClose}
//             onClick={handleClose}
//             slotProps={{
//               paper: {
//                 elevation: 0,
//                 sx: {
//                   overflow: 'visible',
//                   filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                   mt: 1.5,
//                   '& .MuiAvatar-root': {
//                     width: 32,
//                     height: 32,
//                     ml: -0.5,
//                     mr: 1,
//                   },
//                   '&::before': {
//                     content: '""',
//                     display: 'block',
//                     position: 'absolute',
//                     top: 0,
//                     right: 14,
//                     width: 10,
//                     height: 10,
//                     bgcolor: 'background.paper',
//                     transform: 'translateY(-50%) rotate(45deg)',
//                     zIndex: 0,
//                   },
//                 },
//               },
//             }}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//           >
//             <MenuItem onClick={handleClose}>
//               <ListItemIcon>
//                 <Logout fontSize="small" />
//               </ListItemIcon>
//               LogIn
//             </MenuItem>
//           </Menu>
//         </>
//       )}
//     </>
//   );
// }

// export default User;