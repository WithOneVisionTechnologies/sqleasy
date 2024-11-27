import { RuntimeConfiguration } from "../../configuration/runtime_configuration.ts";
import { PostgresBuilder } from "./postgres_builder.ts";
import { PostgresConfiguration } from "./postgres_configuration.ts";
import type { PostgresJoinOnBuilder } from "./postgres_join_on_builder.ts";
import { PostgresMultiBuilder } from "./postgres_multi_builder.ts";
import { PostgresParser } from "./postgres_parser.ts";
import type { ISqlEasy } from "../interface_sqleasy.ts";
import IsHelper from "@withonevision/is-helper";

export class PostgresSqlEasy implements
   ISqlEasy<
      PostgresBuilder,
      PostgresJoinOnBuilder,
      PostgresMultiBuilder,
      PostgresParser
   > {
   private _mssqlConfiguration: PostgresConfiguration;

   public static NewPostgresSqlEasy(
      rc?: RuntimeConfiguration,
   ): PostgresSqlEasy {
      if (IsHelper.isNullOrUndefined(rc)) {
         rc = new RuntimeConfiguration();
      }
      return new PostgresSqlEasy(rc);
   }

   constructor(rc: RuntimeConfiguration) {
      this._mssqlConfiguration = new PostgresConfiguration(rc);
   }

   public configuration(): PostgresConfiguration {
      return this._mssqlConfiguration;
   }

   public newBuilder(rc?: RuntimeConfiguration): PostgresBuilder {
      if (IsHelper.isNullOrUndefined(rc)) {
         return PostgresBuilder.NewPostgresBuilder(this._mssqlConfiguration);
      }

      return PostgresBuilder.NewPostgresBuilder(new PostgresConfiguration(rc));
   }

   public newMultiBuilder(rc?: RuntimeConfiguration): PostgresMultiBuilder {
      if (IsHelper.isNullOrUndefined(rc)) {
         return PostgresMultiBuilder.NewPostgresMultiBuilder(
            this._mssqlConfiguration,
         );
      }

      return PostgresMultiBuilder.NewPostgresMultiBuilder(
         new PostgresConfiguration(rc),
      );
   }

   public parser(): PostgresParser {
      return PostgresParser.NewPostgresParser(this._mssqlConfiguration);
   }
}
