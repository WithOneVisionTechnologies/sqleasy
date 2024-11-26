import IsHelper from "@withonevision/is-helper";
import type { IConfiguration } from "../configuration/interface_configuration.ts";
import type { ParserMode } from "../enums/parser_mode.ts";
import { SqlHelper } from "../helpers/sql_helper.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import { defaultFrom } from "./default_from.ts";
import { defaultJoin } from "./default_join.ts";
import { defaultLimitOffset } from "./default_limit_offset.ts";
import { defaultOrderBy } from "./default_order_by.ts";
import { defaultSelect } from "./default_select.ts";
import { defaultWhere } from "./default_where.ts";

export const defaultToSql = (
   state: SqlEasyState | undefined,
   config: IConfiguration,
   mode: ParserMode,
): SqlHelper => {
   const sqlHelper = new SqlHelper(config, mode);

   if (IsHelper.isNullOrUndefined(state)) {
      sqlHelper.addErrorFromString("No state provided");
      return sqlHelper;
   }

   const sel = defaultSelect(state, config, mode);

   if (sel.hasErrors()) {
      sqlHelper.addErrors(sel.getErrors());
      return sqlHelper;
   }

   sqlHelper.addSqlSnippetWithValues(sel.getSql(), sel.getValues());

   const from = defaultFrom(state, config, mode);

   if (from.hasErrors()) {
      sqlHelper.addErrors(from.getErrors());
   }

   sqlHelper.addSqlSnippet(" ");
   sqlHelper.addSqlSnippetWithValues(from.getSql(), from.getValues());

   if (state.joinStates.length > 0) {
      const join = defaultJoin(state, config, mode);

      if (join.hasErrors()) {
         sqlHelper.addErrors(join.getErrors());
         return sqlHelper;
      }

      sqlHelper.addSqlSnippet(" ");
      sqlHelper.addSqlSnippetWithValues(join.getSql(), join.getValues());
   }

   if (state.whereStates.length > 0) {
      const where = defaultWhere(state, config, mode);

      if (where.hasErrors()) {
         sqlHelper.addErrors(where.getErrors());
         return sqlHelper;
      }

      sqlHelper.addSqlSnippet(" ");
      sqlHelper.addSqlSnippetWithValues(where.getSql(), where.getValues());
   }

   if (state.orderByStates.length > 0) {
      const orderBy = defaultOrderBy(state, config, mode);

      if (orderBy.hasErrors()) {
         sqlHelper.addErrors(orderBy.getErrors());
         return sqlHelper;
      }

      sqlHelper.addSqlSnippet(" ");
      sqlHelper.addSqlSnippetWithValues(orderBy.getSql(), orderBy.getValues());
   }

   if (state.limit > 0 || state.offset > 0) {
      const limitOffset = defaultLimitOffset(
         state,
         config,
         mode,
      );

      if (limitOffset.hasErrors()) {
         sqlHelper.addErrors(limitOffset.getErrors());
         return sqlHelper;
      }

      sqlHelper.addSqlSnippet(" ");
      sqlHelper.addSqlSnippetWithValues(
         limitOffset.getSql(),
         limitOffset.getValues(),
      );
   }

   if (!state.isInnerStatement) {
      sqlHelper.addSqlSnippet(";");
   }

   return sqlHelper;
};
