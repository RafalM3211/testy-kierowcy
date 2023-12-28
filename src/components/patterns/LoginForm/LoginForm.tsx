import { Stack, Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../atoms/TextInput/TextInput";

export default function LoginForm() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("to pole jest wymagane")
          .email("niepoprwany adres email"),
        password: Yup.string().required("to pole jest wymagane"),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <Form>
          <Stack spacing={3} sx={{ pt: "20px" }}>
            <TextInput label="email*" name="email" variant="standard" />
            <TextInput
              label="hasło*"
              type="password"
              name="password"
              variant="standard"
            />
            <Button disabled={!formik.isValid} type="submit">
              zaloguj
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
