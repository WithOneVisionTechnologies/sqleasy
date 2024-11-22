import { BuilderType } from "../enums/builder-type.ts";
import type { SqlEasyState } from "./sqleasy.ts";

export class SelectState {
  builderType: BuilderType = BuilderType.SelectColumn;
  tableNameOrAlias: string = "";
  columnName: string = "";
  alias: string | undefined = undefined;
  sqlEasyState: SqlEasyState | undefined = undefined;
  raw: string | undefined = undefined;
}
