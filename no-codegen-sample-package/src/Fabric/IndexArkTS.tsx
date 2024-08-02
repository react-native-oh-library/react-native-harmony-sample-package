import React from 'react';
import GeneratedSampleNativeComponent, {
  OutgoingData,
  IncomingData,
} from './specs/v1/NoCodegenArkTSNativeComponent';
import { UIManager, findNodeHandle, processColor } from 'react-native';

export type GeneratedSampleComponentArkTSRef = {
  emitNativeEvent: (eventType: 'directEvent' | 'bubblingEvent') => void;
};

export const GeneratedSampleComponentArkTS = React.forwardRef<
  GeneratedSampleComponentArkTSRef,
  {
    children?: any;
    testProps: Omit<OutgoingData, 'colorTest'> & { colorTest: string };
    onDirectEvent?: (args: IncomingData) => void;
    onBubblingEvent?: (args: IncomingData) => void;
  }
>(
  (
    {
      children,
      testProps: { colorTest, ...otherTestProps },
      onDirectEvent,
      onBubblingEvent,
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
              [eventType, false]
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
          height: 272,
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
      />
    );
  }
);
