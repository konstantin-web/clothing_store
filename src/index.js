require("./styles.less")
import img from './like.png'
import Vue from 'vue/dist/vue.js'

Vue.component('login-window',{
	data: function () {
		return {
			title: "Авторизация",
			action: "login",
			newpass: "",
			repeatpass: "",
		}
	},
	template: `<div class="login"><div class="login-window">
				<img src="images/close.png" class="close" @click="$emit('cancelwindow')">
				<h3 style="margin-bottom: 16px;">{{title}}</h3>
				<form method='post' v-show="action=='login'" >
					<label class="m_right0">Введите логин или email</label>
					<input type="text" placeholder="Введите логин" required>
					<input type="password" placeholder="Введите пароль" required>
					<input type="submit" value="Войти">
					<p>или</p>
					<div class="icongroup">
						<img src="images/facebookblack.png">
						<img src="images/vkblack.png">
						<img src="images/googleplusblack.png" class="m_right0">
					</div>
					<a href="#" @click="changeForm('restore')">Забыли пароль?</a>
					<a href="#" @click="changeForm('register')">Зарегистрироваться</a>
				</form>
				<form method='post' v-show="action=='register'" style="padding-top: 24px">
					<input type="email" placeholder="Введите emeil" required>
					<input type="password" placeholder="Придумайте пароль" required>
					<input type="password" placeholder="Повторите пароль" required>
					<input type="submit" value="Регистрация" style="margin-bottom: 42px;">
					
					<p style="margin-top: auto;"> Уже зарегистрированы? 
					<a href="#" @click="changeForm('login')">Войти</a></p>
				</form>
				<form method='post' v-show="action=='restore'" style="padding-top: 24px">
					<input type="email" placeholder="Введите emeil" required>
					<input type="submit" value="Восстановить" style="margin-bottom: 42px;">
					
					<p style="margin-top: auto;"> Уже зарегистрированы? 
					<a href="#" @click="changeForm('login')">Войти</a></p>
				</form>
				</div>
		
			  <div class="shadowbox"></div>
			  </div>`,
	methods: {
		changeForm: function (act) {
			switch (act) {
				case 'login': this.title = "Авторизация";
						break;
				case 'register': this.title = "Регистрация";
						break;
				case 'restore': this.title = "Восстановление пароля";
						break;
			}
			this.action = act;
		},
	}
})
var catalog = new Vue({
	el: '#body',
	data: {
		showlogin: false,
	},
	methods: {
		cancelWindow: function () {
			this.showlogin=false;
		}
	}
})