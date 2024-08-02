#include "RNOH/Package.h"
#include "BaseReactNativeOhTplCodegenSamplePackagePackage.h"

namespace rnoh {
class NoCodegenCAPISamplePackage : public NoCodegenSampleCAPIPackage {
    using Super = NoCodegenSampleCAPIPackage;

public:
    NoCodegenCAPISamplePackage(Package::Context ctx) : NoCodegenSampleCAPIPackage(ctx) {}

    ComponentInstance::Shared createComponentInstance(const ComponentInstance::Context &ctx) override;
};
} // namespace rnoh
