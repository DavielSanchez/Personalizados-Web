import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InfoIcon from '@mui/icons-material/Info';

import AccountTab from './AccountTab';
import SecurityTab from './SecurityTab';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{
            '& .MuiTab-root': { color: '#fd7e14' },
            '& .Mui-selected': { color: '#ffc108' },
            '& .MuiTabs-indicator': { backgroundColor: '#ffc107'},
          }}
        >
          <Tab icon={<PermIdentityIcon />} iconPosition="start" label="Account" {...a11yProps(0)} />
          <Tab icon={<LockOpenIcon />} iconPosition="start" label="Security" {...a11yProps(1)} />
          <Tab icon={<InfoIcon />} iconPosition="start" label="Info" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AccountTab/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SecurityTab/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Info
      </CustomTabPanel>
    </Box>
  );
}