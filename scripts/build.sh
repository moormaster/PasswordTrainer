#!/bin/bash

SCRIPTDIR="$( realpath "$( dirname "$0" )" )"

usage() {
    echo "usage: $0 <BUILDDIR>"
}

build() {
    local BUILDDIR="$1"

    if [ "${BUILDDIR}" == "" ]
    then
        usage
        return 1
    fi

    echo building to BUILDDIR: ${BUILDDIR}
    if ! [ -d "${BUILDDIR}" ]
    then
        echo creating BUILDDIR: ${BUILDDIR}
        mkdir "${BUILDDIR}"
    fi

    cp -r public/css "${BUILDDIR}/"
    cp -r public/img "${BUILDDIR}/"
    cp -rL public/libs "${BUILDDIR}/"
    cp index_build.html "${BUILDDIR}/index.html"

    mkdir ${BUILDDIR}/js
    catjsbundle > ${BUILDDIR}/js/bundle.js

    pushd "${BUILDDIR}"
    ${SCRIPTDIR}/gen-manifest-appcache.sh > manifest.appcache
    popd
}

catjsbundle() {
    cat src/js/util/hash/MD5PasswordHasher.js
    cat src/js/util/hash/SaltGenerator.js

    cat src/js/util/json/JSONFormatter.js

    cat src/js/util/notification/NavigatorNotificator.js

    cat src/js/app/comparator/ScoreDataFeeHoursAndLockHoursComparator.js

    cat src/js/app/model/ApplicationModel.js
    cat src/js/app/model/LeveledScore.js
    cat src/js/app/model/PasswordRegistrationCollection.js

    cat src/js/app/ui/JQPassword.js
    cat src/js/app/ui/JQPasswordInput.js
    cat src/js/app/ui/JQPasswordRegistration.js

    cat src/js/app/ui/LeveledScoreFormatter.js
    cat src/js/app/ui/PagePasswordDialog.js
    cat src/js/app/ui/PageManagePasswords.js
    cat src/js/app/ui/PageImportExport.js
    cat src/js/app/ui/PagePasswordTrainer.js

    cat src/js/app/PasswordNotificator.js
    cat src/js/app/App.js

    cat src/js/init.js
}

BUILDDIR="$1"

if [ "$BUILDDIR" == "" ]
then
    BUILDDIR=build
fi

build "${BUILDDIR}"
