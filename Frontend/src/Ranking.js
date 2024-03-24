import * as React from 'react';
import { Grid, Container, Typography, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Avatar } from '@mui/material';

const data = [
  { rank: 1, artist: 'Nguyen Ngoc Phuc', sales: 50, volume: '100 ETH' },
  { rank: 2, artist: 'Hau Linh Chi', sales: 40, volume: '80 ETH' },
  { rank: 3, artist: 'Nguyen Pham Duy', sales: 30, volume: '60 ETH' },
  { rank: 4, artist: 'Dao Khanh Nga Thi', sales: 20, volume: '40 ETH' },
  { rank: 5, artist: 'Nguyen Vu Duy Minh', sales: 10, volume: '30 ETH' },
];

const Ranking = () => {

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
      <Typography variant="h5" gutterBottom>Check out top ranking NFT artists on the NFT Marketplace updated in real-time.</Typography>
    </Container>

    <Container maxWidth="xl" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
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