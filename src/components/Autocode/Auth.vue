<template>
  <form class="authenticate-container">
    <div class="authenticate-block">
      <div class="authenticate-block__title">Авторизация</div>
      <div class="login-form">
        <div class="action-form">
          <div class="action-form__text">Логин</div>
          <input
            class="action-form__input"
            v-model="login"
            placeholder="username"
          />
        </div>
        <div class="action-form">
          <div class="action-form__text">Пароль</div>
          <input v-model="password" class="action-form__input" />
          <div class="action-form__error" v-if="errors">
            {{ errors }}
          </div>
        </div>
        <div class="btn_wrapper">
          <router-link to='/'>
            <button type="submit" @click.prevent="checkAuth" class="btn">
              <span class="btn__text">Войти</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
/*eslint-disable*/
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Auth",
  data() {
    return {
      login: "",
      password: "",
      errors: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapGetters({
      auth: "user/AUTH",
    }),
    ...mapActions({
      SEND_AUTH: "user/SEND_AUTH",
    }),
    async checkAuth() {
      await this.SEND_AUTH({ login: this.login, password: this.password });
      this.errors.login = this.auth().login
        ? ""
        : "Вы ввели неправильное имя пользователя";
      this.errors.password = this.auth().password
        ? ""
        : "Вы ввели неверный пароль";
      console.log(this.auth());

      this.auth().login && this.auth().password
        ? localStorage.setItem("auth", true)
        : localStorage.setItem("auth", false);
      console.log(JSON.parse(localStorage.getItem("auth")));
    },
  },
};
</script>

<style lang="scss" scoped>
.authenticate-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1440px;
  height: 100vh;
  background: linear-gradient(0deg, #067eff, #067eff);
}

.authenticate-block {
  background: #ffffff;
  padding: 30px 75px 35px 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #409cff;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}

.authenticate-block__title {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 18px;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #409cff;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-form__text {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 9px;
  letter-spacing: 0.3px;
  color: #000000;
}

.action-form__error {
  display: flex;
  font-size: 12px;
  margin-top: -13px;
  color: red;
  margin-bottom: 10px;
}

.action-form__input {
  width: 307px;
  padding: 11px;
  border: 2px solid #cecece;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 28px;
  outline: none;
  &::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;
    color: #d0d0d1;
  }
}

.btn {
  outline: none;
  background: #ffd306;
  border: none;
  padding: 13px 65px 13px 65px;
  border-radius: 50px;
}

.btn_wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn__text {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.3px;
}

@media (min-width: 320px) and (max-width: 575px) {
  .action-form__input {
    box-sizing: border-box;
    width: 225px;
  }
  .authenticate-block {
    background: #ffffff;
    padding: 30px 35px 30px 35px;
  }
}
</style>
