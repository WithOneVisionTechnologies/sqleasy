import IsHelper from "@withonevision/is-helper";
import type { IConfiguration } from "../configuration/interface_configuration.ts";
import { MultiBuilderTransactionState } from "../enums/multi_builder_transaction_state.ts";
import { ParserMode } from "../enums/parser_mode.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import { defaultToSql } from "./default_to_sql.ts";

export abstract class DefaultParser {
   private _config: IConfiguration;

   constructor(config: IConfiguration) {
      this._config = config;
   }

   public abstract toSql(
      state: SqlEasyState,
   ): { sql: string; errors: Error[] | undefined };
   public abstract toSqlMulti(
      states: SqlEasyState[],
      transactionState: MultiBuilderTransactionState,
   ): { sql: string; errors: Error[] | undefined };

   public toSqlRaw(
      state: SqlEasyState,
   ): { sql: string; errors: Error[] | undefined } {
      const sqlHelper = defaultToSql(state, this._config, ParserMode.Raw);
      return { sql: sqlHelper.getSqlDebug(), errors: sqlHelper.getErrors() };
   }

   public toSqlMultiRaw(
      states: SqlEasyState[],
      transactionState: MultiBuilderTransactionState,
   ): { sql: string; errors: Error[] | undefined } {
      let sqlRaw = "";

      if (transactionState === MultiBuilderTransactionState.TransactionOn) {
         sqlRaw += this._config.transactionDelimiters().begin + "; ";
      }

      for (const state of states) {
         const { sql, errors } = this.toSqlRaw(state);
         if (!IsHelper.isNullOrUndefined(errors) && errors.length > 0) {
            return { sql: "", errors: errors };
         }
         sqlRaw += sql;
      }

      if (transactionState === MultiBuilderTransactionState.TransactionOn) {
         sqlRaw += this._config.transactionDelimiters().end + "; ";
      }

      return { sql: sqlRaw, errors: undefined };
   }
}
