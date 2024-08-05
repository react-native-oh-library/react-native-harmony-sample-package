#include "NoCodegenCAPISamplePackage.h"
#include "NoCodegenSampleViewComponentInstance.h"

using namespace facebook;
using namespace rnoh;

ComponentInstance::Shared NoCodegenCAPISamplePackage::createComponentInstance(
    const ComponentInstance::Context& ctx) {
  if (ctx.componentName == "NoCodegenSampleViewCAPI") {
    return std::make_shared<NoCodegenSampleViewComponentInstance>(ctx);
  }
  return nullptr;
};