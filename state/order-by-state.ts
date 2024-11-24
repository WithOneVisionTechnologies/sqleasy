import { BuilderType } from "../enums/builder-type.ts";
import { OrderByDirection } from "../enums/order-by-direction.ts";

export class OrderByState {
  builderType: BuilderType = BuilderType.None;
  tableNameOrAlias: string | undefined = undefined;
  columnName: string | undefined = undefined;
  direction: OrderByDirection = OrderByDirection.None;
  raw: string | undefined = undefined;
}
