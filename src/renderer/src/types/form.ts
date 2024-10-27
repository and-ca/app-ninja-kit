import { AlertProps } from './alert';
import { FormName, FormType, ChannelInvoke } from '../Enum';

export interface FormSchemaClass {
  field?: string;
  label?: string;
  input?: string;
  button?: string;
  message?: string;
}

export interface FormSchemaValidation {
  required?: string;
  pattern?: FormSchemaValidationPattern;
}

export interface FormSchemaValidationPattern {
  value?: string;
  message?: string;
}

export interface FormSchemaOption {
  value?: string;
  label?: string;
}

export type FormSchemaField = 'input' | 'button' | 'radio' | 'checkbox' | 'textArea';
export type FormSchemaType =
  | 'input'
  | 'button'
  | 'submit'
  | 'radio'
  | 'checkbox'
  | 'email'
  | 'hidden'
  | 'password';
export interface FormSchema {
  field: FormSchemaField;
  type: FormSchemaType;
  label: string;
  name: string;
  options?: FormSchemaOption[];
  validation?: FormSchemaValidation;
  className?: FormSchemaClass;
  link?: string;
}

export interface FormMessage {
  default?: AlertProps;
  error?: AlertProps;
  success?: AlertProps;
  failure?: AlertProps;
}

export interface FormProps {
  schema: FormSchema[];
  className: string;
  formName: FormName;
  message?: FormMessage;
  formType: FormType;
  formEndpoint: ChannelInvoke;
  formAction: (data: string | undefined) => void;
  formPrepare: (data: Payload) => Payload;
}

export interface FormError {
  message?: string;
}

export interface FieldProps {
  schema: FormSchema;
  register: (name: string, RegisterOptions?) => { onChange; onBlur; name; ref };
  errors?: FormError;
}

export interface ButtonProps {
  schema: FormSchema;
  isDisabled: boolean;
  isLoading: boolean;
}

export type UserType = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type Payload = {
  formType: FormType;
  formName: FormName;
  formState: UserType;
  formError?: PayloadFormError[];
};

export type PayloadFormError = {
  field: string,
  error: object
}

export type ResponseCode = 200 | 400 | 401 | 404 | 500;

export type Response = {
  code: ResponseCode;
  success: boolean;
  message: string;
  data?: string;
};
