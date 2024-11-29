import type { FromState } from "./from_state.ts";
import type { JoinState } from "./join_state.ts";
import type { OrderByState } from "./order_by_state.ts";
import type { SelectState } from "./select_state.ts";
import type { WhereState } from "./where_state.ts";

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
