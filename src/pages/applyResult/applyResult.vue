<template>
  <div>
    
  </div>
</template>

<script>
import { getStudentApply } from '@/api/apis.js'
export default {
  data () {
    return {
      applyDetails: null
    }
  },
  created() {
    if (this.exam_subject_id && this.student_id) {
      const data = {
        student_id: this.student_id,
        exam_subject_id: this.exam_subject_id
      }
      getStudentApply(data).then(res => {
          if (res.data.error_code != 0) {
            MessageBox('提示', res.data.message)
            return
          }
          console.log(res.data.data)
          this.applyDetails = res.data.data
        })
        .catch(err => console.log(err))
    }
  },
  computed: {
    exam_subject_id() {
      return this.$route.params.exam_subject_id
    },
    student_id() {
      return this.$route.params.student_id
    }
  }
}
</script>

<style>

</style>
