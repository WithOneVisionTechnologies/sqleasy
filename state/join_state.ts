import { BuilderType } from "../enums/builder_type.ts";
import { JoinType } from "../enums/join_type.ts";
import type { JoinOnState } from "./join_on_state.ts";
import { SqlEasyState } from "./sqleasy_state.ts";

export class JoinState {
   builderType: BuilderType = BuilderType.None;
   joinType: JoinType = JoinType.Inner;
   owner: string | undefined = undefined;
   tableName: string | undefined = undefined;
   alias: string | undefined = undefined;
   sqlEasyState: SqlEasyState = new SqlEasyState();
   raw: string | undefined = undefined;
   joinOnStates: JoinOnState[] = [];
}
