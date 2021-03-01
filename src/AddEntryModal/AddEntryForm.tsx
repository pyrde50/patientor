import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, typeOption, SelectFieldType, NumberField } from "../AddPatientModal/FormField";
import { Entry } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, "id" | "diagnosisCodes">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: typeOption[] = [
    { value: "Hospital", label: "Hospital"},
    { value: "OccupationalHealthcare", label: "Occupational Healthcare"},
    { value: "HealthCheck", label: "Health Check"}
];


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, values }) => {
        return (
          <Form className="form ui">
            <SelectFieldType
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <SpecialForm type={values.type}/>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
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

interface SpecialProps {
    type: string;
}

const SpecialForm: React.FC<SpecialProps> = ({ type }) => {
    switch (type) {
        case "HealthCheck": 
            return (
             <div>
               <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
/>
            </div>
            );
    
        default: 
        return null;
    }
    
};

export default AddEntryForm;
