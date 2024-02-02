import * as React from 'react';
import { Grid, Container, Typography, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Avatar } from '@mui/material';

const data = [
  { rank: 1, artist: 'Artist 1', sales: 50, volume: '100 ETH' },
  { rank: 2, artist: 'Artist 2', sales: 40, volume: '80 ETH' },
  { rank: 3, artist: 'Artist 3', sales: 30, volume: '60 ETH' },
  { rank: 4, artist: 'Artist 4', sales: 20, volume: '40 ETH' },
  { rank: 5, artist: 'Artist 5', sales: 10, volume: '20 ETH' },
];

const Ranking = () => {

  return (
    <>
    <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
      <Typography variant="h1" >Rankings</Typography>
      <Typography variant="h3" gutterBottom>Check out top ranking NFT artists on the NFT Marketplace updated in real-time.</Typography>
    </Container>

    <Container maxWidth="xl" style={{ marginTop: '100px', marginBottom: '200px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">#</TableCell>
              <TableCell align="left">Artist</TableCell>
              <TableCell align="left">Sales</TableCell>
              <TableCell align="left">Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.rank}>
                <TableCell>{row.rank}</TableCell>
                <TableCell style={{display: 'flex', alignItems: 'center' }}>
                  <Avatar alt={row.artist} src={`url_to_artist_avatar_${row.rank}`} />
                  <Typography variant="body2" gutterBottom style={{marginLeft: '10px' }}>{row.artist}</Typography>
                </TableCell>
                <TableCell>{row.sales}</TableCell>
                <TableCell>{row.volume}</TableCell>
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