import { DefaultJoinOnBuilder } from "../../builder/default_join_on_builder.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";

export class PostgresJoinOnBuilder
   extends DefaultJoinOnBuilder<PostgresJoinOnBuilder> {
   constructor(config: PostgresConfiguration) {
      super(config, PostgresJoinOnBuilder.NewPostgresJoinOnBuilder(config));
   }

   public static NewPostgresJoinOnBuilder(
      config: PostgresConfiguration,
   ): PostgresJoinOnBuilder {
      return new PostgresJoinOnBuilder(config);
   }

   public override newJoinOnBuilder(
      config: PostgresConfiguration,
   ): PostgresJoinOnBuilder {
      return PostgresJoinOnBuilder.NewPostgresJoinOnBuilder(config);
   }
}
