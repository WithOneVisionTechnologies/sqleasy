import type { IConfiguration } from "../configuration/interface_configuration.ts";
import type { JoinType } from "../enums/join_type.ts";
import type { OrderByDirection } from "../enums/order_by_direction.ts";
import type { WhereOperator } from "../enums/where_operator.ts";
import type { IParser } from "../mod.ts";
import type { SqlEasyState } from "../state/sqleasy_state.ts";
import type { IJoinOnBuilder } from "./interface_join_on_builder.ts";

export interface IBuilder<T, U extends IJoinOnBuilder<U>, V extends IParser> {
   clearAll(): T;
   clearFrom(): T;
   clearJoin(): T;
   clearLimit(): T;
   clearOffset(): T;
   clearOrderBy(): T;
   clearSelect(): T;
   clearWhere(): T;
   distinct(): T;
   fromRaw(rawFrom: string): T;
   fromRaws(rawFroms: string[]): T;
   fromTable(tableName: string, alias: string): T;
   fromTables(
      tables: {
         tableName: string;
         alias: string;
      }[],
   ): T;
   fromTableWithOwner(owner: string, tableName: string, alias: string): T;
   fromTablesWithOwner(
      tablesWithOwner: {
         owner: string;
         tableName: string;
         alias: string;
      }[],
   ): T;
   fromWithBuilder(alias: string, builder: (builder: T) => void): T;
   joinRaw(rawJoin: string): T;
   joinRaws(rawJoins: string[]): T;
   joinTable(
      joinType: JoinType,
      tableName: string,
      alias: string,
      joinOnBuilder: (joinOnBuilder: U) => void,
   ): T;
   joinTables(
      joins: {
         joinType: JoinType;
         tableName: string;
         alias: string;
         joinOnBuilder: (joinOnBuilder: U) => void;
      }[],
   ): T;
   joinTablesWithOwner(
      joins: {
         joinType: JoinType;
         owner: string;
         tableName: string;
         alias: string;
         joinOnBuilder: (joinOnBuilder: U) => void;
      }[],
   ): T;
   joinTableWithOwner(
      joinType: JoinType,
      owner: string,
      tableName: string,
      alias: string,
      joinOnBuilder: (joinOnBuilder: U) => void,
   ): T;
   joinWithBuilder(
      joinType: JoinType,
      alias: string,
      builder: (builder: T) => void,
      joinOnBuilder: (joinOnBuilder: U) => void,
   ): T;
   limit(limit: number): T;
   newBuilder(config: IConfiguration): T;
   newJoinOnBuilder(config: IConfiguration): U;
   newParser(config: IConfiguration): V;
   offset(offset: number): T;
   orderByColumn(
      tableNameOrAlias: string,
      columnName: string,
      direction: OrderByDirection,
   ): T;
   orderByColumns(
      columns: {
         tableNameOrAlias: string;
         columnName: string;
         direction: OrderByDirection;
      }[],
   ): T;
   orderByRaw(rawOrderBy: string): T;
   orderByRaws(rawOrderBys: string[]): T;
   parse(): { sql: string; errors: Error[] | undefined };
   parseRaw(): { sql: string; errors: Error[] | undefined };
   selectAll(): T;
   selectColumn(
      tableNameOrAlias: string,
      columnName: string,
      columnAlias: string,
   ): T;
   selectColumns(
      columns: {
         tableNameOrAlias: string;
         columnName: string;
         columnAlias: string;
      }[],
   ): T;
   selectRaw(rawSelect: string): T;
   selectRaws(rawSelects: string[]): T;
   selectWithBuilder(alias: string, builder: (builder: T) => void): T;
   state(): SqlEasyState;
   where(
      tableNameOrAlias: string,
      columnName: string,
      whereOperator: WhereOperator,
      value: any,
   ): T;
   whereAnd(): T;
   whereBetween(
      tableNameOrAlias: string,
      columnName: string,
      value1: any,
      value2: any,
   ): T;
   whereExistsWithBuilder(
      tableNameOrAlias: string,
      columnName: string,
      builder: (builder: T) => void,
   ): T;
   whereGroup(builder: (builder: T) => void): T;
   whereInWithBuilder(
      tableNameOrAlias: string,
      columnName: string,
      builder: (builder: T) => void,
   ): T;
   whereInValues(
      tableNameOrAlias: string,
      columnName: string,
      values: any[],
   ): T;
   whereNotExistsWithBuilder(
      tableNameOrAlias: string,
      columnName: string,
      builder: (builder: T) => void,
   ): T;
   whereNotInWithBuilder(
      tableNameOrAlias: string,
      columnName: string,
      builder: (builder: T) => void,
   ): T;
   whereNotInValues(
      tableNameOrAlias: string,
      columnName: string,
      values: any[],
   ): T;
   whereNotNull(tableNameOrAlias: string, columnName: string): T;
   whereNull(tableNameOrAlias: string, columnName: string): T;
   whereOr(): T;
   whereRaw(rawWhere: string): T;
   whereRaws(rawWheres: string[]): T;
}
