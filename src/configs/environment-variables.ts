export type EnvironmentVariables = {
  environment: Environment;
  host: string;
};

export const production: EnvironmentVariables = {
  environment: "production",
  host: "http://localhost:8080",
};

export const development: EnvironmentVariables = {
  environment: "development",
  host: "http://localhost:8080",
};
