################################################################################
# Makefile for Server Backend postgres Boilerplates
################################################################################

.PHONY: smoke
smoke:
	npm run smoke
.PHONY: shutdown
shutdown:
	docker-compose down