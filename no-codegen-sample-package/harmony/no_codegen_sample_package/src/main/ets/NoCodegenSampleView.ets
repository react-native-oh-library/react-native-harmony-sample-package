import { RNComponentContext, RNViewBase } from '@rnoh/react-native-openharmony';
import { RNC } from "./namespace"
import { getDirectProps } from "../utils/sampleUtils"

@Component
export struct NoCodegenSampleViewArkTS {
  public static readonly NAME = RNC.NoCodegenSampleViewArkTS.NAME
  public ctx!: RNComponentContext
  public tag: number = 0
  @State private descriptorWrapper: RNC.NoCodegenSampleViewArkTS.DescriptorWrapper =
    {} as RNC.NoCodegenSampleViewArkTS.DescriptorWrapper
  private eventEmitter: RNC.NoCodegenSampleViewArkTS.EventEmitter | undefined = undefined
  private cleanUpCallbacks: (() => void)[] = []

  aboutToAppear() {
    this.eventEmitter = new RNC.NoCodegenSampleViewArkTS.EventEmitter(this.ctx.rnInstance, this.tag)
    this.onDescriptorWrapperChange(this.ctx.descriptorRegistry.findDescriptorWrapperByTag<RNC.NoCodegenSampleViewArkTS.DescriptorWrapper>(this.tag)!)
    this.cleanUpCallbacks.push(this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag,
      (_descriptor, newDescriptorWrapper) => {
        this.onDescriptorWrapperChange(newDescriptorWrapper! as RNC.NoCodegenSampleViewArkTS.DescriptorWrapper)
      }
    ))

    this.cleanUpCallbacks.push(new RNC.NoCodegenSampleViewArkTS.CommandReceiver(this.ctx.componentCommandReceiver,
      this.tag).subscribe("emitNativeEvent", (argv) => {
      const eventType = argv[0] as keyof RNC.NoCodegenSampleViewArkTS.EventPayloadByName
      this.eventEmitter!.emit(eventType, this.getDirectProps())
    }))
  }

  private onDescriptorWrapperChange(descriptorWrapper: RNC.NoCodegenSampleViewArkTS.DescriptorWrapper) {
    this.descriptorWrapper = descriptorWrapper
  }

  private getDirectProps() {
    return getDirectProps(this.descriptorWrapper)
  }

  aboutToDisappear() {
    this.cleanUpCallbacks.forEach(cb => cb())
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      Column() {
        Text(JSON.stringify(this.getDirectProps(), null, 2)).width("100%").fontSize(8)
      }.width("100%").height("100%").backgroundColor(this.descriptorWrapper.props.colorTest.toRGBAString())

      this.ctx.wrappedRNChildrenBuilder.builder(this.ctx, this.tag)
    }
  }
}
