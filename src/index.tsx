import React from "react";
// import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App.tsx";
import { darkTheme } from "./theme.ts";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!); // TypeScript 사용 시 createRoot(container!)로 적용
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <RecoilRoot>
//       <ThemeProvider theme={darkTheme}>
//         <App />
//       </ThemeProvider>
//     </RecoilRoot>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
