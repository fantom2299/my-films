

$(document).ready(() => {
	$("#searchForm").on("submit", (e) => {
		let searchText = $("#searchText").val();
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovie(movie_id) {
	let id = movie_id;

	axios
		.get(
			"https://api.themoviedb.org/3/movie/" +
			id +
			"?api_key=f40e8f19b76f7daa402b0725b05d8a01&language=en-US"
		)
		.then((response) => {
			console.log(response);
			let movie = response.data;

			const genre =
				movie.genres && Array.isArray(movie.genres)
					? movie.genres.map((s) => `<span>${s.name}</span>`)
					: "";

			let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong>
                ${genre}
              </li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Review:</strong> ${movie.overview}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

			$("#movies").html(output);
		})
		.catch((err) => {
			console.log(err);
		});
}

function getMovies(searchText) {
	axios
		.get(
			"https://api.themoviedb.org/3/search/movie?api_key=f40e8f19b76f7daa402b0725b05d8a01&language=ru-RU&query=" +
			searchText
		)
		.then((response) => {
			console.log(response);
			let movies = response.data.results;
			let output = "";
			$.each(movies, (index, movie) => {
				output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}">
              <h5>${movie.original_title}</h5>
              <div class="see-more" data-value="${movie.id}">Movie Details</div>
            </div>
          </div>
        `;
			});

			$("#movies").html(output);
			$(".see-more").click((e) => {
				console.log(e.target.dataset.value);

				getMovie(e.target.dataset.value);
			});
		})
		.catch((err) => {
			console.log(err);
		});
}



