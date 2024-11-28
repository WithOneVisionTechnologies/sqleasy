import { DefaultMultiBuilder } from "../../builder/default_multi_builder.ts";
import { MysqlBuilder } from "./mysql_builder.ts";
import type { MysqlConfiguration } from "./mysql_configuration.ts";
import type { MysqlJoinOnBuilder } from "./mysql_join_on_builder.ts";
import { MysqlParser } from "./mysql_parser.ts";

export class MysqlMultiBuilder
   extends DefaultMultiBuilder<MysqlBuilder, MysqlJoinOnBuilder, MysqlParser> {
   private _mysqlConfig: MysqlConfiguration;

   constructor(config: MysqlConfiguration) {
      super(config);
      this._mysqlConfig = config;
   }

   public override newBuilder = (): MysqlBuilder => {
      return new MysqlBuilder(this._mysqlConfig);
   };

   public override newParser = (): MysqlParser => {
      return new MysqlParser(this._mysqlConfig);
   };
}
