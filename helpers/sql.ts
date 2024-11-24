// deno-lint-ignore-file no-explicit-any
import IsHelper from "@withonevision/is-helper";
import StringBuilder from "@withonevision/string-builder";
import type { IConfiguration } from "../configuration/interface-configuration.ts";
import { TranslatorMode } from "../enums/translator-mode.ts";

export const sqlHelper = (
  config: IConfiguration,
  translatorMode: TranslatorMode,
) => {
  let sb = new StringBuilder();
  let errors: Error[] = [];
  let values: any[] = [];

  const addDynamicValue = (value: any): string => {
    if (translatorMode === TranslatorMode.Prepared) {
      values.push(value);
      return config.runtimeConfiguration().preparedStatementPlaceholder;
    }

    return getValueStringFromDataType(value);
  };

  const addError = (e: Error): void => {
    errors.push(e);
  };

  const addErrorFromString = (message: string): void => {
    errors.push(new Error(message));
  };

  const addSqlSnippet = (sql: string): void => {
    sb.append(sql);
  };

  const addSqlSnippetWithValues = (sqlString: string, value: any): void => {
    values.push(value);
    addSqlSnippet(sqlString);
  };

  const clear = (): void => {
    sb = new StringBuilder();
    errors = [];
    values = [];
  };

  const errorStringsContain = (contains: string): boolean => {
    return errors.some((error) => error.message.includes(contains));
  };

  const getErrors = (): Error[] => {
    return errors;
  };

  const getSql = (): string => {
    return sb.toString();
  };

  const getSqlDebug = (): string => {
    let sqlString = sb.toString();

    values.forEach((value) => {
      const valuePosition = sqlString.indexOf(
        config.runtimeConfiguration().preparedStatementPlaceholder,
      );

      if (valuePosition === -1) {
        return;
      }

      sqlString = sqlString.substring(0, valuePosition) + value +
        sqlString.substring(valuePosition + 1);
    });

    return sqlString;
  };

  const getValues = (): any[] => {
    if (values.length === 0) {
      return [];
    }

    return values.filter((value) => !IsHelper.isNullOrUndefined(value));
  };

  const getValueStringFromDataType = (value: any): string => {
    if (value === null || value === undefined) {
      return "";
    }

    switch (typeof value) {
      case "string":
        return value;
      case "number":
        return value.toString();
      case "boolean":
        return value ? "true" : "false";
      case "object":
        if (value instanceof Date) {
          return value.toISOString();
        }
        return JSON.stringify(value);
      default:
        return value.toString();
    }
  };

  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  const printErrors = (): void => {
    errors.forEach((error) => {
      console.error(error);
    });
  };

  return {
    addDynamicValue,
    addError,
    addErrorFromString,
    addSqlSnippet,
    addSqlSnippetWithValues,
    clear,
    errorStringsContain,
    getErrors,
    getSql,
    getSqlDebug,
    getValues,
    getValueStringFromDataType,
    hasErrors,
    printErrors,
  };
};
