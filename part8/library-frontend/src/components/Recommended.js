import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = ({ show }) => {
  const user = useQuery(ME)
  const [booksList, setBooksList] = useState([])
  const [getBooks, booksFiltered] = useLazyQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error)
    },
  })
 
  useEffect(() => {
    if (user.data && user.data.me) {
      getBooks({ variables: { genre: user.data.me.favoriteGenre } });
    }
  }, [user.data, getBooks])
  
  useEffect(() => {
    if (booksFiltered.data) {
      setBooksList(booksFiltered.data.allBooks);
    }
  }, [booksFiltered])

  if (!show) {
    return null
  }

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
