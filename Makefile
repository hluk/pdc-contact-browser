NPM = /usr/bin/npm

.PHONY: all build archive start version

all: build

build: $(NPM) node_modules
	$(RM) -r assets/
	$(NPM) run build

archive: build
	./scripts/create-archive.sh

start: $(NPM) node_modules
	$(NPM) start

$(NPM):
	sudo dnf install npm

node_modules:
	$(NPM) install

# Update version in spec file and package.json to match current git commit.
version:
	./scripts/update_spec_version.sh
	npm --no-git-tag-version version $$(./scripts/version.sh)
