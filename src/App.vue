<template>
  <header>
    <SpDropdown
      ref="dropdownRef"
      placement="bottom"
      :trigger="trigger"
      :menu-options="dropOptions"
      @visible-change="(e) => console.log(e)"
      @select="(e) => console.log(e)"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </SpDropdown>
  </header>
  <!-- <button @click="tran">test</button>
  <SpTooltip ref="dropdownRef" :trigger="trigger" placement="bottom">
    <template #default>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis culpa fugit totam
        repellat ex debitis. Explicabo a eligendi corrupti esse unde asperiores dicta
        voluptatibus dolor veniam magni, commodi consequuntur sit!
      </h1>
    </template>

    <template #content>
      <h1>content</h1>
    </template>
  </SpTooltip>

  <SpTooltip placement="right" content="this is a button">
    <SpButton>button</SpButton>
  </SpTooltip> -->

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

  <SpCollapse v-model="collapseNames">
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
  <SpButton size="large" icon="sccuess">Icon</SpButton><br /><br />

  <hr />

  <SpAlert
    type="danger"
    title="test"
    effect="light"
    center
    description="Lorem ipsum dolor s consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl n"
  />
  <SpAlert
    type="success"
    title="test"
    effect="dark"
    description="Lorem ipsum dolor s consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl n"
  />

  <SpAlert
    type="info"
    title="test"
    description="Lorem ipsum dolor s consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl n"
  />

  <SpAlert
    type="primary"
    title="test"
    description="Lorem ipsum dolor s consectetur
  adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
  eget ultricies nisl n"
    close-text="关闭"
    :show-icon="false"
  />

  <SpAlert
    description="Lorem ipsum dolor s consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl n"
  >
    <template #title> title </template>
  </SpAlert>

  <SpAlert title="test" />

  <SpAlert type="warning" :closable="false">
    <template #icon>
      <span>myIcon</span>
    </template>
  </SpAlert>

  <hr />

  <p ref="pRef">test</p>
  <!-- <SpCollapse v-model="collapseNames">
    <SpCollapseItem name="a" title="title a"></SpCollapseItem>
    <SpCollapseItem name="b" title="title b"></SpCollapseItem>
    <SpCollapseItem name="c" title="title c" disabled></SpCollapseItem>
  </SpCollapse> -->
</template>

<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { createPopper } from "@popperjs/core";
import type { Instance, Options } from "@popperjs/core";
import type { TooltipInstance } from "./components/Tooltip/type";
import type { ButtonInstance } from "./components/Button/type";
import type { MenuOption, DropdownInstance } from "./components/Dropdown/type";
import SpButton from "./components/Button/Button.vue";
import SpCollapse from "./components/Collapse/Collapse.vue";
import SpCollapseItem from "./components/Collapse/CollapseItem.vue";
import SpIcon from "./components/Icon/Icon.vue";
import SpAlert from "./components/Alert/Alert.vue";
import SpTooltip from "@/components/Tooltip/Tooltip.vue";
import SpDropdown from "@/components/Dropdown/Dropdown.vue";
import SpMessage from "@/components/Message/Message.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { createMessage } from "@/components/Message/method";

import useEventListener from "./hooks/useEventListener";

const pRef = ref<HTMLElement | null>(null);
const fn1 = () => console.log("fn1");
const fn2 = () => console.log("fn2");

useEventListener(pRef, "click", fn1);
useEventListener(document.body, "click", () => {
  console.log("111");
});

for (let i = 1; i <= 5; i++) {
  const instance = createMessage({
    message: `hello message ${i}`,
    // duration: i * 2000,
    duration: 0,
    showClose: true,
  });
  // setTimeout(() => instance.destory(), 2000 * i);
}

// import useMousePosition from "./hooks/useMousePosition";

// const { x, y } = useMousePosition();

// import VNode from "./VNode.tsx";

const buttonRef = ref<ButtonInstance | null>();
const dropdownRef = ref<DropdownInstance | null>();

const collapseNames = ref(["a"]);

const overlayNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();

const toolOptions: Partial<Options> = {
  placement: "bottom-end",
  strategy: "fixed",
};

const dropOptions: MenuOption[] = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" },
];

let poperInstance = ref<Instance | null>(null);
let trigger = ref<"click" | "hover" | undefined>("click");
// console.log("trigger:", trigger.value);
const tran = () => {
  trigger.value = trigger.value == "hover" ? "click" : "hover";
  console.log(trigger.value);
};

onMounted(() => {
  // dropdownRef.value?.show();
  // setTimeout(() => {
  //   dropdownRef.value?.hide();
  // }, 10000);
  setTimeout(() => {
    useEventListener(pRef, "click", fn2);
    useEventListener(document.body, "click", () => {
      console.log("222");
    });
  }, 2000);
});
</script>
