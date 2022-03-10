import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import { Button } from "@mui/material";
// component
import Iconify from "../Iconify";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.primary.light,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

interface IAvailableRidesProps {}

const AvailableRides: React.FC<IAvailableRidesProps> = (props) => {
  const { t } = useTranslation();
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="ant-design:android-filled" />
      </IconWrapperStyle>
      <Typography variant="h3">258</Typography>
      <Typography variant="subtitle2">{t("Home.Offers")}</Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to="create-transportation-offer"
        startIcon={<Iconify icon="eva:plus-fill" />}
        sx={{ marginTop: "30px" }}
        color="secondary"
      >
        {t("Home.ProvideTransport")}
      </Button>
    </RootStyle>
  );
};

export default AvailableRides;
