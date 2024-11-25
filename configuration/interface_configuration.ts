import type { DatabaseType } from "../enums/database_type.ts";
import type { ConfigurationDelimiters } from "../configuration/configuration_delimiters.ts";
import type { RuntimeConfiguration } from "../configuration/runtime_configuration.ts";

export interface IConfiguration {
   databaseType(): DatabaseType;
   defaultOwner(): string;
   identifierDelimiters(): ConfigurationDelimiters;
   runtimeConfiguration(): RuntimeConfiguration;
   stringDelimiter(): string;
   transactionDelimiters(): ConfigurationDelimiters;
}
