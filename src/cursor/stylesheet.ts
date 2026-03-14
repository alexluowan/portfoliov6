/* eslint-disable @typescript-eslint/no-explicit-any */
type TransformationConfig = {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
};

type CSSStyleConfig = TransformationConfig & Record<string, any>;

function emptyWhenUndefined(
  strings: TemplateStringsArray,
  value: string | number | undefined
) {
  if (value === undefined) return "";
  return strings[0] + value + strings[1];
}

export function stylesheet(elm: HTMLElement, config: CSSStyleConfig) {
  const {
    x,
    y,
    scaleX,
    scaleY,
    rotateX,
    rotateY,
    rotateZ,
    skewX,
    skewY,
    ...pureCSSStyle
  } = config;

  const transformStr = [
    emptyWhenUndefined`translateX(${x}px)`,
    emptyWhenUndefined`translateY(${y}px)`,
    emptyWhenUndefined`scaleX(${scaleX})`,
    emptyWhenUndefined`scaleY(${scaleY})`,
    emptyWhenUndefined`skewX(${skewX}deg)`,
    emptyWhenUndefined`skewY(${skewY}deg)`,
    emptyWhenUndefined`rotateX(${rotateX})`,
    emptyWhenUndefined`rotateY(${rotateY})`,
    emptyWhenUndefined`rotateZ(${rotateZ})`,
  ].join(" ");

  elm.style.transform = transformStr;

  Object.keys(pureCSSStyle).forEach((styleKey) => {
    (elm.style as any)[styleKey] = pureCSSStyle[styleKey];
  });
}
