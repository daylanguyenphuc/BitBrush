import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Container, TextField, InputAdornment, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SignUpPage = () => {

  // Show password function
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Switch between signin signup function
  const [isLogin, setIsLogin] = useState(true);
  const switchToLoginPage = () => {
    setIsLogin(true);
  };
  const switchToSignUpPage = () => {
    setIsLogin(false);
  };

  // Validation
  const validateEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) && input.indexOf('@') !== 0;
  const validatePassword = (input) => input.length >= 6;
  const validateAlphabetic = (input) => /^[a-zA-Z]+$/.test(input);

  // Sign up function
  const [activeStep, setActiveStep] = useState(0);

  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [gender, setGender] = useState(''); // Define gender state
  const [birthdate, setBirthdate] = useState(''); // Define birthdate state
  const [phoneNumber, setPhoneNumber] = useState(''); // Define phoneNumber state

  const [usernameError, setUsernameError] = useState(false);
  const [signupEmailError, setSignupEmailError] = useState(false);
  const [signupPasswordError, setSignupPasswordError] = useState(false);
  const [signupFirstNameError, setSignupFirstNameError] = useState(false);
  const [signupLastNameError, setSignupLastNameError] = useState(false);
  const [signupGenderError, setGenderError] = useState(false);
  const [signupBirthdateError, setBirthdateError] = useState(false);
  const [signupPhoneNumberError, setPhoneNumberError] = useState(false);

  const [isWalletConnected, setWalletConnected] = useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      setSignupFirstNameError(!validateAlphabetic(signupFirstName.trim()));
      setSignupLastNameError(!validateAlphabetic(signupLastName.trim()));
      setGenderError(!gender); // Add gender validation

      // Check for valid birthdate format and not equal to '00/00/0000'
      setBirthdateError(!birthdate || birthdate === '00/00/0000');

      // Check for valid phone number format and not blank
      setPhoneNumberError(
        !phoneNumber ||
        !/^\d+$/.test(phoneNumber) ||
        phoneNumber.trim().length < 9
      );

      // Validate email
      setSignupEmailError(!validateEmail(signupEmail));

      if (
        validateAlphabetic(signupFirstName.trim()) &&
        validateAlphabetic(signupLastName.trim()) &&
        gender &&
        validateEmail(signupEmail) &&
        !signupBirthdateError && // Check if birthdate is valid
        !signupPhoneNumberError // Check if phone number is valid
      ) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } else if (activeStep === 1) {
      setUsernameError(!username.trim());
      setSignupPasswordError(!validatePassword(signupPassword));
      if (username.trim() && validatePassword(signupPassword)) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleConnectWallet = (walletNumber) => {
    // Logic to connect wallet
    setWalletConnected(true);
  };

  // Login function
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [loginUsernameError, setLoginUsernameError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);

  const handleLogin = () => {
    setLoginUsernameError(!loginUsername.trim());
    setLoginPasswordError(!validatePassword(loginPassword));

    if (loginUsername.trim() && validatePassword(loginPassword)) {
      // Logic for handling login
      console.log('Logging in...');
    }
  };

  return (
    <Container style={{ marginTop: '6rem', marginBottom: '6rem' }}>

      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography variant='h2' style={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: '3rem' }}>{isLogin ? 'Welcome back' : 'Create an account'}</Typography>
        </Grid>

        {!isLogin && (
          <Grid item xs={12} sx={{ marginRight: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' }, marginLeft: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' } }}>
            <Stepper activeStep={activeStep} alternativeLabel style={{ marginBottom: '3rem' }}>
              <Step><StepLabel>Personal Information</StepLabel></Step>
              <Step><StepLabel>Account Information</StepLabel></Step>
              <Step><StepLabel>Connect Wallet</StepLabel></Step>
            </Stepper>
          </Grid>
        )}

        {!isLogin ? (
          <Grid item xs={12} sx={{ marginRight: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' }, marginLeft: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' } }}>
            {activeStep === 0 && (
              <div>
                <Typography variant="h6">Step 1: Personal Information</Typography>
                <TextField
                  label="First Name *"
                  value={signupFirstName}
                  onChange={(e) => setSignupFirstName(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={signupFirstNameError}
                  helperText={signupFirstNameError && 'Please enter a valid first name'}
                />
                <TextField
                  label="Last Name *"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={signupLastNameError}
                  helperText={signupLastNameError && 'Please enter a valid last name'}
                />

                <FormControl fullWidth margin="normal" error={signupGenderError}>
                  <InputLabel>Gender *</InputLabel>
                  <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                  </Select>
                  {signupGenderError && <Typography variant="caption" color="error">Gender is required</Typography>}
                </FormControl>

                <TextField
                  label="Email *"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={signupEmailError}
                  helperText={signupEmailError && 'Please enter a valid email address'}
                />

                <TextField
                  label="Birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  error={signupBirthdateError}
                  helperText={signupBirthdateError && 'Birthdate is required'}
                />

                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                  error={signupPhoneNumberError}
                  helperText={signupPhoneNumberError && 'Use correct phone number format'}
                />

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <Button color="primary" onClick={handleBack} size='large' style={{ flex: 1 }}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" size='large' onClick={handleNext} style={{ flex: 1 }}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <Typography variant="h6">Step 2: Account Information</Typography>
                <TextField
                  label="Username *"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={usernameError}
                  helperText={usernameError && 'Username is required'}
                />
                <TextField
                  label="Password *"
                  type={showPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={signupPasswordError}
                  helperText={signupPasswordError && 'Password must be at least 6 characters long'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                        {showPassword ? (<VisibilityIcon onClick={togglePasswordVisibility} />) :
                          (<VisibilityOffIcon onClick={togglePasswordVisibility} />)}
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" color="primary" onClick={handleNext} size='large' style={{ width: '100%', marginTop: '1rem' }}>
                  Next
                </Button>
                <Typography variant="body1" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  Already have an account?
                  {!isLogin && (
                    <Button color="primary" onClick={switchToLoginPage}>
                      Log in
                    </Button>
                  )}
                </Typography>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <Typography variant="h6">Step 3: Connect Wallet</Typography>
                <Button
                  variant="contained"
                  color={isWalletConnected ? 'success' : 'secondary'}
                  onClick={() => handleConnectWallet()}
                  size="large"
                  style={{
                    width: '100%',
                    marginTop: '1rem',
                  }}
                >
                  {isWalletConnected ? (
                    <>
                      Wallet connected <CheckCircleIcon style={{ marginLeft: '0.5rem' }} />
                    </>
                  ) : ('Connect Wallet')}
                </Button>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <Button color="primary" onClick={handleBack} size="large" style={{ flex: 1 }}>Back</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleNext}
                    disabled={!isWalletConnected}
                    style={{ flex: 1 }}
                  >Sign up</Button>
                </div>
              </div>
            )}

          </Grid>
        ) :
          (
            <Grid item
              xs={12}
              sx={{
                marginRight: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' },
                marginLeft: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' },
              }}>
              <div>
                <TextField
                  label="Username *"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={loginUsernameError}
                  helperText={loginUsernameError && 'Username is required'}
                />

                <TextField
                  label="Password *"
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={loginPasswordError}
                  helperText={loginPasswordError && 'Password must be at least 6 characters long'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                        {showPassword ? (
                          <VisibilityIcon onClick={togglePasswordVisibility} />
                        ) : (
                          <VisibilityOffIcon onClick={togglePasswordVisibility} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />

                <Button variant="contained" color="primary" onClick={handleLogin} size='large' style={{ width: '100%', marginTop: '1rem' }}>
                  Log In
                </Button>

                <Typography variant="body1" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  New to BitBrush Studio?
                  <Button color="primary" onClick={switchToSignUpPage}>
                    Sign up
                  </Button>
                </Typography>

              </div>

            </Grid>

          )
        }

      </Grid>
    </Container >
  );
};

export default SignUpPage;
