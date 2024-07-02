import { useToast } from 'vue-toast-notification'
const toast = useToast()
export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast,
    },
  }
})
