import { DefaultBuilder } from "../../builder/default_builder.ts";
import type { MssqlConfiguration } from "./mssql_configuration.ts";
import { MssqlJoinOnBuilder } from "./mssql_join_on_builder.ts";

export class MssqlBuilder
   extends DefaultBuilder<MssqlBuilder, MssqlJoinOnBuilder> {
   private _mssqlConfig: MssqlConfiguration;

   constructor(config: MssqlConfiguration) {
      super(config, MssqlBuilder.NewMssqlBuilder(config));
      this._mssqlConfig = config;
   }

   public static NewMssqlBuilder(config: MssqlConfiguration): MssqlBuilder {
      return new MssqlBuilder(config);
   }

   public override newBuilder(): MssqlBuilder {
      return MssqlBuilder.NewMssqlBuilder(this._mssqlConfig);
   }

   public override newJoinOnBuilder(): MssqlJoinOnBuilder {
      return MssqlJoinOnBuilder.NewMssqlJoinOnBuilder(this._mssqlConfig);
   }

   public clearTop(): MssqlBuilder {
      delete this.state().customState["top"];
      return this;
   }

   public top(top: number): MssqlBuilder {
      this.state().customState["top"] = top;
      return this;
   }
}
