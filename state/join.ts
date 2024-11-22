import { BuilderType } from "../enums/builder-type.ts";
import { JoinType } from "../enums/join-type.ts";
import type { JoinOnState } from "./join-on-state.ts";
import type { SqlEasyState } from "./sqleasy.ts";

export class JoinState {
  builderType: BuilderType = BuilderType.JoinTable;
  joinType: JoinType = JoinType.Inner;
  owner: string | undefined = undefined;
  tableName: string = "";
  alias: string | undefined = undefined;
  sqlEasyState: SqlEasyState | undefined = undefined;
  raw: string | undefined = undefined;
  joinOnStates: JoinOnState[] = [];
}
