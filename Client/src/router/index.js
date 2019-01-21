import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Groups from '@/components/groups'
import Profile from '@/components/profile'
import Sessions from '@/components/sessions'
import Notes from '@/components/notes'
import About from '@/components/about'
import Students from '@/components/students'
import Projects from '@/components/projects'
import Docs from '@/components/docs'
import Upload from '@/components/upload'
import Login from '@/components/login'
import Logout from '@/components/logout'
import notFound from '@/components/not-found'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/groups', name: 'Groups', component: Groups},
    {path: '/profile', name: 'Profile', component: Profile},
    {path: '/sessions', name: 'Sessions', component: Sessions},
    {path: '/notes', name: 'Notes', component: Notes},
    {path: '/about', name: 'About', component: About},
    {path: '/login', name: 'Login', component: Login},
    {path: '/logout', name: 'Logout', component: Logout},
    {path: '/students', name: 'Students', component: Students},
    {path: '/docs', name: 'Docs', component: Docs},
    {path: '/upload', name: 'Upload', component: Upload},
    {path: '/projects', name: 'Projects', component: Projects},
    {path: '*', name: 'notFound', component: notFound}
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition)
      return savedPosition;
    else
      return { x: 0, y: 0 };
  }
});
