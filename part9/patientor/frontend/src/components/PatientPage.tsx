import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Container, Header, Icon, List } from 'semantic-ui-react';
import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, showPatient } from '../state';

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

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | undefined>();

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


  if (!patient) {
    return (<div>Page not found</div>);
  }

  return (
    <Container>
      <Header>{patient.name} <Icon name={genderIcon(patient.gender)} /></Header> 
      <div> ssn: {patient.ssn}</div>
      <div> occupation: {patient.occupation }</div>
      <Header>entries</Header>
      {patient.entries.map((entry) =>
      <div key={entry.id}>
        <p>
          {entry.date} {entry.description}
        </p>
        <List bulleted>
          {entry.diagnosisCodes?.map((code) => (
              <List.Item key={code}>{code}</List.Item>
            ))}
        </List>
      </div>
      )

      }
    </Container>
  );
};

export default PatientPage;