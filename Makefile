# https://www.gnu.org/software/make/manual/html_node/Implicit-Variables.html
CC		= clang
CFLAGS	= --target=wasm32 --no-standard-libraries -Wl,--export-all -Wl,--no-entry

SRC_DIR = ./src/lib/collision
OUT_DIR = ./src/lib/collision

TARGETS = $(OUT_DIR)/collision.wasm

build: $(TARGETS)

# https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html
$(OUT_DIR)/%.wasm: $(SRC_DIR)/%.c
	@mkdir -p $(OUT_DIR)
	$(CC) $(CFLAGS) $< -o $@

.PHONY: run
run:
	busybox httpd -v -f -c $(CURDIR)/httpd.conf -h $(CURDIR)/src -p 8080

.PHONY: clean
clean:
	$(RM) $(TARGETS)
