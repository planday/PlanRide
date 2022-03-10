import React from "react";
import { Configuration, TransportationRequestsApi } from "../../backend";
import { useOidcAccessToken } from "@axa-fr/react-oidc-context";
import config from "../../config";

export interface ITransportationRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  departureCountry: string;
  departureLocation: number;
  departureDate: string;
  adults: number;
  children: number;
  pets: number;
  comments: string | null | undefined;
}

export function useTransportationRequestForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const { accessToken } = useOidcAccessToken();

  async function createTransportationRequest(data: ITransportationRequestDto) {
    setIsLoading(true);
    setErrorMessage(undefined);

    const apiClient = new TransportationRequestsApi(
      new Configuration({
        basePath: config.apiUrls.api,
        apiKey: config.clientId,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    );
    apiClient.createRequest({
      createTransportationRequestInputModel: {
        departureDate: new Date(data.departureDate),
        departureLocationId: data.departureLocation,
        numberOfAdults: data.adults,
        numberOfChildren: data.children,
        numberOfPets: data.pets,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        comments: data.comments,
      },
    });

    setIsLoading(false);
  }

  return { isLoading, errorMessage, createTransportationRequest };
}
