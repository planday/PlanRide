import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { LocalDate } from "js-joda";
import React from "react";
import { Configuration, TransportationRequestsApi, TransportationRequestDetailsViewModel } from "../../backend";
import { useOidcAccessToken, useOidcUser } from "@axa-fr/react-oidc-context";
import config from "../../config";
import { useTranslation } from "react-i18next";

export function useRequestDetails(requestId: string) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [request, setRequest] = React.useState<TransportationRequestDetailsViewModel>();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const { t } = useTranslation();
  const { accessToken } = useOidcAccessToken();

  async function loadRequestDetails(requestId: string) {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const apiClient = new TransportationRequestsApi(
        new Configuration({
          basePath: config.apiUrls.api,
          apiKey: config.clientId,
          headers: { 
            Authorization: `Bearer ${accessToken}`
          },
        })
      );

      const response = await apiClient.getRequestDetails({ requestId});
      setRequest(response);

    } catch (response) {
      let message: any = t("Errors.ServerError");
      setErrorMessage(message);
    }

    setIsLoading(false);
  }

  React.useEffect(() => {
    loadRequestDetails(requestId);
  }, [requestId, accessToken]);

  return { isLoading, errorMessage, request };
}
