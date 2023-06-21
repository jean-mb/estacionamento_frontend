import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/veiculos',
    name: 'veiculos',
    component: () => import(/* webpackChunkName: "about" */ '../views/VeiculosView.vue')
  },
  {
    path: '/condutores',
    name: 'condutores',
    component: () => import(/* webpackChunkName: "about" */ '../views/CondutoresView.vue')
  },
  {
    path: '/marcas',
    name: 'marcas',
    component: () => import(/* webpackChunkName: "about" */ '../views/MarcasView.vue')
  },
  {
    path: '/marca/formulario',
    name: 'marca.form',
    component: () => import(/* webpackChunkName: "about" */ '../views//MarcasView.vue'),
    children: [
      {
        path: '/marca/formulario',
        name: 'marca.form.editar',
        component: () => import(/* webpackChunkName: "about" */ '../views/MarcasView.vue')
      },
      {
        path: '/marca/formulario',
        name: 'marca.form.desativar',
        component: () => import(/* webpackChunkName: "about" */ '../views/MarcasView.vue')
      }
    ]
  },
  {
    path: '/modelos',
    name: 'modelos',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModelosView.vue')
  },
  {
    path: '/movimentacoes',
    name: 'movimentacoes',
    component: () => import(/* webpackChunkName: "about" */ '../views/MovimentacoesView.vue')
  },
  {
    path: '/configs',
    name: 'configuracoes',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfigsView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
