import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import 'lib-flexible/flexible'
import {
  Button,
  Dialog,
  Tabbar,
  TabbarItem,
  Search,
  Icon,
  Image as VanImage,
  NavBar,
  Tab,
  Tabs,
  IndexBar,
  IndexAnchor,
  Swipe,
  SwipeItem,
  ImagePreview,
  Cell,
  NoticeBar,
  TreeSelect,
  Rate,
  List,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
  Tag,
  CellGroup,
  Toast,
  Form,
  Field,
  Popup,
  ActionSheet,


} from 'vant';

Vue.use(Button)
  .use(Dialog)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Icon)
  .use(VanImage)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(Cell)
  .use(NoticeBar)
  .use(TreeSelect)
  .use(Rate)
  .use(List)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(RadioGroup)
  .use(Radio)
  .use(Tag)
  .use(CellGroup)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(ActionSheet)
  .use(Toast)
  .use(ImagePreview);
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'https://apis.netstart.cn/maoyan'




axios.interceptors.request.use(config => {
  // console.log('发起请求之前执行')
  const whileList = ['/hot', '/comming', ];
  if (!whileList.includes(config.url)) {
    Toast.loading({
      message: '加载中···',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
  }

  return config;
}, err => {
  console.log(err)

  Toast.clear();
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  Toast.clear();
  return res;
}, err => {
  console.log('err=>', err)
  Toast.clear()
  return Project.reject(err);
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')