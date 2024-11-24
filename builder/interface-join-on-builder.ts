// deno-lint-ignore-file no-explicit-any
import type { IConfiguration } from "../configuration/interface-configuration.ts";
import type { JoinOperator } from "../enums/join-operator.ts";
import type { JoinOnState } from "../state/join-on-state.ts";

export interface IJoinOnBuilder<T> {
  and(): T;
  newJoinOnBuilder(config: IConfiguration): T;
  on(
    aliasLeft: string,
    columnLeft: string,
    joinOperator: JoinOperator,
    aliasRight: string,
    columnRight: string,
  ): T;
  onGroup(builder: (jb: T) => void): T;
  onRaw(raw: string): T;
  onValue(
    aliasLeft: string,
    columnLeft: string,
    joinOperator: JoinOperator,
    valueRight: any,
  ): T;
  or(): T;
  states(): JoinOnState[];
}
