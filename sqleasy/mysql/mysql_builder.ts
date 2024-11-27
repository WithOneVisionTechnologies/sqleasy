import { DefaultBuilder } from "../../builder/default_builder.ts";
import type { MysqlConfiguration } from "./mysql_configuration.ts";
import { MysqlJoinOnBuilder } from "./mysql_join_on_builder.ts";

export class MysqlBuilder
   extends DefaultBuilder<MysqlBuilder, MysqlJoinOnBuilder> {
   private _mysqlConfig: MysqlConfiguration;

   constructor(config: MysqlConfiguration) {
      super(config, MysqlBuilder.NewMysqlBuilder(config));
      this._mysqlConfig = config;
   }

   public static NewMysqlBuilder(config: MysqlConfiguration): MysqlBuilder {
      return new MysqlBuilder(config);
   }

   public newBuilder(): MysqlBuilder {
      return MysqlBuilder.NewMysqlBuilder(this._mysqlConfig);
   }

   public newJoinOnBuilder(): MysqlJoinOnBuilder {
      return MysqlJoinOnBuilder.NewMysqlJoinOnBuilder(this._mysqlConfig);
   }
}
