import {Button, Alert, View, Text, StyleSheet, Switch} from 'react-native';
import {
  CodegenSampleTurboModuleV1,
  CodegenSampleTurboModuleV2,
} from '@react-native-oh-tpl/codegen-sample-package';
import {
  SomeEnum1,
  SomeEnum2,
  SomeEnum3,
} from '@react-native-oh-tpl/codegen-sample-package';
import React, {useState} from 'react';

export function CodegenTurboModule() {
  const [isUseV1, setIsUseV1] = useState(true);
  const [isUseV2, setIsUseV2] = useState(false);

  const handleUseV1 = (value: boolean) => {
    setIsUseV1(value);
    setIsUseV2(!value);
  };

  const handleUseV2 = (value: boolean) => {
    setIsUseV1(!value);
    setIsUseV2(value);
  };

  const turboModule = isUseV1 ? CodegenSampleTurboModuleV1 : CodegenSampleTurboModuleV2;

  return (
    <View style={{flex: 1}}>
      <View style={styles.actionCon}>
        <View style={styles.actionItem}>
          <Text>使用ArtTS桥接</Text>
          <Switch onValueChange={handleUseV1} value={isUseV1} />
        </View>
        <View style={styles.actionItem}>
          <Text>使用CAPI桥接</Text>
          <Switch onValueChange={handleUseV2} value={isUseV2} />
        </View>
      </View>
      <Button
        title="return null when calling voidFunc()"
        onPress={() => {
          const result = turboModule.voidFunc();
          Alert.alert(`result: ${result}`);
        }}
      />
      <Button
        title="return true when calling getBool(true)"
        onPress={() => {
          const result = turboModule.getBool(true);
          Alert.alert(`result: ${result}`);
        }}
      />

      <Button
        title="return { x: { y: 1 } } when calling getObject"
        onPress={() => {
          const result = turboModule.getObject({x: {y: 1}});
          Alert.alert(`result: ${JSON.stringify(result)}`);
        }}
      />
      <Button
        title="call the callback and providing string argument"
        onPress={async () => {
          const promise = new Promise<string>(resolve => {
            turboModule.registerFunction(resolve);
          });
          Alert.alert(`result: ${JSON.stringify(promise)}`);
        }}
      />
      <Button
        title="handle async jobs"
        onPress={async () => {
          const result = await turboModule?.doAsyncJob(true);
          Alert.alert(`result: ${JSON.stringify(result)}`);
        }}
      />
      <Button
        title="handle errors in async jobs"
        onPress={async () => {
          let errMsg: string | undefined;
          try {
            await turboModule?.doAsyncJob(false);
          } catch (err) {
            errMsg = (err as Error).message;
          }
          Alert.alert(`result: ${errMsg}`);
        }}
      />
      <Button
        title="get an array asynchronously"
        onPress={async () => {
          const result = await turboModule.getPromisedArray();
          Alert.alert(`result: ${JSON.stringify(result)}`);
        }}
      />
      <Button
        title="get union value"
        onPress={async () => {
          const result = turboModule.getUnionValue('foo');
          Alert.alert(`result: ${result}`);
        }}
      />
      <Button
        title="support enums"
        onPress={async () => {
          const result = turboModule.getEnum(
            SomeEnum1.FOO,
            SomeEnum2.FOO,
            SomeEnum3.FOO,
          );
          Alert.alert(`result: ${JSON.stringify(result)}`);
        }}
      />
      <Button
        title="handle enums without specified values correctly"
        onPress={async () => {
          const result = turboModule.getEnum(
            SomeEnum1.FOO,
            SomeEnum2.FOO,
            SomeEnum3.FOO,
          );
          const isEqual = result.hardcodedEnum1 === SomeEnum1.FOO;
          Alert.alert(`result: ${isEqual}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  actionItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});
