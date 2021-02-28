import React from "react";
import { Entry } from "../types";
import 'semantic-ui-css/semantic.min.css';
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./Occupational";


const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital":
            return <Hospital entry={entry}/>;
        case "HealthCheck":
            return <HealthCheck entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry}/>;
        default:
            return null;
    }
};


export default EntryDetails;