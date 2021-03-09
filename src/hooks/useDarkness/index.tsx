import React, { CSSProperties, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface IDarknessConfig {
  darkBgColor?: string;
  darkFontColor?: string;
  lightBgColor?: string;
  lightFontColor?: string;
  switch?:
    | boolean
    | null
    | React.ReactNode
    | ((props: { onClick: () => void }) => React.ReactNode);
}

type TInitDarknessVal = boolean | (() => boolean);

const defaultIDarknessConfig: IDarknessConfig = {
  darkBgColor: "#10171d",
  darkFontColor: "#ffffff",
  lightBgColor: "#ffffff",
  lightFontColor: "#333",
  switch: true,
};

interface IDarknessSwitchProps {
  isDark: boolean;
  bgColor?: string;
  onClick: () => void;
  style?: CSSProperties;
}

export function DarknessSwitch({
  isDark,
  bgColor,
  onClick,
  style,
}: IDarknessSwitchProps) {
  const mergedStyle = {
    ...DarknessSwitch.defaultStyle,
    ...style,
    backgroundColor: bgColor,
  } as CSSProperties;
  return (
    <div onClick={onClick} style={mergedStyle}>
      {isDark ? "🌞" : "🌙"}
    </div>
  );
}

DarknessSwitch.defaultStyle = {
  width: 10,
  height: 10,
  padding: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  position: "fixed",
  top: 20,
  right: 40,
  zIndex: 9999999,
  borderRadius: "50%",
  userSelect: "none",
} as CSSProperties;

const DARKNESS_VALUE = "DARKNESS_VALUE";

export default function useDarkness(
  initVal: TInitDarknessVal = false,
  config?: IDarknessConfig
) {
  const [isDark, setDark] = useState(
    typeof initVal === "boolean" ? initVal : initVal()
  );

  const inserted = useRef(false);

  const mergedConfig = { ...defaultIDarknessConfig, ...config };

  function switchBodyClassName(isDark: boolean) {
    document.body.className = isDark ? "darkness" : "lightness";
  }

  function toggle() {
    const newVal = !isDark;
    sessionStorage.setItem(DARKNESS_VALUE, newVal ? "true" : "");
    setDark(newVal);
    switchBodyClassName(newVal);
  }

  useEffect(() => {
    function insertStyleNode() {
      const {
        darkBgColor,
        darkFontColor,
        lightBgColor,
        lightFontColor,
      } = mergedConfig;
      const innerHTML = `body.lightness {
        background-color: ${lightBgColor};
        color: ${lightFontColor};
        transition: background-color 0.3s ease;
      }

      body.darkness {
        background-color: ${darkBgColor};
        color: ${darkFontColor};
        transition: background-color 0.3s ease;
      }`;

      const styleNode = document.createElement("style");
      styleNode.type = "text/css";

      styleNode.innerHTML = innerHTML;

      document.head.appendChild(styleNode);
      inserted.current = true;
    }

    function showSwitch() {
      if (mergedConfig?.switch) {
        let switchNode, div;

        if (typeof mergedConfig?.switch === "boolean") {
          switchNode = (
            <DarknessSwitch
              onClick={toggle}
              isDark={isDark}
              bgColor={
                isDark ? mergedConfig.lightBgColor : mergedConfig.darkBgColor
              }
            />
          );
        } else {
          switchNode =
            typeof mergedConfig.switch === "function"
              ? mergedConfig.switch({ onClick: toggle })
              : mergedConfig.switch;
        }

        div = document.getElementById("darkness-switch-container");

        if (!div) {
          div = document.createElement("div");
          div.id = "darkness-switch-container";
          document.body.appendChild(div);
        }
        // @ts-ignore
        ReactDOM.render(switchNode, div);
      }
    }

    if (!inserted.current) {
      insertStyleNode();
    }

    showSwitch();
  }, [mergedConfig, isDark]);

  useEffect(() => {
    const darknessVal = sessionStorage.getItem(DARKNESS_VALUE);
    const newVal = Boolean(darknessVal).valueOf();
    setDark(newVal);
    switchBodyClassName(newVal);
  }, []);

  return {
    value: isDark,
    toggle,
  };
}
