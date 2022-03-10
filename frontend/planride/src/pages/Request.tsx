import React from "react";
import Page from "../components/Page";
import { Box, Grid, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import RequestDetails from "../sections/requests/RequestDetails";
import { OidcSecure } from "@axa-fr/react-oidc-context";
import { useParams } from "react-router-dom";

const Request: React.FC = () => {
  const { t } = useTranslation();
  const { requestId } = useParams();

  if(!requestId){
    return <React.Fragment></React.Fragment>;
  }

  return (
    <OidcSecure>
      <Page title={t("Requests.Title")}>
        <Container maxWidth="md">
          <Box sx={{ pb: 5 }}>
            <Typography variant="body1">{t("Requests.Slogan")}</Typography>
          </Box>
          <RequestDetails requestId={requestId} />
        </Container>
      </Page>
    </OidcSecure>
  );
};

export default Request;
