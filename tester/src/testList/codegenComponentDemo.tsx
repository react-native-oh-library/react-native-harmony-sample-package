import {
  GeneratedSampleComponentArkTS,
  GeneratedSampleComponentCAPI,
} from '@react-native-oh-tpl/codegen-sample-package';
import React from 'react';
import {View} from 'react-native';

export function CodegenComponent() {
  return (
    <View>
      <GeneratedSampleComponentArkTS
        testProps={{
          booleanTest: true,
          intTest: 42,
          floatTest: 42.5,
          doubleTest: 42.5,
          stringTest: 'foobar',
          objectTest: {foo: {bar: 'baz'}},
          colorTest: 'lightblue',
          arrayTest: ['foo', 'bar'],
          readOnlyArrayTest: ['foo', 'bar'],
          intEnumTest: 1,
        }}
        onDirectEvent={() => {}}
        onBubblingEvent={() => {}}
      />
      <GeneratedSampleComponentCAPI
        testProps={{
          booleanTest: true,
          intTest: 42,
          floatTest: 42.5,
          doubleTest: 42.5,
          stringTest: 'foobar',
          colorTest: 'lightpink',
          arrayTest: ['foo', 'bar'],
          readOnlyArrayTest: ['foo', 'bar'],
        }}
        onDirectEvent={() => {}}
        onReceivedCommandArgs={() => {}}
        onBubblingEvent={() => {}}
      />
    </View>
  );
}
