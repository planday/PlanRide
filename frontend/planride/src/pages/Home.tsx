import React from "react";
import Page from "../components/Page";
import { Box, Grid, Container, Typography } from "@mui/material";
import Offers from "../components/widgets/Offers";
import Requests from "../components/widgets/Requests";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("Home.Title")}>
      <Container maxWidth="md">
        <Box sx={{ pb: 5 }}>
          <Typography variant="body1">{t("Home.Slogan")}</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Offers />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Requests />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;
