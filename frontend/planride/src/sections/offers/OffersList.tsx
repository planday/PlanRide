import React from "react";
import {
  Paper,
  TableBody,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableContainer,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOffersList } from "./OffersList.hooks";
import ArrowRight from "@mui/icons-material/ArrowCircleRight";

const OffersList: React.FC = () => {
  const { isLoading, offers } = useOffersList();
  const { t } = useTranslation();

  if (isLoading) {
    return <React.Fragment />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>From country</TableCell>
            <TableCell>From location</TableCell>
            <TableCell>To country</TableCell>
            <TableCell>To location</TableCell>
            <TableCell>Departure date</TableCell>
            <TableCell>Departure time</TableCell>
            <TableCell>Number of seats</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow
              key={offer.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {offer.departureCountryCode}
              </TableCell>
              <TableCell component="th" scope="row">
                {offer.departureCityName}
              </TableCell>
              <TableCell component="th" scope="row">
                {offer.destinationCountryCode}
              </TableCell>
              <TableCell component="th" scope="row">
                {offer.destinationCityName}
              </TableCell>
              <TableCell>{offer.departureDate.toISOString()}</TableCell>
              <TableCell>{offer.departureTime}</TableCell>
              <TableCell>{offer.numberOfSeats}</TableCell>
              <TableCell>
                <IconButton>
                  <ArrowRight />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OffersList;
