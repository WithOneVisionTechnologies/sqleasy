import { DefaultBuilder } from "../../builder/default_builder.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";
import { PostgresJoinOnBuilder } from "./postgres_join_on_builder.ts";

export class PostgresBuilder
   extends DefaultBuilder<PostgresBuilder, PostgresJoinOnBuilder> {
   private _postgresConfig: PostgresConfiguration;

   constructor(config: PostgresConfiguration) {
      super(config);
      this._postgresConfig = config;
   }

   public newBuilder(): PostgresBuilder {
      return new PostgresBuilder(this._postgresConfig);
   }

   public newJoinOnBuilder(): PostgresJoinOnBuilder {
      return new PostgresJoinOnBuilder(this._postgresConfig);
   }
}
