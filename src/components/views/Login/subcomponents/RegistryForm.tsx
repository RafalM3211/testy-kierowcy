import { Stack, Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../../../atoms/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../../atoms/SuccessMessage/SuccessMessage";
import TextInput from "../../../atoms/TextInput/TextInput";
import { register } from "../../../../core/services/user";

export default function RegistryForm() {
  const {
    mutate,
    isError: isRegistryError,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: register,
  });

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("to pole jest wymagane")
            .email("niepoprwany adres email"),
          userName: Yup.string()
            .test({
              test: (userName) => {
                return !userName?.match(/[^(\s|\w)]/);
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
          mutate(values);
        }}
      >
        {(formik) => {
          if (isRegistryError && !formik.isValid) {
            formik.setErrors({
              email: "",
              userName: "",
              password: "",
            });
          }
          if (isRegistryError) console.log(data);

          return (
            <Form style={{ width: "100%" }}>
              <Stack spacing={4} sx={{ pt: "20px" }}>
                <TextInput label="email*" name="email" variant="standard" />
                <TextInput
                  label="nazwa użytkownika"
                  name="userName"
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
          );
        }}
      </Formik>
      {isRegistryError ? (
        <ErrorMessage sx={{ fontSize: "0.9em" }}>
          Podany uzytkownik juz istnieje
        </ErrorMessage>
      ) : (
        <></>
      )}
      {isSuccess ? (
        <SuccessMessage sx={{ fontSize: "0.9em" }}>
          zarejestrowano pomyślnie!
        </SuccessMessage>
      ) : (
        <></>
      )}
    </>
  );
}
