<template >
  <material-card v-bind="$attrs" class="v-card--material-results" v-on="$listeners" offset="0">
    <v-layout align-center justify-start row fill-height>
      <v-flex mx-2>
        <div class="text-xs-left">
          <h3 class="title display-1 font-weight-bold">
            {{ value }}
            <small>{{ smallValue }}</small>
          </h3>
          <p class="category grey--text font-weight-bold" v-text="title"/>
        </div>
      </v-flex>
    </v-layout>
    <template slot="actions">
          <v-layout align-center justify-start row fill-height>
      <v-card slot="result" :class="`elevation-${elevation}`" :color="color" class="pa-1" dark>
        <v-icon size="25">{{ icon }}</v-icon>
      </v-card>
      <!-- <v-icon :color="subIconColor" size="20" class="mr-2">{{ subIcon }}</v-icon> -->
            <v-flex mx-2>
      <span :class="subTextColor" class="caption font-weight-bold" v-text="subText"/>
            </v-flex>
          </v-layout>
    </template>
  </material-card>
</template>

<script>
import Card from './Card';

export default {
	inheritAttrs: false,

	props: {
		...Card.props,
		icon: {
			type: String,
			required: true,
		},
		subIcon: {
			type: String,
			default: undefined,
		},
		subIconColor: {
			type: String,
			default: undefined,
		},
		subTextColor: {
			type: String,
			default: undefined,
		},
		subText: {
			type: String,
			default: undefined,
		},
		title: {
			type: String,
			default: undefined,
		},
		value: {
			type: String,
			default: undefined,
		},
		smallValue: {
			type: String,
			default: undefined,
		},
	},
};
</script>

<style lang="scss">
.v-card--material-results {
	display: flex;
	flex-wrap: wrap;
	position: relative;

	.v-result {
		display: inline-block;
		flex: 0 1;
		margin-top: 0;
		margin-left: 0;
		margin-right: auto;
		margin-bottom: 0 !important;
		max-width: auto;
		padding: 0 16px 0;
	}

	.v-card {
		border-radius: 4px;
		flex: 0 1 auto;
	}

	.v-card__text {
		display: inline-block;
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
	}

	.v-card__actions {
		flex: 1 0 100%;
	}
}
</style>
