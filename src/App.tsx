import React from "react";
import useDarkness from "./hooks/useDarkness";

import "./App.scss";

function App() {
  const darkness = useDarkness();

  return (
    <div className="App">
      <h1>useDarkness</h1>
      <a href="https://github.com/GitHubJiKe/use-darkness">
        <h2>github</h2>
      </a>
      <button onClick={() => darkness.toggle()}> switch darkness</button>
      <div className="codes">
        <code>
          <h3>// most simple use</h3>
          <br />
          const darkness = useDarkness();
          <br />
          <br />
          darkness.toggle() // switch darkness value true/false
          <br />
          <br />
          darkness.value; // you can use darkness.value to handle some operation
          <br />
          <br />
          <h3>// by config to customize your darkness</h3>
          <h4>Config:</h4>
          <div className="config-table">
            <div className="header">
              <div>配置项</div>
              <div>darkBgColor</div>
              <div>darkFontColor</div>
              <div>lightBgColor</div>
              <div>lightFontColor</div>
              <div>switch</div>
            </div>
            <div className="content">
              <div>字段解释</div>
              <div>暗黑模式下的背景色</div>
              <div>暗黑模式下的字体颜色</div>
              <div>明亮模式下的背景色</div>
              <div>明亮模式下的字体色</div>
              <div>切换组件</div>
            </div>
            <div className="content">
              <div>默认值</div>
              <div>#10171d</div>
              <div>#ffffff</div>
              <div>#ffffff</div>
              <div>#333</div>
              <div>DarknessSwitch</div>
            </div>
          </div>
        </code>
      </div>
    </div>
  );
}

export default App;
