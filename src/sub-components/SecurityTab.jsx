import { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

function SecurityTab() {

    const [showPassword, setShowPassword] = useState();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
    <div className="securityTabContainer">
    <div className="photoAvatarContainer">
        <div className="formAccount">
        <Box
  component="form"
  sx={{ 
    display: 'flex', 
    flexDirection: 'column', // Hace que los elementos se alineen en columna
    '& .MuiTextField-root': { m: 1, width: '50ch' } 
  }}
  noValidate
>
          <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Nueva Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-helperText"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
            label="Nueva Contraseña"
          />

          

        </FormControl>
        <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Repetir Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-helperText"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
            label="Repetir Contraseña"
          />

          

        </FormControl>

</Box>

        <div className="newFormPasswordInput">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
                            <path d="M11 2H9v3h2z"/>
                            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
                          </svg>
                        }
                        sx={{
                            backgroundColor: '#9155FD', // Color de fondo
                            '&:hover': {
                            backgroundColor: '#fd7e14', // Color de fondo cuando el botón está en hover
                            },
                            color: 'white', // Color del texto
                        }}
                        >
                        Confirmar
                    </Button>
                </div>
        </div>
    </div>
    <div className="svgContainer">
        <img src="https://firebasestorage.googleapis.com/v0/b/personalizados-api.appspot.com/o/images%2Fauthentication-2-99.svg?alt=media&token=a7fe2ca7-aac4-4c3c-b1c2-0dfe0a510a34" alt="" />
    </div>
    </div>
    </>
  )
}

export default SecurityTab