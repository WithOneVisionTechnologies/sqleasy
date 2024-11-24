// deno-lint-ignore-file no-explicit-any
import { BuilderType } from "../enums/builder-type.ts";
import { WhereOperator } from "../enums/where-operator.ts";
import type { SqlEasyState } from "./sqleasy-state.ts";

export class WhereState {
  builderType: BuilderType = BuilderType.None;
  tableNameOrAlias: string | undefined = undefined;
  columnName: string | undefined = undefined;
  whereOperator: WhereOperator = WhereOperator.None;
  raw: string | undefined = undefined;
  sqlEasyState: SqlEasyState | undefined = undefined;
  values: any[] | undefined = undefined;
}
