import React from 'react';

import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.name) {
    case 'Fundamentals':
    case 'Using props to pass data':
    case 'Deeper type usage':
    case 'Hello World':
      return (
        <>
          <p>{course.name} {course.exerciseCount} </p>
        </>)
    default:
      return assertNever(course);
  }
};

export default Part;