var UserModel = require('../models/user');

module.exports = {
    //保存
    save(Module, data){
        return new Promise((res, rej) => {
            Module.create(data, (error, doc) =>{
                if(error){
                    rej(error)
                }else{
                    console.log(doc)
                    res(doc)
                }
            })
        })
    },
    //查询并返回所有的
    find(Module, data={}, fields=null, options={}) {
		return new Promise((resolve, reject) => {
			//model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
			Module.find(data, fields, options, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
    },

    // //数组指定元素查询
    findArayEle(Module, conditions){
        return new Promise((resolve, reject) =>{
            Module.find(conditions, (error, doc) =>{
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    },

    //返回第一个
    findOne(Module, data) {
		return new Promise((resolve, reject) => {
			//model.findOne(需要查找的对象,callback)
			Module.findOne(data, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
    },
    //根据id查询
	findById(Module, data) {
		return new Promise((resolve, reject) => {
			//model.findById(需要查找的id对象 ,callback)
			Module.findById(data, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
    },
    //数据更新
	update(Module, conditions, update) {
		return new Promise((resolve, reject) => {
			//model.update(查询条件,更新对象,callback)
			Module.update(conditions, update, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
    },
    //向数组中添加元素
    updateArraySet(Module, conditions, doc){
        return new Promise((resolve, reject) => {
            Module.update(conditions,{
                '$addToSet': doc
            }, (error, doc) => {
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    },
    //删除数据
	remove(Module, conditions) {
		return new Promise((resolve, reject) => {
			//model.update(查询条件,callback)
			Module.remove(conditions, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	}
}