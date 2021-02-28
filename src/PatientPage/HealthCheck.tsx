import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import Diagnose from './diagnoses';
import 'semantic-ui-css/semantic.min.css';
import { List } from "semantic-ui-react";
import boxStyle from '../styles';

interface Props {
    entry: HealthCheckEntry;
}

const HealthCheck: React.FC<Props> = (props): JSX.Element | null => {
   const entry = props.entry;
    return (
        <div style={boxStyle}>
        <h2>{entry.date} <List.Icon name="doctor"/></h2>
        <div> {entry.description}</div>
        {entry.diagnosisCodes?.map(code => 
          <div key={code}>
            <Diagnose code={code}/>
          </div>
          
        )}
        <Sematic rating={entry.healthCheckRating}/>
    </div> 
    );
};

const Sematic: React.FC<{rating: HealthCheckRating}> = ({rating}) => {
    switch (rating) {
        case 0:
            return <List.Icon name="heart" color="green"/>;
        case 1:
            return <List.Icon name="heart" color="yellow"/>;
        case 2:
            return <List.Icon name="heart" color="red"/>;
        case 3:
            return <List.Icon name="heart" color="black"/>;
        default: 
        return null;
                                
    }
};



export default HealthCheck;