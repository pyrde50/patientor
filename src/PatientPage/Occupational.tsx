import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import Diagnose from './diagnoses';
import 'semantic-ui-css/semantic.min.css';
import { List } from "semantic-ui-react";
import boxStyle from '../styles';

interface Props {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare: React.FC<Props> = (props): JSX.Element | null => {
    const entry = props.entry;
    return (
        <div style={boxStyle}>
        <h2>{entry.date} <List.Icon name="cogs"/></h2>
        <div> {entry.description}</div>
        {entry.diagnosisCodes?.map(code => 
           <div key={code}>
           <Diagnose code={code}/>
       </div>
        )}
    </div> 
    );
};


export default OccupationalHealthcare;