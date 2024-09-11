import { TurboModuleRegistry, RootTag } from 'react-native';
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';

/**
 * Codegen restriction: All TypeScript interfaces extending TurboModule must be called 'Spec'.
 */

type SomeObject = { x: { y: number } };

export enum SomeEnum1 {
  FOO,
  BAR,
}

export enum SomeEnum2 {
  FOO = 1,
  BAR = 2,
}

export enum SomeEnum3 {
  FOO = 'FOO',
  BAR = 'BAR',
  DOUBLE_QUOTE = 'FOO"BAR',
  SINGLE_QUOTE = "FOO'BAR",
}

export interface Spec extends TurboModule {
  voidFunc(): void;
  getBool(arg: boolean): boolean;
  getString(arg: string): string;
  getObject(arg: SomeObject): Object;
  registerFunction(onComplete: (value: string) => void): void;
  doAsyncJob(shouldResolve: boolean): Promise<string>;
  getPromisedArray(): Promise<number[]>;
  getUnionValue(arg: string | number | null): string | number | Object; // codegen issue: unions are recognized as Object
  getEnum(
    enum1: SomeEnum1,
    enum2: SomeEnum2,
    enum3: SomeEnum3
  ): {
    enum1: SomeEnum1;
    enum2: SomeEnum2;
    enum3: SomeEnum3;
    hardcodedEnum1: SomeEnum1;
  }; // codegen issue: members of SomeEnum1 are recognized as string, which is not the case + tuples are not supported
  getUnknown(arg: unknown): unknown; // codegen issue: unknowns are recognized as Object
  getRootTag(arg: RootTag): RootTag;
  getNumber(arg: number): number;
  getValue(x: number, y: string, z: Object): Object;
  getValueWithCallback(callback: (value: string) => void): void;
  getValueWithPromise(error: boolean): Promise<string>;
  getUnsafeObject(arg: Object): Object;
}

export default TurboModuleRegistry.get<Spec>('CodegenSampleTurboModuleV1')!;
