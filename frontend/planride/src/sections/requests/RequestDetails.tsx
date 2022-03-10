import React, { useState } from "react";
import {
  Paper,
  TableBody,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableContainer,
  IconButton,
  Drawer,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRequestDetails } from "./RequestDetails.hooks";
import ArrowRight from "@mui/icons-material/ArrowCircleRight";
import CheckBox from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxBlank from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

interface IRequestDetailsProps {
  requestId: string;
}

const RequestDetails: React.FC<IRequestDetailsProps> = ({ requestId }) => {
  const { isLoading, request } = useRequestDetails(requestId);
  const { t } = useTranslation();

  if (isLoading || !request) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper} key={request.id}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Departure country
              </TableCell>
              <TableCell>
                <Typography>{request.departureCountryCode}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Departure city
              </TableCell>
              <TableCell>
                <Typography>{request.departureCityName}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Departure date
              </TableCell>
              <TableCell>
                <Typography>{request.departureDate.toISOString()}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Number of people
              </TableCell>
              <TableCell>
                <Typography>{request.numberOfPeople}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Have pets
              </TableCell>
              <TableCell>
                <Typography>{request.havePets}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Contact person name
              </TableCell>
              <TableCell>
                <Typography>
                  {request.firstName} {request.lastName}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Contact email
              </TableCell>
              <TableCell>
                <Typography>{request.email}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Contact mobile phone
              </TableCell>
              <TableCell>
                <Typography>{request.mobile}</Typography>
              </TableCell>
            </TableRow>
            {request.comments && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Comments
                </TableCell>
                <TableCell>
                  <Typography>{request.comments}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default RequestDetails;
