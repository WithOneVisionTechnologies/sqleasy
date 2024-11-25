import { JoinOnOperator } from "../enums/join_on_operator.ts";
import { JoinOperator } from "../enums/join_operator.ts";

export class JoinOnState {
   aliasLeft: string | undefined = undefined;
   columnLeft: string | undefined = undefined;
   joinOperator: JoinOperator = JoinOperator.Equals;
   aliasRight: string | undefined = undefined;
   columnRight: string | undefined = undefined;
   joinOnOperator: JoinOnOperator = JoinOnOperator.None;
   raw: string | undefined = undefined;
   valueRight: any | undefined = undefined;
}
