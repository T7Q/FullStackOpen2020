import patientsData from '../../data/patients.json';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
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
  const newPatient = {id: (patients.length + 1).toString(), ...entry};
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatient,
  addPatient
};