import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { ChronoUnit, Instant, LocalDate, LocalTime } from "js-joda";
import React from "react";
import { Configuration } from "../../backend";
import { TransportationOffersApi } from "../../backend/apis/TransportationOffersApi";
import { useOidcAccessToken } from "@axa-fr/react-oidc-context";
import config from "../../config";

export interface ITransportationOfferDto {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  departureCountry: string;
  departureLocation: number;
  departureDate: string;
  departureTime: string | null | undefined;
  destinationCountry: string;
  destinationLocation: number;
  seats: number;
  comments: string | null | undefined;
}

export function useTransportationOfferForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const { accessToken } = useOidcAccessToken();

  async function createTransportationOffer(data: ITransportationOfferDto) {
    setIsLoading(true);
    setErrorMessage(undefined);

    const departureInstant = data.departureTime
      ? Instant.parse(data.departureTime)
      : null;
    const departureTime = departureInstant
      ? LocalTime.ofInstant(departureInstant).truncatedTo(ChronoUnit.MINUTES)
      : null;

    const apiClient = new TransportationOffersApi(
      new Configuration({
        basePath: config.apiUrls.api,
        apiKey: config.clientId,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    );
    apiClient.createOffer({
      createTransportationOfferInputModel: {
        departureDate: new Date(data.departureDate),
        departureTime: departureTime?.toString() || "00:00",
        departureLocationId: data.departureLocation,
        destinationLocationId: data.destinationLocation,
        numberOfSeats: data.seats,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        comments: data.comments,
      },
    });

    setIsLoading(false);
  }

  return { isLoading, errorMessage, createTransportationOffer };
}
