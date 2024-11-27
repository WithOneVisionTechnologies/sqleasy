import { DefaultJoinOnBuilder } from "../../builder/default_join_on_builder.ts";
import type { MssqlConfiguration } from "./mssql_configuration.ts";

export class MssqlJoinOnBuilder
   extends DefaultJoinOnBuilder<MssqlJoinOnBuilder> {
   private _mssqlConfiguration: MssqlConfiguration;

   constructor(config: MssqlConfiguration) {
      super(config);
      this._mssqlConfiguration = config;
   }

   public override newJoinOnBuilder(): MssqlJoinOnBuilder {
      return new MssqlJoinOnBuilder(this._mssqlConfiguration);
   }
}
