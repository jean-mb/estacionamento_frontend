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
    component: () => import(/* webpackChunkName: "about" */ '../views/veiculo/VeiculosView.vue')
  },
  {
    path: '/veiculo',
    name: 'veiculo.listar',
    component: () => import(/* webpackChunkName: "about" */ '../views/veiculo/VeiculoInfoView.vue')
  },
  {
    path: '/veiculo/formulario',
    name: 'veiculo.form',
    component: () => import(/* webpackChunkName: "about" */ '../views/veiculo/VeiculosFormView.vue'),
    children: [
      {
        path: '/veiculo/formulario',
        name: 'veiculo.form.editar',
        component: () => import(/* webpackChunkName: "about" */ '../views/veiculo/VeiculosFormView.vue'),
      },
      {
        path: '/veiculo/formulario',
        name: 'veiculo.form.listar',
        component: () => import(/* webpackChunkName: "about" */ '../views/veiculo/VeiculosFormView.vue'),
      },
      {
        path: '/veiculo/formulario',
        name: 'veiculo.form.toggle',
        component: () => import(/* webpackChunkName: "about" */ '../views/veiculo/VeiculosFormView.vue'),
      }
    ]
  },
  {
    path: '/condutores',
    name: 'condutores',
    component: () => import(/* webpackChunkName: "about" */ '../views/condutor/CondutoresView.vue')
  },
  {
    path: '/condutor/formulario',
    name: 'condutor.form',
    component: () => import(/* webpackChunkName: "about" */ '../views/condutor/CondutoresFormView.vue'),
    children: [
    {
      path: '/condutor/formulario',
      name: 'condutor.form.editar',
      component: () => import(/* webpackChunkName: "about" */ '../views/condutor/CondutoresFormView.vue'),
    },
    {
      path: '/condutor/formulario',
      name: 'condutor.form.listar',
      component: () => import(/* webpackChunkName: "about" */ '../views/condutor/CondutoresFormView.vue'),
    },
    {
      path: '/condutor/formulario',
      name: 'condutor.form.toggle',
      component: () => import(/* webpackChunkName: "about" */ '../views/condutor/CondutoresFormView.vue'),
    }]
  },
  {
    path: '/marcas',
    name: 'marcas',
    component: () => import(/* webpackChunkName: "about" */ '../views/marca/MarcasView.vue')
  },
  {
    path: '/marca/listar',
    name: 'marca.listar',
    component: () => import(/* webpackChunkName: "about" */ '../views/marca/MarcaInfoView.vue')
  },
  {
    path: '/marca/formulario',
    name: 'marca.form',
    component: () => import(/* webpackChunkName: "about" */ '../views/marca/MarcasFormView.vue'),
    children: [
      {
        path: '/marca/formulario',
        name: 'marca.form.editar',
        component: () => import(/* webpackChunkName: "about" */ '../views/marca/MarcasFormView.vue')
      },
      {
        path: '/marca/formulario',
        name: 'marca.form.toggle',
        component: () => import(/* webpackChunkName: "about" */ '../views/marca/MarcasFormView.vue')
      }
    ]
  },
  {
    path: '/modelos',
    name: 'modelos',
    component: () => import(/* webpackChunkName: "about" */ '../views/modelo/ModelosView.vue')
  },
  {
    path: '/modelo/listar',
    name: 'modelo.listar',
    component: () => import(/* webpackChunkName: "about" */ '../views/modelo/ModeloInfoView.vue')
  },
  {
    path: '/modelo/formulario',
    name: 'modelo.form',
    component: () => import(/* webpackChunkName: "about" */ '../views/modelo/ModelosFormView.vue'),
    children: [
      {
        path: '/modelo/formulario',
        name: 'modelo.form.editar',
        component: () => import(/* webpackChunkName: "about" */ '../views/modelo/ModelosFormView.vue')
      },
      {
        path: '/modelo/formulario',
        name: 'modelo.form.listar',
        component: () => import(/* webpackChunkName: "about" */ '../views/modelo/ModelosFormView.vue')
      },
      {
        path: '/modelo/formulario',
        name: 'modelo.form.toggle',
        component: () => import(/* webpackChunkName: "about" */ '../views/modelo/ModelosFormView.vue')
      }
    ]
  },
  {
    path: '/movimentacoes',
    name: 'movimentacoes',
    component: () => import(/* webpackChunkName: "about" */ '../views/movimentacao/MovimentacoesView.vue')
  },
  {
    path: '/movimentacao/listar',
    name: 'movimentacao.listar',
    component: () => import(/* webpackChunkName: "about" */ '../views/movimentacao/MovimentacaoInfoView.vue')
  },
  {
    path: '/movimentacao/formulario',
    name: 'movimentacao.form',
    component: () => import(/* webpackChunkName: "about" */ '../views/movimentacao/MovimentacoesFormView.vue'),
    children: [
      {
        path: '/movimentacao/formulario',
        name: 'movimentacao.form.editar',
        component: () => import(/* webpackChunkName: "about" */ '../views/movimentacao/MovimentacoesFormView.vue')
      },
      {
        path: '/movimentacao/formulario',
        name: 'movimentacao.form.confirmar',
        component: () => import(/* webpackChunkName: "about" */ '../views/movimentacao/MovimentacoesFormView.vue')
      },
      {
        path: '/movimentacao/formulario',
        name: 'movimentacao.form.toggle',
        component: () => import(/* webpackChunkName: "about" */ '../views/movimentacao/MovimentacoesFormView.vue')
      }
    ]
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
