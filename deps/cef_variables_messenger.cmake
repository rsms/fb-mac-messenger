
if(OS_MACOSX)
  list(APPEND CEF_CXX_COMPILER_FLAGS
    -stdlib=libc++      # Use clang standard library
    )
endif()
