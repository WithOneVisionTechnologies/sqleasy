import IsHelper from "@withonevision/is-helper";
import type { IConfiguration } from "../configuration/interface_configuration.ts";
import { DatabaseType } from "../enums/database_type.ts";
import type { ParserMode } from "../enums/parser_mode.ts";
import { SqlHelper } from "../helpers/sql_helper.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import type { IParser } from "./interface_parser.ts";
import { BuilderType } from "../enums/builder_type.ts";

export const defaultSelect = (
   state: SqlEasyState,
   config: IConfiguration,
   parser: IParser,
   mode: ParserMode,
): SqlHelper => {
   const sqlHelper = new SqlHelper(config, mode);

   if (state.selectStates.length === 0) {
      sqlHelper.addErrorFromString(
         "SELECT: Select statement must have at least one select state",
      );
      return sqlHelper;
   }

   sqlHelper.addSqlSnippet("SELECT ");

   if (state.distinct) {
      sqlHelper.addSqlSnippet("DISTINCT ");
   }

   if (config.databaseType() === DatabaseType.Mssql) {
      if (
         !IsHelper.isNullOrUndefined(state.customState["top"]) &&
         state.customState["top"] > 0
      ) {
         sqlHelper.addSqlSnippet("TOP ");
         sqlHelper.addSqlSnippet(`(${state.customState["top"]})`);
         sqlHelper.addSqlSnippet(" ");
      }

      if (
         IsHelper.isNullOrUndefined(state.customState["top"]) &&
         !state.isInnerStatement &&
         state.limit === 0 &&
         (!state.whereStates || state.whereStates.length === 0)
      ) {
         sqlHelper.addSqlSnippet("TOP ");
         sqlHelper.addSqlSnippet(
            `(${config.runtimeConfiguration().maxRowsReturned})`,
         );
         sqlHelper.addSqlSnippet(" ");
      }
   }

   for (let i = 0; i < state.selectStates.length; i++) {
      const selectState = state.selectStates[i];

      if (selectState.builderType === BuilderType.SelectAll) {
         sqlHelper.addSqlSnippet("*");

         if (i < state.selectStates.length - 1) {
            sqlHelper.addSqlSnippet(", ");
         }
      }

      if (selectState.builderType === BuilderType.SelectRaw) {
         sqlHelper.addSqlSnippet(selectState.raw ?? "");
         if (i < state.selectStates.length - 1) {
            sqlHelper.addSqlSnippet(", ");
         }
         continue;
      }

      if (selectState.builderType === BuilderType.SelectColumn) {
         sqlHelper.addSqlSnippet(
            `${config.identifierDelimiters().begin}${selectState.tableNameOrAlias}${config.identifierDelimiters().end}`,
         );
         sqlHelper.addSqlSnippet(".");
         sqlHelper.addSqlSnippet(
            `${config.identifierDelimiters().begin}${selectState.columnName}${config.identifierDelimiters().end}`,
         );

         if (selectState.alias !== "") {
            sqlHelper.addSqlSnippet(" AS ");
            sqlHelper.addSqlSnippet(
               `${config.identifierDelimiters().begin}${selectState.alias}${config.identifierDelimiters().end}`,
            );
         }

         if (i < state.selectStates.length - 1) {
            sqlHelper.addSqlSnippet(", ");
         }

         continue;
      }

      if (selectState.builderType === BuilderType.SelectBuilder) {
         const subHelper = defaultToSql(
            selectState.sqlEasyState,
            config,
            parser,
            mode,
         );

         if (subHelper.HasError()) {
            sqlHelper.addError(subHelper.GetError());
            return sqlHelper;
         }

         sqlHelper.addSqlSnippet(`(${subHelper.GetSql()})`);

         if (selectState.alias !== "") {
            sqlHelper.addSqlSnippet(" AS ");
            sqlHelper.addSqlSnippet(
               `${config.identifierDelimiters().begin}${selectState.alias}${config.identifierDelimiters().end}`,
            );
         }

         if (i < state.selectStates.length - 1) {
            sqlHelper.addSqlSnippet(", ");
         }

         continue;
      }
   }

   return sqlHelper;
};
