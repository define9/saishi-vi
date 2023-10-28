import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      identifyCode: '',
      integral: 0,
      username: '',
      nick: '',
      email: '',
      login: false,
    }
  },
  actions: {
    updateIdentifyCode(code) {
      this.identifyCode = code
    },
    updateAll(data) {
      this.identifyCode = data.identifyCode
      this.integral = data.integral
      this.username = data.username
      this.nick = data.nick
      this.email = data.email
      this.login = data.login
    },
    logout() {
      this.identifyCode = ""
      this.integral = 0
      this.username = ""
      this.nick = ""
      this.email = ""
      this.login = false

      localStorage.removeItem("user")
    },
  },
  persist: {
    key: "user",
    storage: sessionStorage,
    afterRestore: (ctx) => {
      var local = localStorage.getItem(ctx.store.$id)
      console.log(ctx);
      if (!local && ctx.store.login) {
        localStorage.setItem(ctx.store.$id, JSON.stringify(ctx.store))
      }
      if (local && !ctx.store.login) {
        let data = JSON.parse(local)
        data.login = true
        ctx.store.updateAll(data)
      }
    },
  },
})
