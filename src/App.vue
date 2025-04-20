<template>
  <a href="#" target="_blank" rel="noopener noreferrer">test</a>
  <!-- <SpButton ref="buttonRef">test Button</SpButton> -->
  <hr />
  <SpButton ref="buttonRef">Test Button</SpButton>
  <SpButton plain>Plain Button</SpButton>
  <SpButton round>Round Button</SpButton>
  <SpButton circle>VK</SpButton>
  <SpButton disabled>Disabled Button</SpButton><br /><br />
  <SpButton type="primary">Primary</SpButton>
  <SpButton type="success">Success</SpButton>
  <SpButton type="info">Info</SpButton>
  <SpButton type="warning">Warning</SpButton>
  <SpButton type="danger">Danger</SpButton><br /><br />
  <SpButton type="primary" plain>Primary</SpButton>
  <SpButton type="success" plain>Success</SpButton>
  <SpButton type="info" plain>Info</SpButton>
  <SpButton type="warning" plain>Warning</SpButton>
  <SpButton type="danger" plain>Danger</SpButton><br /><br />
  <SpButton size="large">Large</SpButton>
  <SpButton size="small">Small</SpButton>

  <hr />

  <SpCollapse v-model="collapseNames" accordion>
    <SpCollapseItem name="a">
      <template #title>
        <h1>nice title</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </SpCollapseItem>
    <SpCollapseItem name="b" title="nice title b item b">
      <div>this is bbbbb test</div>
    </SpCollapseItem>
    <SpCollapseItem name="c" title="nice cccc" disabled>
      <div>this is cccc test</div>
    </SpCollapseItem>
  </SpCollapse>

  <hr />
  <SpButton size="large">Large</SpButton>
  <SpButton size="small">Small</SpButton><br /><br />
  <SpButton size="large" loading>Loading</SpButton>
  <SpButton size="large" icon="arrow-up">Icon</SpButton><br /><br />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ButtonInstance } from "./components/Button/type";
import SpButton from "./components/Button/Button.vue";
import SpCollapse from "./components/Collapse/Collapse.vue";
import SpCollapseItem from "./components/Collapse/CollapseItem.vue";
import SpIcon from "./components/Icon/Icon.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const buttonRef = ref<ButtonInstance | null>();

const collapseNames = ref(["a"]);

onMounted(() => {
  // console.log("buttonRef:", buttonRef.value?.ref);
});
</script>
