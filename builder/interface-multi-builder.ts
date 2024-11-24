import type { MultiBuilderTransactionState } from "../enums/multi-builder-transaction-state.ts";
import type { SqlEasyState } from "../state/sqleasy-state.ts";
import type { IBuilder } from "./interface-builder.ts";
import type { IJoinOnBuilder } from "./interface-join-on-builder.ts";

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
