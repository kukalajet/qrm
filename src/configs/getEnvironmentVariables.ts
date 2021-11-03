import { development, production } from "./environment-variables";
import type { EnvironmentVariables } from "./environment-variables";

const getEnvironmentVariables = (
  environment: Environment = "development"
): EnvironmentVariables => {
  if (environment === "production") {
    return production;
  }

  return development;
};

export default getEnvironmentVariables;
