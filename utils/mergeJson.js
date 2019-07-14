var mergeJson = (jsonObjectArray => {
    var resultJsonObject = {};
    for(i = 0; i < jsonObjectArray.length; i++){
        for(var key in jsonObjectArray[i]){
            resultJsonObject[key] = jsonObjectArray[i][key];
        }
    }
    return resultJsonObject;
})

module.exports = mergeJson;