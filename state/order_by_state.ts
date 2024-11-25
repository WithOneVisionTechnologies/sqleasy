import { BuilderType } from "../enums/builder_type.ts";
import { OrderByDirection } from "../enums/order_by_direction.ts";

export class OrderByState {
   builderType: BuilderType = BuilderType.None;
   tableNameOrAlias: string | undefined = undefined;
   columnName: string | undefined = undefined;
   direction: OrderByDirection = OrderByDirection.None;
   raw: string | undefined = undefined;
}
