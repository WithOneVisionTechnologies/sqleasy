import type { IConfiguration } from "../configuration/interface_configuration.ts";
import { BuilderType } from "../enums/builder_type.ts";
import { DatabaseType } from "../enums/database_type.ts";
import type { ParserMode } from "../enums/parser_mode.ts";
import { SqlHelper } from "../helpers/sql_helper.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import { defaultToSql } from "./default_to_sql.ts";

export const defaultFrom = (
   state: SqlEasyState,
   config: IConfiguration,
   mode: ParserMode,
): SqlHelper => {
   const sqlHelper = new SqlHelper(config, mode);

   if (state.fromStates.length === 0) {
      sqlHelper.addErrorFromString("FROM: No tables to select from");
      return sqlHelper;
   }

   sqlHelper.addSqlSnippet("FROM ");

   state.fromStates.forEach((fromState, i) => {
      if (fromState.builderType === BuilderType.FromRaw) {
         sqlHelper.addSqlSnippet(fromState.raw ?? "");
         if (i < state.fromStates.length - 1) {
            sqlHelper.addSqlSnippet(", ");
         }
         return;
      }

      if (fromState.builderType === BuilderType.FromTable) {
         if (
            fromState.owner !== "" &&
            config.databaseType() === DatabaseType.Mysql
         ) {
            sqlHelper.addErrorFromString(
               "FROM: MySQL does not support table owners",
            );
            return;
         }

         if (fromState.owner !== "") {
            sqlHelper.addSqlSnippet(
               config.identifierDelimiters().begin + fromState.owner +
                  config.identifierDelimiters().end,
            );
            sqlHelper.addSqlSnippet(".");
         }

         sqlHelper.addSqlSnippet(
            config.identifierDelimiters().begin + fromState.tableName +
               config.identifierDelimiters().end,
         );

         if (fromState.alias !== "") {
            sqlHelper.addSqlSnippet(" AS ");
            sqlHelper.addSqlSnippet(
               config.identifierDelimiters().begin + fromState.alias +
                  config.identifierDelimiters().end,
            );
         }

         if (i < state.fromStates.length - 1) {
            sqlHelper.addSqlSnippet(", ");
         }

         return;
      }

      if (fromState.builderType === BuilderType.FromBuilder) {
         const subHelper = defaultToSql(
            fromState.sqlEasyState,
            config,
            mode,
         );

         if (subHelper.hasErrors()) {
            sqlHelper.addErrors(subHelper.getErrors());
            return sqlHelper;
         }

         sqlHelper.addSqlSnippet("(" + subHelper.getSql() + ")");

         if (fromState.alias !== "") {
            sqlHelper.addSqlSnippet(" AS ");
            sqlHelper.addSqlSnippet(
               config.identifierDelimiters().begin + fromState.alias +
                  config.identifierDelimiters().end,
            );
         }

         if (i < state.fromStates.length - 1) {
            sqlHelper.addSqlSnippet(", ");
         }
      }
   });

   return sqlHelper;
};
