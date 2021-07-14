import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { useState, useEffect } from "react";
import { paginate } from "../utils/Paginate";
import ListGroup from "./common/ListGroup";
import { getGenres } from "../services/fakeGenreService";

const Movies = ({ movies: allMovies, onDelete, onClick }) => {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    setGenres(getGenres());
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log(genre);
  };

  if (allMovies.length === 0) {
    return <p>There are no movies to show</p>;
  }

  const filtered = selectedGenre
    ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    : allMovies;
  const movies = paginate(filtered, currentPage, pageSize);

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <p>Showing {filtered.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, key) => (
              <tr key={key}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => onClick(movie)}
                    style={{ cursor: "pointer" }}
                    movies={movies}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => onDelete(movie._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
