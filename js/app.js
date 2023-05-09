const loadMovies = async () => {
   
   try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=156a9d1b2c086e56ae5d4b2983e2b0f4')
      console.log(response);

      // Check if the response is correct
      if(response.status === 200) {
         const data = await response.json();
         console.log(data.results);
      } else if (response.status === 401) {
         console.log('Your key is not right lol');
      } else if(response === 404) {
         console.log('The movie does not exist');
      } else {
         console.log('IDK what happened LOL');
      }
      
   } catch(error) {
      console.log(error);
   }
}

loadMovies();