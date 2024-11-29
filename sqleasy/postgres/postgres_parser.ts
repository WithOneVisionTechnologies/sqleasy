import type { MultiBuilderTransactionState } from "../../enums/multi_builder_transaction_state.ts";
import { ParserError } from "../../helpers/parser_error.ts";
import { DefaultParser } from "../../parser/default_parser.ts";
import type { SqlEasyState } from "../../state/sqleasy_state.ts";
import type { PostgresConfiguration } from "./postgres_configuration.ts";

export class PostgresParser extends DefaultParser {
   private _postgresConfiguration: PostgresConfiguration;

   constructor(config: PostgresConfiguration) {
      super(config);
      this._postgresConfiguration = config;
   }

   public override toSql = (
      _state: SqlEasyState,
   ): string => {
      throw new ParserError("toSql not implemented for PostgresParser");
   };

   public override toSqlMulti = (
      _states: SqlEasyState[],
      _transactionState: MultiBuilderTransactionState,
   ): string => {
      throw new ParserError(
         "toSqlMulti not implemented for PostgresParser",
      );
   };
}
