<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ add: [name: string] }>()

const input = ref('')

function handleAdd() {
  const trimmed = input.value.trim()
  if (trimmed) {
    emit('add', trimmed)
    input.value = ''
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') handleAdd()
}
</script>

<template>
  <div class="name-input">
    <input
      v-model="input"
      type="text"
      placeholder="Enter a name…"
      @keydown="handleKeydown"
    />
    <button @click="handleAdd">Add</button>
  </div>
</template>

<style scoped>
.name-input {
  display: flex;
  gap: 8px;
  max-width: 480px;
  margin: 0 auto;
}

.name-input input {
  flex: 1;
  padding: 10px 14px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.name-input input:focus {
  border-color: var(--accent);
}

.name-input input::placeholder {
  color: var(--text-muted);
}

.name-input button {
  padding: 10px 22px;
  border: none;
  border-radius: var(--radius);
  background: var(--accent);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.name-input button:hover {
  background: var(--accent-hover);
}
</style>
