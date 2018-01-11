#!/bin/bash
# Update version in spec file.
set -euo pipefail

name=pdc-contact-browser
spec_file="$name.spec"

version_with_release=$(./scripts/version.sh)
version=$(echo "$version_with_release" | cut -d- -f1)
release=$(echo "$version_with_release" | cut -d- -f2)

sed -i \
    -e 's/^Version:\(\s*\).*/Version:\1'"$version/" \
    -e 's/^Release:\(\s*\).*/Release:\1'"$release%{?dist}/" \
    -- "$spec_file"
