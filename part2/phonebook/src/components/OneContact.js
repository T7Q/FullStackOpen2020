import React from 'react';

const OneContact = ({ person }) => {
    return (
        <div>
            {person.name} {person.number}
        </div>
    );
};

export default OneContact;
