import { BuilderType } from "../enums/builder_type.ts";
import { WhereOperator } from "../enums/where_operator.ts";
import type { SqlEasyState } from "./sqleasy_state.ts";

export class WhereState {
   builderType: BuilderType = BuilderType.None;
   tableNameOrAlias: string | undefined = undefined;
   columnName: string | undefined = undefined;
   whereOperator: WhereOperator = WhereOperator.None;
   raw: string | undefined = undefined;
   sqlEasyState: SqlEasyState | undefined = undefined;
   values: any[] | undefined = undefined;
}
