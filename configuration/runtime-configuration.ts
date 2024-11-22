// deno-lint-ignore-file no-explicit-any
export class RuntimeConfiguration {
  maxRowsReturned: number = 1000;
  customConfiguration: any | undefined = undefined;
  preparedStatementPlaceholder: string = "?";
}
