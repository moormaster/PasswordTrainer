#!/bin/bash

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
    cp -r libs "${BUILDDIR}/"
    cp index_build.html "${BUILDDIR}/index.html"
    cp manifest_build.appcache "${BUILDDIR}/manifest.appcache"

    mkdir ${BUILDDIR}/js
    catjsbundle > ${BUILDDIR}/js/bundle.js
}

catjsbundle() {
    cat js/app/IApp.js
    cat js/app/IPasswordNotificator.js

    cat js/app/comparator/IComparator.js

    cat js/app/model/ILeveledScore.js
    cat js/app/model/IPasswordRegistrationCollection.js

    cat js/app/ui/ILeveledScoreFormatter.js
    cat js/app/ui/IPagePasswordDialog.js
    cat js/app/ui/IPageManagePasswords.js
    cat js/app/ui/IPagePasswordTrainer.js
    cat js/app/ui/IPageImportExport.js

    cat js/util/hash/IPasswordHasher.js
    cat js/util/hash/ISaltGenerator.js

    cat js/util/json/IJSONFormatter.js

    cat js/util/notification/INotificator.js

    cat js/util/hash/MD5PasswordHasher.js
    cat js/util/hash/SaltGenerator.js

    cat js/util/json/JSONFormatter.js

    cat js/util/notification/Notificator.js

    cat js/app/comparator/ScoreDataFeeHoursAndLockHoursComparator.js

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
