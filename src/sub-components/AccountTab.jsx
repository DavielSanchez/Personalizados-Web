import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { userUpdate, getUserIdFromStorage } from '../FireBaseConfig/authService';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../FireBaseConfig/FireBaseConfig';

function AccountTab() {
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newImage, setNewImage] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // Para previsualizar la imagen
  const [UID, setUID] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedUserId = getUserIdFromStorage();
    if (savedUserId) {
      setUID(savedUserId);
    } else {
      console.error("No se encontró el UID.");
    }
  }, []);

  useEffect(() => {
    if (UID) {
      fetchData();
    }
  }, [UID]);

  const fetchData = async () => {
    const url = `${import.meta.env.VITE_API_LINK}/user/uid/${UID}`;
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result && result.length > 0) {
        setNewFirstName(result[0].userFirstName);
        setNewLastName(result[0].userLastName);
        setNewEmail(result[0].userEmail);
        setNewPhone(result[0].phoneNumber);
        setNewImage(result[0].profileImageUrl);
        setImagePreview(result[0].profileImageUrl); // Previsualizar la imagen existente
      } else {
        console.error("Error: el formato de la respuesta es incorrecto o está vacío.");
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  const updateInfo = () => {
    try {
      userUpdate(newFirstName, newLastName, newEmail, newPhone, imagePreview); // Asegúrate de incluir newImage
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) return;

    // Previsualizar la imagen seleccionada
    const imageUrl = URL.createObjectURL(selectedImage);
    setImagePreview(imageUrl);

    const storageRef = ref(storage, `images/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(`Subida es ${progress}% completa`);
      },
      (error) => {
        console.error("Error subiendo la imagen: ", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("URL de descarga obtenida: ", downloadURL);
          setNewImage(downloadURL); // Guarda la URL de la imagen
          setUploading(false);
          setProgress(0);
        });
      }
    );
  }

  return (
    <>
      <div className="photoAvatarContainer">
        <div className="photoAvatar">
          <img className="avatarImage" src={imagePreview} alt="Previsualización" /> {/* Usar la URL de previsualización */}
          <div className="newPhoto">
            <div className="newPhotoInput">
              <Button
                component="label"
                variant="contained"
                startIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"/>
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                  </svg>
                }
                sx={{
                  backgroundColor: '#9155FD',
                  '&:hover': { backgroundColor: '#fd7e14' },
                  color: 'white',
                }}
              >
                Cargar Imagen
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
              </Button>
              <Button variant="outlined" color="error">Restaurar</Button>
            </div>
            <div className="newPhotoInputLabel">
              Allowed PNG or JPEG. Max size of 800K.
            </div>
          </div>
        </div>
        <div className="formAccount">
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }} noValidate autoComplete="off">
            <TextField
              label="Nombre(s)"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <TextField
              label="Apellido(s)"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <TextField
              label="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <TextField
              label="Telefono"
              type="number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </Box>
          <div className="newFormAccountInput">
            <Button
              variant="contained"
              startIcon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
                  <path d="M11 2H9v3h2z"/>
                  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
                </svg>
              }
              sx={{
                backgroundColor: '#9155FD',
                '&:hover': { backgroundColor: '#fd7e14' },
                color: 'white',
              }}
              onClick={updateInfo}
            >
              Guardar Cambios
            </Button>
            <Button variant="outlined" color="error">Restaurar</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountTab;
