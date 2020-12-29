import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient  } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {...entry, id: (patients.length + 1).toString(), entries: []};
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatient,
  addPatient
};