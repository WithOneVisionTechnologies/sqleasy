import { BuilderType } from "../enums/builder_type.ts";
import { SqlEasyState } from "./sqleasy_state.ts";

export class SelectState {
   builderType: BuilderType = BuilderType.None;
   tableNameOrAlias: string | undefined = undefined;
   columnName: string | undefined = undefined;
   alias: string | undefined = undefined;
   sqlEasyState: SqlEasyState = new SqlEasyState();
   raw: string | undefined = undefined;
}
