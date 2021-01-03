import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { HEValues } from '../types';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: HEValues) => void;
  onCancel: () => void;
}

const validateForm = (values: HEValues) => {
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
  
  const otherErrors: { [field: string]: string } = {};
    if (!values.discharge.criteria) {
      otherErrors.criteria = requiredError;
    }
    if (!values.discharge.date) {
      otherErrors.date = requiredError;
    } else if (!Date.parse(values.discharge.date)) {
      otherErrors.date = dateError;
    }
    if (Object.keys(otherErrors).length > 0) {
      errors.discharge = otherErrors;
  }

  return errors;
};

export const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: ''
        },
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
            label='Discharge Date'
            placeholder='YYYY-MM-DD'
            name='discharge.date'
            component={TextField}
            />
            <Field
              label='Discharge Criteria'
              placeholder="Discharge Criteria"
              name='discharge.criteria'
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

export default HospitalEntryForm;