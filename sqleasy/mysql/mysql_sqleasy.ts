import { RuntimeConfiguration } from "../../configuration/runtime_configuration.ts";
import { MysqlBuilder } from "./mysql_builder.ts";
import { MysqlConfiguration } from "./mysql_configuration.ts";
import type { MysqlJoinOnBuilder } from "./mysql_join_on_builder.ts";
import { MysqlMultiBuilder } from "./mysql_multi_builder.ts";
import type { ISqlEasy } from "../interface_sqleasy.ts";
import IsHelper from "@withonevision/is-helper";

export class MysqlSqlEasy implements
   ISqlEasy<
      MysqlBuilder,
      MysqlJoinOnBuilder,
      MysqlMultiBuilder
   > {
   private _mssqlConfiguration: MysqlConfiguration;

   public static NewMysqlSqlEasy(rc?: RuntimeConfiguration): MysqlSqlEasy {
      if (IsHelper.isNullOrUndefined(rc)) {
         rc = new RuntimeConfiguration();
      }
      return new MysqlSqlEasy(rc);
   }

   constructor(rc: RuntimeConfiguration) {
      this._mssqlConfiguration = new MysqlConfiguration(rc);
   }

   public configuration(): MysqlConfiguration {
      return this._mssqlConfiguration;
   }

   public newBuilder(rc?: RuntimeConfiguration): MysqlBuilder {
      if (IsHelper.isNullOrUndefined(rc)) {
         return new MysqlBuilder(this._mssqlConfiguration);
      }

      return new MysqlBuilder(new MysqlConfiguration(rc));
   }

   public newMultiBuilder(rc?: RuntimeConfiguration): MysqlMultiBuilder {
      if (IsHelper.isNullOrUndefined(rc)) {
         return new MysqlMultiBuilder(
            this._mssqlConfiguration,
         );
      }

      return new MysqlMultiBuilder(new MysqlConfiguration(rc));
   }
}
