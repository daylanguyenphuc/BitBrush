import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Tab, TextField, Button, Select, Alert, MenuItem, InputLabel, FormControl } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useFetch from './useFetch';
import { curentUser } from './Const';

const AccountSetting = () => {

  // Format date
  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    // Construct the desired format "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  // Change tab function
  const [tab, setTab] = useState('1');
  const handleChangeTab = (event, newTab) => {
      setTab(newTab);
  };

  // Get data
  const { data: user, userIsLoading, usetError } = useFetch(`https://localhost:7145/User/${curentUser}`);

  console.log(user);

  // Update information function
  const [userId, setUserId] =  useState('');
  const [userEmail, setUserEmail] =  useState('');
  const [userFirstName, setUserFirstName] =  useState('');
  const [userLastName, setUserLastName] =  useState('');
  const [userBirthdate, setUserBirthdate] =  useState('');
  const [userSex, setUserSex] =  useState('');
  const [userPhone, setUserPhone] =  useState('');
  const [userJoinDate, setUserJoinDate] =  useState('');

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setUserEmail(user.mail);
      setUserFirstName(user.firstName);
      setUserLastName(user.lastName);
      setUserBirthdate(formatDate(user.birthdate));
      setUserSex(user.gender);
      setUserPhone(user.phone);
      setUserJoinDate(formatDate(user.joinDate));
    }
  }, [user]);

  const handleUpdateUserInfo = (e) => {
    e.preventDefault();
    console.log('Updated user info');
    // Add logic to handle form submission (e.g., API call to update user info)
    const account = {
      "firstName": userFirstName,
      "lastName": userLastName,
      "mail": userEmail,
      "phone": userPhone,
      "gender": userSex,
      "birthdate": userBirthdate,
    }
    fetch(`https://localhost:7145/User/${curentUser}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(account),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update account info');
      }
      return response.json();
    })
    .then((createdNFT) => {
      // Handle success (e.g., show success message)
    })
    .catch(error => {
      console.error('Error update account info:', error);
      // Handle error (e.g., show error message)
    })
    .finally(() => {

    });
  };

  // Update password function
  const [passwordError, setPasswordError] =  useState(null);

  const [userOldPassword, setUserOldPassword] =  useState('');
  const [userNewPassword, setUserNewPassword] =  useState('');
  const [userRetypeNewPassword, setUserRetypeNewPassword] =  useState('');

  const { data: account, IsLoading: accountIsLoading, error: accountError} = useFetch(`https://localhost:7145/UserAccount/${curentUser}`);

  const handleUpdateUserPassword = (e) => {
    setPasswordError(null);
    e.preventDefault();
    console.log('Update user password function called');
    
    if (account.password === userOldPassword) {
      if (userNewPassword === userRetypeNewPassword) {
        console.log('Updated account info');
        // Add logic to handle form submission (e.g., API call to update user info)
        const password = {
          "userId": curentUser,
          "username": account.username,
          "password": userNewPassword,
          "walletId": account.walletId,
          "balance": account.balance,
        }
        fetch(`https://localhost:7145/UserAccount/${curentUser}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(password),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update account password');
          }
          return response.json();
        })
        .then(() => {
          // Handle success (e.g., show success message)
        })
        .catch(error => {
          console.error('Error update account password:', error);
          // Handle error (e.g., show error message)
        })
        .finally(() => {
        });
      }
      else {
        setPasswordError("Passwords does not match");
      }
    }
    else {
      setPasswordError("Incorrect old password");
    }
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
                        value={userId}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        fullWidth
                        margin="normal"
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
                          <MenuItem value="m">Male</MenuItem>
                          <MenuItem value="f">Female</MenuItem>
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
                        value={userJoinDate}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{ marginBottom: '20px' }}
                      />
                      <Button type="submit" variant="contained" color="primary" fullWidth>Save Changes</Button>
                    </form>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  { passwordError &&
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      { passwordError }
                    </Alert>
                  }
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
                        type="password"
                      />
                      <TextField
                        label="New password"
                        name="newPassword"
                        value={userNewPassword}
                        onChange={(e) => setUserNewPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        type="password"
                      />
                      <TextField
                        label="New password retype"
                        name="newPasswordRetype"
                        value={userRetypeNewPassword}
                        onChange={(e) => setUserRetypeNewPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        type="password"
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
