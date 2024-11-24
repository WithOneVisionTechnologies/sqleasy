// deno-lint-ignore-file no-explicit-any
import type { FromState } from "./from-state.ts";
import type { JoinState } from "./join-state.ts";
import type { OrderByState } from "./order-by-state.ts";
import type { SelectState } from "./select-state.ts";
import type { WhereState } from "./where-state.ts";

export class SqlEasyState {
  builderName: string = "";
  fromStates: FromState[] = [];
  joinStates: JoinState[] = [];
  whereStates: WhereState[] = [];
  orderByStates: OrderByState[] = [];
  selectStates: SelectState[] = [];
  isInnerStatement: boolean = false;
  limit: number = 0;
  offset: number = 0;
  distinct: boolean = false;
  customState: any | undefined = undefined;
}
