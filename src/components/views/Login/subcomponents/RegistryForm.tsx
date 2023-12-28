import { Stack, Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../atoms/TextInput/TextInput";

export default function RegistryForm() {
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("to pole jest wymagane")
          .email("niepoprwany adres email"),
        name: Yup.string().max(20, "maksymalna długość 20 znaków"),
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
              label="nazwa użytkownika"
              name="name"
              variant="standard"
            />
            <TextInput
              label="hasło*"
              type="password"
              name="password"
              variant="standard"
            />
            <Button disabled={!formik.isValid} type="submit">
              zarejestruj
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
