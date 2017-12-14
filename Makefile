NPM = /usr/bin/npm

.PHONY: all build archive start

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
