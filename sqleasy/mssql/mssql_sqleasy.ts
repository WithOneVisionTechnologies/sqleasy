import type { RuntimeConfiguration } from "../../configuration/runtime_configuration.ts";
import { MssqlBuilder } from "./mssql_builder.ts";
import { MssqlConfiguration } from "./mssql_configuration.ts";
import type { MssqlJoinOnBuilder } from "./mssql_join_on_builder.ts";
import { MssqlMultiBuilder } from "./mssql_multi_builder.ts";
import { MssqlParser } from "./mssql_parser.ts";
import type { ISqlEasy } from "../interface_sqleasy.ts";

export class MssqlSqlEasy implements
   ISqlEasy<
      MssqlBuilder,
      MssqlJoinOnBuilder,
      MssqlMultiBuilder,
      MssqlParser
   > {
   private _mssqlConfiguration: MssqlConfiguration;

   public static NewMssqlSqlEasy(rc: RuntimeConfiguration): MssqlSqlEasy {
      return new MssqlSqlEasy(rc);
   }

   constructor(rc: RuntimeConfiguration) {
      this._mssqlConfiguration = new MssqlConfiguration(rc);
   }

   public Configuration(): MssqlConfiguration {
      return this._mssqlConfiguration;
   }

   public NewBuilder(): MssqlBuilder {
      return MssqlBuilder.NewMssqlBuilder(this._mssqlConfiguration);
   }

   public NewMultiBuilder(): MssqlMultiBuilder {
      return MssqlMultiBuilder.NewMssqlMultiBuilder(this._mssqlConfiguration);
   }

   public Parser(): MssqlParser {
      return MssqlParser.NewMssqlParser(this._mssqlConfiguration);
   }
}
