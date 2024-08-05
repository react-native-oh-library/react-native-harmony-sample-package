import { RNC } from "../ets/namespace"


export function getDirectProps(descriptorWrapper: RNC.NoCodegenSampleViewArkTS.DescriptorWrapper ): Record<keyof RNC.NoCodegenSampleViewArkTS.DirectRawProps, any> {
  const props = descriptorWrapper.props
  return {
    booleanTest: props.booleanTest,
    booleanWithDefaultTest: props.booleanWithDefaultTest,
    intTest: props.intTest,
    intWithDefault: props.intWithDefault,
    floatTest: props.floatTest,
    floatWithDefaultTest: props.floatWithDefaultTest,
    doubleTest: props.doubleTest,
    doubleWithDefaultTest: props.doubleWithDefaultTest,
    stringTest: props.stringTest,
    stringWithDefaultTest: props.stringWithDefaultTest,
    objectTest: props.objectTest,
    colorTest: props.colorTest.toRGBAString(),
    arrayTest: props.arrayTest,
    readOnlyArrayTest: props.readOnlyArrayTest,
    stringEnumTest: props.stringEnumTest,
    intEnumTest: props.intEnumTest
  }
}
