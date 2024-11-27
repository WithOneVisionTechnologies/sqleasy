import { DefaultMultiBuilder } from "../../builder/default_multi_builder.ts";
import { MssqlBuilder } from "./mssql_builder.ts";
import type { MssqlConfiguration } from "./mssql_configuration.ts";
import type { MssqlJoinOnBuilder } from "./mssql_join_on_builder.ts";
import { MssqlParser } from "./mssql_parser.ts";

export class MssqlMultiBuilder
   extends DefaultMultiBuilder<MssqlBuilder, MssqlJoinOnBuilder, MssqlParser> {
   private _mssqlConfiguration: MssqlConfiguration;

   constructor(config: MssqlConfiguration) {
      super(config);
      this._mssqlConfiguration = config;
   }

   public override newBuilder(): MssqlBuilder {
      return new MssqlBuilder(this._mssqlConfiguration);
   }

   public override newParser(): MssqlParser {
      return new MssqlParser(this._mssqlConfiguration);
   }
}
