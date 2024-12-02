import { RuntimeConfiguration } from "../../configuration/runtime_configuration.ts";
import { PostgresBuilder } from "./postgres_builder.ts";
import { PostgresConfiguration } from "./postgres_configuration.ts";
import type { PostgresJoinOnBuilder } from "./postgres_join_on_builder.ts";
import { PostgresMultiBuilder } from "./postgres_multi_builder.ts";
import type { ISqlEasy } from "../interface_sqleasy.ts";
import IsHelper from "@withonevision/is-helper";
import type { PostgresParser } from "./postgres_parser.ts";

export class PostgresSqlEasy implements
   ISqlEasy<
      PostgresBuilder,
      PostgresJoinOnBuilder,
      PostgresMultiBuilder,
      PostgresParser
   > {
   private _postgresConfig: PostgresConfiguration;

   constructor(rc?: RuntimeConfiguration) {
      if (IsHelper.isNullOrUndefined(rc)) {
         rc = new RuntimeConfiguration();
      }

      this._postgresConfig = new PostgresConfiguration(rc);
   }

   public configuration = (): PostgresConfiguration => {
      return this._postgresConfig;
   };

   public newBuilder = (rc?: RuntimeConfiguration): PostgresBuilder => {
      if (IsHelper.isNullOrUndefined(rc)) {
         return new PostgresBuilder(this._postgresConfig);
      }

      return new PostgresBuilder(new PostgresConfiguration(rc));
   };

   public newMultiBuilder = (
      rc?: RuntimeConfiguration,
   ): PostgresMultiBuilder => {
      if (IsHelper.isNullOrUndefined(rc)) {
         return new PostgresMultiBuilder(
            this._postgresConfig,
         );
      }

      return new PostgresMultiBuilder(
         new PostgresConfiguration(rc),
      );
   };
}
