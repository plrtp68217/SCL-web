import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import MenuView from '@/components/views/MenuView.vue'
import TetrisView from '@/components/views/TetrisView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: MenuView,
  },
  {
    path: '/tetris',
    name: 'Tetris',
    component: TetrisView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;