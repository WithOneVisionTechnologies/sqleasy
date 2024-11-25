import type { IConfiguration } from "../configuration/interface_configuration.ts";
import { JoinOnOperator } from "../enums/join_on_operator.ts";
import { JoinOperator } from "../enums/join_operator.ts";
import type { JoinOnState } from "../state/join_on_state.ts";
import type { IJoinOnBuilder } from "./interface_join_on_builder.ts";

export abstract class DefaultJoinOnBuilder<T extends IJoinOnBuilder<T>>
   implements IJoinOnBuilder<T> {
   private _states: JoinOnState[] = [];
   private _config: IConfiguration;
   private _builderType: T;

   constructor(config: IConfiguration, builderType: T) {
      this._builderType = builderType;
      this._config = config;
   }

   public abstract newJoinOnBuilder(config: IConfiguration): T;

   public and(): T {
      this._states.push({
         joinOperator: JoinOperator.None,
         joinOnOperator: JoinOnOperator.And,
         aliasLeft: undefined,
         columnLeft: undefined,
         aliasRight: undefined,
         columnRight: undefined,
         raw: undefined,
         valueRight: undefined,
      });

      return this._builderType;
   }

   public on(
      aliasLeft: string,
      columnLeft: string,
      joinOperator: JoinOperator,
      aliasRight: string,
      columnRight: string,
   ): T {
      this._states.push({
         joinOperator,
         joinOnOperator: JoinOnOperator.On,
         aliasLeft,
         columnLeft,
         aliasRight,
         columnRight,
         raw: undefined,
         valueRight: undefined,
      });

      return this._builderType;
   }

   public onGroup(builder: (builder: T) => void): T {
      this._states.push({
         joinOperator: JoinOperator.None,
         joinOnOperator: JoinOnOperator.GroupBegin,
         aliasLeft: undefined,
         columnLeft: undefined,
         aliasRight: undefined,
         columnRight: undefined,
         raw: undefined,
         valueRight: undefined,
      });

      const newBuilder = this.newJoinOnBuilder(this._config);
      builder(newBuilder);

      this._states.push({
         joinOperator: JoinOperator.None,
         joinOnOperator: JoinOnOperator.GroupEnd,
         aliasLeft: undefined,
         columnLeft: undefined,
         aliasRight: undefined,
         columnRight: undefined,
         raw: undefined,
         valueRight: undefined,
      });

      return this._builderType;
   }

   public onRaw(raw: string): T {
      this._states.push({
         joinOperator: JoinOperator.None,
         joinOnOperator: JoinOnOperator.Raw,
         aliasLeft: undefined,
         columnLeft: undefined,
         aliasRight: undefined,
         columnRight: undefined,
         raw,
         valueRight: undefined,
      });
      return this as unknown as T;
   }

   public onValue(
      aliasLeft: string,
      columnLeft: string,
      joinOperator: JoinOperator,
      valueRight: any,
   ): T {
      this._states.push({
         joinOperator,
         joinOnOperator: JoinOnOperator.Value,
         aliasLeft,
         columnLeft,
         aliasRight: undefined,
         columnRight: undefined,
         raw: undefined,
         valueRight,
      });
      return this as unknown as T;
   }

   public or(): T {
      this._states.push({
         joinOperator: JoinOperator.None,
         joinOnOperator: JoinOnOperator.Or,
         aliasLeft: undefined,
         columnLeft: undefined,
         aliasRight: undefined,
         columnRight: undefined,
         raw: undefined,
         valueRight: undefined,
      });

      return this._builderType;
   }

   public states(): JoinOnState[] {
      return this._states;
   }
}
