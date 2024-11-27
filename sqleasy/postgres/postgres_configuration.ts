import type { ConfigurationDelimiters } from "../../configuration/configuration_delimiters.ts";
import type { IConfiguration } from "../../configuration/interface_configuration.ts";
import type { RuntimeConfiguration } from "../../configuration/runtime_configuration.ts";
import { DatabaseType } from "../../enums/database_type.ts";

export class PostgresConfiguration implements IConfiguration {
   private _postgresRuntimeConfiguration: RuntimeConfiguration;

   constructor(rc: RuntimeConfiguration) {
      this._postgresRuntimeConfiguration = rc;
   }

   public databaseType(): DatabaseType {
      return DatabaseType.Postgres;
   }

   public defaultOwner(): string {
      return "public";
   }

   public identifierDelimiters(): ConfigurationDelimiters {
      return {
         begin: '"',
         end: '"',
      };
   }

   public runtimeConfiguration(): RuntimeConfiguration {
      return this._postgresRuntimeConfiguration;
   }

   public stringDelimiter(): string {
      return "'";
   }

   public transactionDelimiters(): ConfigurationDelimiters {
      return {
         begin: "BEGIN",
         end: "COMMIT",
      };
   }
}
