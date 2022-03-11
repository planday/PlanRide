import React, { useEffect } from "react";
import Page from "../components/Page";
import { Box, Grid, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import RequestDetails from "../sections/requests/RequestDetails";
import { OidcSecure } from "@axa-fr/react-oidc-context";
import { useNavigate, useParams } from "react-router-dom";
import RequestDetailsIcon from "../sections/requests/RequestDetailsIcon";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Request: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { requestId } = useParams();

  useEffect(() => {
    console.log(requestId)
  }, [requestId])
  
  
  if(!requestId){
    return <React.Fragment></React.Fragment>;
  }



  return (
    // <OidcSecure>
      <Page title={t("Requests.Title")}>
        <Container >
          {<ArrowBackIosIcon onClick={() => navigate("/requests")}/>}
          <Box sx={{ pb: 5 }}>
          </Box>
          {/* <RequestDetails requestId={requestId} /> */}
          <RequestDetailsIcon requestId={requestId} />
        </Container>
      </Page>
    // </OidcSecure>
  );
};

export default Request;
