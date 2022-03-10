import { Icon, IconifyIcon } from '@iconify/react';
import { Box, SxProps } from '@mui/material';

// ----------------------------------------------------------------------
interface IIconifyProps {
    icon: IconifyIcon | string
    sx?: SxProps
    color?: string;
    height?: number;
}

const Iconify: React.FC<IIconifyProps> = ({icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}

export default Iconify