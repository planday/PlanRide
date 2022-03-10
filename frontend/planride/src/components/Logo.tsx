import { Link as RouterLink } from "react-router-dom";
// material
import { Box } from "@mui/material";
import logo from "../theme/icons/logo.svg"
// ----------------------------------------------------------------------

interface ILogoProps {
  sx?: any;
}

const Logo: React.FC<ILogoProps> = (props) => {
  const { sx } = props;
  return (
    <RouterLink to="/">
      <Box
        component="img"
        src={logo}
        sx={{ width: 40, height: 40, ...sx }}
      />
    </RouterLink>
  );
};

export default Logo;
