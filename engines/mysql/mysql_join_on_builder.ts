import { DefaultJoinOnBuilder } from "../../builder/default_join_on_builder.ts";
import type { MysqlConfiguration } from "./mysql_configuration.ts";

export class MysqlJoinOnBuilder
   extends DefaultJoinOnBuilder<MysqlJoinOnBuilder> {
   constructor(config: MysqlConfiguration) {
      super(config, MysqlJoinOnBuilder.NewMysqlJoinOnBuilder(config));
   }

   public static NewMysqlJoinOnBuilder(
      config: MysqlConfiguration,
   ): MysqlJoinOnBuilder {
      return new MysqlJoinOnBuilder(config);
   }

   public override newJoinOnBuilder(
      config: MysqlConfiguration,
   ): MysqlJoinOnBuilder {
      return MysqlJoinOnBuilder.NewMysqlJoinOnBuilder(config);
   }
}
