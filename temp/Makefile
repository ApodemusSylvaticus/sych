THIS_FILE := $(lastword $(MAKEFILE_LIST))
THIS_DIR := $(dir $(abspath $(THIS_FILE)))
ROOT_DIR := $(abspath $(THIS_DIR)../../)/
MOD_NAME := web
ESBUILD := $(THIS_DIR)frontend/node_modules/.bin/esbuild
TAILWIND := $(THIS_DIR)frontend/node_modules/.bin/tailwindcss
WWW_DIR := $(THIS_DIR)www/
SHADER_SRC_DIR := $(THIS_DIR)frontend/js/gl/shaders/
SHADER_DEST_DIR := $(WWW_DIR)js/gl/shaders/
FND_DIR := $(THIS_DIR)frontend/
STATIC_DIR := $(FND_DIR)static/
DOCKER_IMAGE := nginx:latest
NGINX_CONF := $(THIS_DIR)nginx.conf
SSL_CERT_DIR := $(THIS_DIR)tls/
CONTAINER_NAME := nginx_proxy
GLOB_RES_SRC_DIR := $(FND_DIR)node_modules/@openglobus/og/lib/@openglobus/res/
BUN_UPDATE_FLAG := /tmp/bun_update_flag

ifeq ($(THIS_FILE),)
$(error THIS_FILE is not set)
endif
ifeq ($(THIS_DIR),)
$(error THIS_DIR is not set)
endif

.PHONY: all dev clean help copy-shaders build-optimize build-dev check-esbuild proto armu darmu bun-update

all: build-optimize copy-shaders

armu: build-optimize copy-shaders

darmu: build-optimize copy-shaders

dev: build-dev copy-shaders

clean:
	@echo "Cleaning is noop"

check-esbuild:
	@echo "Checking esbuild"
	@if ! $(ESBUILD) --version > /dev/null 2>&1; then \
		echo "esbuild command failed, possibly due to architecture change. Removing node_modules and reinstalling..."; \
		rm -rf $(THIS_DIR)frontend/node_modules; \
		echo "Running bun install to rebuild binaries..."; \
		cd $(THIS_DIR)frontend && bun install; \
    else \
        echo "esbuild is working correctly, no need to reinstall node_modules."; \
    fi

help:
	@echo "Available commands:"
	@echo "  all   - Build optimized and stripped version of the application"
	@echo "  dev   - Build development version of the application"
	@echo "  clean - Remove binary files"
	@echo "  armu  - Same as all"
	@echo "  help  - Show this help message"

copy-shaders:
	@mkdir -p $(SHADER_DEST_DIR)
	@cp -f $(SHADER_SRC_DIR)* $(SHADER_DEST_DIR)

proto:
	@echo "Generating d.ts/js files from .proto files"
	@$(ROOT_DIR)scripts/ts_protogen.bash

bun-update:
	@if [ ! -f $(BUN_UPDATE_FLAG) ]; then \
		echo "Running bun update..."; \
		cd $(THIS_DIR)frontend && bun update; \
		touch $(BUN_UPDATE_FLAG); \
	else \
		echo "bun update already run since system start. Skipping."; \
	fi

build-optimize: check-esbuild bun-update
	@mkdir -p $(WWW_DIR)res
	@mkdir -p $(WWW_DIR)styles
	@cp $(FND_DIR)node_modules/@openglobus/og/lib/@openglobus/og.css $(WWW_DIR)styles/
	@cp -r $(GLOB_RES_SRC_DIR)* $(WWW_DIR)res/
	@$(ESBUILD) $(FND_DIR)ts/ctl_app.ts --bundle --platform=browser \
		--tsconfig=$(FND_DIR)tsconfig.json --minify --outfile=$(WWW_DIR)js/ctl_app.js
	@$(ESBUILD) $(FND_DIR)ts/app.ts --bundle --platform=browser \
		--tsconfig=$(FND_DIR)tsconfig.json --minify --outfile=$(WWW_DIR)js/app.js
	@$(ESBUILD) $(FND_DIR)ts/map_app.ts --bundle --platform=browser \
		--tsconfig=$(FND_DIR)tsconfig.json --minify --outfile=$(WWW_DIR)js/map_app.js
	@$(ESBUILD) $(FND_DIR)js/webSocketManagerWorker.js --bundle --platform=browser \
		--minify --outfile=$(WWW_DIR)js/webSocketManagerWorker.js
	@$(ESBUILD) $(FND_DIR)js/gl/canvasWorker.js --bundle --platform=browser \
		--minify --outfile=$(WWW_DIR)js/gl/canvasWorker.js
	@rsync -av $(STATIC_DIR) $(WWW_DIR)
	@$(TAILWIND) -c $(FND_DIR)tailwind.config.js \
		-i $(FND_DIR)globals.css -o $(WWW_DIR)styles/globals.css --minify

build-dev: check-esbuild bun-update
	@mkdir -p $(WWW_DIR)res
	@mkdir -p $(WWW_DIR)styles
	@cp $(FND_DIR)node_modules/@openglobus/og/lib/@openglobus/og.css $(WWW_DIR)styles/
	@cp -r $(GLOB_RES_SRC_DIR)* $(WWW_DIR)res/
	@$(ESBUILD) $(FND_DIR)ts/app.ts --bundle --platform=browser \
		--tsconfig=$(FND_DIR)tsconfig.json --outfile=$(WWW_DIR)js/app.js
	@$(ESBUILD) $(FND_DIR)ts/ctl_app.ts --bundle --platform=browser \
		--tsconfig=$(FND_DIR)tsconfig.json --outfile=$(WWW_DIR)js/ctl_app.js
	@$(ESBUILD) $(FND_DIR)ts/map_app.ts --bundle --platform=browser \
		--tsconfig=$(FND_DIR)tsconfig.json --outfile=$(WWW_DIR)js/map_app.js
	@$(ESBUILD) $(FND_DIR)js/webSocketManagerWorker.js --bundle --platform=browser \
		--outfile=$(WWW_DIR)js/webSocketManagerWorker.js
	@$(ESBUILD) $(FND_DIR)js/gl/canvasWorker.js --bundle --platform=browser \
		--outfile=$(WWW_DIR)js/gl/canvasWorker.js
	@rsync -av $(STATIC_DIR) $(WWW_DIR)
	@$(TAILWIND) -c $(FND_DIR)tailwind.config.js \
		-i $(FND_DIR)globals.css -o $(WWW_DIR)styles/globals.css

nginx-start:
	@docker rm -f $(CONTAINER_NAME) || true
	@docker run \
		--name $(CONTAINER_NAME) \
		-v $(WWW_DIR):/www/:ro \
		-v $(NGINX_CONF):/etc/nginx/nginx.conf:ro \
		-v $(SSL_CERT_DIR):/etc/nginx/ssl:ro \
		-d \
		--net=host \
		$(DOCKER_IMAGE)
	@echo "Nginx started."

nginx-stop:
	@docker rm -f $(CONTAINER_NAME)
	@echo "Nginx stopped."
