require("./styles.less")
import img from './like.png'
import Vue from 'vue/dist/vue.js'

var fav=document.getElementById('favor').innerHTML;
fav=+fav;
var rangediv = document.getElementById('input_price');
var range_max= +rangediv.getAttribute('data-max');
var range_min= +rangediv.getAttribute('data-min');
var range_curmin= +rangediv.getAttribute('data-curmin');
var range_curmax= +rangediv.getAttribute('data-curmax');
var url_to_like ='http://site.ru/like'
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

Vue.component('range-slide', {
	props: ['minx','maxx','curmin','curmax'],
	data: function () {
		return {
			pressed: NaN,
			onpressed: false,
			start: 0,
			from: NaN,
			to: NaN,
			min: 0,
			max: 147,
			prog: NaN,
			left: 0,
			range: NaN,
			curMin: this.curmin,
			curMax: this.curmax,

		}
	},
	template: `<div id="range" class="range" @mousemove="slide($event)" @mouseout="mousout">
				<div class="from" id="from" @mousedown="mouseDown($event,from)" @mouseup="mouseUp($event)"  :style="leftknob"></div>
				<div id="progress" class="bar progress" :style="progbar"></div>
				<div class="bar" ></div>
				<div class="to"id="to" @mousedown="mouseDown($event,to)" @mouseup="mouseUp($event)" :style="rightknob"></div>
	</div>`,
	computed: {
		leftknob: function () {
			
			return {
				left: this.curMin,
			}
		},
		rightknob: function () {
			return {
				left: this.curMax,
			}
		},
		progbar: function () {
			return {
				left: this.curMin,
				width:((this.max-this.min) + 'px'),
			}	
		},
	},
	watch: {
		curmin: function () {
			let a = Math.round((this.curmin/this.maxx)*100);
			this.from.style.left =Math.round(137*a/100)+'px';
			this.prog.style.left= Math.round(137*a/100)+'px';
			this.min=Math.round(137*a/100);
		},
		curmax: function () {
			let a = Math.round((this.curmax/this.maxx)*100);
			this.to.style.left =Math.round(137*a/100)+'px';
			this.max=Math.round(137*a/100);
			this.prog.style.width = (this.max-this.min)+'px';
		},
	},
	methods: {
		mouseDown: function (ev, nod) {
			this.pressed=nod;
			this.onpressed=true;
			this.start=ev.pageX;
		},
		mouseUp: function(ev){
			this.onpressed=false;
			this.pressed = NaN;
		},
		mousout: function (){
			this.onpressed=false;
			this.pressed = NaN;	 
		},
		slide: function(ev) {
			if (window.getSelection) {
      			window.getSelection().removeAllRanges();}
			if (this.onpressed) {
				let l = (+this.pressed.style.left.slice(0,-2));
				(this.pressed==this.from) ? this.min = l: this.max=l;
				let move = l+(ev.pageX - this.start);
				if (move>=0&&move<=137)
				{
					if (this.pressed==this.from) {
					this.curMin=(l+(ev.pageX - this.start))+'px';
				} else {
					this.curMax=(l+(ev.pageX - this.start))+'px';
				} 
				this.start=ev.pageX;
				let a = this.maxx * Math.round((l)/137*100)/100;
				if (this.pressed==this.from){
					this.$emit('lchange',a);
				} else {
					this.$emit('rchange',a);
				}
				}	
			}
		}
	},
	mounted: function () {
		this.from = document.getElementById('from');
		this.to = document.getElementById('to');
		this.prog = document.getElementById('progress');
		this.range=document.getElementById('range');
		if (this.curmin) {
			
			let a = Math.round((this.curmin/this.maxx)*100);
			this.from.style.left = Math.round(137*a/100)+'px';
			this.prog.style.left = Math.round(137*a/100)+'px';
			this.min=Math.round(137*a/100);
		}
		else {
			this.from.style.left = getComputedStyle(this.from).left;
		}
		if (this.curmax) {
			let a = Math.round((this.curmax/this.maxx)*100);
			this.to.style.left = Math.round(137*a/100)+'px';
			this.max=Math.round(137*a/100);
		} else {
			this.to.style.left = getComputedStyle(this.to).left;
		}
		this.prog.style.width = (this.max-this.min)+'px';
		this.left=this.range.getBoundingClientRect().x;

	}
})

var catalog = new Vue({
	el: '#body',
	data:  {
		showlogin: false,
		leftedge: range_curmin,
		rightedge: range_curmax,
		favor: fav,
		rangemin: range_min,
		rangemax: range_max,
		favors:[],
		url: '',
	},
	computed: {
		rangecurmin: function () {
			if (this.leftedge>0){
				if (this.leftedge<this.rightedge)
				{
					return this.leftedge;
				}
				else{
					this.leftedge=this.rightedge-5;
					return this.leftedge;
				}

			} else {
				return 0;
			}
			
		},
		rangecurmax: function() {
			return this.rightedge;
		}
	},
	methods: {
		like: function (ev,id) {
			console.log(ev);
			console.log(this.favor)
			if (ev.target.className == 'like liked') {
				this.favor--;
				ev.target.classList.remove('liked')
			}
			else {
			if (this.favor) {
				this.favor= this.favor+1;
			} else {
				this.favor= 1;
			}
			ev.target.classList.add('liked')
		}
		let xmr = new XMLHttpRequest();
		xmr.open('get',url_to_like+id,true);
		xmr.send();
		ev= NaN;
		},
		cancelWindow: function () {
			this.showlogin=false;
		},
		slideChange: function () {
		
		},
		rightCh: function(a) {
			this.rightedge = a;
		},
		leftCh: function(a) {
			this.leftedge = a;
		},
		createUrl: function () {
			let start= this.url[0]+'?';
			let end= this.url.slice(1).join('=')
			return start+end;
		},
		addUrl: function (prop,param) {
			if (!(prop in this.url)) {
				console.log(prop);
				this.url[this.url.indexOf(prop)+1] = param;
			} else {
				if (prop=='page'){
					this.url.push(prop);
					this.url.push(param);	
				} else {
					this.url.splice(1,0,prop);
					this.url.splice(2,0,param);
				}
				
			}
		},
		page: function (page) {
			this.addUrl('page',page);
			window.location=this.createUrl();
		}
 	},
 	created: function () {
 		this.url=window.location.toString().split('=');
 		if (this.url.length>=1) {
 			let a = this.url[0].split('?');
 			this.url= a.concat(this.url.slice(1));
 		}
 		console.log(this.url);
 	}
})

