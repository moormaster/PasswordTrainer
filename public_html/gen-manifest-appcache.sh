#!/bin/bash

echo "CACHE MANIFEST"
echo ""
echo "CACHE:"
echo '# '$( date +'%Y-%m-%d %H:%M:%S' )
find -L -type f | grep '\.css$\|\.htm$\|\.html$\|\.ico$\|\.js\|\.map\|\.png$' | sort | grep -oP '(?<=^\./).*$'
