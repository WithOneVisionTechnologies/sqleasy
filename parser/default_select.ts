import IsHelper from "@withonevision/is-helper";
import type { IConfiguration } from "../configuration/interface_configuration.ts";
import { DatabaseType } from "../enums/database_type.ts";
import type { ParserMode } from "../enums/parser_mode.ts";
import { SqlHelper } from "../helpers/sql_helper.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import { BuilderType } from "../enums/builder_type.ts";
import { defaultToSql } from "./default_to_sql.ts";
import { ParserError } from "../helpers/parser_error.ts";
import { ParserArea } from "../enums/parser_area.ts";

export const defaultSelect = (
   state: SqlEasyState,
   config: IConfiguration,
   mode: ParserMode,
): SqlHelper => {
   const sqlHelper = new SqlHelper(config, mode);

   if (state.selectStates.length === 0) {
      throw new ParserError(
         ParserArea.Select,
         "Select statement must have at least one select state",
      );
   }

   sqlHelper.addSqlSnippet("SELECT ");

   if (state.distinct) {
      sqlHelper.addSqlSnippet("DISTINCT ");
   }

   if (config.databaseType() === DatabaseType.Mssql) {
      if (
         !IsHelper.isNullOrUndefined(state.customState) &&
         !IsHelper.isNullOrUndefined(state.customState["top"]) &&
         state.customState["top"] > 0
      ) {
         sqlHelper.addSqlSnippet("TOP ");
         sqlHelper.addSqlSnippet(`(${state.customState["top"]})`);
         sqlHelper.addSqlSnippet(" ");
      }

      if (
         !IsHelper.isNullOrUndefined(state.customState) &&
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
            mode,
         );

         sqlHelper.addSqlSnippet(`(${subHelper.getSql()})`);

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
