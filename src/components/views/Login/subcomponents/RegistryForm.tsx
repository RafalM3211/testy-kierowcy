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
        name: Yup.string()
          .test({
            test: (name) => {
              return !name?.match(/[^(\s|\w)]/);
            },
            message: "Nazwa użytkownika nie może zawierać znaków specjalnych",
          })
          .min(3, "minimalna długość to 3 znaki")
          .max(20, "maksymalna długość to 20 znaków"),
        password: Yup.string()
          .required("to pole jest wymagane")
          .test({
            message: "Hasło nie może zawierać spacji",
            test: (password) => {
              return !password?.match(/\s/);
            },
          })
          .min(3, "minimalna długość to 3 znaki")
          .max(50, "maksymalna długość to 50 znaków"),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <Form style={{ width: "100%" }}>
          <Stack spacing={4} sx={{ pt: "20px" }}>
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
