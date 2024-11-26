import { DefaultJoinOnBuilder } from "../../builder/default_join_on_builder.ts";
import type { MssqlConfiguration } from "./mssql_configuration.ts";

export class MssqlJoinOnBuilder
   extends DefaultJoinOnBuilder<MssqlJoinOnBuilder> {
   constructor(config: MssqlConfiguration) {
      super(config, MssqlJoinOnBuilder.NewMssqlJoinOnBuilder(config));
   }

   public static NewMssqlJoinOnBuilder(
      config: MssqlConfiguration,
   ): MssqlJoinOnBuilder {
      return new MssqlJoinOnBuilder(config);
   }

   public override newJoinOnBuilder(
      config: MssqlConfiguration,
   ): MssqlJoinOnBuilder {
      return MssqlJoinOnBuilder.NewMssqlJoinOnBuilder(config);
   }
}
