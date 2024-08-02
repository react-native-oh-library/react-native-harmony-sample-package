cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

file(
  GLOB sample_view_capi_SRC
  *.cpp
  react/renderer/components/_react_native_oh_tpl_codegen_sample_package/*.cpp
 )
add_library(
  no_codegen_sample_package_capi
  SHARED
  ${sample_view_capi_SRC}
)
target_include_directories(no_codegen_sample_package_capi PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(no_codegen_sample_package_capi PUBLIC rnoh)


