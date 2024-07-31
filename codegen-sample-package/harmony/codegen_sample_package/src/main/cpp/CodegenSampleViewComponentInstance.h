#pragma once

#include "RNOH/Color.h"
#include "RNOH/arkui/StackNode.h"
#include "RNOH/arkui/TextNode.h"
#include "RNOH/generated/components/BaseCodegenSampleViewCAPIComponentInstance.h"

namespace rnoh {
class CodegenSampleViewComponentInstance : public BaseCodegenSampleViewCAPIComponentInstance {
    using Super = BaseCodegenSampleViewCAPIComponentInstance;

    StackNode m_stackNode{};
    TextNode m_textNode{};

public:
    CodegenSampleViewComponentInstance(Context context) : Super(std::move(context)) {
        m_stackNode.insertChild(m_textNode, 0);
    }

    ArkUINode &getLocalRootArkUINode() { return m_stackNode; };


    void onPropsChanged(SharedConcreteProps const &props) {
        m_stackNode.setBackgroundColor(props->colorTest);
        std::stringstream textContent;
        textContent << "int: " << std::to_string(props->intTest) << "\n";
        textContent << "intWithDefault: " << std::to_string(props->intWithDefault) << "\n";
        textContent << "floatTest: " << std::to_string(props->floatTest) << "\n";
        textContent << "floatWithDefault: " << std::to_string(props->floatWithDefaultTest) << "\n";
        textContent << "doubleTest: " << std::to_string(props->doubleTest) << "\n";
        textContent << "doubleWithDefault: " << std::to_string(props->doubleWithDefaultTest) << "\n";
        textContent << "boolean: " << std::to_string(props->booleanTest) << "\n";
        textContent << "booleanWithDefault: " << std::to_string(props->booleanWithDefaultTest) << "\n";
        textContent << "string: " << props->stringTest << "\n";
        textContent << "stringWithDefault: " << props->stringWithDefaultTest << "\n";
        textContent << "arraySize: " << props->arrayTest.size() << "\n";
        textContent << "stringEnum: " << facebook::react::toString(props->stringEnumTest) << "\n";
        textContent << "color: " << Color::from(props->colorTest) << "\n";
        m_textNode.setTextContent(textContent.str());
    };

    void onEmitNativeEventCommand(std::string eventType) override {
        if (eventType == "directEvent") {
            m_eventEmitter->onDirectEvent({.booleanTest = m_props->booleanTest,
                                           .booleanWithDefaultTest = m_props->booleanWithDefaultTest,
                                           .intTest = m_props->intTest,
                                           .intWithDefault = m_props->intWithDefault,
                                           .floatTest = m_props->floatTest,
                                           .floatWithDefaultTest = m_props->floatWithDefaultTest,
                                           .doubleTest = m_props->doubleTest,
                                           .doubleWithDefaultTest = m_props->doubleWithDefaultTest,
                                           .stringTest = m_props->stringTest,
                                           .stringWithDefaultTest = m_props->stringWithDefaultTest,
                                           .arrayTest = m_props->arrayTest,
                                           .readOnlyArrayTest = m_props->readOnlyArrayTest,
                                           .colorTest = Color::from(m_props->colorTest).toRGBA(),
                                           .stringEnumTest = directEventTestEnumFromPropEnum(m_props->stringEnumTest)});
        }
    }

    void onEmitCommandArgsCommand(int intTest, float floatTest, double doubleTest, std::string stringTest,
                                  bool booleanTest) override {
        m_eventEmitter->onReceivedCommandArgs({.intTest = intTest,
                                               .floatTest = floatTest,
                                               .doubleTest = doubleTest,
                                               .stringTest = stringTest,
                                               .booleanTest = booleanTest});
    };

private:
    facebook::react::CodegenSampleViewCAPIEventEmitter::OnDirectEventStringEnumTest
    directEventTestEnumFromPropEnum(facebook::react::CodegenSampleViewCAPIStringEnumTest propEnum) {
        switch (propEnum) {
        case facebook::react::CodegenSampleViewCAPIStringEnumTest::Foo:
            return facebook::react::CodegenSampleViewCAPIEventEmitter::OnDirectEventStringEnumTest::Foo;
        case facebook::react::CodegenSampleViewCAPIStringEnumTest::Bar:
            return facebook::react::CodegenSampleViewCAPIEventEmitter::OnDirectEventStringEnumTest::Bar;
        }
    }
};

} // namespace rnoh