import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
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
                startIcon={<CloudUploadIcon />}
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
              startIcon={<SaveIcon />}
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
