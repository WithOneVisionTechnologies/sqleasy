import type { MultiBuilderTransactionState } from "../enums/multi-builder-transaction-state.ts";
import type { SqlEasyState } from "../state/sqleasy.ts";

export interface ITranslator {
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
