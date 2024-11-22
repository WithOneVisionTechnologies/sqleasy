import type { DatabaseType } from "../enums/database-type.ts";
import type { ConfigurationDelimiters } from "../configuration/configuration-delimiters.ts";
import type { RuntimeConfiguration } from "../configuration/runtime-configuration.ts";

export interface IConfiguration {
  databaseType(): DatabaseType;
  defaultOwner(): string;
  identifierDelimiters(): ConfigurationDelimiters;
  runtimeConfiguration(): RuntimeConfiguration;
  stringDelimiter(): string;
  transactionDelimiters(): ConfigurationDelimiters;
}
