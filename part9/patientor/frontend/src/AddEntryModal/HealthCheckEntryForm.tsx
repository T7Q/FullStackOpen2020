import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { HCEValues } from '../types';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: HCEValues) => void;
  onCancel: () => void;
}

const validateForm = (values: HCEValues) => {
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
  if (values.healthCheckRating !== 0 && !values.healthCheckRating) {
    errors.healthCheckRating = requiredError;
  }
  return errors;
};

export const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
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
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
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

export default HealthCheckEntryForm;