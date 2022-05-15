default: help

.PHONY: start
start: ## Start local Jekyll site with Docker
	@docker run --rm -d \
    	--volume="${PWD}:/srv/jekyll" \
    	--env JEKYLL_ENV=development -p 4000:4000 \
		--name="jekyll-site" \
    	jekyll/jekyll:3.8 jekyll serve
	@echo "Jekyll site serving at http://localhost:4000"

.PHONY: stop
stop: ## Stop local Jekyll site
	@docker stop jekyll-site

.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

