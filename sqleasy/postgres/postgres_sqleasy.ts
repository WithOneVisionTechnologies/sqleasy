import type { RuntimeConfiguration } from "../../configuration/runtime_configuration.ts";
import { PostgresBuilder } from "./postgres_builder.ts";
import { PostgresConfiguration } from "./postgres_configuration.ts";
import type { PostgresJoinOnBuilder } from "./postgres_join_on_builder.ts";
import { PostgresMultiBuilder } from "./postgres_multi_builder.ts";
import { PostgresParser } from "./postgres_parser.ts";
import type { ISqlEasy } from "../interface_sqleasy.ts";

export class PostgresSqlEasy implements
   ISqlEasy<
      PostgresBuilder,
      PostgresJoinOnBuilder,
      PostgresMultiBuilder,
      PostgresParser
   > {
   private _mssqlConfiguration: PostgresConfiguration;

   public static NewPostgresSqlEasy(rc: RuntimeConfiguration): PostgresSqlEasy {
      return new PostgresSqlEasy(rc);
   }

   constructor(rc: RuntimeConfiguration) {
      this._mssqlConfiguration = new PostgresConfiguration(rc);
   }

   public Configuration(): PostgresConfiguration {
      return this._mssqlConfiguration;
   }

   public NewBuilder(): PostgresBuilder {
      return PostgresBuilder.NewPostgresBuilder(this._mssqlConfiguration);
   }

   public NewMultiBuilder(): PostgresMultiBuilder {
      return PostgresMultiBuilder.NewPostgresMultiBuilder(
         this._mssqlConfiguration,
      );
   }

   public Parser(): PostgresParser {
      return PostgresParser.NewPostgresParser(this._mssqlConfiguration);
   }
}
