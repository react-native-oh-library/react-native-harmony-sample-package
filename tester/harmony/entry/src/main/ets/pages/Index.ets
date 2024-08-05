import {
  AnyJSBundleProvider,
  ComponentBuilderContext,
  FileJSBundleProvider,
  MetroJSBundleProvider,
  ResourceJSBundleProvider,
  RNApp,
  RNOHErrorDialog,
  RNOHLogger,
  TraceJSBundleProviderDecorator,
  RNOHCoreContext
} from '@rnoh/react-native-openharmony';
import { CodegenSampleView } from '@react-native-oh-tpl/codegen-sample-package';
import { NoCodegenSampleViewArkTS } from '@react-native-oh-tpl/no-codegen-sample-package';
import font from '@ohos.font';
import { createRNPackages } from '../RNPackagesFactory';
import fs from  "@ohos.file.fs";
import common from '@ohos.app.ability.common';

let context = getContext(this) as common.UIAbilityContext;

const arkTsComponentNames: Array<string> = [
  CodegenSampleView.NAME,
  NoCodegenSampleViewArkTS.NAME,
];
@Builder
export function buildCustomRNComponent(ctx: ComponentBuilderContext) {
  // There seems to be a problem with the placement of ArkTS components in mixed mode. Nested Stack temporarily avoided.
  Stack(){
    if (ctx.componentName === CodegenSampleView.NAME) {
      CodegenSampleView({
        ctx: ctx.rnComponentContext,
        tag: ctx.tag
      })
    }
    if (ctx.componentName === NoCodegenSampleViewArkTS.NAME) {
      NoCodegenSampleViewArkTS({
        ctx: ctx.rnComponentContext,
        tag: ctx.tag
      })
    }
  }
  .position({x:0, y: 0})

}

const wrappedCustomRNComponentBuilder = wrapBuilder(buildCustomRNComponent)

/**
 * If you want to use custom fonts, you need to register them here.
 * We should support react-native-asset to handle registering fonts automatically.
 */
const fonts: font.FontOptions[] = [
  {
    familyName: 'Pacifico-Regular',
    familySrc: '/assets/fonts/Pacifico-Regular.ttf'
  },
  {
    familyName: 'StintUltraCondensed-Regular',
    familySrc: '/assets/fonts/StintUltraCondensed-Regular.ttf'
  }
]

@Entry
@Component
struct Index {
  @StorageLink('RNOHCoreContext') private rnohCoreContext: RNOHCoreContext | undefined = undefined
  @State shouldShow: boolean = false
  private logger!: RNOHLogger
  bundlePath:string = 'bunlde.harmony.js'
  @State hasBundle:boolean = false

  aboutToAppear() {
    this.logger = this.rnohCoreContext!.logger.clone("Index")
    const stopTracing = this.logger.clone("aboutToAppear").startTracing()
    for (const customFont of fonts) {
      font.registerFont(customFont)
    }

    this.shouldShow = true
    stopTracing()
  }

   async downloadBunlde(){
        let uint8Array = await context.resourceManager.getRawFileContent('rawfile/bundle.harmony.js');
        let rawBuffer = uint8Array.buffer;
        const bundlePath = context.filesDir + '/' + this.bundlePath;
        let stream = fs.createStreamSync(bundlePath,'w');
        stream.writeSync(rawBuffer);
        stream.closeSync();
        this.hasBundle = true;
      }

     checkBundleUpdated():void{
          if(context){
           const bundlePath = context.filesDir + '/' + this.bundlePath;
           try{
             const  stat = fs.statSync(bundlePath)
             if(stat.size == 0){
               this.downloadBunlde()
             }else{
               this.hasBundle = true
             }
           } catch (e) {
             this.downloadBunlde()
           }
         }
        }

  onBackPress(): boolean | undefined {
    // NOTE: this is required since `Ability`'s `onBackPressed` function always
    // terminates or puts the app in the background, but we want Ark to ignore it completely
    // when handled by RN
    this.rnohCoreContext!.dispatchBackPress()
    return true
  }

  build() {
    Column() {
      if (this.rnohCoreContext && this.shouldShow) {
        if (this.rnohCoreContext?.isDebugModeEnabled) {
          RNOHErrorDialog({ ctx: this.rnohCoreContext })
        }
        RNApp({
          rnInstanceConfig: {
            createRNPackages,
            enableNDKTextMeasuring: true,
            enableBackgroundExecutor: false,
            enableCAPIArchitecture: true,
            arkTsComponentNames: arkTsComponentNames,
          },
          initialProps: { "foo": "bar" } as Record<string, string>,
          appKey: "app_name",
          wrappedCustomRNComponentBuilder: wrappedCustomRNComponentBuilder,
          onSetUp: (rnInstance) => {
            rnInstance.enableFeatureFlag("ENABLE_RN_INSTANCE_CLEAN_UP")
          },
          jsBundleProvider: new TraceJSBundleProviderDecorator(
            new AnyJSBundleProvider([
              new MetroJSBundleProvider(),
              // NOTE: to load the bundle from file, place it in
              // `/data/app/el2/100/base/com.rnoh.tester/files/bundle.harmony.js`
              // on your device. The path mismatch is due to app sandboxing on HarmonyOS
              new FileJSBundleProvider('/data/storage/el2/base/files/bundle.harmony.js'),
              // new FileJSBundleProvider(context.filesDir + '/' + this.bundlePath),
              new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'hermes_bundle.hbc'),
              new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'bundle.harmony.js')
            ]),
            this.rnohCoreContext.logger),
        })
      }
    }
    .height('100%')
    .width('100%')
  }
}
