import React from "react";
import Page from "../components/Page";
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
// import RequestsList from "../sections/requests/RequestsList";
import RequestsListIcons from "../sections/requests/RequstsListIcons";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("Requests.Title")}>
      <Container maxWidth="md">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h2">{t("Requests.Slogan")}</Typography>
        </Box>
        {/* <RequestsList /> */}
        <RequestsListIcons />
      </Container>
    </Page>
  );
};

export default Home;
