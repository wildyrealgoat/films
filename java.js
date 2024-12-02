
let URL_API= 'https://api.themoviedb.org/3/list/15570?api_key=516adf1e1567058f8ecbf30bf2eb9378&language=en-US';
const card = document.querySelector('.content');
const spinner = document.querySelector('#spinner');

//yy-mm-dd
const getYearFromDate = (date) => {
  let year= date.split('-').shift();
  return year;
};
var genres_movies= '{ "genres": [ { "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" } ] }';

const getNameGensFormId = (idGen) => {
  let genreName='';
  let obj = JSON.parse(genres_movies);
  for(let i=0;i<obj.genres.length;i++){
    if(idGen==obj.genres[i].id ){
      genreName=obj.genres[i].name;
      break;
    }
  }
  return genreName;
};

const getGenNames = (gensArrayIds) => {
  let gensName='';
  const sizeGenresArray = gensArrayIds.length;
  for(let i=0;i<sizeGenresArray;i++){
    gensName+=", "+getNameGensFormId( gensArrayIds[i] );
    
  }
  gensName = gensName.substr(1);
  return gensName;
};

function mapCards(movies){
  const html = movies.map(movie => {
    let title = movie.title || movie.name;
    let isMovieOrTv=(movie.title)?'movie':'tv';
    return `
      <div class="card" >
        <div class="frontWeb" style="background-image: url(234.jpg);"> 
          <p>${title}</p>
        </div>

        <div class="back">
          <div>
            <div class="release_date">${title} <span>(${getYearFromDate(movie.release_date)})</span></div>
            <div class="movie_gens">${getGenNames(movie.genre_ids)}</div>
            <div>⭐${movie.vote_average}</div>
            
            <p class="overview">${movie.overview}</p>
            <a target="_blank" href="https://www.themoviedb.org/${isMovieOrTv}/${movie.id}" class="button">Details</a>
          </div>
        </div>

      </div>
    `;
  }).join('');
  card.innerHTML= 
    `<h1 class="heading">Films</h1>`;
  card.innerHTML+= html;
}


async function fetchMovies(urlEndpoint) {
  let data;
  try {
    const response = await fetch(urlEndpoint);
    data = await response.json();

  
  } catch (error) {
    console.log(error);
  }
  
  return data.items || data.results;
}

(async () => {
  const movies = await fetchMovies(URL_API);
   spinner.setAttribute("hidden", "");
  mapCards(movies);
})();