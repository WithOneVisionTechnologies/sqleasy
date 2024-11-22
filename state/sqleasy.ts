// deno-lint-ignore-file no-explicit-any
import type { FromState } from "./from-state.ts";
import type { JoinState } from "./join.ts";
import type { OrderByState } from "./order-by-state.ts";
import type { SelectState } from "./select.ts";
import type { WhereState } from "./where.ts";

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
