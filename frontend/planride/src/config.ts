export interface IApplicationConfiguration {
  apiUrls: {
    api: string;
  };
  clientId: string;
  stsAuthority: string;
  clientRoot: string;
  clientScope: string;
  instrumentationKey: string;
}

const data: IApplicationConfiguration = {
  apiUrls: {
    api: "https://localhost:5298",
  },
  clientId: "482cd04d-5783-445a-8f79-a794a7142ba7",
  stsAuthority: "https://localhost:5298",
  clientRoot: "http://localhost:3000",
  clientScope: "openid profile offline_access planride-api",
  instrumentationKey: "68e450c7-663d-445f-87b6-c2d544bbae79",
};

// if the runtime config.js is provided
// see https://github.com/SocialEngine/docker-nginx-spa
// for details
const w = window as any;
if (w && w.__env) {
  const {
    API_URL,
    CLIENT_ID,
    STS_AUTHORITY,
    CLIENT_ROOT,
    APP_INSIGHTS_INSTRUMENTATION_KEY,
  } = w.__env;
  if (API_URL) data.apiUrls.api = API_URL;
  if (CLIENT_ID) data.clientId = CLIENT_ID;
  if (STS_AUTHORITY) data.stsAuthority = STS_AUTHORITY;
  if (CLIENT_ROOT) data.clientRoot = CLIENT_ROOT;
  if (APP_INSIGHTS_INSTRUMENTATION_KEY)
    data.instrumentationKey = APP_INSIGHTS_INSTRUMENTATION_KEY;
}

export const oidcSettings = {
  authority: data.stsAuthority,
  client_id: data.clientId,
  redirect_uri: `${data.clientRoot}/authentication/callback`,
  scope: data.clientScope,
  //service_worker_relative_url:'/OidcServiceWorker.js',
  service_worker_only: false,
};

export default data;
