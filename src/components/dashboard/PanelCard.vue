<template>
  <section class="panel-card">
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
</template>

<script lang="ts" setup>
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<style lang="scss" scoped>
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

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 3.2rem;
    height: 3.2rem;
    border: 1px solid rgba(114, 221, 255, 0.35);
    pointer-events: none;
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
