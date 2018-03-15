import dataCrypt from '@/dataCrypt/dataCrypt.js'
import localforage from '@/localforage/localforage'

export default {
  saveUserData(state,data) {
    state.user_data = data
  },
  saveStudentData(state,data) {
    state.student_data = data
  },
  saveBindingId(state,data) {
    state.is_banding_student = data
  },
  saveApplyInfo(state,data) {
    state.applyInfo = data
  },
  setCurrentExamId(state, data) {
    state.exam_id = data
  },
  currentExamName(state, data) {
    state.exam_name = data
  },
  clearStoreAndLocal(state, data) {
    state.exam_name = null;
    state.exam_id = null;
    state.applyInfo = null;
    state.is_banding_student = null;
    state.student_data = null;
    state.user_data = null;
    localforage.clear()
  }
}