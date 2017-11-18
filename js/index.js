var $=function(el){
    if(typeof el==='string'){
        return {
            on(action,fcn){
                Array.from(document.querySelectorAll(el)).forEach(item in this ){item.addEventListener(`on{$action}`,fcn())}
            }
        }
    }
}
