import React,{useState} from 'react'
import { FaStar } from "react-icons/fa";
import "./Rating.css";
import Modalpopup from '../Modalpopup';
import { Container, Grid, Box, Typography, Stack, Button, Divider, LinearProgress } from '@mui/material'; 

function Rating({Rating}) {
  const ratings = [
    { stars: 5, count: 10 },
    { stars: 4, count: 20 },
    { stars: 3, count: 15 },
    { stars: 2, count: 5 },
    { stars: 1, count: 3 }
  ];
 const totalCount = ratings.reduce((acc, curr) => acc + curr.count, 0);
  return (
  <Container margin={2}>
    <Typography variant='body1' fontWeight={500} fontSize='24px' >Ratings & Review</Typography>
    {ratings.map((rating, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={1} mt={1}>
              <Typography variant="body2">{rating.stars} star</Typography>
              <LinearProgress variant="determinate" value={(rating.count / totalCount) * 100} sx={{ width: '70%' }} />
              <Typography variant="body2">{rating.count}</Typography>
            </Stack>
          ))}
  </Container>
  )
}

export default Rating
