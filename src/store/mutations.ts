import {
  SAVE_CLIENT_SIZE, SAVE_INTRODUCTION,
} from "./mutations-types";
import { StateType } from "./state";

export default {
  [SAVE_CLIENT_SIZE](state: StateType, clientSize: any) {
    state.clientSize = clientSize
  },
  [SAVE_INTRODUCTION](state: StateType, introduction: any) {
    state.introduction = introduction
  },
}
