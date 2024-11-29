import type { MultiBuilderTransactionState } from "../../enums/multi_builder_transaction_state.ts";
import { ParserError } from "../../helpers/parser_error.ts";
import { DefaultParser } from "../../parser/default_parser.ts";
import type { SqlEasyState } from "../../state/sqleasy_state.ts";
import type { MysqlConfiguration } from "./mysql_configuration.ts";

export class MysqlParser extends DefaultParser {
   private _mysqlConfiguration: MysqlConfiguration;

   constructor(config: MysqlConfiguration) {
      super(config);
      this._mysqlConfiguration = config;
   }

   public override toSql = (
      _state: SqlEasyState,
   ): string => {
      throw new ParserError("toSql not implemented for MysqlParser");
   };

   public override toSqlMulti = (
      _states: SqlEasyState[],
      _transactionState: MultiBuilderTransactionState,
   ): string => {
      throw new ParserError(
         "toSqlMulti not implemented for MysqlParser",
      );
   };
}
