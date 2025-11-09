export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "number"
    | "password"
    | "date"
    | "tel"
    | "url"
    | "file"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "hidden";
  required?: boolean;
  minLength?: number;
  multiple?: boolean;
  value?: string | number;
  options?: { label: string; value: string }[];
  defaultValue?: string | number;
  placeholder?: string;
  messages?: {
    required?: string;
    minLength?: string;
    invalid?: string;
  };
};
