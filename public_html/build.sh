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
    cat js/ui/JQPassword.js
    cat js/ui/JQPasswordInput.js
    cat js/ui/JQPasswordRegistration.js

    cat js/IComparator.js
    cat js/IImportsExportsPasswordRegistrations.js
    cat js/IApp.js
    cat js/IJSONFormatter.js
    cat js/ILeveledScore.js
    cat js/ILeveledScoreFormatter.js
    cat js/INotificator.js
    cat js/IPasswordNotificator.js
    cat js/IPasswordRegistrationCollection.js
    cat js/IPasswordHasher.js
    cat js/ISaltGenerator.js
    cat js/ui/IPagePasswordDialog.js
    cat js/ui/IPageManagePasswords.js
    cat js/ui/IPagePasswordTrainer.js
    cat js/ui/IPageImportExport.js

    cat js/JSONFormatter.js
    cat js/LeveledScore.js
    cat js/LeveledScoreFormatter.js
    cat js/MD5PasswordHasher.js
    cat js/Notificator.js
    cat js/PasswordNotificator.js
    cat js/PasswordRegistrationCollection.js
    cat js/ScoreDataFeeHoursAndLockHoursComparator.js
    cat js/SaltGenerator.js

    cat js/ui/PagePasswordDialog.js
    cat js/ui/PageManagePasswords.js
    cat js/ui/PageImportExport.js
    cat js/ui/PagePasswordTrainer.js
    
    cat js/App.js
    
    cat js/init.js
}

BUILDDIR="$1"

if [ "$BUILDDIR" == "" ]
then
    BUILDDIR=build
fi

build "${BUILDDIR}"
