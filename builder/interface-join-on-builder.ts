// deno-lint-ignore-file no-explicit-any
import type { IConfiguration } from "../configuration/interface-configuration.ts";
import type { JoinOperator } from "../enums/join-operator.ts";
import type { JoinOnState } from "../state/join-on-state.ts";

export interface IJoinOnBuilder<T> {
  andOn(
    aliasLeft: string,
    columnLeft: string,
    joinOperator: JoinOperator,
    aliasRight: string,
    columnRight: string,
  ): T;
  andOnGroup(groupBuilder: (jb: T) => void): T;
  andOnRaw(raw: string): T;
  andOnValue(
    aliasLeft: string,
    columnLeft: string,
    joinOperator: JoinOperator,
    valueRight: any,
  ): T;
  newJoinOnBuilder(config: IConfiguration): T;
  on(
    aliasLeft: string,
    columnLeft: string,
    joinOperator: JoinOperator,
    aliasRight: string,
    columnRight: string,
  ): T;
  onGroup(groupBuilder: (jb: T) => void): T;
  onRaw(raw: string): T;
  onValue(
    aliasLeft: string,
    columnLeft: string,
    joinOperator: JoinOperator,
    valueRight: any,
  ): T;
  orOn(
    aliasLeft: string,
    columnLeft: string,
    joinOperator: JoinOperator,
    aliasRight: string,
    columnRight: string,
  ): T;
  orOnGroup(groupBuilder: (jb: T) => void): T;
  orOnRaw(raw: string): T;
  orOnValue(
    aliasLeft: string,
    columnLeft: string,
    joinOperator: JoinOperator,
    valueRight: any,
  ): T;
  states(): JoinOnState[];
}
