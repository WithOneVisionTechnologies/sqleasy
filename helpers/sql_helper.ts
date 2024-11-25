import IsHelper from "@withonevision/is-helper";
import StringBuilder from "@withonevision/string-builder";
import type { IConfiguration } from "../configuration/interface_configuration.ts";
import { ParserMode } from "../enums/parser_mode.ts";

export class SqlHelper {
   private _sb = new StringBuilder();
   private _errors: Error[] = [];
   private _values: any[] = [];
   private _config: IConfiguration;
   private _parserMode: ParserMode;

   constructor(config: IConfiguration, parserMode: ParserMode) {
      this._config = config;
      this._parserMode = parserMode;
   }

   public addDynamicValue = (value: any): string => {
      if (this._parserMode === ParserMode.Prepared) {
         this._values.push(value);
         return this._config.runtimeConfiguration()
            .preparedStatementPlaceholder;
      }

      return this.getValueStringFromDataType(value);
   };

   public addError = (e: Error): void => {
      this._errors.push(e);
   };

   public addErrorFromString = (message: string): void => {
      this._errors.push(new Error(message));
   };

   public addSqlSnippet = (sql: string): void => {
      this._sb.append(sql);
   };

   public addSqlSnippetWithValues = (sqlString: string, value: any): void => {
      this._values.push(value);
      this.addSqlSnippet(sqlString);
   };

   public clear = (): void => {
      this._sb = new StringBuilder();
      this._errors = [];
      this._values = [];
   };

   public errorStringsContain = (contains: string): boolean => {
      return this._errors.some((error) => error.message.includes(contains));
   };

   public getErrors = (): Error[] => {
      return this._errors;
   };

   public getSql = (): string => {
      return this._sb.toString();
   };

   public getSqlDebug = (): string => {
      let sqlString = this._sb.toString();

      this._values.forEach((value) => {
         const valuePosition = sqlString.indexOf(
            this._config.runtimeConfiguration().preparedStatementPlaceholder,
         );

         if (valuePosition === -1) {
            return;
         }

         sqlString = sqlString.substring(0, valuePosition) + value +
            sqlString.substring(valuePosition + 1);
      });

      return sqlString;
   };

   public getValues = (): any[] => {
      if (this._values.length === 0) {
         return [];
      }

      return this._values.filter((value) => !IsHelper.isNullOrUndefined(value));
   };

   public getValueStringFromDataType = (value: any): string => {
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

   public hasErrors = (): boolean => {
      return this._errors.length > 0;
   };

   public printErrors = (): void => {
      this._errors.forEach((error) => {
         console.error(error);
      });
   };
}
