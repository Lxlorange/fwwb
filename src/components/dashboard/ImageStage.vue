<template>
  <article class="image-stage" :class="`image-stage--${variant}`">
    <header class="image-stage__header">
      <div>
        <h4>{{ title }}</h4>
        <p>{{ caption }}</p>
      </div>
    </header>
    <div class="image-stage__canvas">
      <div class="image-stage__grid"></div>
      <div class="image-stage__scan"></div>
      <div class="swirl swirl-a"></div>
      <div class="swirl swirl-b"></div>
      <div class="mask mask-a"></div>
      <div class="mask mask-b"></div>
      <div class="boundary boundary-a"></div>
      <div class="boundary boundary-b"></div>
      <div class="center-dot center-a"></div>
      <div class="center-dot center-b"></div>
    </div>
    <footer class="image-stage__footer">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </footer>
  </article>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  caption: string
  variant: 'source' | 'segmentation' | 'overlay'
  tags: string[]
}>()
</script>

<style lang="scss" scoped>
.image-stage {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.image-stage__header {
  h4 {
    margin: 0 0 0.3rem;
    font-size: 0.98rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
}

.image-stage__canvas {
  position: relative;
  height: 13rem;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(114, 221, 255, 0.18);
  background:
    radial-gradient(circle at 25% 35%, rgba(79, 180, 255, 0.22), transparent 18%),
    radial-gradient(circle at 70% 68%, rgba(48, 128, 255, 0.18), transparent 16%),
    linear-gradient(180deg, rgba(6, 29, 43, 0.88) 0%, rgba(3, 18, 28, 0.96) 100%);
}

.image-stage__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(114, 221, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(114, 221, 255, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.42;
}

.image-stage__scan {
  position: absolute;
  inset: -40% 0 auto;
  height: 40%;
  background: linear-gradient(180deg, rgba(114, 221, 255, 0.18), rgba(114, 221, 255, 0));
  animation: scan 4.8s linear infinite;
}

.swirl,
.mask,
.boundary,
.center-dot {
  position: absolute;
}

.swirl {
  border-radius: 58% 42% 60% 40%;
  border: 1px solid rgba(114, 221, 255, 0.38);
  box-shadow: inset 0 0 28px rgba(114, 221, 255, 0.06);
}

.swirl-a {
  top: 16%;
  left: 18%;
  width: 34%;
  height: 42%;
  transform: rotate(-12deg);
}

.swirl-b {
  right: 14%;
  bottom: 18%;
  width: 26%;
  height: 30%;
  transform: rotate(22deg);
}

.mask {
  border-radius: 58% 42% 60% 40%;
  background: rgba(114, 221, 255, 0.24);
  filter: blur(0.3px);
  opacity: 0;
}

.mask-a {
  top: 18%;
  left: 20%;
  width: 30%;
  height: 36%;
  transform: rotate(-12deg);
}

.mask-b {
  right: 16%;
  bottom: 20%;
  width: 22%;
  height: 24%;
  transform: rotate(22deg);
}

.boundary {
  border-radius: 58% 42% 60% 40%;
  border: 2px dashed rgba(255, 255, 255, 0.85);
  opacity: 0;
}

.boundary-a {
  top: 17%;
  left: 19%;
  width: 31%;
  height: 37%;
  transform: rotate(-12deg);
}

.boundary-b {
  right: 15%;
  bottom: 19%;
  width: 23%;
  height: 25%;
  transform: rotate(22deg);
}

.center-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
  opacity: 0;
}

.center-a {
  top: 33%;
  left: 34%;
}

.center-b {
  right: 25%;
  bottom: 32%;
}

.image-stage__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;

  span {
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
    background: rgba(114, 221, 255, 0.1);
    border: 1px solid rgba(114, 221, 255, 0.12);
    color: var(--text-secondary);
    font-size: 0.74rem;
  }
}

.image-stage--segmentation {
  .mask {
    opacity: 1;
  }

  .mask-a {
    background: rgba(114, 221, 255, 0.45);
  }

  .mask-b {
    background: rgba(41, 78, 224, 0.4);
  }

  .swirl {
    border-color: rgba(114, 221, 255, 0.18);
  }
}

.image-stage--overlay {
  .boundary,
  .center-dot {
    opacity: 1;
  }

  .boundary-a {
    border-color: rgba(114, 221, 255, 0.95);
  }

  .boundary-b {
    border-color: rgba(245, 191, 99, 0.95);
  }

  .center-a {
    background: #72ddff;
  }

  .center-b {
    background: #f5bf63;
  }
}

@keyframes scan {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(280%);
  }
}
</style>
