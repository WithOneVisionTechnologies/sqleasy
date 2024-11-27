import { DefaultMultiBuilder } from "../../builder/default_multi_builder.ts";
import { MssqlBuilder } from "./mssql_builder.ts";
import type { MssqlConfiguration } from "./mssql_configuration.ts";
import type { MssqlJoinOnBuilder } from "./mssql_join_on_builder.ts";

export class MssqlMultiBuilder
   extends DefaultMultiBuilder<MssqlBuilder, MssqlJoinOnBuilder> {
   constructor(config: MssqlConfiguration) {
      super(config, MssqlBuilder.NewMssqlBuilder(config));
   }

   public static NewMssqlMultiBuilder(
      config: MssqlConfiguration,
   ): MssqlMultiBuilder {
      return new MssqlMultiBuilder(config);
   }
}
