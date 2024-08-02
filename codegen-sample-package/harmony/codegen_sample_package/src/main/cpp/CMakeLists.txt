cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

set(codegen_sample_package_generated_dir "${RNOH_GENERATED_DIR}/_react_native_oh_tpl_codegen_sample_package")
file(GLOB_RECURSE codegen_sample_package_generated_SRC "${codegen_sample_package_generated_dir}/**/*.cpp")
file(GLOB codegen_sample_package_SRC CONFIGURE_DEPENDS *.cpp)
add_library(codegen_sample_package SHARED ${codegen_sample_package_SRC} ${codegen_sample_package_generated_SRC})
target_include_directories(codegen_sample_package PUBLIC ${CMAKE_CURRENT_SOURCE_DIR} ${codegen_sample_package_generated_dir})
target_link_libraries(codegen_sample_package PUBLIC rnoh)
