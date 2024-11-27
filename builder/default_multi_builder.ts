import type { IConfiguration } from "../configuration/interface_configuration.ts";
import { MultiBuilderTransactionState } from "../enums/multi_builder_transaction_state.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import type { IBuilder } from "./interface_builder.ts";
import type { IJoinOnBuilder } from "./interface_join_on_builder.ts";
import type { IMultiBuilder } from "./interface_multi_builder.ts";

export abstract class DefaultMultiBuilder<
   T extends IBuilder<T, U>,
   U extends IJoinOnBuilder<U>,
> implements IMultiBuilder<T, U> {
   private _config: IConfiguration;
   private _states: SqlEasyState[] = [];
   private _transactionState: MultiBuilderTransactionState =
      MultiBuilderTransactionState.TransactionOn;

   constructor(config: IConfiguration) {
      this._config = config;
   }

   public abstract newBuilder(): T;

   public addBuilder(builderName: string): T {
      const newBuilder = this.newBuilder();
      newBuilder.state().builderName = builderName;
      this._states.push(newBuilder.state());

      return newBuilder;
   }

   public removeBuilder(builderName: string): void {
      this._states = this._states.filter((state) =>
         state.builderName !== builderName
      );
   }

   public reorderBuilders(builderNames: string[]): void {
      const newStates: SqlEasyState[] = [];

      builderNames.forEach((builderName) => {
         const state = this._states.find((state) =>
            state.builderName === builderName
         );

         if (state) {
            newStates.push(state);
         }
      });

      this._states = newStates;
   }

   public setTransactionState(
      transactionState: MultiBuilderTransactionState,
   ): void {
      this._transactionState = transactionState;
   }

   public states(): SqlEasyState[] {
      return this._states;
   }

   public transactionState(): MultiBuilderTransactionState {
      return this._transactionState;
   }
}
