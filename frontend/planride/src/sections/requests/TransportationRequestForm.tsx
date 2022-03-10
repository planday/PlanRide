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
import Iconify from "../../components/Iconify";
import { useTranslation } from "react-i18next";
import {
  useTransportationRequestForm,
  ITransportationRequestDto,
} from "./TransportationRequestForm.hooks";
import { LocalDate } from "js-joda";

// ----------------------------------------------------------------------

const TransportationRequestForm: React.FC = () => {
  const { t } = useTranslation();
  const { createTransportationRequest, isLoading } =
    useTransportationRequestForm();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t("Errors.RequiredField")),
    lastName: Yup.string()
      .required(t("Errors.RequiredField")),
    email: Yup.string()
      .email(t("Errors.Email"))
      .required(t("Errors.RequiredField")),
    mobile: Yup.string().required(t("Errors.RequiredField")),
    adults: Yup.number().positive().required(t("Errors.RequiredField")),
    children: Yup.number().required(t("Errors.RequiredField")),
    pets: Yup.number().required(t("Errors.RequiredField")),
  });

  const formik = useFormik({
    initialValues: {
      departureCountry: "pl",
      departureLocation: "",
      departureDate: LocalDate.now().toString(),
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      adults: 0,
      children: 0,
      pets: 0,
      comments: null,
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      createTransportationRequest(data as any);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationRequest.DepartureTitle")}
          </Typography>
          <FormControl>
            <InputLabel id="departureCountryLabel">
              {t("CreateTransportationRequest.DepartureCountry")}
            </InputLabel>
            <Select
              id="departureCountry"
              {...getFieldProps("departureCountry")}
              labelId="departureCountryLabel"
              label={t("CreateTransportationRequest.DepartureCountry")}
            >
              <MenuItem value="pl">Poland</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="departureLocationLabel">
              {t("CreateTransportationRequest.DepartureLocation")}
            </InputLabel>
            <Select
              id="departureLocation"
              {...getFieldProps("departureLocation")}
              labelId="departureLocationLabel"
              label={t("CreateTransportationRequest.DepartureLocation")}
            >
              <MenuItem value={42}>Przemysl</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            label={t("CreateTransportationRequest.DepartureDate")}
            onChange={(val) => {
              formik.setFieldValue("departureDate", val);
            }}
            value={formik.values.departureDate}
            inputFormat="yyyy-MM-dd"
            renderInput={(params) => (
              <TextField
                helperText={t("CreateTransportationRequest.DepartureDateHelp")}
                {...params}
              />
            )}
          />
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationRequest.PassengersTitle")}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              type="number"
              label={t("CreateTransportationRequest.Adults")}
              {...getFieldProps("adults")}
              error={Boolean(touched.adults && errors.adults)}
              helperText={touched.adults && errors.adults}
            />
            <TextField
              fullWidth
              type="number"
              label={t("CreateTransportationRequest.Children")}
              {...getFieldProps("children")}
              error={Boolean(touched.children && errors.children)}
              helperText={touched.children && errors.children}
            />
            <TextField
              fullWidth
              type="number"
              label={t("CreateTransportationRequest.Pets")}
              {...getFieldProps("pets")}
              error={Boolean(touched.pets && errors.pets)}
              helperText={touched.pets && errors.pets}
            />
          </Stack>
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationRequest.ContactPersonTitle")}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label={t("CreateTransportationRequest.FirstName")}
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label={t("CreateTransportationRequest.LastName")}
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t("CreateTransportationRequest.Email")}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="mobile"
            label={t("CreateTransportationRequest.Mobile")}
            {...getFieldProps("mobile")}
            error={Boolean(touched.mobile && errors.mobile)}
            helperText={touched.mobile && errors.mobile}
          />
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationRequest.OtherTitle")}
          </Typography>
          <TextField
            id="comments"
            label={t("CreateTransportationRequest.Comments")}
            multiline
            rows={4}
            {...getFieldProps("comments")}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            {t("CreateTransportationRequest.Send")}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default TransportationRequestForm;
