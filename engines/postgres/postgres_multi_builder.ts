import { DefaultMultiBuilder } from "../../builder/default_multi_builder.ts";
import { PostgresBuilder } from "./postgres_builder.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";
import type { PostgresJoinOnBuilder } from "./postgres_join_on_builder.ts";

export class PostgresMultiBuilder
   extends DefaultMultiBuilder<PostgresBuilder, PostgresJoinOnBuilder> {
   constructor(config: PostgresConfiguration) {
      super(config, PostgresBuilder.NewPostgresBuilder(config));
   }

   public static NewPostgresMultiBuilder(
      config: PostgresConfiguration,
   ): PostgresMultiBuilder {
      return new PostgresMultiBuilder(config);
   }
}
