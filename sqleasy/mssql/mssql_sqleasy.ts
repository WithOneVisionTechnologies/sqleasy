import { RuntimeConfiguration } from "../../configuration/runtime_configuration.ts";
import { MssqlBuilder } from "./mssql_builder.ts";
import { MssqlConfiguration } from "./mssql_configuration.ts";
import type { MssqlJoinOnBuilder } from "./mssql_join_on_builder.ts";
import { MssqlMultiBuilder } from "./mssql_multi_builder.ts";
import { MssqlParser } from "./mssql_parser.ts";
import type { ISqlEasy } from "../interface_sqleasy.ts";
import IsHelper from "@withonevision/is-helper";

export class MssqlSqlEasy implements
   ISqlEasy<
      MssqlBuilder,
      MssqlJoinOnBuilder,
      MssqlMultiBuilder,
      MssqlParser
   > {
   private _mssqlConfiguration: MssqlConfiguration;

   public static NewMssqlSqlEasy(rc?: RuntimeConfiguration): MssqlSqlEasy {
      if (IsHelper.isNullOrUndefined(rc)) {
         rc = new RuntimeConfiguration();
      }

      return new MssqlSqlEasy(rc);
   }

   constructor(rc: RuntimeConfiguration) {
      this._mssqlConfiguration = new MssqlConfiguration(rc);
   }

   public configuration(): MssqlConfiguration {
      return this._mssqlConfiguration;
   }

   public newBuilder(rc?: RuntimeConfiguration): MssqlBuilder {
      if (IsHelper.isNullOrUndefined(rc)) {
         return new MssqlBuilder(this._mssqlConfiguration);
      }

      return new MssqlBuilder(new MssqlConfiguration(rc));
   }

   public newMultiBuilder(rc?: RuntimeConfiguration): MssqlMultiBuilder {
      if (IsHelper.isNullOrUndefined(rc)) {
         return new MssqlMultiBuilder(
            this._mssqlConfiguration,
         );
      }

      return new MssqlMultiBuilder(new MssqlConfiguration(rc));
   }

   public parser(): MssqlParser {
      return new MssqlParser(this._mssqlConfiguration);
   }
}
