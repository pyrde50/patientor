import React from "react";
import { HospitalEntry } from "../types";
import Diagnose from './diagnoses';
import boxStyle from '../styles';
import 'semantic-ui-css/semantic.min.css';
import { List } from "semantic-ui-react";

interface Props {
    entry: HospitalEntry;
}

const Hospital: React.FC<Props> = (props): JSX.Element | null => {
    const entry = props.entry;
    return (
        <div style={boxStyle}>
        <h2>{entry.date} <List.Icon name="hospital"/></h2>
        <div> {entry.description}</div>
        {entry.diagnosisCodes?.map(code => 
        <div key={code}>
            <Diagnose code={code}/>
        </div>
        )}
    </div> 
    );
};


export default Hospital;