import React from 'react';

import { coursePart } from "../types";

const Content: React.FC<{ courses: coursePart[] }> = ({ courses }) => {
  return (
    <>
      {courses.map((part: coursePart, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  )
};

export default Content;