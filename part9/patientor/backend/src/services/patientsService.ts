import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry  } from '../types';

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

const addPatientEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const patient= patients.find(patient => patient.id === id);
  if (!patient) {
    throw new Error('patient with this id does not exist');
  }

  const newEntry = {...entry, id: uuidv4()};
  
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatient,
  addPatient,
  addPatientEntry
};