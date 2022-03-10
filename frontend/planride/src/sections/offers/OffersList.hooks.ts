import { LocalDate } from "js-joda";
import React from "react";
import { useTranslation } from "react-i18next";
import { TransportationOffersApi } from "../../backend/apis/TransportationOffersApi";
import { Configuration } from "../../backend";
import config from "../../config";
import { TransportationOfferViewModel } from "../../backend/models/TransportationOfferViewModel";

export function useOffersList() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [offers, setOffers] = React.useState<TransportationOfferViewModel[]>(
    []
  );
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const { t } = useTranslation();

  async function loadOffersList(fromDate: LocalDate, toDate: LocalDate) {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const apiClient = new TransportationOffersApi(
        new Configuration({
          basePath: config.apiUrls.api,
          apiKey: config.clientId,
        })
      );

      const response = await apiClient.getOffers();
      setOffers(response);

    } catch (response) {
      let message: any = t("Errors.ServerError");
      setErrorMessage(message);
    }

    setIsLoading(false);
  }

  React.useEffect(() => {
    loadOffersList(LocalDate.now(), LocalDate.now());
  }, []);

  return { isLoading, errorMessage, offers, loadOffersList };
}
