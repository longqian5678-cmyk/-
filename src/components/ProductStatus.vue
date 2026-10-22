<template>
  <div>
    <h4 class="title is-size-5 mb-0">Product Status</h4>
    <router-link to="/CVERecord/UserGuide/#cve-product-status" class="cve-learn-more-link">Learn more</router-link>
    <div class="mt-4">
      <div v-if="products !== undefined && products.length == 0">
          <p class="is-italic cve-help-text">Information not provided</p>
      </div>
      <div class="cve-scroll-box" v-else-if="products !== undefined">
        <div v-for="(product, index) in products" :key="`${index}-${product.vendor}`">
            <div id="cve-vendor-product-platforms" class="column is-12-desktop mb-4 cve-row cve-light-gray-bg">
                <nav id="cve-vendor-product-platforms" class="mb-4 cve-prod-row cve-x-scroll">
                  <div class="cve-prod-item" v-if="product.vendor">
                      <div>
                        <p class="cve-product-status-heading">Vendor</p>
                        <p>{{ product.vendor }}</p>
                      </div>
                  </div>
                  <div class="cve-prod-item" v-if="product.name">
                    <p class="cve-product-status-heading">{{product.nameLabel}}</p>
                    <p>
                        <a v-if="product.hasOnlyPackage && product.collectionURL"
                        :href="product.collectionURL" target="_blank"
                        rel="noopener noreferrer">
                        {{ product.name }}
                        </a>
                        <span v-else>
                        {{ product.name }}
                        </span>
                    </p>
                  </div>
                  <div class="cve-prod-item" v-if="product.platforms.length > 0">
                      <div>
                        <p class="cve-product-status-heading">Platforms</p>
                        <p>{{ product.platforms.join(', ') }}</p>
                      </div>
                  </div>
                </nav>
                <div id="cve-affected-unaffected-unknown-versions">
                  <p class="cve-product-status-heading pb-1" >
                      Versions <span class="tag is-normal">{{ product.versionCount }} Total</span>
                  </p>
                <div class="cve-scroll-box pt-1">
                  <div class="column is-12-desktop mb-4">
                    <div id="cve-version-default-status">
                      <p class="cve-help-text is-italic">
                        <span class="has-text-weight-bold">Default Status: </span>
                        {{defaultStatus(product)}}
                      </p>
                    </div>
                    <div v-for="heading in product.versionTable.headings" :key="heading.key">
                      <div :id="heading" class="mt-1">
                        <p style="text-transform: capitalize;">{{ heading }}</p>
                        <ul class="menu-list mt-1" v-for="versionRange in product.versionTable.twoDTable[heading]">
                          <li>
                            <p>
                              {{heading}}<span
                                v-for="spec in versionRange.parentRange"
                                :key="spec.version" class="version-preposition">
                                {{spec.preposition}}
                                <span class="cve-version">{{spec.version}}</span>
                              </span>
                            </p>
                            <ul v-if="versionRange.changes.length > 0"
                              style="border-left: none !important;">
                              <li v-for="change in versionRange.changes">
                                {{change.status}} from
                                <span class="cve-version">
                                  {{change.at}}
                                </span>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                  </div>
                  </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  products: {
    type: Object,
    required: false
  }
});

function defaultStatus(product) {

    return product.versionCount > 0 ? product.defaultStatus
      : `All versions are ${product.defaultStatus}`;
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@use 'initial-variables' as *;
@use 'variables' as *;

.cve-version {
  color: $theme-color-violet-vivid-60;
  font-weight: 700;
}

.cve-light-gray-bg {
  background-color: #FFF;
  border-radius: $cve-border-radius;
  border: $white-ter solid 1px;
}

.cve-product-status-heading{
  font-weight: 700;
  margin-bottom: 0.25rem !important;
}

.version-preposition {
  margin-left: .25em;
}

.cve-prod-row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;
  overflow-x: auto;
}

.cve-prod-row .cve-prod-item {
  flex: 0 0 auto;
  text-align: left;
}
</style>
