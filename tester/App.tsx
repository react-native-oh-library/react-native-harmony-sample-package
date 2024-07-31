import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View, Text} from 'react-native';
import {NavigationContainer, Page} from './src/components';
import * as testSuiteByName from './src/testList';

function App() {
  return (
    <View style={{backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <NavigationContainer>
          {Object.keys(testSuiteByName).map(testSuiteName => {
            const TestSuite =
            testSuiteByName[testSuiteName as keyof typeof testSuiteByName];
            return (
              <Page
                key={testSuiteName}
                name={testSuiteName}>
                <ScrollView style={{flex: 1}}>
                  <TestSuite key={testSuiteName} />
                </ScrollView>
              </Page>
            );
          })}
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

export default App;
