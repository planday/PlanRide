import React from "react";
import Page from "../components/Page";
import { Box, Grid, Container, Typography } from "@mui/material";
import TransportationOfferForm from "../sections/offers/TransportationOfferForm";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { OidcSecure } from "@axa-fr/react-oidc-context";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const CreateTransportationOffer: React.FC = () => {
  const { t } = useTranslation();
  return (
    // <OidcSecure>
      <Page title={t("Home.Title")}>
        <Container maxWidth="md">
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                {t("CreateTransportationOffer.Title")}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {t("CreateTransportationOffer.Subtitle")}
              </Typography>
            </Box>
            <TransportationOfferForm />
          </ContentStyle>
        </Container>
      </Page>
    // </OidcSecure>
  );
};

export default CreateTransportationOffer;
