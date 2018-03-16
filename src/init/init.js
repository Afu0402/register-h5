import store from "@/store/index";
import localforage from "@/localforage/localforage";
import { getStudentDetail } from "@/api/apis"
export default  function() {
  localforage.getItem("isLogin", (err, value) => {
    if (!err && value) {
      store.commit("isLogin", true);
    } else {
      store.commit("isLogin", false);
			console.log(err)
		}
  });
  localforage.getItem("user_id", (err, value) => {
    if (!err && value) {
      store.commit("saveUserId", value);
    } else {
			console.log(err)
		}
  });
  localforage.getItem("student_id", async (err, value) => {
    if (!err && value) {
			store.commit("saveStudentId", value);
      let  res = await getStudentDetail({student_id: value}).catch(err => console.log(err));
      if (res.data.error_code == 0) {
			  store.commit("saveStudentData", res.data.data);
      } else {
			  console.log(res.data.message)
      }
    }
  });
}
