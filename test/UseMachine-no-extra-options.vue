<template>
	<button @click="send('TOGGLE')">
		{{ state.value === 'inactive' ? 'Turn on' : 'Turn off' }}
	</button>
</template>

<script lang="ts">
import { useMachine } from '../src';
import { Machine } from 'xstate';
import { defineComponent } from '@vue/composition-api';

const toggleMachine = Machine({
	id: 'toggle',
	initial: 'inactive',
	states: {
		inactive: {
			on: { TOGGLE: 'active' },
		},
		active: {
			on: { TOGGLE: 'inactive' },
		},
	},
});

export default defineComponent({
	setup() {
		const { state, send } = useMachine(toggleMachine);
		return { state, send };
	},
});
</script>
