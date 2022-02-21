export function getSearchBlogList(query: string) {
  return [
    {id: 1, title: "111", content: "11223"},
    {id: 2, title: "222", content: "长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试"},
    {id: 3, title: "333", content: "22222"}
  ]
}

export function getBlogById(id: number) {
  return {
    id: 1,
    title: "Vue 锚点定位导致页面刷新的解决办法",
    content: `
      <p>最近在做 Spring Boot + Vue 前后端分离（人不分离）的个人博客系统，相比现在用的这版，基本是两个 project，功能已经完成大半，原本计划在九月初结项，但还有一些新功能由于要用到其它的技术，可能需要更多的时间，加上马上要开学，事情应该蛮多的，可能要延期到九月底了。</p>
      <p>先来个首页预览图：</p>
      <p><img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/blogHosting/2020/08/B02/001.png" alt="" /></p>
      <h1 id="vue锚点定位的问题">Vue锚点定位的问题</h1>
      <p>回到正题</p>
      <p>原生网页做锚点跳转一般用 id 和 a标签的 href 实现：</p>
      <pre><code class="language-html">&lt;h1 id=&quot;title&quot;&gt;title&lt;/h1&gt;
      &lt;a href=&quot;#title&quot;&gt;跳转到title&lt;/a&gt;
      </code></pre>
      <p>但在 Vue-router 中（我使用的是 <code>history</code> 模式），<strong>当点击超链接时，URL地址后会加上 <code>#title</code> ，导致 <code>hash</code> 值改变</strong>，路由会刷新当前组件，而我们希望的锚点定位就无法实现了</p>
      <p>网上对此的解决办法大多是给 a标签绑定一个点击事件，利用 js 的 <code>scrollTop</code> 或 <code>scrollIntoView</code> 实现，而不是 <code>href</code> ：</p>
      <pre><code class="language-js">methods: {
          goAnchor(selector) {
              var anchor = this.$el.querySelector(selector)
              document.body.scrollTop = anchor.offsetTop
          }
      }
      </code></pre>
      <p>或者是 Vue-router 的 <code>scrollBehavior</code> 方法</p>
      <p>一般来说，这些方法满足大多数情况，也方便快捷</p>
      <p>参考：<a href="https://segmentfault.com/q/1010000007888351" target="_blank" rel="external nofollow noopener">https://segmentfault.com/q/1010000007888351</a></p>
      <p>官方文档：<a href="https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html" target="_blank" rel="external nofollow noopener">https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html</a></p>
      <h2 id="需求">需求</h2>
      <p>我的需求是，使用 <a href="https://github.com/tscanlin/tocbot" target="_blank" rel="external nofollow noopener">tocbot</a> 插件给博客文章生成目录，效果如：</p>
      <p><img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/blogHosting/2020/08/B02/002.png" alt="" /></p>
      <p>由于生成的目录是超链接的形式，点击时就会发生上述 <code>hash</code> 值改变，路由刷新组件而达不到锚点跳转的效果，查看 tocbot 的文档也没有合适的解决办法，若用 js 给每个超链接添加点击事件，用 js 的方式实现锚点跳转，似乎有些繁琐</p>
      <h2 id="解决办法">解决办法</h2>
      <p>一番摸索，发现可以<strong>利用 <code>beforeRouteUpdate</code> 这个钩子函数，既然不想让路由跳转，就把它拦截下来</strong></p>
      <pre><code class="language-js">beforeRouteUpdate(to, from, next) {
      \t// 一般有两种情况会触发这个钩子
      \t// 1.当前文章页面跳转到其它文章页面
      \t// 2.点击目录跳转锚点时，路由hash值会改变，导致当前页面会重新加载，这种情况是不希望出现的
      \t// 在路由 beforeRouteUpdate 中判断路径是否改变
      \t// 如果跳转到其它页面，to.path!==from.path 就放行 next()
      \t// 如果是跳转锚点，path不会改变，hash会改变，to.path===from.path, to.hash!==from.path 不放行路由跳转，就能让锚点正常跳转
      \tif (to.path !== from.path) {
      \t\tnext()
      \t}
      }
      </code></pre>
      <p>解释一下：<code>hash</code> 值改变导致的路由刷新，由于刷新后，还是当前组件，并不会执行组件的生命周期函数，同样也不会执行 <code>beforeRouteEnter</code> 和 <code>beforeRouteLeave</code></p>
      <p>打印一下 <code>beforeRouteUpdate</code> 的 <code>to</code> 和 <code>from</code> 就很清楚了：</p>
      <pre><code class="language-js">beforeRouteUpdate(to, from, next) {
      \tconsole.log(to)
      \tconsole.log(from)
      }
      </code></pre>
      <p>结果：</p>
      <p><img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/blogHosting/2020/08/B02/003.png" alt="" /></p>
      <p>可以看到，当点击超链接跳转锚点时， <code>path</code> 是不变的，而 <code>hash</code> 值会变为锚点的 id，因此只需拦截 <code>hash</code> 改变的路由跳转即可</p>
      <blockquote>
      <p>当使用路由参数时，例如从 <code>/user/foo</code> 导航到 <code>/user/bar</code>，<strong>原来的组件实例会被复用</strong>。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。<strong>不过，这也意味着组件的生命周期钩子不会再被调用</strong>。</p>
      </blockquote>
      <p>参考官方文档：<a href="https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html" target="_blank" rel="external nofollow noopener">https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html</a></p>
      <h1 id="其它">其它</h1>
      <p>前后端分离之后，文章信息通过 ajax 异步请求后端数据，并在页面上渲染成 HTML ，速度肯定没有组件加载来得快，tocbot 生成目录的时机就需要一番考虑了。</p>
      <p><strong>思路分析</strong>：</p>
      <p>在我的项目中，由于组件之间间隔较远，选择 vuex 的方式存储一个状态信息（文章是否渲染完成），当进入博客文章时，把状态置为 <code>false</code> ，当 ajax 接收到 <code>response</code> 后，通过 <code>v-html</code> 渲染在页面上，再使用 <code>this.$nextTick()</code> 向 vuex 提交一个 <code>action</code> ，将状态置为 <code>true</code> ，在 tocbot 组件内，监听这个状态，当这个状态信息为 <code>true</code> 时，执行 tocbot 的 <code>init</code> 方法，生成目录</p>
      <p>由于涉及到的组件和方法较多，不太适合贴代码，项目完成后，将第一时间开源，简单记录一下思路，抛砖引玉</p>
      `,
    appreciation: true,
    commentEnabled: true,
    top: true,
    createTime: "2022-02-04T11:40:12.000+0000",
    updateTime: "2022-02-19T12:04:03.000+0000",
    views: 13,
    words: 10,
    readTime: 0,
    password: "",
    category: {
      id: null,
      name: "tag",
      blogs: []
    },
    tags: [
      {
        id: null,
        name: "test",
        color: "orange",
        blogs: []
      }
    ]
  }
}