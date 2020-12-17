import React from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommended = ({ show, books }) => {
  const user = useQuery(ME)
  
  if (!show) {
    return null
  }
  const genre = user.data.me.favoriteGenre
  const booksList = books.data.allBooks.filter((book) => book.genres.includes(genre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>patterns</strong>
      </p>
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
    </div>
  )
}

export default Recommended
