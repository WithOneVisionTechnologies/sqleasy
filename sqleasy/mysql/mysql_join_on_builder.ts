import { DefaultJoinOnBuilder } from "../../builder/default_join_on_builder.ts";
import type { MysqlConfiguration } from "./mysql_configuration.ts";

export class MysqlJoinOnBuilder
   extends DefaultJoinOnBuilder<MysqlJoinOnBuilder> {
   private _mysqlConfig: MysqlConfiguration;

   constructor(config: MysqlConfiguration) {
      super(config);
      this._mysqlConfig = config;
   }

   public override newJoinOnBuilder = (): MysqlJoinOnBuilder => {
      return new MysqlJoinOnBuilder(this._mysqlConfig);
   };
}
