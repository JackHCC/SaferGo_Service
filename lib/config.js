module.exports = {
    mongodb: "mongodb://localhost:27017/isafe",
    // mailconfig:{
    //     secureConnection: true,
    //     port: 465,
    //     secure: true,
    //     host: 'smtp.126.com',
    //     auth: {
    //         user: 'i_safe@126.com',
    //         pass: 'isafe666'
    //     }
    // }
    // mailconfig: {
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     secure: true,
    //     port: 465,
    //     auth: {
    //         user: 'safergo.isafe@gmail.com',
    //         pass: 'safergo666'
    //     }
    // }
    mailconfig: {
        service: 'qq',
        // host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: '2586534184@qq.com',
            pass: 'ghqvqsmanffbeabf'
        }
    }
}