import type { MultiBuilderTransactionState } from "../../enums/multi_builder_transaction_state.ts";
import { DefaultParser } from "../../parser/default_parser.ts";
import type { SqlEasyState } from "../../state/sqleasy_state.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";

export class PostgresParser extends DefaultParser {
   private _postgresConfiguration: PostgresConfiguration;

   constructor(config: PostgresConfiguration) {
      super(config);
      this._postgresConfiguration = config;
   }

   public static NewPostgresParser(
      config: PostgresConfiguration,
   ): PostgresParser {
      return new PostgresParser(config);
   }

   public override toSql(
      _state: SqlEasyState,
   ): { sql: string; errors: Error[] | undefined } {
      throw new Error("toSql not implemented for PostgresParser");
   }

   public override toSqlMulti(
      _states: SqlEasyState[],
      _transactionState: MultiBuilderTransactionState,
   ): { sql: string; errors: Error[] | undefined } {
      throw new Error("toSqlMulti not implemented for PostgresParser");
   }
}
