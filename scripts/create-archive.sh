#!/bin/bash
# Creates portable archive from current git commit.
set -euo pipefail

name=pdc-contact-browser
version=$(./scripts/version.sh | cut -d- -f1)
archive_basename="$name-$version"
archive="$archive_basename.tar.gz"
root_dir="$archive_basename/var/www/html/$name"

install_files=(
    assets
    css
    src
    templates
    index.html
)

config_file="serversetting.json"

clean() {
    rm -Rf "$archive_basename"
}

clean
trap clean EXIT INT TERM
rm -f "$archive"

mkdir -p "$root_dir"
cp -Rv "${install_files[@]}" "$root_dir"
cp -v "$config_file.dist" "$root_dir/$config_file"

tar czf "$archive" "$archive_basename"
echo "Created archive: $archive"

