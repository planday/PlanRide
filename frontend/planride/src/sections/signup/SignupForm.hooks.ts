import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { LocalDate } from "js-joda";
import React from "react";
import { useTranslation } from "react-i18next";
import { Configuration } from "../../backend";
import { AccountApi } from "../../backend/apis/AccountApi";
import config from "../../config";

export interface ISignupRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  comments: string | null | undefined;
}

export function useSignupForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const { t } = useTranslation();

  async function signup(data: ISignupRequestDto) {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const apiClient = new AccountApi(
        new Configuration({
          basePath: config.apiUrls.api,
          apiKey: config.clientId,
        })
      );

      await apiClient.signup({
        signupInputModel: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          mobile: data.mobile,
        },
      });
    } catch (response) {
      let message: any = t("Errors.ServerError");
      setErrorMessage(message);
    }

    setIsLoading(false);
  }

  return { isLoading, errorMessage, signup };
}
