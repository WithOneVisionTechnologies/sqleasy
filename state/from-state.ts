import { BuilderType } from "../enums/builder-type.ts";
import type { SqlEasyState } from "./sqleasy.ts";

export class FromState {
  builderType: BuilderType = BuilderType.FromTable;
  owner: string | undefined = undefined;
  tableName: string = "";
  alias: string | undefined = undefined;
  sqlEasyState: SqlEasyState | undefined = undefined;
  raw: string | undefined = undefined;
}
