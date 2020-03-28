import routerModule from '../router';
import { UniversalFunction, UniversalVariable } from './helpers';

let functionOfComponents = null;
let rootId = '';

export const initialRender = (id) => {
    rootId = id;

    global.routerLink = routerLink;
    global.UniversalFunction = UniversalFunction;
    global.UniversalVariable = UniversalVariable;
    global.getById = getById;

    routerLink(window.location.pathname, { replace: true });
}

export const routerLink = (currentUrl, params = {}) => {
    if(functionOfComponents !== null) {
        for(let func of functionOfComponents) {
            delete window[func];
        }
    }

    window.onscroll = null;
    params.replace = params.replace || false;
    params.toast = params.toast || null;

	for(let x of routerModule) {
		let xPathSplit = x.path.split('/').filter(x => x != '');
		let xUrlSplit = currentUrl.split('/').filter(x => x != '');

		let pathToCompare = x.path.split('/').filter(x => x != '' && !x.includes(':'));
		let urlToCompare = [];
		pathToCompare.map((x, i) => xUrlSplit.indexOf(x)).forEach((x, i) => urlToCompare.push(xUrlSplit[x]))
		if(xPathSplit.length == xUrlSplit.length) {
			if(pathToCompare.join('') == urlToCompare.join('')) {
				let getKeyParamInRouterModule = x.path.split('/').filter(x => x.includes(':'));
				let indexParams = getKeyParamInRouterModule.map(x => xPathSplit.indexOf(x));
				let getValueParamInUrl = [];
				indexParams.forEach((x, i) => getValueParamInUrl.push(xUrlSplit[x]))
				let finalParams = {}
                getValueParamInUrl.forEach((x, i) => finalParams[getKeyParamInRouterModule[i].split(':')[1]] = x)

				if(!params.replace) window.history.pushState(finalParams, "title", currentUrl);
				else window.history.replaceState(finalParams, "title", currentUrl);

                x = routerModule.filter(y => y.path == currentUrl)[0];
				showButtonBack(x.showBackButton);
                execComponent(x.component)
                window.scrollTo(0,0);

                removeActiveBottomNavBar();
                getById(x.navBottomId).style.color = "#9698ff"

                if(params.toast != null) UniversalFunction.showToast(params.toast);

                // UniversalVariable.historyUrl = currentUrl;
				return;
			}
		}
	}
	console.log('404');
}

function removeActiveBottomNavBar() {
    const elOfElement = ["homeBottomNav", "tipsTrickBottomNav", "aboutBottomNav"]
    for(let x of elOfElement) {
        getById(x).style.color = "#fff";
    }
}

function getById(x) {
    return document.getElementById(x);
}

function execComponent(component) {
    if(component.template == undefined) {
        throw "Template is not defined.";
    }
    functionOfComponents = Object.keys(component);

    for(let func of Object.keys(component)) {
        global[func] = component[func]
    }

    $('#' + rootId).animate({
        'margin-top': '30px',
        'opacity' : 0,
    }, 0, function(){
        $(this).html(template).animate({'opacity': 1, 'margin-top': '10'}, 600);
    });

    if(component.init != undefined) {
        if(typeof component.init != "function") {
            throw "Init must be a function"
        }
        component.init();
    }
}

function showButtonBack(x) {
    // if(x) {
    //     document.getElementById('button-back').style.display = 'block';
    //     document.getElementById('button-menu').style.display = 'none';
    //     return;
    // }

    // document.getElementById('button-menu').style.display = 'block';
    // document.getElementById('button-back').style.display = 'none';
}