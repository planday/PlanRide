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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRequestsList } from "./RequestsList.hooks";
import ArrowRight from "@mui/icons-material/ArrowCircleRight";
import CheckBox from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxBlank from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { useNavigate } from "react-router-dom";

const RequestsList: React.FC = () => {
  const { isLoading, requests } = useRequestsList();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isLoading) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Departure date</TableCell>
              <TableCell>Number of people</TableCell>
              <TableCell>Have pets</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {request.departureCountryCode}
                </TableCell>
                <TableCell>{request.departureCityName}</TableCell>
                <TableCell>{request.departureDate.toISOString()}</TableCell>
                <TableCell>{request.numberOfPeople}</TableCell>
                <TableCell>
                  {request.havePets && <CheckBox />}
                  {!request.havePets && <CheckBoxBlank />}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`${request.id}`)}>
                    <ArrowRight />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default RequestsList;
