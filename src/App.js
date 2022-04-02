import './App.css';
import React, { useState, useEffect } from 'react'
import Editor from './components/Editor';
import UseLocalStorage from './components/UseLocalStorage';

function App() {
  const [html, setHtml] = UseLocalStorage('html', '')
  const [css, setCss] = UseLocalStorage('css', '')
  const [js, setJs] = UseLocalStorage('js', '')
  const [srcDoc, setSrcDoc] =UseLocalStorage('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
      `)
    }, 250)

    return () =>clearTimeout(timeout)
  }, [html, css, js])


  return (
    <>
        <div className='pane top-pane'>
          <Editor language= "xml" displayName="html" value={html} onChange ={setHtml}/>
          <Editor language= "css" displayName="css" value={css} onChange ={setCss}></Editor>
          <Editor language= "js" displayName="js" value={js} onChange ={setJs}></Editor>
        </div>
        <div className='pane'>
          <iframe title="output" srcDoc={srcDoc} sandbox='allow-scripts' frameBorder={0} width="100%" height="100%"></iframe>
        </div>
    </>
  );
}

export default App;
