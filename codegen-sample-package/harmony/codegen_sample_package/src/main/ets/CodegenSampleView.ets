import { RNComponentContext, RNViewBase } from '@rnoh/react-native-openharmony';
import { RNC } from "@rnoh/react-native-openharmony/generated"
import { getDirectProps } from "../utils/sampleUtils"

@Component
export struct CodegenSampleView {
  public static readonly NAME = RNC.CodegenSampleViewArkTS.NAME
  public ctx!: RNComponentContext
  public tag: number = 0
  @State private descriptorWrapper: RNC.CodegenSampleViewArkTS.DescriptorWrapper =
    {} as RNC.CodegenSampleViewArkTS.DescriptorWrapper
  private eventEmitter: RNC.CodegenSampleViewArkTS.EventEmitter | undefined = undefined
  private cleanUpCallbacks: (() => void)[] = []

  aboutToAppear() {
    this.eventEmitter = new RNC.CodegenSampleViewArkTS.EventEmitter(this.ctx.rnInstance, this.tag)
    this.onDescriptorWrapperChange(this.ctx.descriptorRegistry.findDescriptorWrapperByTag<RNC.CodegenSampleViewArkTS.DescriptorWrapper>(this.tag)!)
    this.cleanUpCallbacks.push(this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag,
      (_descriptor, newDescriptorWrapper) => {
        this.onDescriptorWrapperChange(newDescriptorWrapper! as RNC.CodegenSampleViewArkTS.DescriptorWrapper)
      }
    ))

    this.cleanUpCallbacks.push(new RNC.CodegenSampleViewArkTS.CommandReceiver(this.ctx.componentCommandReceiver,
      this.tag).subscribe("emitNativeEvent", (argv) => {
      const eventType = argv[0] as keyof RNC.CodegenSampleViewArkTS.EventPayloadByName
      this.eventEmitter!.emit(eventType, this.getDirectProps())
    }))
  }

  private onDescriptorWrapperChange(descriptorWrapper: RNC.CodegenSampleViewArkTS.DescriptorWrapper) {
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
