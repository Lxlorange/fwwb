<template>
  <article class="metric-card" :class="toneClass">
    <div class="metric-card__label">{{ label }}</div>
    <div class="metric-card__value">
      <strong>{{ value }}</strong>
      <span v-if="unit">{{ unit }}</span>
    </div>
    <div class="metric-card__meta">
      <span class="metric-card__trend">{{ trend }}</span>
      <span class="metric-card__note">{{ note }}</span>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Tone } from '@/data/oceanDashboard'

const props = defineProps<{
  label: string
  value: string
  unit: string
  trend: string
  note: string
  tone: Tone
  compact?: boolean
}>()

const toneClass = computed(() =>
  props.compact ? `metric-card--${props.tone} metric-card--compact` : `metric-card--${props.tone}`
)
</script>

<style lang="scss" scoped>
.metric-card {
  position: relative;
  padding: 1rem 1rem 0.95rem;
  border-radius: 1.1rem;
  border: 1px solid rgba(114, 221, 255, 0.15);
  background: linear-gradient(180deg, rgba(7, 36, 48, 0.88) 0%, rgba(4, 24, 34, 0.96) 100%);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(114, 221, 255, 0.06), transparent);
    transform: translateX(-100%);
    animation: shimmer 6s linear infinite;
  }
}

.metric-card__label {
  position: relative;
  z-index: 1;
  margin-bottom: 0.75rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.metric-card__value {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  margin-bottom: 0.55rem;

  strong {
    font-family: Tencent, sans-serif;
    font-size: clamp(1.6rem, 2vw, 2.35rem);
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
  }

  span {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
}

.metric-card__meta {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.76rem;
}

.metric-card__trend {
  padding: 0.22rem 0.52rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.metric-card__note {
  color: var(--text-muted);
  text-align: right;
}

.metric-card--good {
  border-color: rgba(71, 212, 166, 0.28);

  .metric-card__trend {
    color: var(--success);
    background: rgba(71, 212, 166, 0.12);
  }
}

.metric-card--warning {
  border-color: rgba(245, 191, 99, 0.28);

  .metric-card__trend {
    color: var(--warning);
    background: rgba(245, 191, 99, 0.12);
  }
}

.metric-card--danger {
  border-color: rgba(255, 124, 124, 0.28);

  .metric-card__trend {
    color: var(--danger);
    background: rgba(255, 124, 124, 0.12);
  }
}

.metric-card--info {
  .metric-card__trend {
    color: var(--accent);
    background: rgba(114, 221, 255, 0.12);
  }
}

.metric-card--compact {
  padding: 0.78rem 0.8rem 0.74rem;
  border-radius: 0.95rem;

  .metric-card__label {
    margin-bottom: 0.55rem;
    font-size: 0.76rem;
  }

  .metric-card__value {
    margin-bottom: 0.42rem;

    strong {
      font-size: clamp(1.15rem, 1.55vw, 1.7rem);
    }

    span {
      font-size: 0.78rem;
    }
  }

  .metric-card__meta {
    font-size: 0.68rem;
    gap: 0.45rem;
  }

  .metric-card__trend {
    padding: 0.18rem 0.45rem;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
