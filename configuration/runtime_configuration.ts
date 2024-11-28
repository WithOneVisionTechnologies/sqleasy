export class RuntimeConfiguration {
   maxRowsReturned: number = 1000;
   customConfiguration: any | undefined = undefined;
   parserErrorMode: "stopOnError" | "collectAllErrors" = "stopOnError";
}
