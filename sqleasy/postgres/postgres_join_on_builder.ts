import { DefaultJoinOnBuilder } from "../../builder/default_join_on_builder.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";

export class PostgresJoinOnBuilder
   extends DefaultJoinOnBuilder<PostgresJoinOnBuilder> {
   private _postgresConfig: PostgresConfiguration;

   constructor(config: PostgresConfiguration) {
      super(config);
      this._postgresConfig = config;
   }

   public override newJoinOnBuilder = (): PostgresJoinOnBuilder => {
      return new PostgresJoinOnBuilder(this._postgresConfig);
   };
}
