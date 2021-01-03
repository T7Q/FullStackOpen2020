/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender, NewEntry, HealthCheckRating } from "./types";

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

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === 0) {
    return 0;
  }
  if (!rating || isNaN(parseInt(rating)) || !isHealthCheckRating(rating)) {
    throw new Error('Healt Check Rating should be from 0 to 3');
  }
  return Number(rating);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = ( object: any ): NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseString(object.occupation),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
  };
};

const isArrayOfStrings = (codes: any[]): boolean => {
  return codes.find(c => !isString(c)) === undefined;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (!diagnosisCodes || diagnosisCodes === undefined) {
    return [];
  }
  if (Array.isArray(diagnosisCodes) && !isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect diagnosis codes');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    type: parseString(object.type),
    date: parseDate(object.date),
    description: parseString(object.description),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  } as NewEntry;

  switch(baseEntry.type) {
    case 'HealthCheck':
      return {
          ...baseEntry,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case 'OccupationalHealthcare':
      if (object.sickLeave) {
        return {
            ...baseEntry,
            employerName: parseString(object.employerName),
            sickLeave: {
                startDate: parseDate(object.sickLeave.startDate),
                endDate: parseDate(object.sickLeave.endDate),
            }
        };
      }
      return {
          ...baseEntry,
          employerName: parseString(object.employerName),
      };
    case 'Hospital':
        return {
            ...baseEntry,
            discharge: {
                date: parseDate(object.discharge.date),
                criteria: parseString(object.discharge.criteria)
            }
        };
    default:
        throw new Error('incorrect or missing type: ' + object.type);
  }
};
