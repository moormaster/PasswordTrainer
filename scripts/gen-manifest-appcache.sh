#!/bin/bash

echo "CACHE MANIFEST"
echo ""
echo "CACHE:"
echo '# '$( date +'%Y-%m-%d %H:%M:%S' )
find -L ./dist -type f -printf '%P\n' | sort
