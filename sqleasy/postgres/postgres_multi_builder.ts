import { DefaultMultiBuilder } from "../../builder/default_multi_builder.ts";
import { PostgresBuilder } from "./postgres_builder.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";
import type { PostgresJoinOnBuilder } from "./postgres_join_on_builder.ts";
import { PostgresParser } from "./postgres_parser.ts";

export class PostgresMultiBuilder
   extends DefaultMultiBuilder<PostgresBuilder, PostgresJoinOnBuilder> {
   private _postgresConfig: PostgresConfiguration;
   private _parser: PostgresParser;

   constructor(config: PostgresConfiguration) {
      super(config);
      this._postgresConfig = config;
      this._parser = new PostgresParser(config);
   }

   public newBuilder(): PostgresBuilder {
      return new PostgresBuilder(this._postgresConfig);
   }

   public override parse(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlMulti(this.states(), this.transactionState());
   }

   public override parseRaw(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlMultiRaw(this.states(), this.transactionState());
   }
}
