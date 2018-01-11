#!/bin/bash
# Prints current version from git.
set -euo pipefail

name=pdc-contact-browser
commit=${1:-HEAD}

git_describe() {
    git describe --match="$name-*" --tags "$commit" "$@"
}

is_commit_tagged() {
    git_describe --exact-match &> /dev/null
}

version=$(git_describe --abbrev=0 | sed -e 's/'"$name"'-//')

if is_commit_tagged; then
    echo "$version"
else
    git_hash="$(git rev-parse --short=7 "$commit")"
    date="$(date '+%Y%m%d')"
    snapshot_info="$date.git$git_hash"
    echo "$version.$snapshot_info"
fi
