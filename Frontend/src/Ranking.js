import * as React from 'react';
import { Grid, Container, Typography, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Avatar } from '@mui/material';
import useFetch from './useFetch';
import { Link } from 'react-router-dom';
import { curentUser } from './Const';

const Ranking = () => {

  const {data: users, isLoading: isUserLoading, error: userError} = useFetch('https://localhost:7145/User/Ranking');

  return (
    <>
    <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
      <Typography
      variant="h2"
      style={{
          textTransform: 'uppercase',
          fontSize: '3rem',
      }}
      gutterBottom
      >
      Rankings
      </Typography>
      <Typography variant="h5" gutterBottom>Check out top ranking NFT buyers on the NFT Marketplace updated in real-time.</Typography>
    </Container>

    <Container maxWidth="xl" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Artist</TableCell>
              <TableCell align="left">Buyed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map ( user => (
              <TableRow key={user.id}>
                <TableCell><Link to={ user && `/user/${user.id}`} style={{color: '#3d00b7 ', textDecoration: 'none'}}>{user.id}</Link></TableCell>
                <TableCell style={{display: 'flex', alignItems: 'center' }}>
                  <Avatar alt={user.firstName} />
                  <Typography variant="body2" gutterBottom style={{marginLeft: '10px' }}>{user.firstName} {user.lastName}</Typography>
                </TableCell>
                <TableCell>{user.total} ETH</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
};

export default Ranking