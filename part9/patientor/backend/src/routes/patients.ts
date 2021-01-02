import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(patientsService.getPatientById(id));
});

router.post('/', (req, res) => {
  try {
    const patientData = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(patientData);
    res.send(newPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id', (req, res) => {
  try {
    const entry = toNewEntry(req.body);
    const patient = patientsService.addPatientEntry(req.params.id, entry);
    res.json(patient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
})

export default router;