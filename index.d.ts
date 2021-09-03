declare module "emoji-name-map";
declare module "css-to-object";
declare module "@testing-library/jest-dom";
declare namespace SVGRender {
  interface SVGElementAttributes {
    css?: string | undefined;
  }
  interface SVGAttributes<T> extends SVGElementAttributes {
    // Attributes which also defined in HTMLAttributes
    // See comment in SVGDOMPropertyConfig.js
    class?: string | undefined;
    color?: string | undefined;
    height?: number | string | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    max?: number | string | undefined;
    media?: string | undefined;
    method?: string | undefined;
    min?: number | string | undefined;
    name?: string | undefined;
    style?: CSSProperties | undefined;
    target?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;

    // Other HTML properties supported by SVG elements in browsers
    role?: AriaRole | undefined;
    tabIndex?: number | undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;

    // SVG Specific attributes
    accentHeight?: number | string | undefined;
    accumulate?: "none" | "sum" | undefined;
    additive?: "replace" | "sum" | undefined;
    alignmentBaseline?:
      | "auto"
      | "baseline"
      | "before-edge"
      | "text-before-edge"
      | "middle"
      | "central"
      | "after-edge"
      | "text-after-edge"
      | "ideographic"
      | "alphabetic"
      | "hanging"
      | "mathematical"
      | "inherit"
      | undefined;
    allowReorder?: "no" | "yes" | undefined;
    alphabetic?: number | string | undefined;
    amplitude?: number | string | undefined;
    arabicForm?: "initial" | "medial" | "terminal" | "isolated" | undefined;
    ascent?: number | string | undefined;
    attributeName?: string | undefined;
    attributeType?: string | undefined;
    autoReverse?: Booleanish | undefined;
    azimuth?: number | string | undefined;
    baseFrequency?: number | string | undefined;
    baselineShift?: number | string | undefined;
    baseProfile?: number | string | undefined;
    bbox?: number | string | undefined;
    begin?: number | string | undefined;
    bias?: number | string | undefined;
    by?: number | string | undefined;
    calcMode?: number | string | undefined;
    capHeight?: number | string | undefined;
    clip?: number | string | undefined;
    clipPath?: string | undefined;
    clipPathUnits?: number | string | undefined;
    clipRule?: number | string | undefined;
    colorInterpolation?: number | string | undefined;
    colorInterpolationFilters?:
      | "auto"
      | "sRGB"
      | "linearRGB"
      | "inherit"
      | undefined;
    colorProfile?: number | string | undefined;
    colorRendering?: number | string | undefined;
    contentScriptType?: number | string | undefined;
    contentStyleType?: number | string | undefined;
    cursor?: number | string | undefined;
    cx?: number | string | undefined;
    cy?: number | string | undefined;
    d?: string | undefined;
    decelerate?: number | string | undefined;
    descent?: number | string | undefined;
    diffuseConstant?: number | string | undefined;
    direction?: number | string | undefined;
    display?: number | string | undefined;
    divisor?: number | string | undefined;
    dominantBaseline?: number | string | undefined;
    dur?: number | string | undefined;
    dx?: number | string | undefined;
    dy?: number | string | undefined;
    edgeMode?: number | string | undefined;
    elevation?: number | string | undefined;
    enableBackground?: number | string | undefined;
    end?: number | string | undefined;
    exponent?: number | string | undefined;
    externalResourcesRequired?: Booleanish | undefined;
    fill?: string | undefined;
    fillOpacity?: number | string | undefined;
    fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
    filter?: string | undefined;
    filterRes?: number | string | undefined;
    filterUnits?: number | string | undefined;
    floodColor?: number | string | undefined;
    floodOpacity?: number | string | undefined;
    focusable?: Booleanish | "auto" | undefined;
    fontFamily?: string | undefined;
    fontSize?: number | string | undefined;
    fontSizeAdjust?: number | string | undefined;
    fontStretch?: number | string | undefined;
    fontStyle?: number | string | undefined;
    fontVariant?: number | string | undefined;
    fontWeight?: number | string | undefined;
    format?: number | string | undefined;
    from?: number | string | undefined;
    fx?: number | string | undefined;
    fy?: number | string | undefined;
    g1?: number | string | undefined;
    g2?: number | string | undefined;
    glyphName?: number | string | undefined;
    glyphOrientationHorizontal?: number | string | undefined;
    glyphOrientationVertical?: number | string | undefined;
    glyphRef?: number | string | undefined;
    gradientTransform?: string | undefined;
    gradientUnits?: string | undefined;
    hanging?: number | string | undefined;
    horizAdvX?: number | string | undefined;
    horizOriginX?: number | string | undefined;
    href?: string | undefined;
    ideographic?: number | string | undefined;
    imageRendering?: number | string | undefined;
    in2?: number | string | undefined;
    in?: string | undefined;
    intercept?: number | string | undefined;
    k1?: number | string | undefined;
    k2?: number | string | undefined;
    k3?: number | string | undefined;
    k4?: number | string | undefined;
    k?: number | string | undefined;
    kernelMatrix?: number | string | undefined;
    kernelUnitLength?: number | string | undefined;
    kerning?: number | string | undefined;
    keyPoints?: number | string | undefined;
    keySplines?: number | string | undefined;
    keyTimes?: number | string | undefined;
    lengthAdjust?: number | string | undefined;
    letterSpacing?: number | string | undefined;
    lightingColor?: number | string | undefined;
    limitingConeAngle?: number | string | undefined;
    local?: number | string | undefined;
    markerEnd?: string | undefined;
    markerHeight?: number | string | undefined;
    markerMid?: string | undefined;
    markerStart?: string | undefined;
    markerUnits?: number | string | undefined;
    markerWidth?: number | string | undefined;
    mask?: string | undefined;
    maskContentUnits?: number | string | undefined;
    maskUnits?: number | string | undefined;
    mathematical?: number | string | undefined;
    mode?: number | string | undefined;
    numOctaves?: number | string | undefined;
    offset?: number | string | undefined;
    opacity?: number | string | undefined;
    operator?: number | string | undefined;
    order?: number | string | undefined;
    orient?: number | string | undefined;
    orientation?: number | string | undefined;
    origin?: number | string | undefined;
    overflow?: number | string | undefined;
    overlinePosition?: number | string | undefined;
    overlineThickness?: number | string | undefined;
    paintOrder?: number | string | undefined;
    panose1?: number | string | undefined;
    path?: string | undefined;
    pathLength?: number | string | undefined;
    patternContentUnits?: string | undefined;
    patternTransform?: number | string | undefined;
    patternUnits?: string | undefined;
    pointerEvents?: number | string | undefined;
    points?: string | undefined;
    pointsAtX?: number | string | undefined;
    pointsAtY?: number | string | undefined;
    pointsAtZ?: number | string | undefined;
    preserveAlpha?: Booleanish | undefined;
    preserveAspectRatio?: string | undefined;
    primitiveUnits?: number | string | undefined;
    r?: number | string | undefined;
    radius?: number | string | undefined;
    refX?: number | string | undefined;
    refY?: number | string | undefined;
    renderingIntent?: number | string | undefined;
    repeatCount?: number | string | undefined;
    repeatDur?: number | string | undefined;
    requiredExtensions?: number | string | undefined;
    requiredFeatures?: number | string | undefined;
    restart?: number | string | undefined;
    result?: string | undefined;
    rotate?: number | string | undefined;
    rx?: number | string | undefined;
    ry?: number | string | undefined;
    scale?: number | string | undefined;
    seed?: number | string | undefined;
    shapeRendering?: number | string | undefined;
    slope?: number | string | undefined;
    spacing?: number | string | undefined;
    specularConstant?: number | string | undefined;
    specularExponent?: number | string | undefined;
    speed?: number | string | undefined;
    spreadMethod?: string | undefined;
    startOffset?: number | string | undefined;
    stdDeviation?: number | string | undefined;
    stemh?: number | string | undefined;
    stemv?: number | string | undefined;
    stitchTiles?: number | string | undefined;
    stopColor?: string | undefined;
    stopOpacity?: number | string | undefined;
    strikethroughPosition?: number | string | undefined;
    strikethroughThickness?: number | string | undefined;
    string?: number | string | undefined;
    stroke?: string | undefined;
    strokeDasharray?: string | number | undefined;
    strokeDashoffset?: string | number | undefined;
    strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
    strokeMiterlimit?: number | string | undefined;
    strokeOpacity?: number | string | undefined;
    strokeWidth?: number | string | undefined;
    surfaceScale?: number | string | undefined;
    systemLanguage?: number | string | undefined;
    tableValues?: number | string | undefined;
    targetX?: number | string | undefined;
    targetY?: number | string | undefined;
    textAnchor?: string | undefined;
    textDecoration?: number | string | undefined;
    textLength?: number | string | undefined;
    textRendering?: number | string | undefined;
    to?: number | string | undefined;
    transform?: string | undefined;
    u1?: number | string | undefined;
    u2?: number | string | undefined;
    underlinePosition?: number | string | undefined;
    underlineThickness?: number | string | undefined;
    unicode?: number | string | undefined;
    unicodeBidi?: number | string | undefined;
    unicodeRange?: number | string | undefined;
    unitsPerEm?: number | string | undefined;
    vAlphabetic?: number | string | undefined;
    values?: string | undefined;
    vectorEffect?: number | string | undefined;
    version?: string | undefined;
    vertAdvY?: number | string | undefined;
    vertOriginX?: number | string | undefined;
    vertOriginY?: number | string | undefined;
    vHanging?: number | string | undefined;
    vIdeographic?: number | string | undefined;
    viewBox?: string | undefined;
    viewTarget?: number | string | undefined;
    visibility?: number | string | undefined;
    vMathematical?: number | string | undefined;
    widths?: number | string | undefined;
    wordSpacing?: number | string | undefined;
    writingMode?: number | string | undefined;
    x1?: number | string | undefined;
    x2?: number | string | undefined;
    x?: number | string | undefined;
    xChannelSelector?: string | undefined;
    xHeight?: number | string | undefined;
    xlinkActuate?: string | undefined;
    xlinkArcrole?: string | undefined;
    xlinkHref?: string | undefined;
    xlinkRole?: string | undefined;
    xlinkShow?: string | undefined;
    xlinkTitle?: string | undefined;
    xlinkType?: string | undefined;
    xmlBase?: string | undefined;
    xmlLang?: string | undefined;
    xmlns?: string | undefined;
    xmlnsXlink?: string | undefined;
    xmlSpace?: string | undefined;
    y1?: number | string | undefined;
    y2?: number | string | undefined;
    y?: number | string | undefined;
    yChannelSelector?: string | undefined;
    z?: number | string | undefined;
    zoomAndPan?: string | undefined;
  }

  type ComponentChild =
    | SVGElement
    | object
    | string
    | number
    | bigint
    | boolean
    | null
    | undefined;
  type ComponentChildren = ComponentChild[] | ComponentChild;
  interface SVGElement {
    content: string;
    css: string[];
    $$symbol: Symbol;
  }

  interface FunctionComponent<P = {}> {
    (props: P, children: ComponentChildren): SVGElement | SVGElement[] | null;
  }
}
declare namespace JSX {
  interface IntrinsicElements {
    style: HTMLStyleElement;
    svg: SVGRender.SVGAttributes<SVGSVGElement>;

    animate: SVGRender.SVGAttributes<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: SVGRender.SVGAttributes<SVGElement>;
    animateTransform: SVGRender.SVGAttributes<SVGElement>; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: SVGRender.SVGAttributes<SVGCircleElement>;
    clipPath: SVGRender.SVGAttributes<SVGClipPathElement>;
    defs: SVGRender.SVGAttributes<SVGDefsElement>;
    desc: SVGRender.SVGAttributes<SVGDescElement>;
    ellipse: SVGRender.SVGAttributes<SVGEllipseElement>;
    feBlend: SVGRender.SVGAttributes<SVGFEBlendElement>;
    feColorMatrix: SVGRender.SVGAttributes<SVGFEColorMatrixElement>;
    feComponentTransfer: SVGRender.SVGAttributes<SVGFEComponentTransferElement>;
    feComposite: SVGRender.SVGAttributes<SVGFECompositeElement>;
    feConvolveMatrix: SVGRender.SVGAttributes<SVGFEConvolveMatrixElement>;
    feDiffuseLighting: SVGRender.SVGAttributes<SVGFEDiffuseLightingElement>;
    feDisplacementMap: SVGRender.SVGAttributes<SVGFEDisplacementMapElement>;
    feDistantLight: SVGRender.SVGAttributes<SVGFEDistantLightElement>;
    feDropShadow: SVGRender.SVGAttributes<SVGFEDropShadowElement>;
    feFlood: SVGRender.SVGAttributes<SVGFEFloodElement>;
    feFuncA: SVGRender.SVGAttributes<SVGFEFuncAElement>;
    feFuncB: SVGRender.SVGAttributes<SVGFEFuncBElement>;
    feFuncG: SVGRender.SVGAttributes<SVGFEFuncGElement>;
    feFuncR: SVGRender.SVGAttributes<SVGFEFuncRElement>;
    feGaussianBlur: SVGRender.SVGAttributes<SVGFEGaussianBlurElement>;
    feImage: SVGRender.SVGAttributes<SVGFEImageElement>;
    feMerge: SVGRender.SVGAttributes<SVGFEMergeElement>;
    feMergeNode: SVGRender.SVGAttributes<SVGFEMergeNodeElement>;
    feMorphology: SVGRender.SVGAttributes<SVGFEMorphologyElement>;
    feOffset: SVGRender.SVGAttributes<SVGFEOffsetElement>;
    fePointLight: SVGRender.SVGAttributes<SVGFEPointLightElement>;
    feSpecularLighting: SVGRender.SVGAttributes<SVGFESpecularLightingElement>;
    feSpotLight: SVGRender.SVGAttributes<SVGFESpotLightElement>;
    feTile: SVGRender.SVGAttributes<SVGFETileElement>;
    feTurbulence: SVGRender.SVGAttributes<SVGFETurbulenceElement>;
    filter: SVGRender.SVGAttributes<SVGFilterElement>;
    foreignObject: SVGRender.SVGAttributes<SVGForeignObjectElement>;
    g: SVGRender.SVGAttributes<SVGGElement>;
    image: SVGRender.SVGAttributes<SVGImageElement>;
    line: SVGRender.SVGAttributes<SVGLineElement>;
    linearGradient: SVGRender.SVGAttributes<SVGLinearGradientElement>;
    marker: SVGRender.SVGAttributes<SVGMarkerElement>;
    mask: SVGRender.SVGAttributes<SVGMaskElement>;
    metadata: SVGRender.SVGAttributes<SVGMetadataElement>;
    mpath: SVGRender.SVGAttributes<SVGElement>;
    path: SVGRender.SVGAttributes<SVGPathElement>;
    pattern: SVGRender.SVGAttributes<SVGPatternElement>;
    polygon: SVGRender.SVGAttributes<SVGPolygonElement>;
    polyline: SVGRender.SVGAttributes<SVGPolylineElement>;
    radialGradient: SVGRender.SVGAttributes<SVGRadialGradientElement>;
    rect: SVGRender.SVGAttributes<SVGRectElement>;
    stop: SVGRender.SVGAttributes<SVGStopElement>;
    switch: SVGRender.SVGAttributes<SVGSwitchElement>;
    symbol: SVGRender.SVGAttributes<SVGSymbolElement>;
    text: SVGRender.SVGAttributes<SVGTextElement>;
    textPath: SVGRender.SVGAttributes<SVGTextPathElement>;
    tspan: SVGRender.SVGAttributes<SVGTSpanElement>;
    use: SVGRender.SVGAttributes<SVGUseElement>;
    view: SVGRender.SVGAttributes<SVGViewElement>;
  }
}
