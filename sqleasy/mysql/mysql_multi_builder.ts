import { DefaultMultiBuilder } from "../../builder/default_multi_builder.ts";
import { MysqlBuilder } from "./mysql_builder.ts";
import type { MysqlConfiguration } from "./mysql_configuration.ts";
import type { MysqlJoinOnBuilder } from "./mysql_join_on_builder.ts";
import { MysqlParser } from "./mysql_parser.ts";

export class MysqlMultiBuilder
   extends DefaultMultiBuilder<MysqlBuilder, MysqlJoinOnBuilder> {
   private _mysqlConfig: MysqlConfiguration;
   private _parser: MysqlParser;

   constructor(config: MysqlConfiguration) {
      super(config);
      this._mysqlConfig = config;
      this._parser = new MysqlParser(config);
   }

   public override newBuilder(): MysqlBuilder {
      return new MysqlBuilder(this._mysqlConfig);
   }

   public override parse(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlMulti(this.states(), this.transactionState());
   }

   public override parseRaw(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlMultiRaw(this.states(), this.transactionState());
   }
}
