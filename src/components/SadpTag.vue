<!--
This component puts an SADP tag where it's instantiated.  If an anchor location
is given, the tag serves as a button to bring the current view to the anchor
point.  With no given anchor, the tag serves as a label.

It is instantiated in a Vue template as follows:

<SadpTag :hasSadp="<boolean-value>" :anchor="<anchor-id>"/>

where <boolean-value> indicates whether the CVE Record has an SADP, and
<anchor-id> is the optional anchor point for the SADP section.
-->

<template>
    <button v-if="hasSadp" class="tag is-rounded is-primary is-normal"
      :style="{cursor: anchor ? 'pointer' : 'default'}"
      @click="gotoAnchor()">
      SADP
    </button>
</template>

<script setup>

const props = defineProps({
    anchor: {
      type: String
    },
    hasSadp: {
      type: [Boolean, undefined],
      required: true
    }
});

function gotoAnchor() {

  if (props.anchor) {

    // This method works better than setting window.location.hash
    // because it handles the case when the user has already gone
    // to the anchor, but then scrolls up and clicks the button
    // again with no effect.

    const element = document.getElementById(props.anchor);

    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }
}

</script>
