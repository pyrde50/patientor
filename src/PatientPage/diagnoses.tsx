import React from "react";
import { useStateValue } from "../state";

interface Props {
    code: string;
}

const Diagnose: React.FC<Props> = (props): JSX.Element | null => {
    const [{ diagnoses }] = useStateValue();
    const final = Object.values(diagnoses).find(a => a.code === props.code);
    if (!final) {
        return null;
    }
    return (
        <div key={final.code}>
        <li>{final.code} {final.name}</li>
        </div>
    );
};


export default Diagnose;