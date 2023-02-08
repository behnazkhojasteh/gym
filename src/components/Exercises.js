import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';
import axios from 'axios';


const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  useEffect(() => {
      if (bodyPart === 'all') {
        axios({
          method: "GET",
          url: 'https://zylalabs.com/api/392/exercise+database+api/313/list+of+all+exercise',
          headers: {
            'Authorization': process.env.REACT_APP_RAPID_API_KEY,
          }
        })
          .then(function (response) {
            setExercises(response.data);
          })
          .catch(function (error) {
            
          });
      } else {
        axios({
          method: "GET",
          url: `https://zylalabs.com/api/392/exercise+database+api/309/list+of+body+parts/${bodyPart}`,
          headers: {
            'Authorization': process.env.REACT_APP_RAPID_API_KEY
          }
        })
          .then(function (response) {
            setExercises(response.data);
          })
          .catch(function (error) {
            
          });
        }
    
  }, [bodyPart]);


  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;