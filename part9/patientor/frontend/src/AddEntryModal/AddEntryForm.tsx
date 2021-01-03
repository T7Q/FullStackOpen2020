import React from 'react';
import { Tab } from 'semantic-ui-react';

import HospitalEntryForm from './HospitalEntryForm';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OHEntryForm from './OHEntryForm';
import { EntryFormValues } from '../types';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type EntryOption = {
  value: string;
  label: string;
};

interface TextProps {
  name: string;
  label: string;
  placeholder: string;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const panes = [
    {
      menuItem: 'Hospital',
      // eslint-disable-next-line react/display-name
      render: () => (
        <Tab.Pane>
          <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'HealthCheck',
      // eslint-disable-next-line react/display-name
      render: () => (
        <Tab.Pane>
          <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'OccupationalHealthcare',
      // eslint-disable-next-line react/display-name
      render: () => (
        <Tab.Pane>
          <OHEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      )
    },
  ];

  return <Tab panes={panes} />;
};

export default AddEntryForm;