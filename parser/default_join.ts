import type { IConfiguration } from "../configuration/interface_configuration.ts";
import { BuilderType } from "../enums/builder_type.ts";
import { JoinOnOperator } from "../enums/join_on_operator.ts";
import { JoinOperator } from "../enums/join_operator.ts";
import { JoinType } from "../enums/join_type.ts";
import type { ParserMode } from "../enums/parser_mode.ts";
import { SqlHelper } from "../helpers/sql_helper.ts";
import type { JoinOnState } from "../state/join_on_state.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import type { IParser } from "./interface_parser.ts";

export const defaultJoin = (
   state: SqlEasyState,
   config: IConfiguration,
   parser: IParser,
   mode: ParserMode,
): SqlHelper => {
   let sqlHelper = new SqlHelper(config, mode);

   if (state.joinStates.length === 0) {
      return sqlHelper;
   }

   for (let i = 0; i < state.joinStates.length; i++) {
      const joinState = state.joinStates[i];
      if (joinState.builderType === BuilderType.JoinRaw) {
         sqlHelper.addSqlSnippet(joinState.raw ?? "");
         if (i < state.joinStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }
         continue;
      }

      switch (joinState.joinType) {
         case JoinType.Inner:
            sqlHelper.addSqlSnippet("INNER JOIN ");
            break;
         case JoinType.Left:
            sqlHelper.addSqlSnippet("LEFT JOIN ");
            break;
         case JoinType.LeftOuter:
            sqlHelper.addSqlSnippet("LEFT OUTER JOIN ");
            break;
         case JoinType.Right:
            sqlHelper.addSqlSnippet("RIGHT JOIN ");
            break;
         case JoinType.RightOuter:
            sqlHelper.addSqlSnippet("RIGHT OUTER JOIN ");
            break;
         case JoinType.FullOuter:
            sqlHelper.addSqlSnippet("FULL OUTER JOIN ");
            break;
         case JoinType.Cross:
            sqlHelper.addSqlSnippet("CROSS JOIN ");
            break;
      }

      if (joinState.builderType === BuilderType.JoinTable) {
         if (joinState.owner !== "") {
            sqlHelper.addSqlSnippet(
               config.identifierDelimiters().begin + joinState.owner +
                  config.identifierDelimiters().end,
            );
            sqlHelper.addSqlSnippet(".");
         }

         sqlHelper.addSqlSnippet(
            config.identifierDelimiters().begin + joinState.tableName +
               config.identifierDelimiters().end,
         );

         if (joinState.alias !== "") {
            sqlHelper.addSqlSnippet(" AS ");
            sqlHelper.addSqlSnippet(
               config.identifierDelimiters().begin + joinState.alias +
                  config.identifierDelimiters().end,
            );
         }

         sqlHelper = defaultJoinOns(sqlHelper, config, joinState.joinOnStates);

         if (i < state.joinStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }

         continue;
      }

      if (joinState.builderType === BuilderType.JoinBuilder) {
         const subHelper = defaultToSql(
            joinState.sqlEasyState,
            config,
            parser,
            mode,
         );

         if (subHelper.HasError()) {
            sqlHelper.addError(subHelper.GetError());
            return sqlHelper;
         }

         sqlHelper.addSqlSnippet("(" + subHelper.GetSql() + ")");

         if (joinState.alias !== "") {
            sqlHelper.addSqlSnippet(" AS ");
            sqlHelper.addSqlSnippet(
               config.identifierDelimiters().begin + joinState.alias +
                  config.identifierDelimiters().end,
            );
         }

         sqlHelper = defaultJoinOns(sqlHelper, config, joinState.joinOnStates);

         if (i < state.joinStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }
      }
   }

   return sqlHelper;
};

const defaultJoinOns = (
   sqlHelper: SqlHelper,
   config: IConfiguration,
   joinOnStates: JoinOnState[],
): SqlHelper => {
   if (joinOnStates.length === 0) {
      return sqlHelper;
   }

   sqlHelper.addSqlSnippet(" ON ");

   for (let i = 0; i < joinOnStates.length; i++) {
      if (
         i === 0 &&
         (joinOnStates[i].joinOnOperator === JoinOnOperator.And ||
            joinOnStates[i].joinOnOperator === JoinOnOperator.Or)
      ) {
         sqlHelper.addErrorFromString(
            "JOIN: First JOIN ON operator cannot be AND or OR",
         );

         return sqlHelper;
      }

      if (
         i === joinOnStates.length - 1 &&
         (joinOnStates[i].joinOnOperator === JoinOnOperator.And ||
            joinOnStates[i].joinOnOperator === JoinOnOperator.Or)
      ) {
         sqlHelper.addErrorFromString(
            "JOIN: AND or OR cannot be used as the last JOIN ON operator",
         );

         return sqlHelper;
      }

      if (
         (joinOnStates[i].joinOnOperator === JoinOnOperator.And ||
            joinOnStates[i].joinOnOperator === JoinOnOperator.Or) && (
               joinOnStates[i - 1].joinOnOperator === JoinOnOperator.And ||
               joinOnStates[i - 1].joinOnOperator === JoinOnOperator.Or
            )
      ) {
         sqlHelper.addErrorFromString(
            "JOIN: AND or OR cannot be used consecutively",
         );

         return sqlHelper;
      }

      if (
         (joinOnStates[i].joinOnOperator === JoinOnOperator.And ||
            joinOnStates[i].joinOnOperator === JoinOnOperator.Or) && (
               joinOnStates[i - 1].joinOnOperator === JoinOnOperator.GroupBegin
            )
      ) {
         sqlHelper.addErrorFromString(
            "JOIN: AND or OR cannot be used directly after a group begin",
         );

         return sqlHelper;
      }

      if (
         joinOnStates[i].joinOnOperator === JoinOnOperator.GroupBegin &&
         i === joinOnStates.length - 1
      ) {
         sqlHelper.addErrorFromString(
            "JOIN: Group begin cannot be the last JOIN ON operator",
         );

         return sqlHelper;
      }

      if (joinOnStates[i].joinOnOperator === JoinOnOperator.And) {
         sqlHelper.addSqlSnippet("AND");

         if (i < joinOnStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }
         continue;
      }

      if (joinOnStates[i].joinOnOperator === JoinOnOperator.Or) {
         sqlHelper.addSqlSnippet("OR");

         if (i < joinOnStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }
         continue;
      }

      if (joinOnStates[i].joinOnOperator === JoinOnOperator.GroupBegin) {
         sqlHelper.addSqlSnippet("(");
         continue;
      }

      if (joinOnStates[i].joinOnOperator === JoinOnOperator.GroupEnd) {
         sqlHelper.addSqlSnippet(")");

         if (i < joinOnStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }
         continue;
      }

      if (joinOnStates[i].joinOnOperator === JoinOnOperator.Raw) {
         sqlHelper.addSqlSnippet(joinOnStates[i].raw ?? "");

         if (i < joinOnStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }
         continue;
      }

      if (joinOnStates[i].joinOnOperator === JoinOnOperator.On) {
         sqlHelper.addSqlSnippet(
            config
               .identifierDelimiters()
               .begin + joinOnStates[i].aliasLeft + config
               .identifierDelimiters()
               .end,
         );
         sqlHelper.addSqlSnippet(".");
         sqlHelper.addSqlSnippet(
            config
               .identifierDelimiters()
               .begin + joinOnStates[i].columnLeft + config
               .identifierDelimiters()
               .end,
         );

         sqlHelper.addSqlSnippet(" ");

         switch (joinOnStates[i].joinOperator) {
            case JoinOperator.Equals:
               sqlHelper.addSqlSnippet("=");
               break;
            case JoinOperator.NotEquals:
               sqlHelper.addSqlSnippet("<>");
               break;
            case JoinOperator.GreaterThan:
               sqlHelper.addSqlSnippet(">");
               break;
            case JoinOperator.GreaterThanOrEquals:
               sqlHelper.addSqlSnippet(">=");
               break;
            case JoinOperator.LessThan:
               sqlHelper.addSqlSnippet("<");
               break;
            case JoinOperator.LessThanOrEquals:
               sqlHelper.addSqlSnippet("<=");
               break;
         }

         sqlHelper.addSqlSnippet(" ");

         sqlHelper.addSqlSnippet(
            config
               .identifierDelimiters()
               .begin + joinOnStates[i].aliasRight + config
               .identifierDelimiters()
               .end,
         );
         sqlHelper.addSqlSnippet(".");
         sqlHelper.addSqlSnippet(
            config
               .identifierDelimiters()
               .begin + joinOnStates[i].columnRight + config
               .identifierDelimiters()
               .end,
         );

         if (i < joinOnStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }
         continue;
      }

      if (joinOnStates[i].joinOnOperator === JoinOnOperator.Value) {
         sqlHelper.addSqlSnippet(
            config
               .identifierDelimiters()
               .begin + joinOnStates[i].aliasLeft + config
               .identifierDelimiters()
               .end,
         );
         sqlHelper.addSqlSnippet(".");
         sqlHelper.addSqlSnippet(
            config
               .identifierDelimiters()
               .begin + joinOnStates[i].columnLeft + config
               .identifierDelimiters()
               .end,
         );

         sqlHelper.addSqlSnippet(" ");

         switch (joinOnStates[i].joinOperator) {
            case JoinOperator.Equals:
               sqlHelper.addSqlSnippet("=");
               break;
            case JoinOperator.NotEquals:
               sqlHelper.addSqlSnippet("<>");
               break;
            case JoinOperator.GreaterThan:
               sqlHelper.addSqlSnippet(">");
               break;
            case JoinOperator.GreaterThanOrEquals:
               sqlHelper.addSqlSnippet(">=");
               break;
            case JoinOperator.LessThan:
               sqlHelper.addSqlSnippet("<");
               break;
            case JoinOperator.LessThanOrEquals:
               sqlHelper.addSqlSnippet("<=");
               break;
         }

         sqlHelper.addSqlSnippet(" ");

         sqlHelper.addSqlSnippet(
            sqlHelper.addDynamicValue(
               joinOnStates[i].valueRight,
            ),
         );

         if (i < joinOnStates.length - 1) {
            sqlHelper.addSqlSnippet(" ");
         }
         continue;
      }
   }

   return sqlHelper;
};
