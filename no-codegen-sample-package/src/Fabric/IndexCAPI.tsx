import React from 'react';
import GeneratedSampleNativeComponent, {
  OutgoingData,
  IncomingDataCAPI,
  ArgsOfEmitCommandArgs,
  SupportedCommandArgs,
} from './specs/v2/NoCodegenCApiNativeComponent';
import { UIManager, findNodeHandle, processColor } from 'react-native';

export type GeneratedSampleComponentCAPIRef = {
  emitNativeEvent: (eventType: 'directEvent' | 'bubblingEvent') => void;
  emitCommandArgs: (...args: ArgsOfEmitCommandArgs) => void;
};

export const GeneratedSampleComponentCAPI = React.forwardRef<
  GeneratedSampleComponentCAPIRef,
  {
    hidden?: boolean;
    children?: any;
    testProps: Omit<OutgoingData, 'colorTest'> & { colorTest: string };
    onDirectEvent?: (args: IncomingDataCAPI) => void;
    onBubblingEvent?: (args: IncomingDataCAPI) => void;
    onReceivedCommandArgs?: (args: SupportedCommandArgs) => void;
  }
>(
  (
    {
      children,
      hidden,
      testProps: { colorTest, ...otherTestProps },
      onDirectEvent,
      onBubblingEvent,
      onReceivedCommandArgs,
    },
    ref
  ) => {
    const nativeRef = React.useRef<any>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        emitNativeEvent(eventType) {
          if (nativeRef?.current) {
            UIManager.dispatchViewManagerCommand(
              findNodeHandle(nativeRef.current),
              'emitNativeEvent',
              [eventType]
            );
          }
        },
        emitCommandArgs(...args: ArgsOfEmitCommandArgs) {
          if (nativeRef?.current) {
            UIManager.dispatchViewManagerCommand(
              findNodeHandle(nativeRef.current),
              'emitCommandArgs',
              args
            );
          }
        },
      }),
      []
    );

    return (
      <GeneratedSampleNativeComponent
        ref={nativeRef}
        style={{
          width: '100%',
          height: hidden ? 0 : 272,
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: 'pink',
        }}
        children={children}
        {...otherTestProps}
        colorTest={processColor(colorTest)!}
        onBubblingEvent={(e) => {
          onBubblingEvent?.(e.nativeEvent);
        }}
        onDirectEvent={(e) => {
          onDirectEvent?.(e.nativeEvent);
        }}
        onReceivedCommandArgs={(e) => {
          onReceivedCommandArgs?.(e.nativeEvent);
        }}
      />
    );
  }
);
