import type { IConfiguration } from "../configuration/interface-configuration.ts";
import { BuilderType } from "../enums/builder-type.ts";
import { JoinType } from "../enums/join-type.ts";
import { SqlEasyState } from "../state/sqleasy.ts";
import type { IBuilder } from "./interface-builder.ts";
import type { IJoinOnBuilder } from "./interface-join-on-builder.ts";

export class DefaultBuilder<
  T extends IBuilder<T, U>,
  U extends IJoinOnBuilder<U>,
> implements IBuilder<T, U> {
  private _sqlEasyState: SqlEasyState = new SqlEasyState();
  private _config: IConfiguration;
  private _builderType: T;

  constructor(config: IConfiguration, builderType: T) {
    this._builderType = builderType;
    this._config = config;
  }

  public clearAll(): T {
    this._sqlEasyState = new SqlEasyState();
    return this._builderType;
  }

  public clearFrom(): T {
    this._sqlEasyState.fromStates = [];
    return this._builderType;
  }

  public clearJoin(): T {
    this._sqlEasyState.joinStates = [];
    return this._builderType;
  }

  public clearLimit(): T {
    this._sqlEasyState.limit = 0;
    return this._builderType;
  }

  public clearOffset(): T {
    this._sqlEasyState.offset = 0;
    return this._builderType;
  }

  public clearOrderBy(): T {
    this._sqlEasyState.orderByStates = [];
    return this._builderType;
  }

  public clearSelect(): T {
    this._sqlEasyState.selectStates = [];
    return this._builderType;
  }

  public clearWhere(): T {
    this._sqlEasyState.whereStates = [];
    return this._builderType;
  }

  public distinct(): T {
    this._sqlEasyState.distinct = true;
    return this._builderType;
  }

  public fromRaw(rawFrom: string): T {
    this._sqlEasyState.fromStates.push({
      builderType: BuilderType.FromRaw,
      owner: "",
      tableName: "",
      alias: "",
      sqlEasyState: undefined,
      raw: rawFrom,
    });
    return this._builderType;
  }

  public fromRaws(rawFroms: string[]): T {
    rawFroms.forEach((rawFrom) => {
      this.fromRaw(rawFrom);
    });
    return this._builderType;
  }

  public fromTable(tableName: string, alias: string): T {
    this._sqlEasyState.fromStates.push({
      builderType: BuilderType.FromTable,
      owner: this._config.defaultOwner(),
      tableName: tableName,
      alias: alias,
      sqlEasyState: undefined,
      raw: "",
    });
    return this._builderType;
  }

  public fromTables(tables: { tableName: string; alias: string }[]): T {
    tables.forEach((table) => {
      this.fromTable(table.tableName, table.alias);
    });
    return this._builderType;
  }

  public fromTableWithOwner(
    owner: string,
    tableName: string,
    alias: string,
  ): T {
    this._sqlEasyState.fromStates.push({
      builderType: BuilderType.FromTable,
      owner: owner,
      tableName: tableName,
      alias: alias,
      sqlEasyState: undefined,
      raw: "",
    });
    return this._builderType;
  }

  public fromTablesWithOwner(
    tables: { owner: string; tableName: string; alias: string }[],
  ): T {
    tables.forEach((table) => {
      this.fromTableWithOwner(table.owner, table.tableName, table.alias);
    });
    return this._builderType;
  }

  public fromWithBuilder(alias: string, builder: (builder: T) => void): T {
    const newBuilder = this._builderType.newBuilder(this._config);
    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    this._sqlEasyState.fromStates.push({
      builderType: BuilderType.FromBuilder,
      owner: "",
      tableName: "",
      alias: alias,
      sqlEasyState: newBuilder.state(),
      raw: "",
    });

    return this._builderType;
  }

  public joinRaw(rawJoin: string): T {
    this._sqlEasyState.joinStates.push({
      builderType: BuilderType.JoinRaw,
      joinType: JoinType.Inner,
      owner: "",
      tableName: "",
      alias: "",
      sqlEasyState: undefined,
      raw: rawJoin,
      joinOnStates: [],
    });

    return this._builderType;
  }

  public joinRaws(rawJoins: string[]): T {
    rawJoins.forEach((rawJoin) => {
      this.joinRaw(rawJoin);
    });

    return this._builderType;
  }

  public joinTable(
    joinType: JoinType,
    tableName: string,
    alias: string,
    joinOnBuilder: (joinOnBuilder: U) => void,
  ): T {
    const joinOnBuilderInstance = this._builderType.newJoinOnBuilder(
      this._config,
    );
    joinOnBuilder(joinOnBuilderInstance);

    this._sqlEasyState.joinStates.push({
      builderType: BuilderType.JoinTable,
      joinType: joinType,
      owner: this._config.defaultOwner(),
      tableName: tableName,
      alias: alias,
      sqlEasyState: undefined,
      raw: "",
      joinOnStates: joinOnBuilderInstance.states(),
    });

    return this._builderType;
  }
}
