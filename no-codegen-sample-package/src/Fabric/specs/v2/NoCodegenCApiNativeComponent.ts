import { ViewProps, HostComponent, ProcessedColorValue } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type {
  Float,
  DirectEventHandler,
  BubblingEventHandler,
  WithDefault,
  Int32,
  Double,
} from 'react-native/Libraries/Types/CodegenTypes';

export interface OutgoingAndIncomingData {
  intTest: Int32;
  intWithDefault?: WithDefault<Int32, 42>;
  floatTest: Float;
  floatWithDefaultTest?: WithDefault<Float, 42.5>; // codegen restriction: must be optional, if WithDefault is used
  doubleTest: Double;
  doubleWithDefaultTest?: WithDefault<Double, 42.5>;
  stringTest: string;
  stringWithDefaultTest?: WithDefault<string, 'foobar'>;
  booleanTest: boolean;
  booleanWithDefaultTest?: WithDefault<boolean, true>;
  // objectTest: { foo: { bar: string } }; // codegen issue: generated C++ code is not compatible with the library - probably caused by a mismatch between codegen and react-native version
  arrayTest: string[];
  stringEnumTest?: WithDefault<'foo' | 'bar', 'foo'>; // codegen restriction: A default enum value is required
  // intEnumTest?: WithDefault<0 | 1, 0>; // codegen bug on RN side: crashes with input.split is not a function
}

export interface OutgoingData extends OutgoingAndIncomingData {
  readOnlyArrayTest: ReadonlyArray<string>;
  colorTest: ProcessedColorValue;
  // unsafeObjectTest: UnsafeObject; // codegen restriction: Unknown prop type for "unsafeObjectTest": "UnsafeObject"
}

export interface IncomingDataCAPI extends OutgoingAndIncomingData {
  readOnlyArrayTest: string[];
  colorTest: string;
}

export type SupportedCommandArgs = {
  intTest: Int32;
  floatTest: Float;
  doubleTest: Double;
  stringTest: string;
  booleanTest: boolean;
};

export interface GeneratedSampleViewNativeProps
  extends ViewProps,
    OutgoingData {
  onDirectEvent: DirectEventHandler<IncomingDataCAPI>;
  onBubblingEvent: BubblingEventHandler<IncomingDataCAPI>;
  onReceivedCommandArgs: DirectEventHandler<SupportedCommandArgs>; // codegen restriction: it must be an object otherwise "typeAnnotation of event doesn't have a name" is thrown
}

type NativeType = HostComponent<GeneratedSampleViewNativeProps>;

interface NativeCommands {
  emitNativeEvent: (
    viewRef: React.ElementRef<NativeType>, // codegen restriction: viewRef must be the first argument
    eventType: string // codegen restriction: unions here are not supported
  ) => void; // codegen doesn't restrict that, but the return type should always be void to ensure proper typing
  emitCommandArgs: (
    viewRef: React.ElementRef<NativeType>,
    intTest: Int32,
    floatTest: Float,
    doubleTest: Double,
    stringTest: string,
    booleanTest: boolean
    // objectTest: { foo: string; bar: string } // codegen restriction: unsupported param type
    // arrayTest: string[] // codegen restriction: unsupported param type
  ) => void;
}

export type ArgsOfEmitCommandArgs = Parameters<
  NativeCommands['emitCommandArgs']
> extends [any, ...infer Rest]
  ? Rest
  : never;

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['emitNativeEvent', 'emitCommandArgs'],
});

/**
 * codegen restriction: the result of codegenNativeComponent must be a default export
 */
export default codegenNativeComponent<GeneratedSampleViewNativeProps>(
  'NoCodegenSampleViewCAPI'
) as HostComponent<GeneratedSampleViewNativeProps>;
