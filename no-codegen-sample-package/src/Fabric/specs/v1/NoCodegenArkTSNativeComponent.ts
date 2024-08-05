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
  objectTest: { foo: { bar: string } };
  arrayTest: string[];
  stringEnumTest?: WithDefault<'foo' | 'bar', 'foo'>; // codegen restriction: A default enum value is required
  intEnumTest?: WithDefault<0 | 1, 0>;
}

export interface OutgoingData extends OutgoingAndIncomingData {
  readOnlyArrayTest: ReadonlyArray<string>;
  colorTest: ProcessedColorValue;
  // unsafeObjectTest: UnsafeObject; // codegen restriction: Unknown prop type for "unsafeObjectTest": "UnsafeObject"
}

export interface IncomingData extends OutgoingAndIncomingData {
  readOnlyArrayTest: string[];
  colorTest: string;
}
export interface GeneratedSampleViewNativeProps
  extends ViewProps,
    OutgoingData {
  onDirectEvent: DirectEventHandler<IncomingData>;
  onBubblingEvent: BubblingEventHandler<IncomingData>;
}

type NativeType = HostComponent<GeneratedSampleViewNativeProps>;

interface NativeCommands {
  emitNativeEvent: (
    viewRef: React.ElementRef<NativeType>,
    eventType: string, // codegen restriction: unions here are not supported
    someOptionalArg?: boolean // codegen issue?: optional is not detected
  ) => void; // codegen doesn't restrict that, but the return type should always be void to ensure proper typing
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['emitNativeEvent'],
});

/**
 * codegen restriction: the result of codegenNativeComponent must be a default export
 */
export default codegenNativeComponent<GeneratedSampleViewNativeProps>(
  'NoCodegenSampleViewArkTS'
) as HostComponent<GeneratedSampleViewNativeProps>;
