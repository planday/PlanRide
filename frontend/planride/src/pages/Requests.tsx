import React from "react";
import Page from "../components/Page";
import { Box, Grid, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import RequestsList from "../sections/requests/RequestsList";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("Requests.Title")}>
      <Container maxWidth="md">
        <Box sx={{ pb: 5 }}>
          <Typography variant="body1">{t("Requests.Slogan")}</Typography>
        </Box>
        <RequestsList />
      </Container>
    </Page>
  );
};

export default Home;
