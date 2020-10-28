import React from 'react';
import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import reducer from './reducers/anecdoteReducer';
import { addVote, createAnecdote } from './reducers/anecdoteReducer';

const store = createStore(reducer);

const App = () => {
    const anecdotes = useSelector((state) => state.sort((a, b) => b.votes - a.votes));
    const dispatch = useDispatch();

    const vote = (id) => {
        console.log('vote', id);
        dispatch(addVote(id));
    };

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.new.value;
        event.target.new.value = '';
        dispatch(createAnecdote(content));
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="new" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default App;
