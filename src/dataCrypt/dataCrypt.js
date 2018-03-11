import myCrypt from '@/dataCrypt/myCrypt.js'


function dataEncrypt(oDataStr){
    return myCrypt.encrypt(JSON.stringify(oDataStr), "011E8F2C34EEB3B3183CA6A8A0B76B9E");
}

function dataDecrypt(eDataStr){
    return myCrypt.decrypt(eDataStr, "011E8F2C34EEB3B3183CA6A8A0B76B9E");
}


export default {
    dataEncrypt: dataEncrypt,
    dataDecrypt: dataDecrypt
}