let page = 1;
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
let pageCount = document.querySelector('#pageCount');

const btnPrevBottom = document.querySelector('#btnPrevBottom'); 
const btnNextBottom = document.querySelector('#btnNextBottom'); 
let pageCountBottom = document.querySelector('#pageCountBottom');


// Function to refresh content and both page counts
function updatePagination() {
   loadMovies();
   pageCount.textContent = page;
   pageCountBottom.textContent = page;
};

// Add events for dynamic pagination
btnNext.addEventListener('click', () => {
   if(page < 1000) {
      page+= 1;
      updatePagination();
   }
});

btnPrev.addEventListener('click', () => {
   if(page > 1) {
      page-= 1;
      updatePagination();
   }
});

// bottom dynamic pagination
btnNextBottom.addEventListener('click', () => {
   if(page < 1000) {
      page += 1;
      updatePagination();
   }
});

btnPrevBottom.addEventListener('click', () => {
   if(page > 1) {
      page -= 1;
      updatePagination();
   }
});

// TODO: simplify code if possible ↑

const loadMovies = async () => {
   
   try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=156a9d1b2c086e56ae5d4b2983e2b0f4&page=${page}`);

      // Check if the response is correct
      if(response.status === 200) {
         const data = await response.json();

         let movies = '';

         data.results.forEach(movie => {
            // Get the release year
            const releaseDate = movie.release_date;
            const year = releaseDate.split('-')[0];

            movies+= `
            <div class="flex flex-col"> 
               <div>
                  <img class="w-full h-full" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie or serie cover">
               </div>
               <div class="text-sm md:text-base flex-grow flex flex-col justify-between">
                  <p class="mt-1 mb-5 font-semibold">${movie.title}</p>
                  <div class="flex justify-between">
                     <p class="">${year}</p>
                     <span class="px-0.5 border text-xs md:text-sm">Movie</span>
                  </div>
               </div>
            </div> <!--card-->
            `;
         });

         // Place the movies in the HTML
         const moviesContainer = document.querySelector('#container');
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