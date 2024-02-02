import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Container, TextField, InputAdornment, Grid } from '@mui/material';
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

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');

  const [signupEmailError, setSignupEmailError] = useState(false);
  const [signupPasswordError, setSignupPasswordError] = useState(false);
  const [signupFirstNameError, setSignupFirstNameError] = useState(false);
  const [signupLastNameError, setSignupLastNameError] = useState(false);

  const [isWalletConnected, setWalletConnected] = useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      setSignupEmailError(!validateEmail(signupEmail));
      setSignupPasswordError(!validatePassword(signupPassword));
    } else if (activeStep === 1) {
      setSignupFirstNameError(!validateAlphabetic(signupFirstName.trim()));
      setSignupLastNameError(!validateAlphabetic(signupLastName.trim()));
    }
    if (
      (activeStep === 0 && validateEmail(signupEmail) && validatePassword(signupPassword)) ||
      (activeStep === 1 && validateAlphabetic(signupFirstName.trim()) && validateAlphabetic(signupLastName.trim()))
    ) {
      setSignupEmailError(false);
      setSignupPasswordError(false);
      setSignupFirstNameError(false);
      setSignupLastNameError(false);
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleConnectWallet = (walletNumber) => {
    // Logic to connect wallet
    setWalletConnected(true);
  };
  const handleConnectLater = () => {
    // Logic to skip wallet connection
    handleNext();
  };

  // Login function
  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [loginEmailError, setLoginEmailError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);

  const handleLogin = () => {
    setLoginEmailError(!validateEmail(loginEmail));
    setLoginPasswordError(!validatePassword(loginPassword));

    if (validateEmail(loginEmail) && validatePassword(loginPassword)) {
      // Logic for handling login
      console.log('Logging in...');
    }
  };

  return (
    <Container style={{ marginTop: '4rem', marginBottom: '4rem' }}>

      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography variant='h2' style={{ textAlign: 'center', marginBottom: '3rem' }}>{isLogin ? 'Welcome back' : 'Create an account'}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginRight: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' }, marginLeft: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' }}}>
          {!isLogin && (
            <Stepper activeStep={activeStep} alternativeLabel style={{ marginBottom: '3rem' }}>
              <Step><StepLabel>Account Information</StepLabel></Step>
              <Step><StepLabel>Personal Information</StepLabel></Step>
              <Step><StepLabel>Connect Wallet</StepLabel></Step>
            </Stepper>
          )}
        </Grid>
        {!isLogin ? (
          <Grid item xs={12} sx={{ marginRight: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' }, marginLeft: { xs: '3rem', sm: '6rem', md: '12rem', lg: '20rem' }}}>
            {activeStep === 0 && (
              <div>
                <Typography variant="h6">Step 1: Account Information</Typography>
                <TextField
                  label="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={signupEmailError}
                  helperText={signupEmailError && 'Please enter a valid email address'}
                />
                <TextField
                  label="Password"
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
            {activeStep === 1 && (
              <div>
                <Typography variant="h6">Step 2: Personal Information</Typography>
                <TextField
                  label="First Name"
                  value={signupFirstName}
                  onChange={(e) => setSignupFirstName(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={signupFirstNameError}
                  helperText={signupFirstNameError && 'Please enter a valid first name'}
                />
                <TextField
                  label="Last Name"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={signupLastNameError}
                  helperText={signupLastNameError && 'Please enter a valid last name'}
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
                  ) : ( 'Connect Wallet')}
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
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleConnectLater}
                  style={{ width: '100%', flex: 1, marginTop: '1rem' }}
                >Skip this step</Button>
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
                  label="Email"
                  value={loginEmail}
                  onChange={(e) => setloginEmail(e.target.value)}
                  margin="normal"
                  fullWidth
                  error={loginEmailError}
                  helperText={loginEmailError && 'Please enter a valid email address'}
                />

                <TextField
                  label="Password"
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