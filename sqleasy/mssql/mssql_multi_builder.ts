import { DefaultMultiBuilder } from "../../builder/default_multi_builder.ts";
import { MssqlBuilder } from "./mssql_builder.ts";
import type { MssqlConfiguration } from "./mssql_configuration.ts";
import type { MssqlJoinOnBuilder } from "./mssql_join_on_builder.ts";
import { MssqlParser } from "./mssql_parser.ts";

export class MssqlMultiBuilder
   extends DefaultMultiBuilder<MssqlBuilder, MssqlJoinOnBuilder> {
   private _mssqlConfiguration: MssqlConfiguration;
   private _parser: MssqlParser;

   constructor(config: MssqlConfiguration) {
      super(config);
      this._mssqlConfiguration = config;
      this._parser = new MssqlParser(config);
   }

   public override newBuilder(): MssqlBuilder {
      return new MssqlBuilder(this._mssqlConfiguration);
   }

   public override parse(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlMulti(this.states(), this.transactionState());
   }

   public override parseRaw(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlMultiRaw(this.states(), this.transactionState());
   }
}
