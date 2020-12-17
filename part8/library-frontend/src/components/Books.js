import React, { useState, useEffect } from 'react'
import Genre from './Genre'

const Books = (props) => {
  
  const [genre, setGenre] = useState('all genres')
  const [books, setBooks] = useState([])
  const [booksList, setBooksList] = useState([])

  
  useEffect(() => {
    setBooks(props.books.loading ? [] : props.books.data.allBooks)
    setBooksList(books)
  }, [props.books, books])

  useEffect(() => {
    if (genre === 'all genres')
      setBooksList(books)
    else
      setBooksList(books.filter(book => book.genres.includes(genre)))
  }, [genre, books])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksList.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Genre books={books} genre={genre} setGenre={setGenre}/>
    </div>
  )
}

export default Books
