<template>
  <div v-show="isTeleported" class="panel-card-placeholder" :style="placeholderStyle"></div>

  <Teleport to="body" :disabled="!isTeleported">
    <Transition name="fade">
      <div v-if="isExpanded" class="panel-backdrop" @click.stop="closePanel"></div>
    </Transition>

    <section
      ref="cardRef"
      class="panel-card"
      :class="{ 'is-expanded': isExpanded, 'is-expandable': !isExpanded, 'is-animating': isAnimating }"
      :style="cardStyle"
      @click="openPanel"
    >
      <Transition name="fade">
        <div v-if="isExpanded" class="panel-card__close" @click.stop="closePanel">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </div>
      </Transition>

      <header v-if="title || subtitle || $slots.header" class="panel-card__header">
        <slot name="header">
          <div class="panel-card__title-group">
            <span class="panel-card__marker"></span>
            <div>
              <h3>{{ title }}</h3>
              <p v-if="subtitle">{{ subtitle }}</p>
            </div>
          </div>
        </slot>
        <div v-if="$slots.extra" class="panel-card__extra">
          <slot name="extra"></slot>
        </div>
      </header>
      <div class="panel-card__body">
        <slot></slot>
      </div>
    </section>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

defineProps<{
  title?: string
  subtitle?: string
}>()

const cardRef = ref<HTMLElement | null>(null)
const isExpanded = ref(false)
const isTeleported = ref(false)
const isAnimating = ref(false)
const originalRect = ref<DOMRect | null>(null)

const placeholderStyle = reactive({
  width: 'auto',
  height: 'auto'
})

const cardStyle = reactive({
  position: '',
  top: '',
  left: '',
  width: '',
  height: '',
  margin: '',
  zIndex: '',
  transition: ''
})

const openPanel = () => {
  if (isExpanded.value || isAnimating.value) return
  if (!cardRef.value) return

  // 1. 获取当前卡片的宽高和位置
  const rect = cardRef.value.getBoundingClientRect()
  originalRect.value = rect

  // 2. 占位符保持原始大小，防止页面布局塌陷
  placeholderStyle.width = `${rect.width}px`
  placeholderStyle.height = `${rect.height}px`

  // 3. 将原卡片设置为 fixed，并固定在当前坐标上（此时没有动画）
  Object.assign(cardStyle, {
    position: 'fixed',
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: '0',
    zIndex: '9999',
    transition: 'none'
  })

  isTeleported.value = true
  isAnimating.value = true

  // 4. 等待 DOM 渲染后，开启 CSS 动画并变化到目标放大状态
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      Object.assign(cardStyle, {
        top: '5vh',
        left: '5vw',
        width: '90vw',
        height: '90vh',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' // macOS spring 阻尼感
      })
      isExpanded.value = true

      setTimeout(() => {
        isAnimating.value = false
      }, 500)
    })
  })
}

const closePanel = () => {
  if (!isExpanded.value || isAnimating.value) return
  if (!originalRect.value) return

  isAnimating.value = true
  isExpanded.value = false // 隐藏遮罩层和关闭按钮

  // 1. 坐标缩放回原始大小
  const rect = originalRect.value
  Object.assign(cardStyle, {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  })

  // 2. 等待动画结束后，还原 relative 布局并将 Teleport 收回
  setTimeout(() => {
    isTeleported.value = false
    isAnimating.value = false
    Object.assign(cardStyle, {
      position: '',
      top: '',
      left: '',
      width: '',
      height: '',
      margin: '',
      zIndex: '',
      transition: ''
    })
  }, 500)
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.panel-card-placeholder {
  border-radius: 1.2rem;
  background: rgba(114, 221, 255, 0.05);
  border: 1px dashed rgba(114, 221, 255, 0.2);
}

.panel-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9998;
}

.panel-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 1rem 1rem 1.05rem;
  border: 1px solid var(--panel-border);
  border-radius: 1.2rem;
  background: var(--panel-bg);
  box-shadow: var(--panel-shadow);
  overflow: hidden;
  transition: all 0.3s ease;

  &.is-expandable {
    cursor: pointer;

    &:hover {
      border-color: rgba(114, 221, 255, 0.4);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      &::before, &::after {
        border-color: rgba(114, 221, 255, 0.6);
      }
    }
  }

  &.is-animating {
    .panel-card__body {
      overflow: hidden !important;
    }
  }

  &.is-expanded {
    background: #04121a;
    border-color: var(--accent);
    cursor: default;

    .panel-card__body {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 3.2rem;
    height: 3.2rem;
    border: 1px solid rgba(114, 221, 255, 0.35);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  &::before {
    top: -1.8rem;
    right: -1.8rem;
    border-left: 0;
    border-bottom: 0;
    border-radius: 0 1.2rem 0 0;
  }

  &::after {
    left: -1.8rem;
    bottom: -1.8rem;
    border-right: 0;
    border-top: 0;
    border-radius: 0 0 0 1.2rem;
  }
}

.panel-card__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: var(--text-muted);
  transition: color 0.2s;
  z-index: 10;

  &:hover {
    color: var(--danger);
  }
}

.panel-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.95rem;
}

.panel-card__title-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  h3 {
    margin: 0;
    font-size: 1.03rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  p {
    margin: 0.28rem 0 0;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
}

.panel-card__marker {
  width: 0.78rem;
  height: 0.78rem;
  margin-top: 0.18rem;
  border-radius: 0.24rem;
  background: linear-gradient(135deg, #72ddff 0%, #1d7be8 100%);
  box-shadow: 0 0 18px rgba(114, 221, 255, 0.35);
}

.panel-card__extra {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.panel-card__body {
  flex: 1;
  min-height: 0;
}
</style>
