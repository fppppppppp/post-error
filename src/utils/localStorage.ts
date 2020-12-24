export const getLocalStorage = function (key: string): string | null{
  if(!key){
    throw new Error("please input LocalStorage key");
  }
  return localStorage.getItem(key) || null;
}


export const setLocalStorage = function (key: string, value :string): void{
  localStorage.setItem(key,value);
}

export const removeLocalStorage = function(key: string): void{
  localStorage.removeItem(key);
}

export const clearLocalStorage = function(): void{
  localStorage.clear();
}