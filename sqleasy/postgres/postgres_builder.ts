import { DefaultBuilder } from "../../builder/default_builder.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";
import { PostgresJoinOnBuilder } from "./postgres_join_on_builder.ts";

export class PostgresBuilder
   extends DefaultBuilder<PostgresBuilder, PostgresJoinOnBuilder> {
   private _mysqlConfig: PostgresConfiguration;

   constructor(config: PostgresConfiguration) {
      super(config, PostgresBuilder.NewPostgresBuilder(config));
      this._mysqlConfig = config;
   }

   public static NewPostgresBuilder(
      config: PostgresConfiguration,
   ): PostgresBuilder {
      return new PostgresBuilder(config);
   }

   public newBuilder(): PostgresBuilder {
      return PostgresBuilder.NewPostgresBuilder(this._mysqlConfig);
   }

   public newJoinOnBuilder(): PostgresJoinOnBuilder {
      return PostgresJoinOnBuilder.NewPostgresJoinOnBuilder(this._mysqlConfig);
   }
}
