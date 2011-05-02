
test:
	@./node_modules/expresso/bin/expresso \
	  -I lib \
	  --serial

.PHONY: test