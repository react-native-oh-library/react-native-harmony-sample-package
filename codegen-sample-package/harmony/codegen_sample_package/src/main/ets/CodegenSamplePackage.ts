import {
  TurboModulesFactory,
  RNPackage} from '@rnoh/react-native-openharmony/ts';
import type {
  TurboModule,
  TurboModuleContext,
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType
} from '@rnoh/react-native-openharmony/ts';
import { RNC, TM } from "@rnoh/react-native-openharmony/generated/ts"
import { CodegenTurboModule } from './CodegenTurboModule';


class CodegenSampleTurboModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === TM.CodegenSampleTurboModule.NAME) {
      return new CodegenTurboModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === TM.CodegenSampleTurboModule.NAME;
  }
}


export class CodegenSamplePackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new CodegenSampleTurboModulesFactory(ctx);
  }

  createDescriptorWrapperFactoryByDescriptorType(ctx: DescriptorWrapperFactoryByDescriptorTypeCtx): DescriptorWrapperFactoryByDescriptorType {
    const result: DescriptorWrapperFactoryByDescriptorType = {}
    result[RNC.CodegenSampleViewArkTS.NAME] = (ctx) => new RNC.CodegenSampleViewArkTS.DescriptorWrapper(ctx.descriptor)
    return result
  }
}
