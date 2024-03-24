import React, { useState } from 'react';
import { Container, Typography, Box, Tab, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const AccountSetting = () => {

  // Change tab function
  const [tab, setTab] = useState('1');
  const handleChangeTab = (event, newTab) => {
      setTab(newTab);
  };

  // Update information function
  const [isUpdated, setIsUpdated] = useState(false)
  const [userId, setUserId] =  useState('564a3c5f-784c-40ed-b46d-6a1f5ef0f1cd');
  const [userEmail, setUserEmail] =  useState('phucn3463@gmail.com');
  const [userFirstName, setUserFirstName] =  useState('Nguyen');
  const [userLastName, setUserLastName] =  useState('Ngoc Phuc');
  const [userBirthdate, setUserBirthdate] =  useState('2004-03-14');
  const [userSex, setUserSex] =  useState('M');
  const [userPhone, setUserPhone] =  useState('0943445867');
  const [userJoinDate, setUserJoinDate] =  useState('2024-03-24');
  const handleUpdateUserInfo = (e) => {
    e.preventDefault();
    setIsUpdated(true);
    console.log('Updated user info');
    // Add logic to handle form submission (e.g., API call to update user info)
  };

  // Update password function
  const [userOldPassword, setUserOldPassword] =  useState('');
  const [userNewPassword, setUserNewPassword] =  useState('');
  const [userRetypeNewPassword, setUserRetypeNewPassword] =  useState('');
  const handleUpdateUserPassword = (e) => {
    e.preventDefault();
    console.log('Updated user password');
    // Add logic to handle form submission (e.g., API call to update user info)
  };

  return (

    <>
    <Container maxWidth="xl" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Typography variant="h2" style={{ fontWeight: 'bold', textTransform: 'uppercase'}} >Account settings</Typography>
        <Typography variant="h5" gutterBottom>Manage your account's informations</Typography>
    </Container>
    <Container maxWidth="xl" style={{ marginBottom: '3rem' }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                      <Tab label="My personal information" value="1" />
                      <Tab label="Password management" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box>
                    <form onSubmit={handleUpdateUserInfo}>
                      <TextField
                        label="User ID"
                        name="id"
                        defaultValue={userId}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        defaultValue={userEmail}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label="First Name"
                        name="fname"
                        value={userFirstName}
                        onChange={(e) => setUserFirstName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Last Name"
                        name="lname"
                        value={userLastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Birthdate"
                        name="bdate"
                        type="date"
                        value={userBirthdate}
                        onChange={(e) => setUserBirthdate(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                      />
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Sex *</InputLabel>
                        <Select name="sex" label="Sex" value={userSex} onChange={(e) => setUserSex(e.target.value)} required >
                          <MenuItem value="M">Male</MenuItem>
                          <MenuItem value="F">Female</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Join date"
                        name="joinDate"
                        defaultValue={userJoinDate}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{ marginBottom: '20px' }}
                      />
                      <Button type="submit" variant="contained" color={isUpdated ? 'success' : 'primary'} fullWidth>Save Changes</Button>
                    </form>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box>
                    <form onSubmit={handleUpdateUserPassword}>
                      <TextField
                        label="Old password"
                        name="oldPassword"
                        value={userOldPassword}
                        onChange={(e) => setUserOldPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="New password"
                        name="newPassword"
                        value={userNewPassword}
                        onChange={(e) => setUserNewPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="New password retype"
                        name="newPasswordRetype"
                        value={userRetypeNewPassword}
                        onChange={(e) => setUserRetypeNewPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        style={{ marginBottom: '20px' }}
                      />
                      <Button type="submit" variant="contained" color="primary" fullWidth>Update Password</Button>
                    </form>
                  </Box>
                </TabPanel>
            </TabContext>
        </Box>
    </Container>
    </>
  );
};

export default AccountSetting;
