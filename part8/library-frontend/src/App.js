import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, LOGIN, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('error', error)
    },
  })
  const client = useApolloClient()

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      alert(`a new book added "${newBook.title}" by ${newBook.author.name}`)
    },
  })

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Login show={page === 'login'} login={login} />

      <Authors show={page === 'authors'} authors={authors} />

      <Recommended show={page === 'recommend'} books={books} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} addBook={addBook} />
    </div>
  )
}

export default App
