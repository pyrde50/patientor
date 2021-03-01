import { State } from "./state";
import { DiagnoseType, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "EDIT_PATIENT_LIST";
      payload: Patient[];
    }
    | {
      type: "SET_DIAGNOSES";
      payload: DiagnoseType[];
    } 
    | {
      type: "ADD_ENTRY";
      payload:  Patient;
    };


const setPatients = (content: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: content
    
  };
};

const addPatient = (content: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
    
  };
};

const editPatients = (content: Patient[]): Action => {
  return {
    type: "EDIT_PATIENT_LIST",
    payload: content
    
  };
};

const setDiagnoses = (content: DiagnoseType[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: content
    
  };
};

const addEntry = (entry: Entry, patient: Patient): Action => {
  console.log(patient.entries);
  const ab = patient.entries?.concat(entry);
  const finalPatient = {
    ...patient,
    entries: ab
  };
  return {
    type: "ADD_ENTRY",
    payload: finalPatient
    
    
  };
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "EDIT_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
        }
      };
      case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({...memo, [diagnose.code]: diagnose}),
            {}
          ),
          ...state.diagnoses
        }
      };
      case "ADD_ENTRY":
        return {
          ...state,
          patients: {
            [action.payload.id]: action.payload
          },
        };
    default:
      return state;
  }
};

export {setPatients, addPatient, editPatients, setDiagnoses, addEntry};