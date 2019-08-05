<template>
	<v-card>
		<v-card-title class="headline">{{
			$t('Confirm to delete this item?')
		}}</v-card-title>
		<v-card-text>{{
			$t('This operation is irreversible, please be cautious')
		}}</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn class="subtitle-2" color="red" @click="del()">{{
				$t('Confirm')
			}}</v-btn>
			<v-btn class="subtitle-2" color="primary" @click="dialogModel = false">{{
				$t('Cancel')
			}}</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
import { mapState } from 'vuex';
import AV from 'leancloud-storage';

export default {
	computed: {
		dialogModel: {
			get: function() {
				return this.$store.state.dialog.dialogModel;
			},
			set: function(newValue) {
				this.$store.state.dialog.dialogModel = newValue;
			},
		},
		...mapState('dialog', ['deleteID', 'deleteClass']),
	},
	methods: {
		del() {
			let deleteObj = AV.Object.createWithoutData(
				this.deleteClass,
				this.deleteID,
			);
			console.log(deleteObj);
			deleteObj.destroy().then(() => {
				this.dialogModel = false;
			});
		},
	},
};
</script>
