import { BuilderType } from "../enums/builder_type.ts";
import type { SqlEasyState } from "./sqleasy_state.ts";

export class FromState {
   builderType: BuilderType = BuilderType.None;
   owner: string | undefined = undefined;
   tableName: string | undefined = undefined;
   alias: string | undefined = undefined;
   sqlEasyState: SqlEasyState | undefined = undefined;
   raw: string | undefined = undefined;
}
