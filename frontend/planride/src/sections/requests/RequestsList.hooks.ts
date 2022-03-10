import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { LocalDate } from "js-joda";
import React from "react";
import { Configuration, TransportationRequestsApi, TransportationRequestViewModel } from "../../backend";
import { useOidcAccessToken } from "@axa-fr/react-oidc-context";
import config from "../../config";
import { useTranslation } from "react-i18next";

export function useRequestsList() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [requests, setRequests] = React.useState<TransportationRequestViewModel[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const { t } = useTranslation();

  async function loadRequestsList(fromDate: LocalDate, toDate: LocalDate) {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const apiClient = new TransportationRequestsApi(
        new Configuration({
          basePath: config.apiUrls.api,
          apiKey: config.clientId,
        })
      );

      const response = await apiClient.getRequests();
      setRequests(response);

    } catch (response) {
      let message: any = t("Errors.ServerError");
      setErrorMessage(message);
    }

    setIsLoading(false);
  }

  React.useEffect(() => {
    loadRequestsList(LocalDate.now(), LocalDate.now());
  }, []);

  return { isLoading, errorMessage, requests, loadRequestsList };
}
