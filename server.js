let express = require('express');
let path=require('path')
let http = require('http');
let app = express();
app.use(express.static(path.join(__dirname,'dist'))) // 静态文件夹目录，直接输出
let goodsData = require('./static/goodsdata.json')
let goodlist = goodsData.message
let goodsItem=require('./static/goodsitem.json')
let goodsitem=goodsItem.message
// let goodsItem = require('./static/goodsitem.json')
// let gooditem = goodsItem.message
//设置跨域访问

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access - Control - Allow - Headers, 可根据浏览器的F12查看, 把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});


let gpi = '/api/goodlist';
let api='/api/goodsitem'
// let api = '/api/gooditem';
let reg = '/api/register';
let login = '/api/login';

let userpoor = [
  { phone: '13360802920', pass: '123456', checkPass: '123456' },
  { phone: '13360802922', pass: '123456', checkPass: '123456' },
  { phone: '13360802925', pass: '123456', checkPass: '123456' },
]
app.get(reg, (req, res) => {
  const { phone, pass, checkPass } = req.query
  const phonelength = userpoor.filter(v => v.phone == phone).length
  if (phonelength > 0) {
    res.send({
      success: false,
      messsage: '用户名已存在'
    })
  }
  else {
    res.send({
      success: true,
      message: '注册成功'
    })
  }
});

let tokenkey = 'jygshj325'
app.get(login, (req, res) => {
  const { phone, pass } = req.query
  const phonelength = userpoor.filter(v => v.phone == phone).length
  const passlength = userpoor.filter(v => v.pass == pass).length
  if (phonelength > 0 && passlength > 0) {
    res.send({
      code: 0,
      message: '登录成功',
      token: tokenkey + '-' + phone + (new Date().getTime() + 60 * 60 * 1000)
    })
  }
  else {
    res.send({
      code: 1,
      message: '账号或密码错误'
    })
  }
});
app.get(api,(req,res)=>{
  res.send(goodsitem)
})
// app.get(api, (req, res) => {
//   res.send(gooditem);
// });

app.get(gpi, (req, res) => {
  res.send(goodlist);
});

app.get('/comp', (req, res) => {
  let compButton = `{
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  };`;
  res.send(''+compButton);
});


//配置服务端口

app.listen(3000, () => {

  console.log(`localhost:3000`);

});
