// deno-lint-ignore-file no-explicit-any
import { BuilderType } from "../enums/builder-type.ts";
import { WhereOperator } from "../enums/where-operator.ts";
import type { SqlEasyState } from "./sqleasy.ts";

export class WhereState {
  builderType: BuilderType = BuilderType.WhereAnd;
  tableNameOrAlias: string = "";
  columnName: string = "";
  whereOperator: WhereOperator = WhereOperator.Equals;
  raw: string | undefined = undefined;
  sqlEasyState: SqlEasyState | undefined = undefined;
  values: any[] = [];
}
