import dataCrypt from '@/dataCrypt/dataCrypt.js'
import localforage from '@/localforage/localforage'

export default {
  saveExam(state,data) {
    state.exam_name = data
  },
  isLogin(state,data) {
    state.islogin = data
  },
  saveStudentId(state,data) {
    state.student_id = data
  },
  setCurrentExamSubjectId(state, data) {
    state.exam_subject_id = data
  },
  setCurrentExamSubjectName(state,data) {
    state.exam_name = data
  },
  saveStudentData (state, data) {
    state.student_data = data
  },
  saveUserId(state, data) {
    state.user_id = data
  },
  clearStoreAndLocal(state, data) {
    state.student_id = null;
    state.islogin = false;
    state.student_data = null;
    localforage.clear()
  }
}