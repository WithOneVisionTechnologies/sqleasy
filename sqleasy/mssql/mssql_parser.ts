import type { MultiBuilderTransactionState } from "../../enums/multi_builder_transaction_state.ts";
import { ParserMode } from "../../enums/parser_mode.ts";
import { SqlHelper } from "../../helpers/sql_helper.ts";
import { DefaultParser } from "../../parser/default_parser.ts";
import { defaultToSql } from "../../parser/default_to_sql.ts";
import type { SqlEasyState } from "../../state/sqleasy_state.ts";
import type { MssqlConfiguration } from "./mssql_configuration.ts";

export class MssqlParser extends DefaultParser {
   private _mssqlConfiguration: MssqlConfiguration;

   constructor(config: MssqlConfiguration) {
      super(config);
      this._mssqlConfiguration = config;
   }

   public static NewMssqlParser(config: MssqlConfiguration): MssqlParser {
      return new MssqlParser(config);
   }

   public override toSql(
      state: SqlEasyState,
   ): { sql: string; errors: Error[] | undefined } {
      const paramsString = new SqlHelper(
         this._mssqlConfiguration,
         ParserMode.Prepared,
      );
      const finalString = new SqlHelper(
         this._mssqlConfiguration,
         ParserMode.Prepared,
      );

      const sqlHelper = defaultToSql(
         state,
         this._mssqlConfiguration,
         ParserMode.Prepared,
      );

      if (sqlHelper.hasErrors()) {
         return { sql: "", errors: sqlHelper.getErrors() };
      }

      let sql = sqlHelper.getSql();
      sql = sql.replaceAll("'", "''");

      if (sql.length > 4000) {
         return {
            sql: "",
            errors: [
               new Error("SQL string is too long for Mssql prepared statement"),
            ],
         };
      }

      let valueCounter: number = 0;

      for (const value of sqlHelper.getValues()) {
         const valuePosition = sql.indexOf(
            this._mssqlConfiguration.runtimeConfiguration()
               .preparedStatementPlaceholder,
         );

         if (valuePosition === -1) {
            break;
         }

         sql = sql.slice(0, valuePosition) + "@p" + valueCounter +
            sql.slice(valuePosition + 1);

         if (valueCounter > 0) {
            paramsString.addSqlSnippet(", ");
         }

         paramsString.addSqlSnippet(
            "@p" + valueCounter + " " + this.getParameterType(value),
         );

         valueCounter++;
      }

      if (paramsString.getSql().length > 4000) {
         return {
            sql: "",
            errors: [
               new Error("SQL string is too long for Mssql prepared statement"),
            ],
         };
      }

      finalString.addSqlSnippet("SET NOCOUNT ON; ");
      finalString.addSqlSnippet("exec sp_executesql N'");
      finalString.addSqlSnippet(sql);
      finalString.addSqlSnippet("', N'");
      finalString.addSqlSnippet(paramsString.getSql());
      finalString.addSqlSnippet("', ");

      for (let i = 0; i < sqlHelper.getValues().length; i++) {
         if (i > 0) {
            finalString.addSqlSnippet(", ");
         }

         finalString.addSqlSnippet(
            "@p" + i + " = " +
               finalString.getValueStringFromDataType(sqlHelper.getValues()[i]),
         );
      }

      finalString.addSqlSnippet(";");

      if (finalString.hasErrors()) {
         return { sql: "", errors: finalString.getErrors() };
      }

      return { sql: finalString.getSql(), errors: finalString.getErrors() };
   }

   public override toSqlMulti(
      _states: SqlEasyState[],
      _transactionState: MultiBuilderTransactionState,
   ): { sql: string; errors: Error[] | undefined } {
      throw new Error("toSqlMulti not implemented for MssqlParser");
   }

   private getParameterType(value: any): string {
      const typeOf = typeof value;

      switch (typeOf) {
         case "string":
            return "nvarchar(max)";
         case "number":
            if (Number.isInteger(value)) {
               if (value >= -128 && value <= 127) {
                  return "tinyint";
               } else if (value >= -32768 && value <= 32767) {
                  return "smallint";
               } else if (value >= -2147483648 && value <= 2147483647) {
                  return "int";
               } else {
                  return "bigint";
               }
            } else {
               return "float";
            }
         case "boolean":
            return "bit";
         default:
            return "nvarchar(max)";
      }
   }
}
