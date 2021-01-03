import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { OHEValues } from '../types';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: OHEValues) => void;
  onCancel: () => void;
}

const validateForm = (values: OHEValues) => {
  const requiredError = 'Field is required';
  const dateError = 'Invalid date';
  const errors: { [field: string]: any } = {};

  if (!values.date) {
    errors.date = requiredError;
  } else if (!Date.parse(values.date)) {
    errors.date = dateError;
  }
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.employerName) {
    errors.employerName = requiredError;
  }

  const otherErrors: { [field: string]: string } = {};
    if (values.sickLeave && !values.sickLeave.startDate) {
      otherErrors.startDate = requiredError;
    } else if (values.sickLeave && !Date.parse(values.sickLeave.startDate)) {
      otherErrors.startDate = dateError;
    }
    if (values.sickLeave && !values.sickLeave.endDate) {
      otherErrors.endDate = requiredError;
    } else if (values.sickLeave && !Date.parse(values.sickLeave.endDate)) {
      otherErrors.endDate = dateError;
    }
    if (Object.keys(otherErrors).length > 0) {
      errors.sickLeave = otherErrors;
  }
  return errors;
};

export const OHEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: 'OccupationalHealthcare',
        description: '',
        date: '',
        specialist: '',
        employerName: '',
        diagnosisCodes: [],
        sickLeave: {
          startDate: '',
          endDate: ''
        }
      }}
      onSubmit={onSubmit}
      validate={validateForm}
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
            label='Employer Name'
            placeholder=''
            name='employerName'
            component={TextField}
            />
            <Field
              label='Sick Leave Start'
              placeholder='YYYY-MM-DD'
              name='sickLeave.startDate'
              component={TextField}
            />
            <Field
              label='Sick Leave End'
              placeholder='YYYY-MM-DD'
              name='sickLeave.endDate'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OHEntryForm;