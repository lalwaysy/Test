
let http = require('http');

let url = require('url');

let fs = require('fs');

let path = require('path');

let server = http.createServer();

server.listen(3000);

server.on('request', (req, res) => {

    // 路由是 地址 与 程序 间的映射关系
    
    // 路由是由开发人员设计的
    
    // 通过 req.url 可以获得地址，（不包含参数）
        
    let {pathname} = url.parse(req.url);

    let realPath = path.join('./', pathname);

    res.render = function (tpl) {
        fs.readFile(tpl + '.html', (err, data) => {
            res.write(data);
            res.end();
        });
    }

    switch(pathname) {
        case '/':
            // 响应 index.html
            console.log('来到了 a 路由');
            res.render('index');
        break;

        case '/doc':
            // 响应 doc.html
            console.log('来到了 b 路由');
            res.render('doc');
        break;

        case '/blog':
            // 响应 blog.html
            console.log('来到了 c 路由');
            res.render('blog');
        break;

        default:
            fs.readFile(realPath, (err, data) => {
                if(!err) {
                    res.write(data);
                    res.end();
                }
            })
    }
})