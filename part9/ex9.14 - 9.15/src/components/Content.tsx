import React from 'react';

import { CoursePart } from "../types";
import Part from './Part';

const Content: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <>
      {courses.map((part, index) => (
        <Part key={index} course={part} />
      ))}
    </>
  )
};

export default Content;