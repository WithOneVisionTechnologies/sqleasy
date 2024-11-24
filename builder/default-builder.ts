// deno-lint-ignore-file no-explicit-any
import type { IConfiguration } from "../configuration/interface-configuration.ts";
import { BuilderType } from "../enums/builder-type.ts";
import { JoinType } from "../enums/join-type.ts";
import { OrderByDirection } from "../enums/order-by-direction.ts";
import { WhereOperator } from "../enums/where-operator.ts";
import { SqlEasyState } from "../state/sqleasy.ts";
import type { IBuilder } from "./interface-builder.ts";
import type { IJoinOnBuilder } from "./interface-join-on-builder.ts";

export abstract class DefaultBuilder<
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

  public abstract newBuilder(config: IConfiguration): T;
  public abstract newJoinOnBuilder(config: IConfiguration): U;

  public clearAll = (): T => {
    this._sqlEasyState = new SqlEasyState();
    return this._builderType;
  };

  public clearFrom = (): T => {
    this._sqlEasyState.fromStates = [];
    return this._builderType;
  };

  public clearJoin = (): T => {
    this._sqlEasyState.joinStates = [];
    return this._builderType;
  };

  public clearLimit = (): T => {
    this._sqlEasyState.limit = 0;
    return this._builderType;
  };

  public clearOffset = (): T => {
    this._sqlEasyState.offset = 0;
    return this._builderType;
  };

  public clearOrderBy = (): T => {
    this._sqlEasyState.orderByStates = [];
    return this._builderType;
  };

  public clearSelect = (): T => {
    this._sqlEasyState.selectStates = [];
    return this._builderType;
  };

  public clearWhere = (): T => {
    this._sqlEasyState.whereStates = [];
    return this._builderType;
  };

  public distinct = (): T => {
    this._sqlEasyState.distinct = true;
    return this._builderType;
  };

  public fromRaw = (rawFrom: string): T => {
    this._sqlEasyState.fromStates.push({
      builderType: BuilderType.FromRaw,
      owner: undefined,
      tableName: undefined,
      alias: undefined,
      sqlEasyState: undefined,
      raw: rawFrom,
    });
    return this._builderType;
  };

  public fromRaws = (rawFroms: string[]): T => {
    rawFroms.forEach((rawFrom) => {
      this.fromRaw(rawFrom);
    });
    return this._builderType;
  };

  public fromTable = (tableName: string, alias: string): T => {
    this._sqlEasyState.fromStates.push({
      builderType: BuilderType.FromTable,
      owner: this._config.defaultOwner(),
      tableName: tableName,
      alias: alias,
      sqlEasyState: undefined,
      raw: undefined,
    });
    return this._builderType;
  };

  public fromTables = (tables: { tableName: string; alias: string }[]): T => {
    tables.forEach((table) => {
      this.fromTable(table.tableName, table.alias);
    });
    return this._builderType;
  };

  public fromTableWithOwner = (
    owner: string,
    tableName: string,
    alias: string,
  ): T => {
    this._sqlEasyState.fromStates.push({
      builderType: BuilderType.FromTable,
      owner: owner,
      tableName: tableName,
      alias: alias,
      sqlEasyState: undefined,
      raw: undefined,
    });
    return this._builderType;
  };

  public fromTablesWithOwner = (
    tables: { owner: string; tableName: string; alias: string }[],
  ): T => {
    tables.forEach((table) => {
      this.fromTableWithOwner(table.owner, table.tableName, table.alias);
    });
    return this._builderType;
  };

  public fromWithBuilder = (
    alias: string,
    builder: (builder: T) => void,
  ): T => {
    const newBuilder = this._builderType.newBuilder(this._config);
    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    this._sqlEasyState.fromStates.push({
      builderType: BuilderType.FromBuilder,
      owner: undefined,
      tableName: undefined,
      alias: alias,
      sqlEasyState: newBuilder.state(),
      raw: undefined,
    });

    return this._builderType;
  };

  public joinRaw = (rawJoin: string): T => {
    this._sqlEasyState.joinStates.push({
      builderType: BuilderType.JoinRaw,
      joinType: JoinType.None,
      owner: undefined,
      tableName: undefined,
      alias: undefined,
      sqlEasyState: undefined,
      raw: rawJoin,
      joinOnStates: [],
    });

    return this._builderType;
  };

  public joinRaws = (rawJoins: string[]): T => {
    rawJoins.forEach((rawJoin) => {
      this.joinRaw(rawJoin);
    });

    return this._builderType;
  };

  public joinTable = (
    joinType: JoinType,
    tableName: string,
    alias: string,
    joinOnBuilder: (joinOnBuilder: U) => void,
  ): T => {
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
      raw: undefined,
      joinOnStates: joinOnBuilderInstance.states(),
    });

    return this._builderType;
  };

  public joinTables = (
    joins: {
      joinType: JoinType;
      tableName: string;
      alias: string;
      joinOnBuilder: (joinOnBuilder: U) => void;
    }[],
  ): T => {
    for (const join of joins) {
      this.joinTable(
        join.joinType,
        join.tableName,
        join.alias,
        join.joinOnBuilder,
      );
    }
    return this._builderType;
  };

  public joinTablesWithOwner = (
    joins: {
      joinType: JoinType;
      owner: string;
      tableName: string;
      alias: string;
      joinOnBuilder: (joinOnBuilder: U) => void;
    }[],
  ): T => {
    for (const join of joins) {
      this.joinTableWithOwner(
        join.joinType,
        join.owner,
        join.tableName,
        join.alias,
        join.joinOnBuilder,
      );
    }
    return this._builderType;
  };

  public joinTableWithOwner = (
    joinType: JoinType,
    owner: string,
    tableName: string,
    alias: string,
    joinOnBuilder: (joinOnBuilder: U) => void,
  ): T => {
    const joinOnBuilderInstance = this._builderType.newJoinOnBuilder(
      this._config,
    );
    joinOnBuilder(joinOnBuilderInstance);

    this._sqlEasyState.joinStates.push({
      builderType: BuilderType.JoinTable,
      joinType: joinType,
      owner: owner,
      tableName: tableName,
      alias: alias,
      sqlEasyState: undefined,
      raw: undefined,
      joinOnStates: joinOnBuilderInstance.states(),
    });

    return this._builderType;
  };

  public joinWithBuilder = (
    joinType: JoinType,
    alias: string,
    builder: (builder: T) => void,
    joinOnBuilder: (joinOnBuilder: U) => void,
  ): T => {
    const newBuilder = this._builderType.newBuilder(this._config);

    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    const newJoinOnBuilder = this._builderType.newJoinOnBuilder(this._config);
    joinOnBuilder(newJoinOnBuilder);

    this._sqlEasyState.joinStates.push({
      builderType: BuilderType.JoinBuilder,
      joinType: joinType,
      owner: undefined,
      tableName: undefined,
      alias: alias,
      sqlEasyState: newBuilder.state(),
      raw: undefined,
      joinOnStates: newJoinOnBuilder.states(),
    });

    return this._builderType;
  };

  public limit = (limit: number): T => {
    this._sqlEasyState.limit = limit;
    return this._builderType;
  };

  public offset = (offset: number): T => {
    this._sqlEasyState.offset = offset;
    return this._builderType;
  };

  public orderByColumn = (
    tableNameOrAlias: string,
    columnName: string,
    direction: OrderByDirection,
  ): T => {
    this._sqlEasyState.orderByStates.push({
      builderType: BuilderType.OrderByColumn,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      direction: direction,
      raw: undefined,
    });

    return this._builderType;
  };

  public orderByColumns = (
    columns: {
      tableNameOrAlias: string;
      columnName: string;
      direction: OrderByDirection;
    }[],
  ): T => {
    columns.forEach((column) => {
      this.orderByColumn(
        column.tableNameOrAlias,
        column.columnName,
        column.direction,
      );
    });

    return this._builderType;
  };

  public orderByRaw = (rawOrderBy: string): T => {
    this._sqlEasyState.orderByStates.push({
      builderType: BuilderType.OrderByRaw,
      tableNameOrAlias: undefined,
      columnName: undefined,
      direction: OrderByDirection.Ascending,
      raw: rawOrderBy,
    });

    return this._builderType;
  };

  public orderByRaws = (rawOrderBys: string[]): T => {
    rawOrderBys.forEach((rawOrderBy) => {
      this.orderByRaw(rawOrderBy);
    });

    return this._builderType;
  };

  public selectAll = (): T => {
    this._sqlEasyState.selectStates.push({
      builderType: BuilderType.SelectAll,
      tableNameOrAlias: undefined,
      columnName: undefined,
      alias: undefined,
      sqlEasyState: undefined,
      raw: undefined,
    });

    return this._builderType;
  };

  public selectColumn = (
    tableNameOrAlias: string,
    columnName: string,
    columnAlias: string,
  ): T => {
    this._sqlEasyState.selectStates.push({
      builderType: BuilderType.SelectColumn,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      alias: columnAlias,
      sqlEasyState: undefined,
      raw: undefined,
    });

    return this._builderType;
  };

  public selectColumns = (
    columns: {
      tableNameOrAlias: string;
      columnName: string;
      columnAlias: string;
    }[],
  ): T => {
    columns.forEach((column) => {
      this.selectColumn(
        column.tableNameOrAlias,
        column.columnName,
        column.columnAlias,
      );
    });

    return this._builderType;
  };

  public selectRaw = (rawSelect: string): T => {
    this._sqlEasyState.selectStates.push({
      builderType: BuilderType.SelectRaw,
      tableNameOrAlias: undefined,
      columnName: undefined,
      alias: undefined,
      sqlEasyState: undefined,
      raw: rawSelect,
    });

    return this._builderType;
  };

  public selectRaws = (rawSelects: string[]): T => {
    rawSelects.forEach((rawSelect) => {
      this.selectRaw(rawSelect);
    });

    return this._builderType;
  };

  public selectWithBuilder = (
    alias: string,
    builder: (builder: T) => void,
  ): T => {
    const newBuilder = this._builderType.newBuilder(this._config);

    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    this._sqlEasyState.selectStates.push({
      builderType: BuilderType.SelectBuilder,
      tableNameOrAlias: undefined,
      columnName: undefined,
      alias: alias,
      sqlEasyState: newBuilder.state(),
      raw: undefined,
    });

    return this._builderType;
  };

  public state = (): SqlEasyState => {
    return this._sqlEasyState;
  };

  public where = (
    tableNameOrAlias: string,
    columnName: string,
    whereOperator: WhereOperator,
    value: any,
  ): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereAnd,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: whereOperator,
      raw: undefined,
      sqlEasyState: undefined,
      values: [value],
    });

    return this._builderType;
  };

  public whereAnd = (): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereAnd,
      tableNameOrAlias: undefined,
      columnName: undefined,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: undefined,
      values: undefined,
    });

    return this._builderType;
  };

  public whereBetween = (
    tableNameOrAlias: string,
    columnName: string,
    value1: any,
    value2: any,
  ): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereBetween,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.Equals,
      raw: undefined,
      sqlEasyState: undefined,
      values: [value1, value2],
    });

    return this._builderType;
  };

  public whereExistsWithBuilder = (
    tableNameOrAlias: string,
    columnName: string,
    builder: (builder: T) => void,
  ): T => {
    const newBuilder = this._builderType.newBuilder(this._config);
    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereExistsBuilder,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: newBuilder.state(),
      values: undefined,
    });

    return this._builderType;
  };

  public whereGroup(builder: (builder: T) => void): T {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereGroupBegin,
      tableNameOrAlias: undefined,
      columnName: undefined,
      whereOperator: WhereOperator.None,
      raw: undefined,
      values: undefined,
      sqlEasyState: undefined,
    });

    const newBuilder = this._builderType.newBuilder(this._config);
    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereGroupBuilder,
      tableNameOrAlias: undefined,
      columnName: undefined,
      whereOperator: WhereOperator.None,
      raw: undefined,
      values: undefined,
      sqlEasyState: newBuilder.state(),
    });

    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereGroupEnd,
      tableNameOrAlias: "",
      columnName: "",
      whereOperator: WhereOperator.None,
      raw: "",
      values: [],
      sqlEasyState: newBuilder.state(),
    });

    return this._builderType;
  }

  public whereInWithBuilder = (
    tableNameOrAlias: string,
    columnName: string,
    builder: (builder: T) => void,
  ): T => {
    const newBuilder = this._builderType.newBuilder(this._config);
    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereInBuilder,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: newBuilder.state(),
      values: undefined,
    });

    return this._builderType;
  };

  public whereInValues = (
    tableNameOrAlias: string,
    columnName: string,
    values: any[],
  ): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereInValues,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: undefined,
      values: values,
    });

    return this._builderType;
  };

  public whereNotExistsWithBuilder = (
    tableNameOrAlias: string,
    columnName: string,
    builder: (builder: T) => void,
  ): T => {
    const newBuilder = this._builderType.newBuilder(this._config);
    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereNotExistsBuilder,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: newBuilder.state(),
      values: undefined,
    });

    return this._builderType;
  };

  public whereNotInWithBuilder = (
    tableNameOrAlias: string,
    columnName: string,
    builder: (builder: T) => void,
  ): T => {
    const newBuilder = this._builderType.newBuilder(this._config);
    builder(newBuilder);
    newBuilder.state().isInnerStatement = true;

    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereNotInBuilder,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: newBuilder.state(),
      values: undefined,
    });

    return this._builderType;
  };

  public whereNotInValues = (
    tableNameOrAlias: string,
    columnName: string,
    values: any[],
  ): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereNotInValues,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: undefined,
      values: values,
    });

    return this._builderType;
  };

  public whereNotNull = (
    tableNameOrAlias: string,
    columnName: string,
  ): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereNotNull,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: undefined,
      values: undefined,
    });

    return this._builderType;
  };

  public whereNull = (tableNameOrAlias: string, columnName: string): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereNull,
      tableNameOrAlias: tableNameOrAlias,
      columnName: columnName,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: undefined,
      values: undefined,
    });

    return this._builderType;
  };

  public whereOr = (): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereOr,
      tableNameOrAlias: undefined,
      columnName: undefined,
      whereOperator: WhereOperator.None,
      raw: undefined,
      sqlEasyState: undefined,
      values: undefined,
    });

    return this._builderType;
  };

  public whereRaw = (rawWhere: string): T => {
    this._sqlEasyState.whereStates.push({
      builderType: BuilderType.WhereRaw,
      tableNameOrAlias: undefined,
      columnName: undefined,
      whereOperator: WhereOperator.None,
      raw: rawWhere,
      sqlEasyState: undefined,
      values: undefined,
    });

    return this._builderType;
  };

  public whereRaws = (rawWheres: string[]): T => {
    rawWheres.forEach((rawWhere) => {
      this.whereRaw(rawWhere);
    });

    return this._builderType;
  };
}
