import { useMemo, useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../components/MenuPopover";
import iconGB from "../theme/icons/gb.svg";
import iconDK from "../theme/icons/dk.svg";
import iconUA from "../theme/icons/ua.svg";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "en",
    label: "English",
    icon: iconGB,
  },
  {
    value: "dk",
    label: "Danish",
    icon: iconDK,
  },
  {
    value: "ua",
    label: "Ukrainian",
    icon: iconUA,
  },
];

// ----------------------------------------------------------------------

const LanguagePopover: React.FC = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = useMemo(() => LANGS.find(x => x.value === i18n.language) || LANGS[0], [i18n.language]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <img src={lang.icon} alt={lang.label} height={24} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === lang.value}
              onClick={() => {
                i18n.changeLanguage(option.value);
                handleClose();
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
};

export default LanguagePopover;
