require("./styles.less")
import img from './like.png'
import Vue from 'vue/dist/vue.js'

var fav=document.getElementById('favor').innerHTML;
fav=+fav;
var rangediv = document.getElementById('input_price');

if (rangediv) {
	var range_max= +rangediv.getAttribute('data-max');
var range_min= +rangediv.getAttribute('data-min');
var range_curmin= +rangediv.getAttribute('data-curmin');
var range_curmax= +rangediv.getAttribute('data-curmax');
if (!range_curmin){
	range_curmin = range_min;
}
if (!range_curmax){
	range_curmax = range_max;
}
} else {
	var range_max= 100;
	var range_min= 100;
	var range_curmin=0;
	var range_curmax=0;
}

/*Url для отправки лайка*/
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
	props: ['minx','maxx','curmin','curmax','curx','mouseupl'],
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
			shiftx: 0,
			lastnod: NaN,

		}
	},
	template: `<div id="range" class="range">
				<div class="from" id="from" @mousedown="mouseDown($event,from)" :style="leftknob"></div>
				<div id="progress" class="bar progress" :style="progbar"></div>
				<div class="bar" ></div>
				<div class="to"id="to" @mousedown="mouseDown($event,to)" :style="rightknob"></div>
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
				width:((this.max-this.min+15) + 'px'),
			}	
		},
	},
	watch: {
		mouseupl: function () {		
			if (this.pressed) {
				this.mouseUp()
			}	
		},
		curx: function()  {
			
			this.slide(this.curx);
		},
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
			if (this.lastnod){
				this.lastnod.style.border='none';
				this.lastnod.style.zIndex='8000';
			}
			this.pressed=nod;
			this.onpressed=true;
			this.start=ev.pageX;
			this.pressed.style.border="1px solid rgba(33,33,33,0.5)"
			this.pressed.style.zIndex='9999';
		},
		mouseUp: function(){
			this.lastnod=this.pressed;
			this.onpressed=false;
			this.pressed = NaN;

		},
		slide: function(ev) {
			if (window.getSelection) {
      			window.getSelection().removeAllRanges();}
			if (this.onpressed) {
				let l = (+this.pressed.style.left.slice(0,-2));
				(this.pressed==this.from) ? this.min = l: this.max=l;
				let move = l+(ev - this.start);
				if (this.pressed==this.from) {
					if (move<this.max){
						if (move>0) {
							this.curMin=move+'px';
						} else {
							this.curMin='0px';
						}
						
					}
				} else {
					if (move>this.min) {
						if (move<137){
							this.curMax=move+'px';
						}
						else {
							this.curMax='137px';
						}
						
					}	
				} 
				l = (+this.pressed.style.left.slice(0,-2));
				this.start=ev;
				let a = this.maxx *(l)/137;
				a= Math.floor(a)
				if (this.pressed==this.from){
					this.$emit('lchange',a);
				} else {
					this.$emit('rchange',a);
				}
					
			}
		}
	},
	mounted: function () {
		this.from = document.getElementById('from');
		this.to = document.getElementById('to');
		this.prog = document.getElementById('progress');
		this.range=document.getElementById('range');
		if (!this.curmin) {
			this.curmin=this.minx;
		}
		if (!this.curmax){
			this.curmax=this.maxx;
		}
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
		curx: 0,
		mup: 0,
		shown: false,
		photos: [],
		activephoto: 0,
		slides: [],
		slide: '',
		slidename: '',
		slidecolor: '',
		slidecount: 0,
		slidextention: '', 
		curslide: 0,
		fullNameSlide: '',
		styleDetails: {
			maxHeight: '112px',
		},
	},
	computed: {
		rangecurmin: function () {
			if (this.leftedge>=0){
				if (this.leftedge<this.rightedge)
				{
					return this.leftedge;
				}
				else{	
					return this.rightedge;
				}
			} else { 
				return 0;
			}
			
		},
		rangecurmax: function() {
			if (this.rightedge<=this.rangemax){
				if (this.rightedge>this.leftedge){
					return this.rightedge;
				} else {
					return this.leftedge;
				}
			} else {
				return this.rangemax;
			}
			
		},
		next: function () {
			if (this.curslide==(this.slidecount-1)) {
				return true;
			}
			else {
				return false;
			}
		},
		prev: function () {
			if (this.curslide==0) {
				return true;
			}
			else {
				return false;
			}
		}
	},
	watch: {
		leftedge: function(){
			if (this.leftedge>this.rightedge){
				this.leftedge=this.rightedge;
			}
		},
		rightedge: function(){
			if (this.rightedge<this.leftedge){
				this.rightedge=this.leftedge;
			}
		}
	},
	methods: {
		mmove: function (ev){
			this.curx=ev.pageX;
		},
		showDetail: function() {
			this.shown = this.shown? false:true;
			this.styleDetails.maxHeight = this.shown?document.getElementById('details').scrollHeight+'px' : '112px';
		},
		mouseups:function (){
			this.mup ++;
			
		},
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
		slideChange: function (i) {
			this.slides[this.curslide].isActive=false;
			this.curslide=i;
			this.slide=this.slides[i].path;
			this.slides[i].isActive=true;

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
		},
		nextSlide: function () {
			if (this.curslide<this.slidecount-1) {
				this.slides[this.curslide].isActive=false;
				this.curslide++;
				this.slide = this.slides[this.curslide].path;
				this.slides[this.curslide].isActive=true;
				console.log(this.slide)
			}
		},
		prevSlide: function () {
			if (this.curslide>0) {
				this.slides[this.curslide].isActive=false;
				this.curslide--;
				this.slides[this.curslide].isActive=true;
				this.slide = this.slides[this.curslide].path;
				console.log(this.slide)
			}
		},
		changeColor: function (i) {
			this.slides = [];
			this.photos[this.activephoto].isActive = false;
			this.activephoto = i;
			this.photos[i].isActive = true;
			let path = this.photos[i].path.split('/');
			this.slidextention = path[path.length-1].split('.')[1];
			let fullname = path[path.length-1].split('.')[0];
			fullname = fullname.split('_');
			console.log(path.join('/'));
			path = path.slice(0,-1);
			let pathslide = path.join('/')
			this.slidecolor = fullname[0];
			this.slidename = fullname[1];
			this.slidecount = + fullname[2];
			for (i=0;i<this.slidecount;i++) {
				let npath = this.slidecolor+'_'+this.slidename+(i+1)+'.'+this.slidextention;
				let mpath =	this.slidecolor+'_'+this.slidename+(i+1)+'_mini'+'.'+this.slidextention; 
				
				
				this.slides.push({
					path: pathslide+'/'+npath,
					path_mini: pathslide+'/'+mpath,
					isActive: i==0,
				})
			}
			this.slide = this.slides[0].path
			this.curslide = 0;
		}
 	},
 	created: function () {
 		this.url=window.location.toString().split('=');
 		if (this.url.length>=1) {
 			let a = this.url[0].split('?');
 			this.url= a.concat(this.url.slice(1));
 		}
 		let phot =document.getElementsByClassName('tcolor');
 		if (phot){
 			for (let i=1; i<phot.length; i++){
 				let src = phot[i].children[0].getAttribute('src');
 				let active = (i==1)
 				this.photos.push({
 					path : src,
 					isActive: active,
 				})
 			}
 			this.changeColor(0);
 		}
 		
 	}
})

