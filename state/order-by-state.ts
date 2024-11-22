import { BuilderType } from "../enums/builder-type.ts";
import { OrderByDirection } from "../enums/order-by-direction.ts";

export class OrderByState {
  builderType: BuilderType = BuilderType.OrderByColumn;
  tableNameOrAlias: string = "";
  columnName: string = "";
  direction: OrderByDirection = OrderByDirection.Ascending;
  raw: string | undefined = undefined;
}
