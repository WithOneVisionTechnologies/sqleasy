import { DefaultMultiBuilder } from "../../builder/default_multi_builder.ts";
import { MysqlBuilder } from "./mysql_builder.ts";
import type { MysqlConfiguration } from "./mysql_configuration.ts";
import type { MysqlJoinOnBuilder } from "./mysql_join_on_builder.ts";

export class MysqlMultiBuilder
   extends DefaultMultiBuilder<MysqlBuilder, MysqlJoinOnBuilder> {
   constructor(config: MysqlConfiguration) {
      super(config, MysqlBuilder.NewMysqlBuilder(config));
   }

   public static NewMysqlMultiBuilder(
      config: MysqlConfiguration,
   ): MysqlMultiBuilder {
      return new MysqlMultiBuilder(config);
   }
}
