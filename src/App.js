import "./App.css";
import Movies from "./components/Movies";
import { getMovies } from "./services/fakeMovieService";

import { useState } from "react";

function App() {
  const [movies, setMovies] = useState(getMovies());

  const handleLike = (movie) => {
    const moviesN = [...movies];
    const index = movies.indexOf(movie);
    moviesN[index] = { ...movies[index] };
    moviesN[index].liked = !movies[index].liked;
    setMovies(moviesN);
  };

  const handleDelete = (movie) => {
    setMovies(movies.filter((m) => m._id !== movie));
  };

  if (movies.length === 0) {
    return <p>There are no movies to show</p>;
  }
  return (
    <main className="container">
      <p>Showing {movies.length} movies in the database</p>
      <Movies onClick={handleLike} movies={movies} onDelete={handleDelete} />
    </main>
  );
}

export default App;
