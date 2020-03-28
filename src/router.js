import DashboardComponent from './components/Dashboard';
import AboutComponent from './components/About';
import TipsTrickComponent from './components/TipsTrick';

const routerModule = [
	{ path: '/', component: DashboardComponent, navBottomId: "homeBottomNav", isBackButtonShow: false},
	{ path: '/about', component: AboutComponent, navBottomId: "aboutBottomNav", isBackButtonShow: false},
	{ path: '/tips-trick', component: TipsTrickComponent, navBottomId: "tipsTrickBottomNav", isBackButtonShow: false},
]

export default routerModule;