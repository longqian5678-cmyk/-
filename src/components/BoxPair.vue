<!--
This component pairs up two TopicBox instances and displays them side-by-side
for all devices except the mobile size, in which case each instance is
displayed in a single column.

It is instantiated in a Vue template as follows:

<BoxPair :titles="[<box1-title>, <box2-title>]">
  <template #box1>
    <left-box-content>
  </template>
  <template #box2>
    <right-box-content>
  </template>
</BoxPair>

where <box{1/2}-title> are the string titles for the left and right boxes, and
<{left/right}-box-content> are the contents of each box.
-->

<template>
  <div class="fixed-grid has-2-cols">
    <div class="grid">
      <div class="cell is-flex is-flex-direction-column">
        <TopicBox :title="titles[0]">
        <slot name="box1"></slot>
        </TopicBox>
      </div>
      <div class="cell is-flex is-flex-direction-column">
        <TopicBox :title="titles[1]">
        <slot name="box2"></slot>
        </TopicBox>
      </div>
    </div>
  </div>
</template>

<script setup>

import TopicBox from '@/components/TopicBox.vue';

// The 'titles' array must contain only 2 strings (for the pair of boxes).

const props = defineProps({
  titles: {
    type: Array,
    required: true,
    validator(value) {
      return value.length === 2;
    }
  }
});

</script>

<style scoped lang="scss">
@use 'initial-variables' as *;

// Combined with the default column size of 2 and the override to explicitly
// change the column size to 1 for mobile devices, the box pair should be
// laid out properly for different screen sizes.  The has-1-cols-mobile &
// has-2-cols-tablet does not work for the CVE pages because the sizes
// (mobile, tablet, etc.) are based on the viewport (width of the parent).
// The main column content width is 800px with the padding tending to be
// 16px on each side and this results in the width being 768px, which happens
// to be the exact mobile size limit.  Even though the overall screen size
// can be desktop or even widescreen, the viewport width is still the same
// as the "mobile" width - and this is why the container breakpoints don't
// work.

@media only screen and (max-width: $tablet) {

    .fixed-grid > .grid {
      --bulma-grid-column-count: 1
    }
}
</style>
