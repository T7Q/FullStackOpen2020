import React from 'react'

const Genre = ({ books, genre, setGenre }) => {
  const genres = books.reduce(
    (result, book) => result.concat(book.genres.map((genre) => genre)),
    []
  )
  genres.push('all genres')

  return (
    <div>
      {genres.map((genre, index) => (
        <button key={index} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Genre
