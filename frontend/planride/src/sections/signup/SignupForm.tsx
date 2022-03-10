import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker, LoadingButton } from "@mui/lab";
// component
import { useTranslation } from "react-i18next";
import {
  useSignupForm,
  ISignupRequestDto,
} from "./SignupForm.hooks";
import { LocalDate } from "js-joda";

// ----------------------------------------------------------------------

const SignupForm: React.FC = () => {
  const { t } = useTranslation();
  const { signup, isLoading } = useSignupForm();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t("Errors.RequiredField")),
    lastName: Yup.string()
      .required(t("Errors.RequiredField")),
    email: Yup.string()
      .email(t("Errors.Email"))
      .required(t("Errors.RequiredField")),
    mobile: Yup.string().required(t("Errors.RequiredField")),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      signup(data as ISignupRequestDto);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label={t("Signup.FirstName")}
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label={t("Signup.LastName")}
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t("Signup.Email")}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="mobile"
            label={t("Signup.Mobile")}
            {...getFieldProps("mobile")}
            error={Boolean(touched.mobile && errors.mobile)}
            helperText={touched.mobile && errors.mobile}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            {t("Signup.Register")}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
