import {
  SAVE_CLIENT_SIZE,
} from "./mutations-types";
import { StateType } from "./state";

export default {
  [SAVE_CLIENT_SIZE](state: StateType, clientSize: { clientHeight: number, clientWidth: number }) {
    state.clientSize = clientSize
  },
}
