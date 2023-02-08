import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import HorizontalScrollbar from './HorizontalScrollbar';
import axios from 'axios';
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [exercisesData, setexercisesData] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: 'https://zylalabs.com/api/392/exercise+database+api/309/list+of+body+parts',
      headers: {
        'Authorization': process.env.REACT_APP_RAPID_API_KEY
      }
    })
      .then(function (response) {
        setBodyParts(response.data);
        
      })
      .catch(function (error) {
        
      });
      
  }, []);
  
 
  const handleSearch = async () => {
    if (search) {
       axios({
        method: "GET",
        url: 'https://zylalabs.com/api/392/exercise+database+api/313/list+of+all+exercise',
        headers: {
          'Authorization': process.env.REACT_APP_RAPID_API_KEY
        }
      })
        .then(function (response) {
          setexercisesData(response.data);
          
        })
        .catch(function (error) {
          
        });

      const searchedExercises = exercisesData.filter(
        (item) => item.name.toLowerCase().includes(search)
               || item.target.toLowerCase().includes(search)
               || item.equipment.toLowerCase().includes(search)
               || item.bodyPart.toLowerCase().includes(search),
      );

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  );
};

export default SearchExercises;