#!/bin/bash
# Creates portable archive from current git commit.
set -euo pipefail

name=pdc-contact-browser
version=$(git describe --match="$name-*" | sed -e 's/'"$name"'-//' -e 's/-[0-9]\+//' -e 's/-/./g')
archive_basename="$name-$version"
archive="$archive_basename.tar.gz"
root_dir="$archive_basename/var/www/html/$name"

install_files=(
    assets
    css
    src
    index.html
    serversetting.json
)

clean() {
    rm -Rf "$archive_basename"
}

clean
trap clean EXIT INT TERM
rm -f "$archive"

mkdir -p "$root_dir"
cp -Rv "${install_files[@]}" "$root_dir"

tar czf "$archive" "$archive_basename"
echo "Created archive: $archive"

