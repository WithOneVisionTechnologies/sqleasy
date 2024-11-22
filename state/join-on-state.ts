// deno-lint-ignore-file no-explicit-any
import { JoinOnOperator } from "../enums/join-on-operator.ts";
import { JoinOperator } from "../enums/join-operator.ts";

export class JoinOnState {
  aliasLeft: string | undefined = undefined;
  columnLeft: string = "";
  joinOperator: JoinOperator = JoinOperator.Equals;
  aliasRight: string | undefined = undefined;
  columnRight: string = "";
  joinOnOperator: JoinOnOperator = JoinOnOperator.On;
  raw: string | undefined = undefined;
  valueRight: any | undefined = undefined;
}
