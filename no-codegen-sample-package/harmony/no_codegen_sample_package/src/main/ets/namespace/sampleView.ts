/**
 * This code was generated by "react-native codegen-harmony"
 *
 * Do not edit this file as changes may cause incorrect behavior and will be
 * lost once the code is regenerated.
 *
 * @generatorVersion: 1
 */

import {
    Descriptor as ComponentDescriptor,
    ViewBaseProps,
    ViewRawProps,
    ViewDescriptorWrapperBase,
    ColorValue,
    Color,
    RNInstance,
    Tag,
    RNComponentCommandReceiver,
    ViewPropsSelector,
  } from '@rnoh/react-native-openharmony/ts';
  
  
  export namespace NoCodegenSampleViewArkTS {
    export const NAME = "NoCodegenSampleViewArkTS" as const
  
    export interface DirectRawProps {
      intTest: number;
      intWithDefault?: number;
      floatTest: number;
      floatWithDefaultTest?: number;
      doubleTest: number;
      doubleWithDefaultTest?: number;
      stringTest: string;
      stringWithDefaultTest?: string;
      booleanTest: boolean;
      booleanWithDefaultTest?: boolean;
      objectTest: {foo: {bar: string}};
      arrayTest: string[];
      stringEnumTest?: 'foo' | 'bar';
      intEnumTest?: 0 | 1;
      readOnlyArrayTest: string[];
      colorTest: ColorValue;
    }
    
    export interface Props extends ViewBaseProps {}
    
    export interface State {}
    
    export interface RawProps extends ViewRawProps, DirectRawProps {}
    
    export class PropsSelector extends ViewPropsSelector<Props, RawProps> {
      get intTest() {
        return this.rawProps.intTest ?? 0;
      }
      
      get intWithDefault() {
        return this.rawProps.intWithDefault ?? 42;
      }
      
      get floatTest() {
        return this.rawProps.floatTest ?? 0;
      }
      
      get floatWithDefaultTest() {
        return this.rawProps.floatWithDefaultTest ?? 42.5;
      }
      
      get doubleTest() {
        return this.rawProps.doubleTest ?? 0;
      }
      
      get doubleWithDefaultTest() {
        return this.rawProps.doubleWithDefaultTest ?? 42.5;
      }
      
      get stringTest() {
        return this.rawProps.stringTest;
      }
      
      get stringWithDefaultTest() {
        return this.rawProps.stringWithDefaultTest ?? 'foobar';
      }
      
      get booleanTest() {
        return this.rawProps.booleanTest ?? false;
      }
      
      get booleanWithDefaultTest() {
        return this.rawProps.booleanWithDefaultTest ?? true;
      }
      
      get objectTest() {
        return this.rawProps.objectTest;
      }
      
      get arrayTest() {
        return this.rawProps.arrayTest;
      }
      
      get stringEnumTest() {
        return this.rawProps.stringEnumTest ?? 'foo';
      }
      
      get intEnumTest() {
        return this.rawProps.intEnumTest ?? 0;
      }
      
      get readOnlyArrayTest() {
        return this.rawProps.readOnlyArrayTest;
      }
      
    
      get colorTest() {
          if (this.rawProps.colorTest) {
            return Color.fromColorValue(this.rawProps.colorTest)
          } else {
            return new Color({ r: 0, g: 0, b: 0, a: 255})
          }
      }
      
    }
  
    export type Descriptor = ComponentDescriptor<
      typeof NAME,
      Props,
      State,
      RawProps
    >;
    
    export class DescriptorWrapper extends ViewDescriptorWrapperBase<
      typeof NAME,
      Props,
      State,
      RawProps,
      PropsSelector
    > {
      protected createPropsSelector() {
        return new PropsSelector(this.descriptor.props, this.descriptor.rawProps)
      }
    }
    
    export interface EventPayloadByName {
      "directEvent": {intTest: number, intWithDefault?: number, floatTest: number, floatWithDefaultTest?: number, doubleTest: number, doubleWithDefaultTest?: number, stringTest: string, stringWithDefaultTest?: string, booleanTest: boolean, booleanWithDefaultTest?: boolean, objectTest: {foo: {bar: string}}, arrayTest: string[], stringEnumTest?: 'foo' | 'bar', intEnumTest?: 0 | 1, readOnlyArrayTest: string[], colorTest: string}
      "bubblingEvent": {intTest: number, intWithDefault?: number, floatTest: number, floatWithDefaultTest?: number, doubleTest: number, doubleWithDefaultTest?: number, stringTest: string, stringWithDefaultTest?: string, booleanTest: boolean, booleanWithDefaultTest?: boolean, objectTest: {foo: {bar: string}}, arrayTest: string[], stringEnumTest?: 'foo' | 'bar', intEnumTest?: 0 | 1, readOnlyArrayTest: string[], colorTest: string}
    }
    
    export class EventEmitter {
      constructor(private rnInstance: RNInstance, private tag: Tag) {}
      
      emit<TEventName extends keyof EventPayloadByName>(eventName: TEventName, payload: EventPayloadByName[TEventName]) {
        this.rnInstance.emitComponentEvent(this.tag, eventName, payload)
      }
    }
    
    export interface CommandArgvByName {
      "emitNativeEvent": [string, boolean]
    }
    
    export class CommandReceiver {
      private listenersByCommandName = new Map<string, Set<(...args: any[]) => void>>()
      private cleanUp: (() => void) | undefined = undefined
    
      constructor(private componentCommandReceiver: RNComponentCommandReceiver, private tag: Tag) {
      }
    
      subscribe<TCommandName extends keyof CommandArgvByName>(commandName: TCommandName, listener: (argv: CommandArgvByName[TCommandName]) => void) {
        if (!this.listenersByCommandName.has(commandName)) {
          this.listenersByCommandName.set(commandName, new Set())
        }
        this.listenersByCommandName.get(commandName)!.add(listener)
        const hasRegisteredCommandReceiver = !!this.cleanUp
        if (!hasRegisteredCommandReceiver) {
          this.cleanUp = this.componentCommandReceiver.registerCommandCallback(this.tag, (commandName: string, argv: any[]) => {
            if (this.listenersByCommandName.has(commandName)) {
              const listeners = this.listenersByCommandName.get(commandName)!
              listeners.forEach(listener => {
                listener(argv)
              })
            }
          })
        }
    
        return () => {
          this.listenersByCommandName.get(commandName)?.delete(listener)
          if (this.listenersByCommandName.get(commandName)?.size ?? 0 === 0) {
            this.listenersByCommandName.delete(commandName)
          }
          if (this.listenersByCommandName.size === 0) {
            this.cleanUp?.()
          }
        }
      }
    }
  
  }
  