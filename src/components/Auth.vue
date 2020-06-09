<template>
  <form class="authenticate">
    <div class="authenticate__title">Авторизация</div>
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
        {{ errors.login }}
      </div>
      <div class="action-form__error" v-if="errors">
        {{ errors.password }}
      </div>
    </div>
    <div class="authenticate__btn">
      <router-link to="/">
        <button type="submit" @click.prevent="checkAuth" class="btn">
          <span class="btn__text">Войти</span>
        </button>
      </router-link>
    </div>
  </form>
</template>

<script>
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

      if (!this.auth().login || !this.auth().password) {
        return;
      }

      localStorage.setItem("auth", true);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
$orange: #f2b61a;

.authenticate {
  padding: 30px 75px 35px 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(10, 0, 0, 0.25);
  border-radius: 8px;

  &__title {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 18px;
    line-height: 30px;
    letter-spacing: 0.3px;
    color: #409cff;
  }

  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
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
  color: white;
  background: $orange;
  border: none;
  padding: 13px 65px 13px 65px;
  border-radius: 50px;

  &:hover,
  &:active {
    cursor: pointer;
    background: darken($color: $orange, $amount: 6);
  }
}

.btn__text {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.3px;
}
</style>
