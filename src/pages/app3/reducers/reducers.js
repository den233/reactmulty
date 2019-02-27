const initialState={
    count:0
}
const reducer=(state=initialState,action)=>{
    switch (action.type){
        case 'INCREASE':
        return{
            count:state.count+action.count1
        }
        case 'DECREASE':
        return {
            count:state.count-action.count2
        }
        default:
        return initialState;
    }
}
export default reducer