import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import MenuView from '@/components/views/MenuView.vue'
import TetrisView from '@/components/views/TetrisView.vue'
import SnakeView from '@/components/views/SnakeView.vue';
import WolfView from '@/components/views/WolfView.vue';


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
  {
    path: '/snake',
    name: 'Snake',
    component: SnakeView,
  },
  {
    path: '/wolf',
    name: 'Wolf',
    component: WolfView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;