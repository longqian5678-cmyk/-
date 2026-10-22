<!--
This component creates a box with a title and content that's widely used
throughout the CVE pages.

It is instantiated in a Vue template as follows:

<TopicBox title="<title>" [icon="<fa-icon>" titleSize="<size-class>"]>
  <box-content>
</TopicBox>

where <title> is the string title for the box, <fa-icon> is the string-format
description of an optional font awesome icon to be added at the left of the
title, and <size-class> is an optional Bulma title size class (is-1).  By
default, there is no icon with the title and the size is "is-4".
-->

<template>
    <article class="box is-radiusless p-0 is-flex-grow-1 cve-border-dark-blue">
      <h3 :class="`title ${titleSize} cve-topicbox-header`">
        <span v-if="icon !== undefined && icon.length"
          class="icon is-medium is-block cve-topicbox-icon">
          <font-awesome-icon :icon="icon" />
        </span>
        {{title}}
      </h3>
      <slot></slot>
    </article>
</template>

<script setup>

const props = defineProps({
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: undefined
    },
    titleSize: {
      type: String,
      default: 'is-4'
    }
});

</script>

<style scoped lang="scss">

@use 'cveRecord' as *;

.cve-topicbox-header {
  background-color: $theme-color-primary-darker;
  color: white !important;
  margin-bottom: 16px !important;
  padding: 5px 10px 5px 10px;
  text-align: left;
  display: flex;
}

</style>
