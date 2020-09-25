import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ text, votes }) => (
    <div>
        <p>{text}</p>
        <p>has {all} votes </p>
        <p>has {votes} votes </p>
    </div>
);

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

    const handleNext = () => {
        const random = Math.floor(Math.random() * anecdotes.length);
        return setSelected(random);
    };

    const handleVote = () => {
      const votesCopy = [...votes]
      votesCopy[selected] += 1
      setVotes(votesCopy);
    };

    return (
        <div>
            <Anecdote text={anecdotes[selected]} all={votes} votes={votes[selected]}/>
            <Button onClick={handleVote} text="vote" />
            <Button onClick={handleNext} text="next anecdote" />
        </div>
    );
};

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
