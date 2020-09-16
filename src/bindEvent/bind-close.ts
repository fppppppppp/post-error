import { servicePath } from "../config/config";
import { getUserInfo,UserInfo } from "../userinfo/index";

function getCloseInfo(): Blob {
	const systeminfo: UserInfo = getUserInfo();
	const { uid } = systeminfo;
	const blob = new Blob([`_uu=${uid}&_t=${+new Date()}`], {type : 'application/x-www-form-urlencoded'});
	return blob;
}

let isPost = false;
function postData(){
	if(!isPost){
		let fb = getCloseInfo();
		let url = servicePath+"cl";
		navigator.sendBeacon(url, fb);
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



