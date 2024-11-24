import { BuilderType } from "../enums/builder-type.ts";
import type { SqlEasyState } from "./sqleasy-state.ts";

export class SelectState {
  builderType: BuilderType = BuilderType.None;
  tableNameOrAlias: string | undefined = undefined;
  columnName: string | undefined = undefined;
  alias: string | undefined = undefined;
  sqlEasyState: SqlEasyState | undefined = undefined;
  raw: string | undefined = undefined;
}
