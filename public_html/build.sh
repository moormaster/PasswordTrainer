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

    cp -r css "${BUILDDIR}/"
    cp -r img "${BUILDDIR}/"
    cp -rL libs "${BUILDDIR}/"
    cp index_build.html "${BUILDDIR}/index.html"

    mkdir ${BUILDDIR}/js
    catjsbundle > ${BUILDDIR}/js/bundle.js

    pushd "${BUILDDIR}"
    ${SCRIPTDIR}/gen-manifest-appcache.sh > manifest.appcache
    popd
}

catjsbundle() {
    cat js/util/hash/MD5PasswordHasher.js
    cat js/util/hash/SaltGenerator.js

    cat js/util/json/JSONFormatter.js

    cat js/util/notification/NavigatorNotificator.js

    cat js/app/comparator/ScoreDataFeeHoursAndLockHoursComparator.js

    cat js/app/model/ApplicationModel.js
    cat js/app/model/LeveledScore.js
    cat js/app/model/PasswordRegistrationCollection.js

    cat js/app/ui/JQPassword.js
    cat js/app/ui/JQPasswordInput.js
    cat js/app/ui/JQPasswordRegistration.js

    cat js/app/ui/LeveledScoreFormatter.js
    cat js/app/ui/PagePasswordDialog.js
    cat js/app/ui/PageManagePasswords.js
    cat js/app/ui/PageImportExport.js
    cat js/app/ui/PagePasswordTrainer.js

    cat js/app/PasswordNotificator.js
    cat js/app/App.js

    cat js/init.js
}

BUILDDIR="$1"

if [ "$BUILDDIR" == "" ]
then
    BUILDDIR=build
fi

build "${BUILDDIR}"
