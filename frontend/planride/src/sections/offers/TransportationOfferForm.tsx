import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker, LoadingButton } from "@mui/lab";
// component
import Iconify from "../../components/Iconify";
import { Instant, LocalDate, LocalTime } from "js-joda";
import {
  ITransportationOfferDto,
  useTransportationOfferForm,
} from "./TransportationOfferForm.hooks";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const TransportationOfferForm: React.FC = () => {
  const { t } = useTranslation();
  const { createTransportationOffer, isLoading } = useTransportationOfferForm();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required(
      t("Errors.RequiredField")
    ),
    lastName: Yup.string().required(
      t("Errors.RequiredField")
    ),
    email: Yup.string()
      .email(t("Errors.Email"))
      .required(t("Errors.RequiredField")),
    mobile: Yup.string().required(
      t("Errors.RequiredField")
    ),
    seats: Yup.number()
      .positive()
      .required(t("Errors.RequiredField")),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      departureCountry: "pl",
      departureLocation: null,
      departureDate: LocalDate.now().toString(),
      departureTime: null,
      destinationCountry: "dk",
      destinationLocation: null,
      seats: 0,
      comments: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      createTransportationOffer(data as any);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationOffer.DepartureTitle")}
          </Typography>
          <FormControl>
            <InputLabel id="departureCountryLabel">
              {t("CreateTransportationOffer.DepartureCountry")}
            </InputLabel>
            <Select
              id="departureCountry"
              {...getFieldProps("departureCountry")}
              labelId="departureCountryLabel"
              label={t("CreateTransportationOffer.DepartureCountry")}
            >
              <MenuItem value="pl">Poland</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="departureLocationLabel">
              {t("CreateTransportationOffer.DepartureLocation")}
            </InputLabel>
            <Select
              id="departureLocation"
              labelId="departureLocationLabel"
              label={t("CreateTransportationOffer.DepartureLocation")}
              {...getFieldProps("departureLocation")}
            >
              <MenuItem value={1973830}>Przemysl</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            label={t("CreateTransportationOffer.DepartureDate")}
            onChange={(val) => {
              formik.setFieldValue("departureDate", val);
            }}
            value={formik.values.departureDate}
            inputFormat="yyyy-MM-dd"
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label={t("CreateTransportationOffer.DepartureTime")}
            onChange={(val: Date | null) => {
              formik.setFieldValue("departureTime", val?.toISOString());
            }}
            value={
              formik.values.departureTime
            }
            ampm={false}
            inputFormat="HH:mm"
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationOffer.DestinationTitle")}
          </Typography>
          <FormControl>
            <InputLabel id="destinationCountryLabel">
              {t("CreateTransportationOffer.DestinationCountry")}
            </InputLabel>
            <Select
              id="destinationCountry"
              labelId="destinationCountryLabel"
              label={t("CreateTransportationOffer.DestinationCountry")}
              {...getFieldProps("destinationCountry")}
            >
              <MenuItem value="pl">Poland</MenuItem>
              <MenuItem value="dk">Denmark</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="destinationLocationLabel">
              {t("CreateTransportationOffer.DestinationLocation")}
            </InputLabel>
            <Select
              id="destinationLocation"
              {...getFieldProps("destinationLocation")}
              labelId="destinationLocationLabel"
              label={t("CreateTransportationOffer.DestinationLocation")}
            >
              <MenuItem value={638436}>Odense</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationOffer.PassengersTitle")}
          </Typography>
          <TextField
            fullWidth
            type="number"
            label={t("CreateTransportationOffer.NumberOfSeats")}
            {...getFieldProps("seats")}
            error={Boolean(touched.seats && errors.seats)}
            helperText={touched.seats && errors.seats}
          />
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationOffer.ContactPersonTitle")}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label={t("CreateTransportationOffer.FirstName")}
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label={t("CreateTransportationOffer.LastName")}
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t("CreateTransportationOffer.Email")}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="mobile"
            label={t("CreateTransportationOffer.Mobile")}
            {...getFieldProps("mobile")}
            error={Boolean(touched.mobile && errors.mobile)}
            helperText={touched.mobile && errors.mobile}
          />
          <Typography variant="h6" gutterBottom>
            {t("CreateTransportationOffer.OtherTitle")}
          </Typography>
          <TextField
            id="comments"
            label={t("CreateTransportationOffer.Comments")}
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
            {t("CreateTransportationOffer.Send")}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default TransportationOfferForm;
