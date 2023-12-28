import { TextField } from "@mui/material";
import { useField } from "formik";

import type { TextFieldProps } from "@mui/material";

type Props = {
  label: string;
  name: string;
} & TextFieldProps;

export default function TextInput(props: Props) {
  const { label, name, ...textFieldProps } = props;

  const [field, meta] = useField(name);

  const isError = !!(meta.touched && meta.error);

  return (
    <TextField
      label={label}
      error={isError}
      helperText={isError && meta.error}
      FormHelperTextProps={{ sx: { height: 0, mt: 0 } }}
      type="text"
      {...field}
      {...textFieldProps}
      name={name}
    ></TextField>
  );
}
