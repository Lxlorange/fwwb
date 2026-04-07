<template>
  <div class="not-found">
    <div class="not-found__code">404</div>
    <h1>页面不存在</h1>
    <p>当前地址未映射到海洋环境识别系统页面，请返回首页总览继续操作。</p>
    <button type="button" @click="router.push('/overview')">返回首页总览</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 2rem;
  border-radius: 1.4rem;
  border: 1px solid rgba(114, 221, 255, 0.18);
  background: var(--panel-bg);
}

.not-found__code {
  font-family: Tencent, sans-serif;
  font-size: clamp(4rem, 10vw, 8rem);
  color: var(--accent);
  line-height: 1;
}

h1 {
  margin: 0;
  font-size: 1.6rem;
}

p {
  margin: 0;
  color: var(--text-secondary);
}

button {
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #72ddff 0%, #1d7be8 100%);
  color: #02131d;
  font-weight: 700;
}
</style>
