/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseString = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing parameter: ' + name);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseString(object.occupation),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
  };
};

export default toNewPatient;
