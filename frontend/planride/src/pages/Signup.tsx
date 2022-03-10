import React from "react";
import Page from "../components/Page";
import { Box, Grid, Container, Typography } from "@mui/material";
import SignupForm from "../sections/signup/SignupForm";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const Signup: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("Signup.PageTitle")}>
      <Container maxWidth="md">
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t("Signup.Title")}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {t("Signup.Subtitle")}
            </Typography>
          </Box>
          <SignupForm />
        </ContentStyle>
      </Container>
    </Page>
  );
};

export default Signup;
