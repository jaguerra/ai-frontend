#!/bin/bash
#
# Builds the assets and copies them into the TYPO3 ext
#

if [ ! -e ./.bundle.conf ]
then
    cp ./.bundle.conf.dist ./.bundle.conf
    echo "Please edit .bundle.conf file with the path to the TYPO3 site and rerun the script"
    exit 1
fi
source .bundle.conf

BUNDLE_DEST="$BUNDLE_BASE/typo3conf/ext/user_site2015/Resources/Public/Assets/"
if [ ! -d $BUNDLE_DEST ]
then
    echo "Destination directory does not exist, please check you have your .bundle.conf"
    exit 1
fi

gulp clean && gulp $1 && cp -R dist/* "$BUNDLE_DEST" && rm $BUNDLE_DEST*.html
