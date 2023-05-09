const moviesContainer = document.querySelector('#container');

const loadMovies = async () => {
   
   try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=156a9d1b2c086e56ae5d4b2983e2b0f4')
      console.log(response);

      // Check if the response is correct
      if(response.status === 200) {
         const data = await response.json();

         let movies = '';

         data.results.forEach(movie => {
            movies+= `
            <div> 
               <div>
                  <img class="w-full" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie or serie cover">
               </div>
               <div class="text-sm md:text-base">
                  <p class="mt-1 mb-5 font-semibold">${movie.title}</p>
                  <div class="flex justify-between">
                     <p class="">${movie.release_date}</p>
                     <span class="px-0.5 border text-xs md:text-sm">Movie</span>
                  </div>
               </div>
            </div> <!--card-->
            `;
         });

         // Place the movies in the HTML
         moviesContainer.innerHTML = movies;

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