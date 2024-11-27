import type { RuntimeConfiguration } from "./configuration/runtime_configuration.ts";
import { MysqlBuilder } from "./engines/mysql/mysql_builder.ts";
import { MysqlConfiguration } from "./engines/mysql/mysql_configuration.ts";
import type { MysqlJoinOnBuilder } from "./engines/mysql/mysql_join_on_builder.ts";
import { MysqlMultiBuilder } from "./engines/mysql/mysql_multi_builder.ts";
import { MysqlParser } from "./engines/mysql/mysql_parser.ts";
import type { ISqlEasy } from "./interface_sqleasy.ts";

export class MysqlSqlEasy implements
   ISqlEasy<
      MysqlBuilder,
      MysqlJoinOnBuilder,
      MysqlMultiBuilder,
      MysqlParser
   > {
   private _mssqlConfiguration: MysqlConfiguration;

   public static NewMysqlSqlEasy(rc: RuntimeConfiguration): MysqlSqlEasy {
      return new MysqlSqlEasy(rc);
   }

   constructor(rc: RuntimeConfiguration) {
      this._mssqlConfiguration = new MysqlConfiguration(rc);
   }

   public Configuration(): MysqlConfiguration {
      return this._mssqlConfiguration;
   }

   public NewBuilder(): MysqlBuilder {
      return MysqlBuilder.NewMysqlBuilder(this._mssqlConfiguration);
   }

   public NewMultiBuilder(): MysqlMultiBuilder {
      return MysqlMultiBuilder.NewMysqlMultiBuilder(this._mssqlConfiguration);
   }

   public Parser(): MysqlParser {
      return MysqlParser.NewMysqlParser(this._mssqlConfiguration);
   }
}
