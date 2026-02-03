<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const emit = defineEmits<{ remove: [name: string] }>()
</script>

<template>
  <div class="name-card">
    <div class="card-header">
      <span class="card-name">{{ props.name }}</span>
      <button class="remove-btn" @click="emit('remove', props.name)" aria-label="Remove">&times;</button>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.name-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.15s;
}

.name-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px 8px;
}

.card-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.remove-btn {
  background: none;
  border: none;
  color: var(--remove-btn);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: var(--remove-btn-hover);
}

.card-body {
  padding: 0 14px 14px;
}
</style>
