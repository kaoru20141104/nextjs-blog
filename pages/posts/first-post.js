import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import emoji from 'markdown-it-emoji'
import MarkdownIt from 'markdown-it'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import tasklists from 'markdown-it-task-lists'
import hljs from 'highlight.js'
import dynamic from 'next/dynamic';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
});
// import MdEditor from 'react-markdown-editor-lite'

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }    
    return '' // use external default escaping
  }
})
.use(emoji)
.use(subscript)
.use(superscript)
.use(footnote)
.use(deflist)
.use(abbreviation)
.use(insert)
.use(mark)
// .use(tasklists, { enabled: this.taskLists })
// this.renderHTML = this.renderHTML.bind(this)
function renderHTML(text) {
  // 模拟异步渲染Markdown
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mdParser.render(text))
    }, 1000)
  })
}
function handleEditorChange({html, text}) {    
  console.log('handleEditorChange', html, text)
}
export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <section style={{height: '500px'}}>
          <MdEditor 
            // ref={node => mdEditor = node}
            value='test'
            style={{height: '400px'}}
            renderHTML={renderHTML}
            config={{
              view: {
                menu: true,
                md: true,
                html: true
              },
              imageUrl: 'https://octodex.github.com/images/minion.png'
            }}
            onChange={handleEditorChange} 
            // onImageUpload={this.handleImageUpload}
          />
        </section>  
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}