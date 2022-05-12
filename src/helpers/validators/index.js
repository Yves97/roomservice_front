const isEmptyOrWhiteSpace = (str) => {
    return (str.match(/^\s*$/) || []).length > 0
}

const validateEmail = (emailAdress) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailAdress.match(regexEmail)){
        return true; 
    }else{
        return false; 
    }
}

export {isEmptyOrWhiteSpace,validateEmail}
