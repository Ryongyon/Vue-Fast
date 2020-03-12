<template>
    <div class="container" :style="{ backgroundColor: backgroundColor, color: color }">
        <div v-if="isOverlay" class="overlay"></div>
        <div class="content" :style="{ maxWidth: maxWidth, maxHeight: maxHeight }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'centeredLayout',
  props: {
      isOverlay: {
          type: Boolean,
          default: false
      },
      backgroundColor: {
          type: String,
          default: '#ffffff'
      },
      color: {
          type: String,
          default: '#303133'
      },
      maxWidth: {
          type: String,
          default: '600px'
      },
      maxHeight: {
          type: String,
          default: '75vh'
      }
  }
}
</script>

<style scoped lang="scss">
.container {
    position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
    left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
.overlay {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0,0,0,.25);
}
.content {
    z-index: 100;
    display: flex;
    padding: 0 20px;
	width: 100%;
	flex-direction: column;
    text-align: center;
}
</style>
