import { IncomingMessage, ServerResponse } from "http"
export type AuthStatus = "NONE" | "PASSED" | "UNREGISTER_USER" | "INVALID_PASSWORD"
export type User = {
  ID: string
  email: string
  name:string
  password: string
  given_name: string
  family_name: string
  picture: string
}
export type Context = {
  req: IncomingMessage; // an HTTP incoming message object (e.g., from Node.js http.IncomingMessage)
  res: ServerResponse; // an HTTP server response object (e.g., from Node.js http.ServerResponse)
}
export type FormDataType = {
  email: string
  name: string
  password: string
  given_name: string
  family_name: string
}
export interface StateType {
  otp: boolean
  code: string
  waiting:boolean
  formData: FormDataType
}
export interface ActionType {
  type: 'CHANGE_FORMDATA' | 'SET_OTPCODE' | 'SHOW_OTPCODE' | 'SET_WAITING';
  payload: {
    value: FormDataType | string | boolean
  }
}
export type DispatchType = (action: ActionType) => void;

export interface ContextType {
  otpState: StateType;
  dispatchOtpState: DispatchType;
}