import type { MultiBuilderTransactionState } from "../enums/multi_builder_transaction_state.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";

export interface IParser {
   toSql(state: SqlEasyState): string;
   toSqlMulti(
      states: SqlEasyState[],
      transactionState: MultiBuilderTransactionState,
   ): string;
   toSqlRaw(state: SqlEasyState): string;
   toSqlMultiRaw(
      states: SqlEasyState[],
      transactionState: MultiBuilderTransactionState,
   ): string;
}
