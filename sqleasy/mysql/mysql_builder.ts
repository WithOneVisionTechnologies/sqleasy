import { DefaultBuilder } from "../../builder/default_builder.ts";
import type { MysqlConfiguration } from "./mysql_configuration.ts";
import { MysqlJoinOnBuilder } from "./mysql_join_on_builder.ts";
import { MysqlParser } from "./mysql_parser.ts";

export class MysqlBuilder
   extends DefaultBuilder<MysqlBuilder, MysqlJoinOnBuilder> {
   private _mysqlConfig: MysqlConfiguration;
   private _parser: MysqlParser;

   constructor(config: MysqlConfiguration) {
      super(config);
      this._mysqlConfig = config;
      this._parser = new MysqlParser(config);
   }

   public newBuilder(): MysqlBuilder {
      return new MysqlBuilder(this._mysqlConfig);
   }

   public newJoinOnBuilder(): MysqlJoinOnBuilder {
      return new MysqlJoinOnBuilder(this._mysqlConfig);
   }

   public override parse(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSql(this.state());
   }

   public override parseRaw(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlRaw(this.state());
   }
}
