<template>
	<div>
		<div data-testid="actor-state">
			{{ actorState.value }}
		</div>
		<button @click="actorSend({ type: 'FINISH' })"></button>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from '@vue/composition-api';
import { useActor } from '../src';
import { ActorRefFrom } from 'xstate';

export default defineComponent({
	props: {
		actor: {
			type: Object as PropType<ActorRefFrom<any>>,
		},
	},
	setup(props) {
		const { state: actorState, send: actorSend } = useActor(props.actor);

		onMounted(() => {
			actorSend({ type: 'FINISH' });
		});

		return { actorState, actorSend };
	},
});
</script>
