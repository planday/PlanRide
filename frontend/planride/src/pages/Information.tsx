import React from "react";
import Page from "../components/Page";
import { useTranslation } from "react-i18next";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const Information: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("Information.PageTitle")}>
      <Container maxWidth="md">
        <ContentStyle>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h1">{t("Information.Title")}</Typography>
            <Typography variant="body1" gutterBottom>
              {t("Information.InfoBody")}
            </Typography>
            <Typography variant="h4">
              {t("Information.DisclaimerTitle")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t("Information.DisclaimerBody")}
            </Typography>
            <Typography variant="h4">{t("Information.GDPRTitle")}</Typography>
            <Typography variant="body1" gutterBottom>
              {t("Information.GDPRBody")}
            </Typography>

            <Button
              fullWidth
              component={RouterLink}
              size="large"
              type="submit"
              variant="contained"
              color="info"
              to="shelter-map"
              endIcon={
                <ArrowForwardIcon
                  sx={{ position: "absolute", right: 10, top: 13 }}
                />
              }
            >
              {t("Buttons.Next").toLocaleUpperCase()}
            </Button>
          </Box>
        </ContentStyle>
      </Container>
    </Page>
  );
};
export default Information;
