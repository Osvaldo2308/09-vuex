/* export const myGetter = async (state)=>{
    return state
} */

export const currentState = (state)=>{
    return state.status
}

export const username = (state)=>{
    return state.user?.name || ''
}