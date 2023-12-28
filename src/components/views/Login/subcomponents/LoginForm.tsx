import { Stack, Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import TextInput from "../../../atoms/TextInput/TextInput";
import { useMutation } from "@tanstack/react-query";
import { tryLogin } from "../../../../core/services/user";
import ErrorMessage from "../../../atoms/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../../atoms/SuccessMessage/SuccessMessage";

export default function LoginForm() {
  const {
    mutate,
    isLoading,
    isError: isLoginError,
    isSuccess,
  } = useMutation({
    mutationFn: tryLogin,
  });

  return (
    <>
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
          mutate(values);
        }}
      >
        {(formik) => {
          if (isLoginError && !formik.isValid) {
            formik.setErrors({
              email: "",
              password: "",
            });
          }
          return (
            <Form>
              <Stack spacing={3} sx={{ pt: "20px", mb: "10px" }}>
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
          );
        }}
      </Formik>
      {isLoginError ? (
        <ErrorMessage sx={{ fontSize: "0.9em" }}>
          Błędny email lub hasło
        </ErrorMessage>
      ) : (
        <></>
      )}
      {isSuccess ? (
        <SuccessMessage sx={{ fontSize: "0.9em" }}>
          Zalowowano pomyślnie!
        </SuccessMessage>
      ) : (
        <></>
      )}
    </>
  );
}
