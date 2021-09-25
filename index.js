const app = require('express')()
require('dotenv').config()
const sendEmail = require('./emialsend')
const render = require('./html-render')
app.get('/',async (req,res)=>{
    res.send('hello')
})
app.get('/send', async (req, res) => {
    let ren = new render()
    const send = new sendEmail();
    let user = 'silent'
    let code = ren.code(6)
    let html = await ren.render('./pages/codes.ejs', { user, code })
    try {
        let email = await send.sendEmail({
            from: 'zxl199912186@163.com',//发送人
            to: '1300231081@qq.com',//接收人
            subject: "我是标题",//标题 
            text: "验证码验证", //存文本正文
            html//html正文
        })
        if (email) {
            res.send('发送成功！')
        }
    } catch (e) {
        res.send(e)
    }
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})