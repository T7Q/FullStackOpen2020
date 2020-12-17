import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { SET_AUTHOR_BIRTH_YEAR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [year, setYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);
  const [setBirthYear] = useMutation(SET_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    },
  })
  if (!props.show) {
    return null
  }
 

  const authors = props.authors.loading ? [] : props.authors.data.allAuthors

  const options = authors.map((author) => {
    return {
      label: author.name,
    }
  })

  const updateBirthYear = (event) => {
    event.preventDefault()
    setBirthYear({
      variables: {
        name: selectedOption,
        setBornTo: parseInt(year),
      },
    })

    setSelectedOption(null)
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birth year</h3>
      <form onSubmit={updateBirthYear}>
        {/* <div>
          <label>name:</label>
          <input value={authorName} onChange={({ target }) => setauthorName(target.value)}></input>
        </div> */}
        <Select
          options={options}
          value={selectedOption}
          onChange={(val) => setSelectedOption(val.label)}
        />
        <div>
          <label>born:</label>
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}></input>
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
