import { TurboModule, RNOHError, Tag } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"


export class CodegenTurboModule extends TurboModule implements TM.CodegenSampleTurboModuleV1.Spec {
  private logger = this.ctx.logger.clone("CodegenTurboModuleLogger")

  getConstants(): Object {
    return { const1: true, const2: 1228, const3: "something" }
  }

  getUnionValue(arg: null | Object): Object {
    return arg ?? {}
  }

  getRootTag(arg: Tag): Tag {
    return arg
  }

  getEnum(enum1: TM.CodegenSampleTurboModuleV1.SomeEnum1, enum2: TM.CodegenSampleTurboModuleV1.SomeEnum2,
    enum3: TM.CodegenSampleTurboModuleV1.SomeEnum3): {
    enum1: TM.CodegenSampleTurboModuleV1.SomeEnum1;
    enum2: TM.CodegenSampleTurboModuleV1.SomeEnum2;
    enum3: TM.CodegenSampleTurboModuleV1.SomeEnum3;
    hardcodedEnum1: TM.CodegenSampleTurboModuleV1.SomeEnum1;
  } {
    return {
      enum1,
      enum2,
      enum3,
      hardcodedEnum1: TM.CodegenSampleTurboModuleV1.SomeEnum1.FOO
    }
  }

  voidFunc() {
    this.logger.info('RNOH SampleTurboModule::voidFunc');
  }

  getBool(arg: boolean): boolean {
    this.logger.info(`RNOH SampleTurboModule::getBool(${arg})`);
    return arg;
  }

  getNull(arg: null) {
    this.logger.info(`RNOH SampleTurboModule::getNull(${arg})`);
    return arg;
  }

  getString(arg: string): string {
    this.logger.info(`RNOH SampleTurboModule::getString(${arg})`);
    return arg;
  }

  getNumber(arg: number): number {
    this.logger.info(`RNOH SampleTurboModule::getNumber(${arg})`);
    return arg;
  }

  getObject(arg: Object): Object {
    this.logger.info(`RNOH SampleTurboModule::getObject(${arg})`);
    return arg;
  }

  getUnsafeObject(arg: Object): Object {
    this.logger.info(`RNOH SampleTurboModule::getUnsafeObject(${arg})`);
    return arg;
  }

  getArray(args: any[]): any[] {
    this.logger.info(`RNOH SampleTurboModule::getArray(${args})`);
    return args;
  }

  getValue(x: number, y: string, z: Object): Object {
    this.logger.info(`RNOH SampleTurboModule::getValue(${x} ${y} ${z})`);
    return { x: x, y: y, z: z };
  }

  getValueWithCallback(onComplete: (value: string) => void): void {
    this.logger.info(`RNOH SampleTurboModule::getValueWithCallback`);
    setTimeout(() => {
      onComplete?.('value from callback!');
    }, 1000);
  }

  getValueWithPromise(error: boolean): Promise<string> {
    this.logger.info(`RNOH SampleTurboModule::getValueWithPromise(${error})`)
    if (error) {
      return Promise.reject('intentional promise rejection');
    }
    return Promise.resolve('result!');
  }

  registerFunction(onComplete: (value: string) => void): void {
    this.logger.info(`RNOH SampleTurboModule::registerFunction + trigger`);
    setTimeout(() => {
      onComplete?.('... from native side');
    }, 1000);
  }

  doAsyncJob(shouldResolve: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve('resolved on native side');
        } else {
          reject('rejected on native side');
        }
      }, 1000);
    });
  }

  getPromisedArray() {
    return Promise.resolve([1, 2, 3])
  }

  displayRNOHError(data: {
    whatHappened: string,
    howCanItBeFixed: string[]
    extraData?: any
    customStack?: string
  }) {
    this.ctx.logger.error(new RNOHError(data))
  }

  throwExceptionArk() {
    throw new Error("Exception thrown from ArkTS")
  }

  getUnknown(arg: Object) {
    return arg
  }

  async emitEventFromArkTS2Cpp(payload: { foo: string }): Promise<{ foo: string }> {
    return await new Promise((resolve) => {
      const unsubscribe = this.ctx.rnInstance.cppEventEmitter.subscribe("SAMPLE_MESSAGE", (value: { foo: string }) => {
        resolve(value)
        unsubscribe();
      })
      this.ctx.rnInstance.postMessageToCpp("SAMPLE_MESSAGE", payload);
    })
  }

  setNativeResponderBlocked(isBlocked: boolean, origin: string, componentInstanceId: string): void {
    this.ctx.rnInstance.postMessageToCpp("BLOCK_NATIVE_RESPONDER", { isBlocked, origin, componentInstanceId })
  }
}
