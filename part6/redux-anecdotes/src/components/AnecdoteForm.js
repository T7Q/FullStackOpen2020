import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.new.value;
        event.target.new.value = '';
        dispatch(createAnecdote(content));
    };

    return (
        <div>
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

export default AnecdoteForm;
