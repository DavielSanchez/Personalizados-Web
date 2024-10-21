import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect } from 'react';
import { userUpdate } from '../FireBaseConfig/authService';
import { getAuth } from 'firebase/auth';



function AccountTab() {

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPhone, setNewPhone] = useState()
    const [userFirstName, setUserFirstName] = useState(''); // result[0].userFirstName
    const [userLastName, setUserLastName] = useState(''); // result[0].userLastName
  // const [userName, setUserName] = useState(''); // result[0].userName
    const [userEmail, setUserEmail] = useState(''); // result[0].userEmail
  // const [userPassword, setUserPassword] = useState(''); // result[0].userPassword
  // const [phoneNumber, setPhoneNumber] = useState(''); // result[0].phoneNumber
  // const [userRegistrationDate, setUserRegistrationDate] = useState(''); // result[0].userRegistrationDate
  // const [lastLogin, setLastLogin] = useState(''); // result[0].lastLogin
  // const [userRole, setUserRole] = useState(''); // result[0].userRole
  // const [userAccountStatus, setUserAccountStatus] = useState(''); // result[0].userAccountStatus
  // const [profileImageUrl, setProfileImageUrl] = useState(''); // result[0].profileImageUrl
  // const [firebaseUID, setFirebaseUID] = useState('');

    const auth = getAuth();
  const uid = auth.currentUser.uid || "123"

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
          // setUserName(result[0].userName);
            setUserEmail(result[0].userEmail);
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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

      const updateInfo = () => {
        try {
            userUpdate(newFirstName, newLastName, newEmail, newPhone)
        } catch (error) {
            console.error(error)
        }
      }

  return (
    <>
    <div className="photoAvatarContainer">
        <div className="photoAvatar">
            <img className="avatarImage" src="../../public/img/user.jpg" alt="" />
            <div className="newPhoto">
                <div className="newPhotoInput">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            backgroundColor: '#9155FD', // Color de fondo
                            '&:hover': {
                            backgroundColor: '#fd7e14', // Color de fondo cuando el botón está en hover
                            },
                            color: 'white', // Color del texto
                        }}
                        >
                        Cargar Imagen
                        <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                    </Button>
                    <Button variant="outlined" color="error" >Restaurar</Button>
                </div>
                <div className="newPhotoInputLabel">
                Allowed PNG or JPEG. Max size of 800K.
                </div>
            </div>
        </div>
        <div className="formAccount">
        <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
      noValidate
      autoComplete="off"
    >
        <TextField
          id="outlined-helperText"
          label="Nombre(s)"
          defaultValue={userFirstName || "Nuevo"}
          onChange={(e)=>{
            setNewFirstName(e.target.value)
          }}
        />
        <TextField
          id="outlined-helperText"
          label="Apellido(s)"
          defaultValue={userLastName || "Invitado"}
          onChange={(e)=>{
            setNewLastName(e.target.value)
          }}
        />
        <TextField
          id="outlined-helperText"
          label="Email"
          defaultValue={userEmail || "error"}
          onChange={(e)=>{
            setNewEmail(e.target.value)
          }}
        />
        <TextField
          id="outlined-helperText"
          label="Telefono"
          type="number"
          defaultValue=""
          onChange={(e)=>{
            setNewPhone(e.target.value)
          }}
        />
        </Box>
        <div className="newFormAccountInput">
                    <Button
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<SaveIcon />}
                        sx={{
                            backgroundColor: '#9155FD', // Color de fondo
                            '&:hover': {
                            backgroundColor: '#fd7e14', // Color de fondo cuando el botón está en hover
                            },
                            color: 'white', // Color del texto
                        }}
                        >
                        Guardar Cambios
                        <VisuallyHiddenInput
                        type="file"
                        onClick={updateInfo}
                        multiple
                    />
                    </Button>
                    <Button variant="outlined" color="error" >Restaurar</Button>
                </div>
        </div>
    </div>
    </>
  )
}

export default AccountTab