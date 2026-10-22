<!--
This component is based on the Bulma message block, and was further taken from
the "accordion" construct in the FAQ component (and other components in the CVE
website code).  It contains a message header and expandable/collapsible message
content.

It is instantiated in a Vue template as follows:

<AccordionContent header="<message-header>" [headerVariant="dark | light"]
  v-model:expanded> <message-body-content> </AccordionContent>

where <message-header> is a short string used as a title, and the parent
component controls the expanded state via "expanded".  Parent component control
allows for "collapse/expand all" functionality.  If this is not needed, a simple
variable with the initial state of the accordion content is all that needs to be
implemented in the parent.

The "headerVariant" property controls the look of the message header.  If this
is "light" or not specified, the header will be rendered with a paragraph (<p>)
tag and the background will be white with dark lettering; if "dark", the header
will be rendered with a top-level heading (<h1>) and the background will be the
primary dark background with white lettering.  The dark mode is used for display
of ADP data, whereas the non-dark mode is for data like the FAQ and board
archives.
-->

<template>
  <nav class="message">
    <div class="message-header"
      :class="isDark ? 'cve-dark-accordion' : 'cve-base-light-gray-borders-bg'">
      <component
        :is="isDark ? 'h1' : 'p'"
        :class="isDark ? 'mb-1' : 'mt-2 mb-2'">
        {{header}}
      </component>
      <button class="button message-header-button"
        @click="toggleAccordion"
        :aria-expanded="expanded"
        :aria-controls="messageBodyId"
        :aria-label="`${expanded ? 'Collapse' : 'Expand'} ${header}`">
        <font-awesome-icon :icon="expanded ? 'minus' : 'plus'"
          aria-hidden="true"/>
      </button>
    </div>
    <div :id="messageBodyId" class="message-body"
      :class="{'is-hidden': !expanded}">
      <slot></slot>
    </div>
  </nav>
</template>

<script setup>

import {useId} from 'vue';

const props = defineProps({
  header: {
    type: String,
    required: true
  },
  headerVariant: {
    type: String,
    default: 'light',
    validator: v => ['light', 'dark'].includes(v)
  }
});

const expanded = defineModel('expanded', {required: true});

const id = useId();

const isDark = (props.headerVariant === 'dark');

const messageBodyId = `AccordionBody-${id}`;

function toggleAccordion() {

  expanded.value = !expanded.value;
}

</script>

<style scoped lang="scss">

@use 'variables' as *;

.cve-dark-accordion, .cve-dark-accordion * {
  background-color: $theme-color-primary-darker !important;
  color: white;
}

</style>
