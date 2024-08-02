import React, {useState} from 'react';
import {TestSuite} from '@rnoh/testerino';
import {Button, TestCase} from '../components';
import SampleTurboModule2 from 'react-native-harmony-sample-package/src/specs/v2/NativeGeneratedSampleTurboModule2';
import {ScrollView, View} from 'react-native';

export function InternalTest() {
  return (
    <TestSuite name="Internal Tests">
      <TestCase.Logical
        itShould="pass the same value as the one provided (ArkTS -> C++ -> ArkTS communication test)"
        fn={async ({expect}) => {
          const result = await SampleTurboModule2.emitEventFromArkTS2Cpp({
            foo: 'bar',
          });
          expect(result).to.be.eql({foo: 'bar'});
        }}
      />
      <TestCase.Example
        /** A = RN, B = react-native-gesture-handler */
        itShould="block scroll if it's blocked by A, then blocked B, and then unblocked by A"
        skip={{android: true, harmony: {arkTS: true, cAPI: false}}}>
        <BlockNativeResponderExample />
      </TestCase.Example>
    </TestSuite>
  );
}

function BlockNativeResponderExample() {
  const [isBlockedByA, setIsBlockedByA] = useState(false);
  const [isBlockedByB, setIsBlockedByB] = useState(false);

  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          label={isBlockedByA ? 'Unblock from A' : 'Block from A'}
          onPress={() => {
            setIsBlockedByA(prev => {
              const newValue = !prev;
              SampleTurboModule2.setNativeResponderBlocked(
                newValue,
                'A',
                'blockNativeResponder_scrollView',
              );
              return newValue;
            });
          }}
        />
        <Button
          label={isBlockedByB ? 'Unblock from B' : 'Block from B'}
          onPress={() => {
            setIsBlockedByB(prev => {
              const newValue = !prev;
              SampleTurboModule2.setNativeResponderBlocked(
                newValue,
                'B',
                'blockNativeResponder_scrollView',
              );
              return newValue;
            });
          }}
        />
      </View>
      <ScrollView
        nativeID="blockNativeResponder_scrollView"
        style={{height: 256}}>
        <View style={{backgroundColor: 'red'}}>
          <View
            style={{
              width: '100%',
              height: 128,
              backgroundColor: 'rgba(255,255,255,0.5)',
              marginTop: 128,
            }}
          />
          <View
            style={{
              width: '100%',
              height: 128,
              backgroundColor: 'rgba(255,255,255,0.5)',
              marginTop: 128,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
