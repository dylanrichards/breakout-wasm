# https://www.gnu.org/software/make/manual/html_node/Implicit-Variables.html
CC		= clang
CFLAGS	= --target=wasm32 -O2 -Wall -Wextra -Werror -pedantic -std=c89

# https://lld.llvm.org/WebAssembly.html
LDFLAGS	= -nostdlib -Wl,--no-entry -Wl,--import-undefined -Wl,--export=add

SRC_DIR = ./src/lib/collision
OUT_DIR = ./src/lib/collision

TARGETS = $(OUT_DIR)/collision.wasm

build: $(TARGETS)

# https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html
$(OUT_DIR)/%.wasm: $(SRC_DIR)/%.c
	@mkdir -p $(OUT_DIR)
	$(CC) $(CFLAGS) $(LDFLAGS) $< -o $@

.PHONY: run
run:
	busybox httpd -v -f -c $(CURDIR)/httpd.conf -h $(CURDIR)/src -p 8080

.PHONY: clean
clean:
	$(RM) $(TARGETS)
