import type { MultiBuilderTransactionState } from "../enums/multi_builder_transaction_state.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";

export interface IParser {
   toSql(state: SqlEasyState): { sql: string; errors: Error[] | undefined };
   toSqlMulti(
      states: SqlEasyState[],
      transactionState: MultiBuilderTransactionState,
   ): { sql: string; errors: Error[] | undefined };
   toSqlRaw(state: SqlEasyState): { sql: string; errors: Error[] | undefined };
   toSqlMultiRaw(
      states: SqlEasyState[],
      transactionState: MultiBuilderTransactionState,
   ): { sql: string; errors: Error[] | undefined };
}
