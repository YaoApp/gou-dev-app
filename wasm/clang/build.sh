#!/bin/bash
WASI_CLANG=../wasi/bin/clang
$WASI_CLANG -O3 -o test.wasm test.c \
    -Wl,--export=add \
    -Wl,--export=echo \
    -Wl,--export=bytes
    
# Copy to project
cp test.wasm ../scripts/test.wasm