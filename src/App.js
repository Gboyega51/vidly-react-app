import "./App.css";
import Movies from "./components/Movies";
import { getMovies } from "./services/fakeMovieService";

import { useState } from "react";

function App() {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (movie) => {
    setMovies(movies.filter((m) => m._id !== movie));
  };

  if (movies.length === 0) {
    return <p>There are no movies to show</p>;
  }
  return (
    <main className="container">
      <p>Showing {movies.length} movies in the database</p>
      <Movies movies={movies} onDelete={handleDelete} />
    </main>
  );
}

export default App;
