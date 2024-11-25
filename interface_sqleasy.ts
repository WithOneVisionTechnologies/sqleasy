import type { IBuilder } from "./builder/interface_builder.ts";
import type { IJoinOnBuilder } from "./builder/interface_join_on_builder.ts";
import type { IMultiBuilder } from "./builder/interface_multi_builder.ts";
import type { IConfiguration } from "./configuration/interface_configuration.ts";
import type { IParser } from "./parser/interface_parser.ts";

export interface ISqlEasy<
   T extends IBuilder<T, U>,
   U extends IJoinOnBuilder<U>,
   V extends IMultiBuilder<T, U>,
   W extends IParser,
> {
   Configuration(): IConfiguration;
   NewBuilder(): T;
   NewMultiBuilder(): V;
   Parser(): W;
}
