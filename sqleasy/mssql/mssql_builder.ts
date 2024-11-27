import { DefaultBuilder } from "../../builder/default_builder.ts";
import type { MssqlConfiguration } from "./mssql_configuration.ts";
import { MssqlJoinOnBuilder } from "./mssql_join_on_builder.ts";
import { MssqlParser } from "./mssql_parser.ts";

export class MssqlBuilder
   extends DefaultBuilder<MssqlBuilder, MssqlJoinOnBuilder> {
   private _mssqlConfig: MssqlConfiguration;
   private _parser: MssqlParser;

   constructor(config: MssqlConfiguration) {
      super(config);
      this._mssqlConfig = config;
      this._parser = new MssqlParser(config);
   }

   public override newBuilder(): MssqlBuilder {
      return new MssqlBuilder(this._mssqlConfig);
   }

   public override newJoinOnBuilder(): MssqlJoinOnBuilder {
      return new MssqlJoinOnBuilder(this._mssqlConfig);
   }

   public override parse(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSql(this.state());
   }

   public override parseRaw(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlRaw(this.state());
   }

   public clearTop(): MssqlBuilder {
      delete this.state().customState["top"];
      return this;
   }

   public top(top: number): MssqlBuilder {
      this.state().customState["top"] = top;
      return this;
   }
}
