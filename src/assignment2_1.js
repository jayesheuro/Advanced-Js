let moviesOutputObject = {};

function renderA2ans1() {
  document.getElementById("ass2ans1").classList.remove("hide");

  callMoviesApi();
}

async function callMoviesApi() {
  $("#ass2ans1").html(
    `<div class="loaderDiv"><img src="assets/loader.gif" alt="loader"/></div>`
  );
  await axios
    .get(
      "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json"
    )
    .then((res) => {
      moviesOutputObject["Actors"] = getMovieActors(res.data);
      moviesOutputObject["Genres"] = getMovieGenres(res.data);

      //rendering output
      console.log("ans 1: Actors and Genres", moviesOutputObject);
      $("#ass2ans1").html(
        `<span>Outputted to the console too.</span><br><pre>${JSON.stringify(
          moviesOutputObject,
          null,
          4
        )}</pre>`
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

function getMovieActors(data) {
  let all = [];
  let requiredActorData = [];
  let f_count = {};

  //finding unique actors from the movie cast
  data.map((movie) => {
    for (let i = 0; i < movie.cast.length; i++) {
      pattern = /^[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}(?:\s[a-zA-Z]{2,15})?$/;
      if (movie.cast[i].match(pattern) !== null) {
        all.push(movie.cast[i]);
      }
    }
  });
  let unique = Array.from(new Set(all));

  //finding movies casted by every actor (actor's movies)
  for (let actor in unique) {
    f_count[unique[actor]] = [];
  }

  data.map((movie) => {
    movie.cast.map((actor) => {
      let movie_arr = f_count[actor];
      if (typeof movie_arr !== "undefined") {
        movie_arr.push(movie.title);
        f_count[actor] = movie_arr;
      }
    });
  });

  for (const [key, value] of Object.entries(f_count)) {
    requiredActorData.push({
      Name: key,
      Movies: value,
    });
  }
  return requiredActorData;
}

function getMovieGenres(data) {
  let all = [];
  let requiredGenreData = [];
  let f_count = {};
  //find unique genres from genre list
  data.map((movie) => {
    for (let i = 0; i < movie.genres.length; i++) {
      pattern = /^[A-Za-z]+$/;
      if (movie.genres[i].match(pattern) !== null) {
        all.push(movie.genres[i]);
      }
    }
  });
  let unique_genres = Array.from(new Set(all));

  //find movies where genre list contains genre
  for (let genre in unique_genres) {
    f_count[unique_genres[genre]] = [];
  }
  data.map((movie) => {
    movie.genres.map((genre) => {
      let movie_arr = f_count[genre];
      if (typeof movie_arr !== "undefined") {
        movie_arr.push(movie.title);
        f_count[genre] = movie_arr;
      }
    });
  });

  for (const [key, value] of Object.entries(f_count)) {
    requiredGenreData.push({
      Type: key,
      Movies: value,
    });
  }
  return requiredGenreData;
}
