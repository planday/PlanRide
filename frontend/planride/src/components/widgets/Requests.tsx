import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// component
import Iconify from "../Iconify";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.info.dark,
  backgroundColor: theme.palette.info.light,
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

interface IAvailablePassengersProps {}

const AvailableRides: React.FC<IAvailablePassengersProps> = (props) => {
  const { t } = useTranslation();
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="ant-design:android-filled" />
      </IconWrapperStyle>
      <Typography variant="h3">1458</Typography>
      <Typography variant="subtitle2">{t("Home.Requests")}</Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to="create-transportation-request"
        startIcon={<Iconify icon="eva:plus-fill" />}
        sx={{ marginTop: "30px" }}
      >
        {t("Home.NeedTransport")}
      </Button>
    </RootStyle>
  );
};

export default AvailableRides;
