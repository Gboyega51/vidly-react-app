import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { useState } from "react";
import { paginate } from "../utils/Paginate";

const Movies = ({ movies: allMovies, onDelete, onClick }) => {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (allMovies.length === 0) {
    return <p>There are no movies to show</p>;
  }

  const movies = paginate(allMovies, currentPage, pageSize);
  return (
    <div>
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
        itemsCount={allMovies.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Movies;
