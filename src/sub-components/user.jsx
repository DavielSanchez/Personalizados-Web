import { Avatar } from "@mui/material"
// import { deepOrange, deepPurple } from '@mui/material/colors';
function user() {

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
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
  return (
    <>
        {/* <a href="" className="nav-item nav-link">Login</a>
        <a href="" className="nav-item nav-link">Register</a> */}
        <Avatar {...stringAvatar('Daviel Sanchez')} />
    </>
  )
}

export default user