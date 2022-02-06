import {
	SAVE_CLIENT_SIZE,
} from "./mutations-types";

export default {
	[SAVE_CLIENT_SIZE](state, clientSize) {
		state.clientSize = clientSize
	},
}
