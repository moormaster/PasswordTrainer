#!/bin/bash

SCRIPTDIR="$( realpath "$( dirname "$0" )" )"

main() {
    local BUILDDIR="$1"

    npm run build
    pushd "dist"
    ${SCRIPTDIR}/gen-manifest-appcache.sh > manifest.appcache
    popd
}

main
