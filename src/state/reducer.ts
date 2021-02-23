import { State } from "./state";
import { Patient } from "../types";

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
    default:
      return state;
  }
};

export {setPatients, addPatient, editPatients};