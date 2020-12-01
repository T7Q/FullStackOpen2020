import React from 'react';

const Notification = ({ notification: {text, type} }) => {
    const style = {
        color: type === 'error' ? 'red' : 'green',
        backgroundColor: 'lightgrey',
        border: type === 'error' ? '1px solid red' : '1px solid green',
        padding: '5px',
        margin: '0px 0px 10px 0px',
    }
    if (text === '') {
        return null;
    }

    return <div style={style}>{text}</div>;
};

export default Notification;