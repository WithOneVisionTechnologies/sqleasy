import type { IBuilder } from "../builder/interface_builder.ts";
import type { IJoinOnBuilder } from "../builder/interface_join_on_builder.ts";
import type { IMultiBuilder } from "../builder/interface_multi_builder.ts";
import type { IConfiguration } from "../configuration/interface_configuration.ts";
import type { RuntimeConfiguration } from "../configuration/runtime_configuration.ts";

export interface ISqlEasy<
   T extends IBuilder<T, U>,
   U extends IJoinOnBuilder<U>,
   V extends IMultiBuilder<T, U>,
> {
   configuration(): IConfiguration;
   newBuilder(rc?: RuntimeConfiguration): T;
   newMultiBuilder(rc?: RuntimeConfiguration): V;
}
