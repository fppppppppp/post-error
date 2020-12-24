import { servicePath } from "../config/config";
import { getUserInfo,UserInfo } from "../userinfo/index";
import { xhm } from "../service/xhm";



let isPost = false;
function postData(){
	if(!isPost){
		xhm({},'ex');
		isPost = true;
	}
}

export function bindBeforeunload() {
	window.addEventListener('beforeunload', (event) => {
		postData();
		// Chrome requires returnValue to be set.
	});
	window.addEventListener("unload",(event)=>{
		postData();
	})

}



