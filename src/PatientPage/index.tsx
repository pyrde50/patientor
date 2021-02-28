import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { editPatients, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import 'semantic-ui-css/semantic.min.css';
import { List } from "semantic-ui-react";
import EntryDetails from "./entryDetails";

const PatientsPage: React.FC = (): JSX.Element => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    let current = Object.values(patients).find(a => a.id === id);
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
    console.log(entries);
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