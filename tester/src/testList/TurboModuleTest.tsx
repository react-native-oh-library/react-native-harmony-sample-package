import {Alert, Button, View} from 'react-native';
import {CodegenSampleTurboModule} from '@react-native-oh-tpl/codegen-sample-package';
import {
  SomeEnum1,
  SomeEnum2,
  SomeEnum3,
} from '@react-native-oh-tpl/codegen-sample-package';

export function TurboModule() {
  return (
    <View>
      <Button
        title="return null when calling voidFunc()"
        onPress={() => {
          const result = CodegenSampleTurboModule.voidFunc();
          Alert.alert(`result: ${result}`);
        }}
      />
      <Button
        title="return true when calling getBool(true)"
        onPress={() => {
          const result = CodegenSampleTurboModule.getBool(true);
          Alert.alert(`result: ${result}`);
        }}
      />

      <Button
        title="return { x: { y: 1 } } when calling getObject"
        onPress={() => {
          const result = CodegenSampleTurboModule.getObject({x: {y: 1}});
          Alert.alert(`result: ${JSON.stringify(result)}`);
        }}
      />
      <Button
        title="call the callback and providing string argument"
        onPress={async () => {
          const promise = new Promise<string>(resolve => {
            CodegenSampleTurboModule.registerFunction(resolve);
          });
          Alert.alert(`result: ${JSON.stringify(promise)}`);
        }}
      />
      <Button
        title="handle async jobs"
        onPress={async () => {
          const result = await CodegenSampleTurboModule?.doAsyncJob(true);
          Alert.alert(`result: ${JSON.stringify(result)}`);
        }}
      />
      <Button
        title="handle errors in async jobs"
        onPress={async () => {
          let errMsg: string | undefined;
          try {
            await CodegenSampleTurboModule?.doAsyncJob(false);
          } catch (err) {
            errMsg = (err as Error).message;
          }
          Alert.alert(`result: ${errMsg}`);
        }}
      />
      <Button
        title="get an array asynchronously"
        onPress={async () => {
          const result = await CodegenSampleTurboModule.getPromisedArray();
          Alert.alert(`result: ${JSON.stringify(result)}`);
        }}
      />
      <Button
        title="get union value"
        onPress={async () => {
          const result = CodegenSampleTurboModule.getUnionValue('foo');
          Alert.alert(`result: ${result}`);
        }}
      />
      <Button
        title="support enums"
        onPress={async () => {
          const result = CodegenSampleTurboModule.getEnum(
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
          const result = CodegenSampleTurboModule.getEnum(
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
