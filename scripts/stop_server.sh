#!/bin/bash
isExistApp=`pgrep npm`
if [[ -n  \$isExistApp ]]; then
   service npm stop
fi
isExistApp=`pgrep mongod`
if [[ -n  \$isExistApp ]]; then
    service mongod stop
fi
