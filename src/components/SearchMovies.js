import React, { useState, useEffect } from 'react';

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'fc94fb';
      const url = `/api/?s=${searchTerm}&apikey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };

    if (searchTerm !== '') {
      fetchData();
    }
  }, [searchTerm]);

  const handleSearch = e => {
    e.preventDefault();
    setSearchTerm(e.target.elements.search.value);
  };

  return (
    <div className="container-fluid">
      <div className="row my-4">
        <div className="col-12 col-md-6">
          {/* Buscador */}
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="search">Buscar por título:</label>
              <input type="text" className="form-control" id="search" />
            </div>
            <button className="btn btn-info" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2>Películas para la palabra: {searchTerm}</h2>
        </div>
        {/* Listado de películas */}
        {movies.length > 0 ? (
          movies.map((movie, i) => (
            <div className="col-sm-6 col-md-3 my-4" key={i}>
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h5 className="m-0 font-weight-bold text-gray-800">
                    {movie.Title}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="text-center">
                    <img
                      className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                      src={movie.Poster}
                      alt={movie.Title}
                      style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                    />
                  </div>
                  <p>{movie.Year}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning text-center">
              No se encontraron películas
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
