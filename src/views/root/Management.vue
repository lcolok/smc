<template>
	<v-container fluid grid-list-xl fill-height>
		<v-layout wrap align-space-around justify-center column fill-height>
			<v-flex mt-2>
				<h2 class="title font-weight-light">
					{{ $t('Invitation code generator') }}
				</h2>
				<base-code-generator xs12 />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {};
</script>
