import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { editPatients, useStateValue, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry } from "../types";
import 'semantic-ui-css/semantic.min.css';
import { List, Button } from "semantic-ui-react";
import EntryDetails from "./entryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientsPage: React.FC = (): JSX.Element => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    let current = Object.values(patients).find(a => a.id === id);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };
    const submitNewEntry = async (values: EntryFormValues) => {
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}`,
          values
        );
        if (current){
        dispatch(addEntry(newEntry, current));
        closeModal();
        }
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };
      if (!current) {
        return (<div>Nothing found</div>);
    }
    const gender = current.gender;
    if (!current.ssn) {
        axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then(patient => {
            if (patient.data.ssn) {
                current = patient.data;
                const newPatients = Object.values(patients).filter(a => a.id !== id).concat(current);
                dispatch(editPatients(newPatients));
            }
        });
    }
    const entries = current.entries;
    return (
        <div>
            <h2>{current.name} <Sematic gender={gender}/></h2>
            <div>ssn: {current.ssn}</div>
            <div>occupation: {current.occupation}</div>
            <h4>entries</h4>
            {entries?.map(entry => 
            <div key={entry.id}>
            <EntryDetails entry={entry}/>
            </div>
            )}
            <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button> 
        </div>
    );
};

const Sematic: React.FC<{gender: Gender}> = ({gender}) => {
    if (gender === 'male') {
        return <List.Icon name='mars'/>;
    } else if (gender === 'female') {
        return <List.Icon name='venus'/>;
    } else {
        return <List.Icon name='genderless'/>;
    }
};


export default PatientsPage;