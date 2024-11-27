import { DefaultBuilder } from "../../builder/default_builder.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";
import { PostgresJoinOnBuilder } from "./postgres_join_on_builder.ts";
import { PostgresParser } from "./postgres_parser.ts";

export class PostgresBuilder
   extends DefaultBuilder<PostgresBuilder, PostgresJoinOnBuilder> {
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

   public newJoinOnBuilder(): PostgresJoinOnBuilder {
      return new PostgresJoinOnBuilder(this._postgresConfig);
   }

   public override parse(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSql(this.state());
   }

   public override parseRaw(): { sql: string; errors: Error[] | undefined } {
      return this._parser.toSqlRaw(this.state());
   }
}
