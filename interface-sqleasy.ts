import type { IBuilder } from "./builder/interface-builder.ts";
import type { IJoinOnBuilder } from "./builder/interface-join-on-builder.ts";
import type { IMultiBuilder } from "./builder/interface-multi-builder.ts";
import type { IConfiguration } from "./configuration/interface-configuration.ts";
import type { ITranslator } from "./translator/interface-translator.ts";

export interface ISqlEasy<
  T extends IBuilder<T, U>,
  U extends IJoinOnBuilder<U>,
  V extends IMultiBuilder<T, U>,
  W extends ITranslator,
> {
  Configuration(): IConfiguration;
  NewBuilder(): T;
  NewMultiBuilder(): V;
  Translator(): W;
}
