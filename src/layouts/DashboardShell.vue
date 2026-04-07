<template>
  <div class="dashboard-shell">
    <div class="shell-glow shell-glow--left"></div>
    <div class="shell-glow shell-glow--right"></div>
    <div class="shell-grid"></div>

    <header class="dashboard-header">
      <div class="brand-block">
        <div class="brand-mark">
          <span class="brand-mark__ring"></span>
          <span class="brand-mark__core"></span>
        </div>
        <div class="brand-copy">
          <h1>海洋环境识别系统</h1>
          <p>Marine Environment Recognition Platform</p>
        </div>
      </div>

      <div class="header-centerline">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="header-meta">
        <div class="window-controls" aria-label="Window Controls">
          <button type="button" class="window-btn window-btn--min" title="最小化"></button>
          <button type="button" class="window-btn window-btn--max" title="最大化"></button>
          <button type="button" class="window-btn window-btn--close" title="关闭"></button>
        </div>

        <div class="status-list">
          <article v-for="item in systemStatus" :key="item.label" class="status-item">
            <span class="status-item__icon" :class="`status-item__icon--${item.type}`"></span>
            <div>
              <strong>{{ item.label }}</strong>
              <small>{{ item.value }}</small>
            </div>
          </article>
        </div>

        <div class="time-panel">
          <div class="time-panel__time">{{ now.time }}</div>
          <div class="time-panel__date">{{ now.date }}</div>
          <div class="time-panel__week">{{ now.week }}</div>
        </div>
      </div>
    </header>

    <main class="dashboard-workspace">
      <aside class="dashboard-sidebar">
        <div class="dashboard-sidebar__rail"></div>
        <nav class="sidebar-nav" aria-label="Module Navigation">
          <button
            v-for="item in navigationItems"
            :key="item.path"
            type="button"
            class="sidebar-nav__item"
            :class="{ 'sidebar-nav__item--active': route.path === item.path }"
            @click="goTo(item.path)"
          >
            <span class="sidebar-nav__icon">{{ item.icon }}</span>
            <span class="sidebar-nav__text">{{ item.label }}</span>
          </button>
        </nav>

        <button type="button" class="sidebar-back" @click="goBack">
          <span class="sidebar-back__icon">←</span>
          <span class="sidebar-back__text">返回</span>
        </button>
      </aside>

      <section class="dashboard-visual">
        <div class="visual-topbar">
          <div class="visual-topbar__scene">
            <span>当前模块</span>
            <strong>{{ activeItem.label }}</strong>
          </div>
          <div class="visual-topbar__desc">{{ activeItem.description }}</div>
        </div>

        <div class="visual-stage">
          <div class="visual-stage__waves"></div>
          <div class="visual-stage__frame"></div>
          <div class="visual-stage__placeholder">
            <span class="visual-stage__tag">VIDEO RESERVED</span>
            <h2>中央主视图区</h2>
            <p>海洋环境视频流区域预留，后续可直接接入实时监控视频或海域场景画面。</p>
          </div>

          <div class="visual-stage__footer">
            <div class="visual-stage__banner">
              <span class="visual-stage__banner-icon">{{ activeItem.icon }}</span>
              <strong>{{ activeItem.label }}</strong>
            </div>
            <div class="visual-stage__subtitle">Ocean Environment Monitoring & Recognition Workspace</div>
          </div>
        </div>
      </section>

      <aside class="dashboard-side-panel">
        <div class="dashboard-side-panel__header">
          <div>
            <span>Right Side Panel</span>
            <h3>{{ activeItem.label }}</h3>
          </div>
          <small>{{ activeItem.short }}</small>
        </div>

        <div class="dashboard-side-panel__content">
          <router-view v-slot="{ Component }">
            <transition name="panel-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </aside>
    </main>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navigationItems } from '@/data/oceanDashboard'

const route = useRoute()
const router = useRouter()

const systemStatus = [
  { label: '网络', value: '在线', type: 'network' },
  { label: '设备', value: '正常', type: 'device' },
  { label: '链路', value: '稳定', type: 'sync' }
]

const formatNow = () => {
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  return {
    time: dayjs().format('HH:mm:ss'),
    date: dayjs().format('YYYY-MM-DD'),
    week: weekday[dayjs().day()]
  }
}

const now = ref(formatNow())
let timer: number | undefined

const activeItem = computed(() => {
  return navigationItems.find(item => item.path === route.path) ?? navigationItems[0]
})

const goTo = (path: string) => {
  if (route.path !== path) {
    router.push(path)
  }
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push('/overview')
}

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = formatNow()
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<style lang="scss" scoped>
.dashboard-shell {
  position: relative;
  min-height: 100%;
  padding: 1rem;
  overflow: hidden;
}

.shell-glow,
.shell-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.shell-glow--left {
  background: radial-gradient(circle at 14% 18%, rgba(86, 186, 255, 0.2), transparent 24%);
}

.shell-glow--right {
  background: radial-gradient(circle at 88% 12%, rgba(112, 204, 255, 0.16), transparent 20%);
}

.shell-grid {
  opacity: 0.05;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.24) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.14) 1px, transparent 1px);
  background-size: 32px 32px;
}

.dashboard-header {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(18rem, 27rem) minmax(8rem, 1fr) minmax(24rem, 31rem);
  align-items: center;
  gap: 1rem;
  min-height: 5.9rem;
  padding: 0.9rem 1.15rem;
  border: 1px solid rgba(173, 227, 255, 0.24);
  border-radius: 1.4rem;
  background:
    linear-gradient(90deg, rgba(177, 223, 248, 0.22) 0%, rgba(128, 203, 243, 0.14) 28%, rgba(88, 179, 239, 0.08) 100%),
    linear-gradient(180deg, rgba(11, 48, 67, 0.9) 0%, rgba(6, 30, 43, 0.96) 100%);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.22);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at center, rgba(214, 245, 255, 0.24), transparent 36%),
      linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
    opacity: 0.75;
    pointer-events: none;
  }
}

.brand-block,
.header-meta,
.header-centerline {
  position: relative;
  z-index: 1;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 0.95rem;
}

.brand-mark {
  position: relative;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(173, 227, 255, 0.25);
}

.brand-mark__ring {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 2px solid rgba(173, 227, 255, 0.82);
  border-right-color: transparent;
  transform: rotate(-22deg);
}

.brand-mark__core {
  position: absolute;
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #d6f6ff 0%, #72ddff 100%);
  box-shadow: 0 0 14px rgba(114, 221, 255, 0.52);
}

.brand-copy h1 {
  margin: 0;
  font-family: SJyunhei, sans-serif;
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 500;
}

.brand-copy p {
  margin: 0.3rem 0 0;
  color: rgba(226, 247, 255, 0.82);
  font-size: 0.8rem;
  letter-spacing: 0.16rem;
  text-transform: uppercase;
}

.header-centerline {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  justify-content: center;

  span {
    display: block;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(225, 248, 255, 0.7), transparent);
  }

  span:nth-child(1),
  span:nth-child(3) {
    width: 100%;
  }

  span:nth-child(2) {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 1px solid rgba(225, 248, 255, 0.5);
    background: rgba(225, 248, 255, 0.12);
    box-shadow: 0 0 14px rgba(114, 221, 255, 0.22);
  }
}

.header-meta {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.9rem;
}

.window-controls {
  display: flex;
  align-items: center;
  gap: 0.42rem;
}

.window-btn {
  position: relative;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: 1px solid rgba(220, 245, 255, 0.5);
  background: rgba(220, 245, 255, 0.08);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    background: rgba(236, 250, 255, 0.9);
  }
}

.window-btn--min::before {
  width: 0.48rem;
  height: 1px;
}

.window-btn--max::before {
  width: 0.42rem;
  height: 0.42rem;
  border: 1px solid rgba(236, 250, 255, 0.9);
  background: transparent;
}

.window-btn--close::before {
  width: 0.52rem;
  height: 1px;
  transform: rotate(45deg);
}

.window-btn--close::after {
  width: 0.52rem;
  height: 1px;
  transform: rotate(-45deg);
}

.status-list {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(173, 227, 255, 0.16);

  strong,
  small {
    display: block;
    line-height: 1.2;
  }

  strong {
    font-size: 0.68rem;
    color: rgba(232, 250, 255, 0.72);
  }

  small {
    font-size: 0.68rem;
    color: #ebfdff;
  }
}

.status-item__icon {
  position: relative;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid rgba(173, 227, 255, 0.25);
  background: rgba(173, 227, 255, 0.08);
}

.status-item__icon--network::before,
.status-item__icon--device::before,
.status-item__icon--sync::before,
.status-item__icon--sync::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
}

.status-item__icon--network::before {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 50%;
  border: 1px solid rgba(114, 221, 255, 0.92);
  border-top-color: transparent;
}

.status-item__icon--device::before {
  width: 0.46rem;
  height: 0.3rem;
  border: 1px solid rgba(114, 221, 255, 0.92);
  border-radius: 0.08rem;
}

.status-item__icon--sync::before,
.status-item__icon--sync::after {
  width: 0.44rem;
  height: 1px;
  background: rgba(114, 221, 255, 0.92);
}

.status-item__icon--sync::before {
  transform: rotate(45deg);
}

.status-item__icon--sync::after {
  transform: rotate(-45deg);
}

.time-panel {
  min-width: 8rem;
  text-align: right;
}

.time-panel__time {
  font-family: Tencent, sans-serif;
  font-size: clamp(1.5rem, 1.8vw, 2rem);
  line-height: 1;
}

.time-panel__date,
.time-panel__week {
  color: rgba(232, 250, 255, 0.78);
  font-size: 0.76rem;
}

.time-panel__date {
  margin-top: 0.22rem;
}

.dashboard-workspace {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 6rem minmax(0, 1fr) 28rem;
  gap: 1rem;
  height: calc(100vh - 7.9rem);
  margin-top: 1rem;
}

.dashboard-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.75rem;
  border: 1px solid rgba(114, 221, 255, 0.14);
  border-radius: 1.5rem;
  background: linear-gradient(180deg, rgba(10, 39, 54, 0.88) 0%, rgba(5, 23, 33, 0.96) 100%);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}

.dashboard-sidebar__rail {
  position: absolute;
  top: 1.1rem;
  bottom: 1.1rem;
  left: 50%;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(114, 221, 255, 0.2), transparent);
  transform: translateX(-50%);
}

.sidebar-nav {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.88rem;
  width: 100%;
}

.sidebar-nav__item {
  display: grid;
  justify-items: center;
  gap: 0.38rem;
  padding: 0.45rem 0.25rem;
  color: var(--text-secondary);
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.sidebar-nav__icon {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  border: 1px solid rgba(114, 221, 255, 0.18);
  background: linear-gradient(180deg, rgba(114, 221, 255, 0.14) 0%, rgba(15, 88, 126, 0.12) 100%);
  color: #dff7ff;
  font-family: SJyunhei, sans-serif;
  font-size: 1rem;
  box-shadow: inset 0 0 16px rgba(114, 221, 255, 0.08);
}

.sidebar-nav__text {
  font-size: 0.75rem;
  line-height: 1.25;
  text-align: center;
}

.sidebar-nav__item--active {
  color: #ffffff;

  .sidebar-nav__icon {
    border-color: rgba(114, 221, 255, 0.44);
    box-shadow: 0 0 18px rgba(114, 221, 255, 0.22);
    background: linear-gradient(180deg, rgba(114, 221, 255, 0.26) 0%, rgba(23, 126, 230, 0.18) 100%);
  }
}

.sidebar-back {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 0.28rem;
  width: 100%;
  padding-top: 0.3rem;
}

.sidebar-back__icon {
  display: grid;
  place-items: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  border: 1px solid rgba(114, 221, 255, 0.18);
  background: rgba(114, 221, 255, 0.08);
  font-size: 1.2rem;
}

.sidebar-back__text {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.dashboard-visual {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
}

.visual-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.78rem 1rem;
  border: 1px solid rgba(114, 221, 255, 0.12);
  border-radius: 1.15rem;
  background: rgba(9, 35, 49, 0.72);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.18);
}

.visual-topbar__scene {
  span,
  strong {
    display: block;
  }

  span {
    margin-bottom: 0.2rem;
    color: var(--text-muted);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08rem;
  }

  strong {
    font-size: 1.02rem;
  }
}

.visual-topbar__desc {
  max-width: 34rem;
  color: var(--text-secondary);
  font-size: 0.82rem;
  text-align: right;
}

.visual-stage {
  position: relative;
  flex: 1;
  overflow: hidden;
  border-radius: 1.7rem;
  border: 1px solid rgba(114, 221, 255, 0.16);
  background:
    radial-gradient(circle at top, rgba(177, 223, 248, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(8, 42, 60, 0.88) 0%, rgba(3, 23, 35, 0.96) 100%);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.24);
}

.visual-stage__waves,
.visual-stage__frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.visual-stage__waves {
  background:
    radial-gradient(circle at 50% 8%, rgba(223, 248, 255, 0.22), transparent 18%),
    linear-gradient(180deg, rgba(164, 221, 248, 0.08), transparent 18%),
    repeating-linear-gradient(
      180deg,
      rgba(114, 221, 255, 0.02) 0,
      rgba(114, 221, 255, 0.02) 1px,
      transparent 1px,
      transparent 22px
    );
}

.visual-stage__frame {
  inset: 1rem;
  border: 1px solid rgba(114, 221, 255, 0.16);
  border-radius: 1.25rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.visual-stage__placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0.9rem;
  text-align: center;
  padding: 2rem;
}

.visual-stage__tag {
  padding: 0.34rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(114, 221, 255, 0.18);
  background: rgba(114, 221, 255, 0.08);
  color: var(--accent);
  font-size: 0.75rem;
  letter-spacing: 0.12rem;
}

.visual-stage__placeholder h2 {
  margin: 0;
  font-family: SJyunhei, sans-serif;
  font-size: clamp(2rem, 3vw, 3.1rem);
  font-weight: 500;
}

.visual-stage__placeholder p {
  max-width: 34rem;
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}

.visual-stage__footer {
  position: absolute;
  right: 1.5rem;
  bottom: 1.35rem;
  left: 1.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.visual-stage__banner {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.7rem 1.15rem 0.7rem 0.75rem;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(17, 109, 198, 0.92) 0%, rgba(64, 196, 255, 0.92) 100%);
  box-shadow: 0 18px 32px rgba(14, 75, 124, 0.24);

  strong {
    font-family: SJyunhei, sans-serif;
    font-size: 1.7rem;
    font-weight: 500;
    letter-spacing: 0.06rem;
  }
}

.visual-stage__banner-icon {
  display: grid;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  font-size: 1rem;
}

.visual-stage__subtitle {
  color: rgba(230, 248, 255, 0.76);
  font-size: 1.05rem;
  letter-spacing: 0.08rem;
  text-align: right;
}

.dashboard-side-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0.95rem;
  border: 1px solid rgba(114, 221, 255, 0.14);
  border-radius: 1.5rem;
  background: linear-gradient(180deg, rgba(9, 38, 54, 0.9) 0%, rgba(4, 21, 31, 0.96) 100%);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}

.dashboard-side-panel__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(114, 221, 255, 0.1);

  span {
    display: block;
    margin-bottom: 0.2rem;
    color: var(--text-muted);
    font-size: 0.7rem;
    letter-spacing: 0.08rem;
    text-transform: uppercase;
  }

  h3 {
    margin: 0;
    font-size: 1.08rem;
  }

  small {
    color: var(--accent);
    font-size: 0.78rem;
    letter-spacing: 0.08rem;
    text-transform: uppercase;
  }
}

.dashboard-side-panel__content {
  flex: 1;
  min-height: 0;
}

.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 1440px) {
  .dashboard-workspace {
    grid-template-columns: 5.3rem minmax(0, 1fr) 24rem;
  }

  .visual-stage__banner strong {
    font-size: 1.4rem;
  }

  .visual-stage__subtitle {
    font-size: 0.92rem;
  }
}

@media (max-width: 1280px) {
  .dashboard-header {
    grid-template-columns: 1fr;
  }

  .header-centerline {
    display: none;
  }

  .header-meta {
    grid-template-columns: auto 1fr auto;
  }

  .dashboard-workspace {
    grid-template-columns: 5.3rem minmax(0, 1fr);
    grid-template-rows: minmax(22rem, 1fr) auto;
    height: auto;
    min-height: calc(100vh - 8rem);
  }

  .dashboard-side-panel {
    grid-column: span 2;
    min-height: 46rem;
  }
}

@media (max-width: 768px) {
  .dashboard-shell {
    padding: 0.75rem;
  }

  .header-meta {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .status-list {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .dashboard-workspace {
    grid-template-columns: 1fr;
  }

  .dashboard-sidebar {
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
    overflow: auto;
    padding: 0.75rem;
  }

  .dashboard-sidebar__rail {
    display: none;
  }

  .sidebar-nav {
    display: flex;
  }

  .sidebar-back {
    width: auto;
    padding-top: 0;
  }

  .dashboard-side-panel {
    grid-column: auto;
    min-height: auto;
  }

  .visual-topbar,
  .visual-stage__footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
