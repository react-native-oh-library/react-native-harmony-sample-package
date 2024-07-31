#include "RNOH/Package.h"
#include "RNOH/generated/BaseReactNativeOhTplCodegenSamplePackagePackage.h"

namespace rnoh {
class CodegenSamplePackage : public BaseReactNativeOhTplCodegenSamplePackagePackage {
  using Super = BaseReactNativeOhTplCodegenSamplePackagePackage;

 public:
  CodegenSamplePackage(Package::Context ctx)
      : BaseReactNativeOhTplCodegenSamplePackagePackage(ctx) {}
    
  ComponentInstance::Shared createComponentInstance(
      const ComponentInstance::Context& ctx) override;

};
} // namespace rnoh
