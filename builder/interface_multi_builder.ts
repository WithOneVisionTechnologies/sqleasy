import type { MultiBuilderTransactionState } from "../enums/multi_builder_transaction_state.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import type { IBuilder } from "./interface_builder.ts";
import type { IJoinOnBuilder } from "./interface_join_on_builder.ts";

export interface IMultiBuilder<
   T extends IBuilder<T, U>,
   U extends IJoinOnBuilder<U>,
> {
   addBuilder(builderName: string): T;
   removeBuilder(builderName: string): void;
   reorderBuilders(builderNames: string[]): void;
   setTransactionState(transactionState: MultiBuilderTransactionState): void;
   states(): SqlEasyState[];
   transactionState(): MultiBuilderTransactionState;
}
