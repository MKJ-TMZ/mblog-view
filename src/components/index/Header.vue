<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import homeTop1 from 'assets/img/homeTop1.png'
import homeTop2 from 'assets/img/homeTop2.png'
import homeTop3 from 'assets/img/homeTop3.png'
import wave1 from 'assets/img/wave1.png'
import wave2 from 'assets/img/wave2.png'

const store = useStore()
const props = defineProps({
  blogName: {
    type: String,
    required: true
  }
})

const loaded = ref<boolean>(false)
const imgBg = ref<any>(null)
const header = ref<any>(null)
const clientSize: any = computed(() => store.state.clientSize)

onMounted(() => {
  imgBg.value.onload = () => {
    loaded.value = true
  }
  setHeaderHeight()
  let startingPoint: number = 0
  header.value.addEventListener('mouseenter', (e: any) => {
    startingPoint = e.clientX
  })
  header.value.addEventListener('mouseout', (e: any) => {
    header.value.classList.remove('moving')
    header.value.style.setProperty('--percentage', '0.5')
  })
  header.value.addEventListener('mousemove', (e: any) => {
    let percentage: number = (e.clientX - startingPoint) / window.outerWidth + 0.5
    header.value.style.setProperty('--percentage', percentage)
    header.value.classList.add('moving')
  })
})

watch(
  () => clientSize.value.clientHeight,
  () => {setHeaderHeight()}
)

//根据可视窗口高度，动态改变首图大小
const setHeaderHeight = () => {
  const { clientHeight } = clientSize.value
  header.value.style.height = clientHeight + 'px'
}
//平滑滚动至正文部分
const scrollToMain = () => {
  const { clientHeight } = clientSize.value
  window.scrollTo({top: clientHeight, behavior: 'smooth'})
}
</script>

<template>
  <header ref="header">
    <div class="view">
      <img alt="" ref="imgBg" src="~@/assets/img/homeTop2.png" style="display: none;"/>
      <div class="bg1" :style="{backgroundImage: `url(${homeTop1})`}"/>
      <div class="bg2" :style="{backgroundImage: `url(${homeTop2})`}" v-show="loaded"/>
      <div class="bg3" :style="{backgroundImage: `url(${homeTop3})`}" v-show="loaded"/>
    </div>
    <div class="text-malfunction" :data-word="blogName">
      <div class="line"/>
    </div>
    <div class="wrapper">
      <i class="iconfont icon-down-circle" @click="scrollToMain"></i>
    </div>
    <div class="wave1" :style="{background: `url(${wave1}) repeat-x`}"/>
    <div class="wave2" :style="{background: `url(${wave2}) repeat-x`}"/>
  </header>
</template>

<style lang="less" scoped>
header {
  --percentage: 0.5;
  user-select: none;
}

.view {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  transform: translatex(calc(var(--percentage) * 100px));
}

.view div {
  background-position: center center;
  background-size: cover;
  position: absolute;
  width: 110%;
  height: 100%;
}

.view .bg1 {
  z-index: 10;
  opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
}

.view .bg2 {
  z-index: 20;
  opacity: calc(1 - (var(--percentage) - 0.25) / 0.25);
}

.view .bg3 {
  left: -10%;
}

header .view,
header .bg1,
header .bg2 {
  transition: .2s all ease-in;
}

header.moving .view,
header.moving .bg1,
header.moving .bg2 {
  transition: none;
}

.text-malfunction {
  position: absolute;
  top: 40%;
  left: 51.5%;
  transform: translate(-50%, -50%) scale(2.5);
  width: 250px;
  font-size: 34px;
  font-family: sans-serif;
  color: transparent;
}

.line {
  position: absolute;
  width: 100%;
  padding: 0 10px;
  left: -1px;
  height: 1px;
  background: black;
  z-index: 50;
  animation: lineMove 5s ease-out infinite;
}

.text-malfunction:before, .text-malfunction:after {
  content: attr(data-word);
  position: absolute;
  top: 0;
  height: 36px;
  width: 100%;
  text-align: center;
  filter: contrast(200%);
}

.text-malfunction:before {
  left: 0;
  color: red;
  text-shadow: 1px 0 0 red;
  z-index: 30;
  animation: malfunctionAni 0.95s infinite;
}

.text-malfunction:after {
  left: -1px;
  color: cyan;
  text-shadow: -1px 0 0 cyan;
  z-index: 40;
  mix-blend-mode: lighten;
  animation: malfunctionAni 1.1s infinite 0.2s;
}

@keyframes lineMove {
  9% {
    top: 38px;
  }
  14% {
    top: 8px;
  }
  18% {
    top: 42px;
  }
  22% {
    top: 1px;
  }
  32% {
    top: 32px;
  }
  34% {
    top: 12px;
  }
  40% {
    top: 26px;
  }
  43% {
    top: 7px;
  }
  99% {
    top: 30px;
  }
}

@keyframes malfunctionAni {
  10% {
    top: -0.4px;
    left: -1.1px;
  }
  20% {
    top: 0.4px;
    left: -0.2px;
  }
  30% {
    left: .5px;
  }
  40% {
    top: -0.3px;
    left: -0.7px;
  }
  50% {
    left: 0.2px;
  }
  60% {
    top: 1.8px;
    left: -1.2px;
  }
  70% {
    top: -1px;
    left: 0.1px;
  }
  80% {
    top: -0.4px;
    left: -0.9px;
  }
  90% {
    left: 1.2px;
  }
  100% {
    left: -1.2px;
  }
}

.wrapper {
  position: absolute;
  width: 100px;
  bottom: 150px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 26px;
  z-index: 100;
}

.wrapper i {
  font-size: 60px;
  opacity: 0.5;
  cursor: pointer;
  position: absolute;
  top: 55px;
  left: 20px;
  animation: opener .5s ease-in-out alternate infinite;
  transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
}

.wrapper i:hover {
  opacity: 1;
}

@keyframes opener {
  100% {
    top: 65px
  }
}

.wave1, .wave2 {
  position: absolute;
  bottom: 0;
  transition-duration: .4s, .4s;
  z-index: 80;
}

.wave1 {
  height: 75px;
  width: 100%;
}

.wave2 {
  height: 90px;
  width: calc(100% + 100px);
  left: -100px;
}
</style>