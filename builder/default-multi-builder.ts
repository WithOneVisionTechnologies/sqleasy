import type { IConfiguration } from "../configuration/interface-configuration.ts";
import { MultiBuilderTransactionState } from "../enums/multi-builder-transaction-state.ts";
import type { SqlEasyState } from "../state/sqleasy-state.ts";
import type { IBuilder } from "./interface-builder.ts";
import type { IJoinOnBuilder } from "./interface-join-on-builder.ts";
import type { IMultiBuilder } from "./interface-multi-builder.ts";

// deno-lint-ignore-file no-explicit-any
export abstract class DefaultMultiBuilder<
  T extends IBuilder<T, U>,
  U extends IJoinOnBuilder<U>,
> implements IMultiBuilder<T, U> {
  private _config: IConfiguration;
  private _states: SqlEasyState[] = [];
  private _transactionState: MultiBuilderTransactionState =
    MultiBuilderTransactionState.TransactionOn;
  private _builderType: T;

  constructor(config: IConfiguration, builderType: T) {
    this._config = config;
    this._builderType = builderType;
  }

  public addBuilder(builderName: string): T {
    const newBuilder = this._builderType.newBuilder(this._config);
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
