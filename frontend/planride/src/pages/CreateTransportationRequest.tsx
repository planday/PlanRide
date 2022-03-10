import React from "react";
import Page from "../components/Page";
import { Box, Grid, Container, Typography } from "@mui/material";
import TransportationRequestForm from "../sections/requests/TransportationRequestForm";
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

const CreateTransportationRequest: React.FC = () => {
  const { t } = useTranslation();
  return (
    <OidcSecure>
      <Page title={t("Home.Title")}>
        <Container maxWidth="md">
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                {t("CreateTransportationRequest.Title")}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {t("CreateTransportationRequest.Subtitle")}
              </Typography>
            </Box>
            <TransportationRequestForm />
          </ContentStyle>
        </Container>
      </Page>
    </OidcSecure>
  );
};

export default CreateTransportationRequest;
