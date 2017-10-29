import Vue from 'vue'
import Router from 'vue-router'
import ArtPane from '@/components/ArtPane'
import ContentPane from '@/components/ContentPane'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArtPane',
      component: ArtPane
    },
    {
      path:'/read/:id',
      name:'ContentPane',
      component: ContentPane
    }
  ]
})
