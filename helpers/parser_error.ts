import type { ParserArea } from "../enums/parser_area.ts";

export class ParserError extends Error {
   public constructor(parserArea: ParserArea, message: string) {
      const finalMessage = `${parserArea}: ${message}`;
      super(finalMessage);
      this.name = "SqlEasyParserError";
   }
}