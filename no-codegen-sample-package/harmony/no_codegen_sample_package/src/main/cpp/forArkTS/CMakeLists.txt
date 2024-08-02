cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

file(GLOB sample_view_SRC CONFIGURE_DEPENDS *.cpp)
add_library(
  no_codegen_sample_package_arkts
  SHARED
  ${sample_view_SRC}
)
target_include_directories(no_codegen_sample_package_arkts PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(no_codegen_sample_package_arkts PUBLIC rnoh)

