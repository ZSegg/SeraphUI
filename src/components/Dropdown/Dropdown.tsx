import { omit } from 'lodash-es'
import { defineComponent, computed, h, ref, Fragment } from 'vue'

import type { Ref } from 'vue'
import type { MenuOption } from './type'
import type { Placement, Options } from '@popperjs/core'
import type { TooltipInstance } from '@/components/Tooltip/type'

import SpTooltip from '../Tooltip/Tooltip.vue'

export default defineComponent({
  name: 'SpDropdown',
  props: {
    content: {
      type: String,
    },
    trigger: {
      type: String as () => 'hover' | 'click',
      default: 'click',
    },
    placement: {
      type: String as () => Placement,
      required: true,
    },
    manual: Boolean,
    popperOptions: Object as () => Partial<Options>,
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    menuOptions: {
      type: Array as () => MenuOption[],
      required: true,
    },
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
  } as const,
  emits: ['visible-change', 'select'],
  setup(props, { emit, slots, expose }) {
    const menuRef = ref() as Ref<HTMLElement>
    const tooltipRef = ref<TooltipInstance | null>(null)
    const tooltipProps = computed(() => omit(props, ['menuOptions']))

    const select = (option: MenuOption) => {
      if (option.disabled) return
      emit('select', option)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }

    const visibleChange = (visible: boolean) => {
      console.log(visible)
      emit('visible-change', visible)
    }

    let cnt = 0
    const add = () => {
      console.log('cnt:', ++cnt)
    }

    const options = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided ? (
              <li role="separator" class="divided-placeholder" />
            ) : (
              ''
            )}
            <li
              class={{
                'sp-dropdown__item': true,
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }}
              id={`dropdown-item-${item.key}`}
              onClick={() => select(item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })

    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide(),
    })
    return () => (
      <div class="sp-dropdown">
        <SpTooltip
          {...tooltipProps.value}
          ref={tooltipRef}
          onVisibleChange={visibleChange}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => <ul class="sp-dropdown__menu">{options.value}</ul>,
          }}
        </SpTooltip>
      </div>
    )
  },
})
