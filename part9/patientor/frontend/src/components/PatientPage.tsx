import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Container, Header, Icon, List, Button } from 'semantic-ui-react';
import { Patient, Gender, EntryFormValues } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, showPatient } from '../state';
import AddEntryModal from '../AddEntryModal';

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case 'male':
      return 'mars';
    case 'female':
      return 'venus';
    case 'other':
      return 'genderless';
  }
};

const rankingColor = (ranking: Number) => {
  switch (ranking) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'orange';
    case 3:
      return 'red';
    default:
      return 'grey';
  };
};

const entryTypeIcon = (type: String) => {
  switch (type) {
    case 'OccupationalHealthcare':
      return 'hospital';
    case 'Hospital':
      return 'treatment';
    case 'HealthCheck':
      return 'doctor';
    default:
      return 'doctor';
  }
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [{ diagnoses }] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    const patientData = async (patientId: string) => {
      const { data: patientInfo } = await axios.get(`${apiBaseUrl}/patients/${patientId}`);
      setPatient(patientInfo);
      dispatch(showPatient(patientInfo));

    };

    if (patients[id] && patients[id].ssn) {
      setPatient(patients[id]);
    } else {
      patientData(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values);
      const { data: patientInfo } = await axios.get(`${apiBaseUrl}/patients/${id}`);
      setPatient(patientInfo);
      dispatch(showPatient(patientInfo));
      closeModal();
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return (<div>Page not found</div>);
  }

  return (
    <div>
      <Container>
        <Header>{patient.name} <Icon name={genderIcon(patient.gender)} /></Header> 
        <div> ssn: {patient.ssn}</div>
        <div> occupation: {patient.occupation }</div>
        <Header>entries</Header>
          {patient.entries.map((entry) =>
          <div key={entry.id} style={{border: '1px solid grey', margin: '5px'}}>
            <p>
              {entry.date} <Icon name={entryTypeIcon(entry.type)} />
            </p>
            <p>{entry.description} </p>
            {entry.type === 'HealthCheck' && <Icon name='heart' color={rankingColor(entry.healthCheckRating)} />}
            {entry.type === 'Hospital' && <p>Discharge: {entry.discharge.date}: {entry.discharge.criteria}</p>}
            {entry.type === 'OccupationalHealthcare' && entry.sickLeave && 
                <p>
                  sick leave dates: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                </p>
            }
            <List bulleted>
              {entry.diagnosisCodes?.map((code) => (
                  <List.Item key={code}>{code} {diagnoses[code].name} </List.Item>
                ))}
            </List>
          </div>
          )}   
      </Container>
      <Container>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    </div>
  );
};

export default PatientPage;