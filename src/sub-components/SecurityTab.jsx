import { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
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
                        startIcon={<SaveIcon />}
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