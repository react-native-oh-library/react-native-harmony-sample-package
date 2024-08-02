#include "CodegenSamplePackage.h"
#include "CodegenSampleViewComponentInstance.h"

using namespace facebook;
using namespace rnoh;

ComponentInstance::Shared CodegenSamplePackage::createComponentInstance(
    const ComponentInstance::Context& ctx) {
  if (ctx.componentName == "CodegenSampleViewCAPI") {
    return std::make_shared<CodegenSampleViewComponentInstance>(ctx);
  }
  return nullptr;
};