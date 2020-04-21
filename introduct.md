1、build：构建脚本目录 编辑相关的文件夹
   1) build.js   ==>  生产环境构建脚本；
   2) check-versions.js   ==>  检查npm，node.js版本；
　 3) utils.js   ==>  构建相关工具方法；
　 4) vue-loader.conf.js   ==>  配置css加载器以及编译css之后自动添加前缀；
   5)webpack.base.conf.js   ==>  webpack基本配置；
   6)webpack.dev.conf.js   ==>  webpack开发环境配置；
   7)webpack.prod.conf.js   ==>  webpack生产环境配置；

2、config：项目配置 webpack的配置文件
   1) dev.env.js   ==>  开发环境变量；
   2) index.js   ==>  项目配置文件；
   3) prod.env.js   ==>  生产环境变量；

3、node_modules：npm 加载的项目依赖模块
4、server: 后后台代码
5、src：主要要开发的目录，基本上要做的事情都在这个目录里。
    1) api: 存放前端请求接口
    2) assets：资源目录，放置一些图片或者公共js、公共css。这里的资源会被webpack构建；
    3) components：组件目录，写的组件就放在这个目录里面；
    4) router：前端路由，配置的路由路径写在index.js里面；
    5) store: vuex状态管理文件
    5) utils: 组件所需的公共方法
    6) App.vue：根组件；
    7) main.js：入口js文件；

6、static：静态资源目录，如图片、字体等。不会被webpack构建

7、.babelrc：  babel-loader 配置 把es6代码转换成浏览器能识别的代码的工具。可以理解为babel是javascript语法的编译器
8、.editorconfig： 是编辑器自身的配置文件，定义编辑器的设置，如字符类型等
9、.eslintignore： 是忽略eslintrc规则的文件列表，加入其中的文件名可以避免eslint的语法检查
10、.eslintrc.js： 是eslint配置文件，ESLint是可组装的JavaScript和JSX检查工具， 是一个ES/JS 语法规则和代码风格的检查工具，保证代码的一致性和避免错误
11、.gitignore: 配置在该文件中的文件列表不会被提交到github或者其他代码仓库上
12、.postcssrc.js： PostCSS是一款使用插件去转换CSS的工具
13、index.html：项目本身模本文件，首页入口文件，可添加一些 meta 信息等
14、package.json：存放基础数据、创建时的填写的信息，还有配置和依赖包等信息
15、README.md：项目说明文档，markdown 格式