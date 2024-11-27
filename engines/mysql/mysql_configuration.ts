import type { ConfigurationDelimiters } from "../../configuration/configuration_delimiters.ts";
import type { IConfiguration } from "../../configuration/interface_configuration.ts";
import type { RuntimeConfiguration } from "../../configuration/runtime_configuration.ts";
import { DatabaseType } from "../../enums/database_type.ts";

export class MysqlConfiguration implements IConfiguration {
   private _mysqlRuntimeConfiguration: RuntimeConfiguration;

   constructor(rc: RuntimeConfiguration) {
      this._mysqlRuntimeConfiguration = rc;
   }

   public databaseType(): DatabaseType {
      return DatabaseType.Mysql;
   }

   public defaultOwner(): string {
      return "";
   }

   public identifierDelimiters(): ConfigurationDelimiters {
      return {
         begin: "`",
         end: "`",
      };
   }

   public runtimeConfiguration(): RuntimeConfiguration {
      return this._mysqlRuntimeConfiguration;
   }

   public stringDelimiter(): string {
      return "'";
   }

   public transactionDelimiters(): ConfigurationDelimiters {
      return {
         begin: "START TRANSACTION",
         end: "COMMIT",
      };
   }
}
