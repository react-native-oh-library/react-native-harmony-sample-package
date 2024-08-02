import {
  RNPackage} from '@rnoh/react-native-openharmony/ts';
import type {
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType
} from '@rnoh/react-native-openharmony/ts';
import { RNC } from "./namespace"


export class NoCodegenSamplePackage extends RNPackage {
  createDescriptorWrapperFactoryByDescriptorType(ctx: DescriptorWrapperFactoryByDescriptorTypeCtx): DescriptorWrapperFactoryByDescriptorType {
    const result: DescriptorWrapperFactoryByDescriptorType = {}
    result[RNC.NoCodegenSampleViewArkTS.NAME] = (ctx) => new RNC.NoCodegenSampleViewArkTS.DescriptorWrapper(ctx.descriptor)
    return result
  }
}
