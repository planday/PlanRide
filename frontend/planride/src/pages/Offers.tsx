import React from "react";
import Page from "../components/Page";
import { Box, Grid, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import OffersList from "../sections/offers/OffersList";

const Offers: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("Offers.Title")}>
      <Container maxWidth="md">
        <Box sx={{ pb: 5 }}>
          <Typography variant="body1">{t("Offers.Slogan")}</Typography>
        </Box>
        <OffersList />
      </Container>
    </Page>
  );
};

export default Offers;
