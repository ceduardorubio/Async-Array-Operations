export const LoopOver = (array:any[],fn:FnWithCallback,cbDone :(err:any, result:any[]) => void,results:any[] = []) =>{
    if(array.length == 0){
        cbDone(null,results);
    } else{
        fn(array.shift(),(err,result)=>{
            if(err){
                cbDone(err,results);
            } else {
                results.push(result);
                LoopOver(array,fn,cbDone,results);
            }
        }); 
    }     
}


export const DoOneAfterOther = (prevItem:any,fnArray:FnWithCallback[],cbDone:Callback) =>{
    if(fnArray.length == 0){
        cbDone(null,prevItem);
    } else {
        let currentFunction = fnArray.shift() ;
        if(currentFunction){
            currentFunction(prevItem,(err,newPrevItem)=>{
                if(err){
                    cbDone(err,prevItem);
                } else {
                    DoOneAfterOther(newPrevItem,fnArray,cbDone);
                }
            });
        } else {
            DoOneAfterOther(prevItem,fnArray,cbDone);
        }
    }
}

export type Callback = (err:any,result:any)=>void
export type FnWithCallback  = (input:any, cb:Callback)=>void 
