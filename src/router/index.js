import Vue from 'vue'
import Router from 'vue-router'
import AreaSelect from '../components/areaSelect'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AreaSelect',
      component: AreaSelect
    }
  ]
})
