
.PHONY: run
run:
	busybox httpd -v -f -h ./src -p 8080
