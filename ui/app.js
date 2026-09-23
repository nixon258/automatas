const STATES = new Set([
  "q0",
  "q_after_0",
  "q_after_1",
  "q_after_0_alt",
  "q_after_1_alt",
  "q_after_00",
  "q_after_01",
  "q_after_10",
  "q_after_11",
  "q_product_000",
  "q_product_001",
  "q_product_010",
  "q_product_011",
  "q_product_100",
  "q_product_101",
  "q_product_110",
  "q_product_111",
]);

const ALPHABET = new Set(["0", "1"]);
const INITIAL_STATE = "q0";
const ACCEPTING_STATES = new Set([
  "q_product_000",
  "q_product_001",
  "q_product_010",
  "q_product_011",
  "q_product_100",
  "q_product_101",
  "q_product_110",
  "q_product_111",
]);

const TRANSITIONS = [
  ["q0", "0", "q_after_0"],
  ["q0", "0", "q_after_0_alt"],
  ["q0", "1", "q_after_1"],
  ["q0", "1", "q_after_1_alt"],
  ["q_after_0", "0", "q_after_00"],
  ["q_after_0", "1", "q_after_01"],
  ["q_after_0_alt", "0", "q_after_00"],
  ["q_after_0_alt", "1", "q_after_01"],
  ["q_after_1", "0", "q_after_10"],
  ["q_after_1", "1", "q_after_11"],
  ["q_after_1_alt", "0", "q_after_10"],
  ["q_after_1_alt", "1", "q_after_11"],
  ["q_after_00", "0", "q_product_000"],
  ["q_after_00", "1", "q_product_001"],
  ["q_after_01", "0", "q_product_010"],
  ["q_after_01", "1", "q_product_011"],
  ["q_after_10", "0", "q_product_100"],
  ["q_after_10", "1", "q_product_101"],
  ["q_after_11", "0", "q_product_110"],
  ["q_after_11", "1", "q_product_111"],
];

const PRODUCT_BANK = [
  { name: "Bombom Bum Fresa", price: 1000, code: "BOMBOMBUM", image: "assets/photos/bombombum.png", fallbackImage: "assets/bombombum.svg" },
  { name: "Papas Margarita Natural", price: 2500, code: "MARGARITA", image: "assets/photos/margarita.png", fallbackImage: "assets/margarita.svg" },
  { name: "Galletas Festival Vainilla", price: 1500, code: "FESTIVAL", image: "assets/photos/festival.png", fallbackImage: "assets/festival.svg" },
  { name: "Chocoramo Mini", price: 2000, code: "CHOCORAMO", image: "assets/photos/chocoramo.png", fallbackImage: "assets/chocoramo.svg" },
  { name: "Pony Malta Lata", price: 2500, code: "PONYMALTA", image: "assets/photos/ponymalta.png", fallbackImage: "assets/ponymalta.svg" },
  { name: "Chocolate Jet", price: 3000, code: "JET", image: "assets/photos/jet.png", fallbackImage: "assets/jet.svg" },
  { name: "Manimoto", price: 3500, code: "MANIMOTO", image: "assets/photos/manimoto.png", fallbackImage: "assets/manimoto.svg" },
  { name: "De Todito Natural", price: 4000, code: "DETODITO", image: "assets/photos/detodito.png", fallbackImage: "assets/detodito.svg" },
  { name: "Supercoco", price: 2000, code: "SUPERCOCO" },
  { name: "Gansito", price: 3000, code: "GANSITO" },
  { name: "Tosti Limón", price: 2000, code: "TOSTILIMON" },
  { name: "Yupi Fresa", price: 1500, code: "YUPI" },
  { name: "Frunas Sandía", price: 1500, code: "FRUNAS" },
  { name: "Pingüino Choco", price: 3000, code: "PINGUINO" },
  { name: "Menta Barbie", price: 1000, code: "MENTABARBIE" },
  { name: "Cola & Pola", price: 4000, code: "COLAYPOLA" },
  { name: "Doritos Nacho", price: 2500, code: "DORITOS" },
  { name: "Choclitos", price: 1500, code: "CHOCLITOS" },
  { name: "Chicle Trident Menta", price: 1500, code: "TRIDENT" },
  { name: "Jumbo Original", price: 2500, code: "JUMBO" },
  { name: "Galleta Saltín", price: 1500, code: "SALTIN" },
  { name: "Bonice Uva", price: 1500, code: "BONICE" },
  { name: "Agua Cristal 600ml", price: 2500, code: "AGUACRISTAL" },
  { name: "Papas Rizadas", price: 3000, code: "RIZADAS" },
];

const PRODUCT_STATES = [
  "q_product_000",
  "q_product_001",
  "q_product_010",
  "q_product_011",
  "q_product_100",
  "q_product_101",
  "q_product_110",
  "q_product_111",
];

function hashHue(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 360;
  }
  return hash;
}

function makePlaceholderSVG(name) {
  const hue = hashHue(name);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="hsl(${hue},60%,38%)"/>` +
    `<stop offset="1" stop-color="hsl(${(hue + 40) % 360},65%,22%)"/>` +
    `</linearGradient></defs>` +
    `<rect width="300" height="150" fill="url(#g)" rx="14"/>` +
    `<text x="150" y="72" font-family="Arial, sans-serif" font-size="21" font-weight="bold" fill="#f8fafc" text-anchor="middle">${name}</text>` +
    `<text x="150" y="98" font-family="Arial, sans-serif" font-size="13" fill="#cbd5e1" text-anchor="middle">Snack Colombiano</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function buildProductSelection() {
  const picked = shuffle([...PRODUCT_BANK]).slice(0, PRODUCT_STATES.length);
  const byPrice = [...picked].sort((a, b) => a.price - b.price);
  const priority = new Map();
  priority.set(byPrice[0].name, "1° más económico");
  priority.set(byPrice[1].name, "2° solicitado");

  const productsByState = {};
  const states = shuffle([...PRODUCT_STATES]);
  const priorityStates = new Set();

  states.forEach((state, index) => {
    const product = picked[index];
    const binary = state.replace("q_product_", "");
    productsByState[state] = {
      name: product.name,
      price: product.price,
      display_code: String(product.price),
      internal_id: `P${product.price}-${product.code}-${binary}`,
      image: product.image || makePlaceholderSVG(product.name),
      fallbackImage: product.fallbackImage || makePlaceholderSVG(product.name),
      priorityLabel: priority.get(product.name) || product.name,
    };
    if (priority.has(product.name)) priorityStates.add(state);
  });

  PRIORITY_STATES = priorityStates;
  return productsByState;
}

let PRIORITY_STATES = new Set();
let PRODUCTS_BY_STATE = buildProductSelection();

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function buildRandomShelfRows() {
  const states = shuffle(Object.keys(PRODUCTS_BY_STATE));
  const rows = [];
  for (let i = 0; i < states.length; i += 2) {
    rows.push([states[i], states[i + 1]]);
  }
  return rows;
}

const transitionMap = new Map();
for (const [source, symbol, target] of TRANSITIONS) {
  const key = `${source}|${symbol}`;
  if (!transitionMap.has(key)) transitionMap.set(key, new Set());
  transitionMap.get(key).add(target);
}

const DISPLAY_STATE_MAP = Object.fromEntries([...STATES].map((state, index) => [state, `q${index}`]));

function getStateLabel(state) {
  return DISPLAY_STATE_MAP[state] || state;
}

function runNFA(input) {
  let currentStates = new Set([INITIAL_STATE]);

  for (const symbol of input) {
    const nextStates = new Set();
    for (const state of currentStates) {
      const key = `${state}|${symbol}`;
      const targets = transitionMap.get(key) || new Set();
      for (const target of targets) {
        nextStates.add(target);
      }
    }
    currentStates = nextStates;
  }

  const acceptedStates = [...currentStates].filter((state) => ACCEPTING_STATES.has(state));
  const products = acceptedStates.map((state) => PRODUCTS_BY_STATE[state]).filter(Boolean);

  return {
    finalStates: [...currentStates].sort(),
    acceptedStates: acceptedStates.sort(),
    products,
    accepted: acceptedStates.length > 0,
  };
}

function buildTrace(inputSymbols) {
  const levels = [[INITIAL_STATE]];
  const edges = [];
  let currentStates = new Set([INITIAL_STATE]);

  for (let step = 0; step < inputSymbols.length; step += 1) {
    const symbol = inputSymbols[step];
    const nextStates = new Set();

    for (const state of currentStates) {
      const key = `${state}|${symbol}`;
      const targets = transitionMap.get(key) || new Set();
      for (const target of targets) {
        nextStates.add(target);
        edges.push({ from: state, to: target, symbol, fromLevel: step, toLevel: step + 1 });
      }
    }

    levels.push([...nextStates].sort());
    currentStates = nextStates;
  }

  return { levels, edges };
}

function buildFullGraph() {
  const levels = [[INITIAL_STATE]];
  const edges = [];
  const visited = new Set([INITIAL_STATE]);
  let frontier = [INITIAL_STATE];

  while (frontier.length > 0) {
    const fromLevel = levels.length - 1;
    const nextStates = new Set();

    for (const state of frontier) {
      for (const symbol of [...ALPHABET]) {
        const key = `${state}|${symbol}`;
        const targets = transitionMap.get(key) || new Set();
        for (const target of targets) {
          edges.push({ from: state, to: target, symbol, fromLevel, toLevel: fromLevel + 1 });
          if (!visited.has(target)) {
            visited.add(target);
            nextStates.add(target);
          }
        }
      }
    }

    const sortedNext = [...nextStates].sort();
    if (sortedNext.length > 0) {
      levels.push(sortedNext);
    }
    frontier = sortedNext;
  }

  return { levels, edges };
}

const fullGraph = buildFullGraph();

function buildTraceHighlightKeys(sequence) {
  const trace = buildTrace(sequence);
  const activeEdges = new Set();
  const activeStates = new Set([INITIAL_STATE]);

  for (const edge of trace.edges) {
    activeEdges.add(`${edge.from}|${edge.to}|${edge.symbol}`);
    activeStates.add(edge.from);
    activeStates.add(edge.to);
  }

  return { activeEdges, activeStates };
}

const input = document.getElementById("sequence");
const controlPanel = document.getElementById("controlPanel");
const statusText = document.getElementById("statusText");
const graphEmpty = document.getElementById("graphEmpty");
const graphSvg = document.getElementById("graphSvg");
const tableBox = document.getElementById("tableBox");
const transitionTable = document.getElementById("transitionTable");
const productToken = document.getElementById("productToken");
const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("productPrice");
const screenText = document.getElementById("screenText");
const shelvesContainer = document.getElementById("shelves");
const chuteGate = document.getElementById("chuteGate");
const scannerBeam = document.getElementById("scannerBeam");
const machineBody = document.getElementById("machineBody");
const paramsGrid = document.getElementById("paramsGrid");
const deltaTable = document.getElementById("deltaTable");
const regexList = document.getElementById("regexList");
let audioContext;

function renderTransitionTable(sequence = "") {
  if (!transitionTable || !tableBox) {
    return;
  }

  if (!sequence) {
    transitionTable.innerHTML = "";
    tableBox.style.display = "none";
    return;
  }

  tableBox.style.display = "block";
  const trace = buildTrace(sequence);
  const activeEdges = trace.edges;

  transitionTable.innerHTML = "";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Paso", "Estado", "Lee", "Siguiente"].forEach((title) => {
    const th = document.createElement("th");
    th.textContent = title;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  transitionTable.appendChild(thead);

  const tbody = document.createElement("tbody");

  if (activeEdges.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "Sin transición para la cadena actual";
    row.appendChild(cell);
    tbody.appendChild(row);
    transitionTable.appendChild(tbody);
    return;
  }

  for (const edge of activeEdges) {
    const row = document.createElement("tr");

    const stepCell = document.createElement("td");
    stepCell.textContent = String(edge.toLevel);

    const stateCell = document.createElement("td");
    stateCell.className = "state-col";
    stateCell.textContent = getStateLabel(edge.from);

    const symbolCell = document.createElement("td");
    symbolCell.textContent = edge.symbol;

    const nextCell = document.createElement("td");
    nextCell.textContent = getStateLabel(edge.to);

    row.appendChild(stepCell);
    row.appendChild(stateCell);
    row.appendChild(symbolCell);
    row.appendChild(nextCell);
    tbody.appendChild(row);
  }

  transitionTable.appendChild(tbody);
}

function renderGraph({
  levels = fullGraph.levels,
  edges = fullGraph.edges,
  title = "Autómata completo (17 estados, 20 transiciones)",
  activeEdges = new Set(),
  activeStates = new Set(),
  acceptedStates = [],
  height = 440,
} = {}) {
  graphEmpty.style.display = "block";
  graphEmpty.textContent = title;
  graphSvg.style.display = "block";
  graphSvg.innerHTML = "";

  const acceptedSet = new Set(acceptedStates);
  const hasHighlight = activeEdges.size > 0 || activeStates.size > 0;
  const width = 620;
  const xPadding = 52;
  const yPadding = 34;
  const columns = Math.max(levels.length - 1, 1);
  const xStep = (width - xPadding * 2) / columns;
  const nodeWidth = 76;
  const nodeHeight = 34;

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrow");
  marker.setAttribute("markerWidth", "8");
  marker.setAttribute("markerHeight", "8");
  marker.setAttribute("refX", "7");
  marker.setAttribute("refY", "4");
  marker.setAttribute("orient", "auto");
  const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  arrowPath.setAttribute("d", "M0,0 L8,4 L0,8 Z");
  arrowPath.setAttribute("fill", "#7dd3fc");
  marker.appendChild(arrowPath);
  defs.appendChild(marker);
  graphSvg.appendChild(defs);

  const nodePositions = new Map();
  for (let level = 0; level < levels.length; level += 1) {
    const states = levels[level];
    if (states.length === 0) {
      continue;
    }

    const stepLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    stepLabel.setAttribute("x", String(xPadding + level * xStep - 22));
    stepLabel.setAttribute("y", "18");
    stepLabel.setAttribute("class", "graph-level-label");
    stepLabel.textContent = `Nivel ${level}`;
    graphSvg.appendChild(stepLabel);

    const yStep = states.length === 1 ? 0 : (height - yPadding * 2) / (states.length - 1);
    states.forEach((state, index) => {
      const x = xPadding + level * xStep;
      const y = states.length === 1 ? height / 2 : yPadding + index * yStep;
      nodePositions.set(`${level}:${state}`, { x, y });
    });
  }

  for (const edge of edges) {
    const fromPos = nodePositions.get(`${edge.fromLevel}:${edge.from}`);
    const toPos = nodePositions.get(`${edge.toLevel}:${edge.to}`);
    if (!fromPos || !toPos) {
      continue;
    }

    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const curve = Math.max(-22, Math.min(22, -dy * 0.25));
    const startX = fromPos.x + nodeWidth / 2;
    const startY = fromPos.y;
    const endX = toPos.x - nodeWidth / 2;
    const endY = toPos.y;
    const controlX = startX + dx * 0.45;
    const controlY = startY + dy * 0.45 + curve;

    let edgeClass = "graph-edge";
    const edgeKey = `${edge.from}|${edge.to}|${edge.symbol}`;
    if (activeEdges.has(edgeKey)) {
      edgeClass += " active";
    } else if (hasHighlight) {
      edgeClass += " dim";
    }

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
    path.setAttribute("class", edgeClass);
    path.setAttribute("marker-end", "url(#arrow)");
    graphSvg.appendChild(path);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String((startX + endX) / 2));
    label.setAttribute("y", String((startY + endY) / 2 - 10));
    label.setAttribute("class", "graph-edge-label");
    label.textContent = edge.symbol;
    graphSvg.appendChild(label);
  }

  for (let level = 0; level < levels.length; level += 1) {
    for (const state of levels[level]) {
      const pos = nodePositions.get(`${level}:${state}`);
      if (!pos) {
        continue;
      }

      const node = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      node.setAttribute("x", String(pos.x - nodeWidth / 2));
      node.setAttribute("y", String(pos.y - nodeHeight / 2));
      node.setAttribute("width", String(nodeWidth));
      node.setAttribute("height", String(nodeHeight));
      node.setAttribute("rx", "10");
      let nodeClass = "graph-node";
      if (level === 0 && state === INITIAL_STATE) {
        nodeClass += " initial";
      }
      if (acceptedSet.has(state)) {
        nodeClass += " accepting";
      }
      if (activeStates.has(state)) {
        nodeClass += " active";
      }
      node.setAttribute("class", nodeClass);
      graphSvg.appendChild(node);

      if (acceptedSet.has(state)) {
        const inner = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        inner.setAttribute("x", String(pos.x - nodeWidth / 2 + 4));
        inner.setAttribute("y", String(pos.y - nodeHeight / 2 + 4));
        inner.setAttribute("width", String(nodeWidth - 8));
        inner.setAttribute("height", String(nodeHeight - 8));
        inner.setAttribute("rx", "8");
        inner.setAttribute("class", "graph-node accepting-inner");
        graphSvg.appendChild(inner);
      }

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", String(pos.x));
      text.setAttribute("y", String(pos.y));
      text.setAttribute("class", "graph-node-label");
      text.textContent = getStateLabel(state);
      graphSvg.appendChild(text);
    }
  }
}

function renderAutomatonGraph(sequence = "", acceptedStates = []) {
  const { activeEdges, activeStates } = buildTraceHighlightKeys(sequence);
  const title = sequence
    ? `Autómata completo — ruta de "${sequence}" resaltada`
    : "Autómata completo (17 estados, 20 transiciones)";
  renderGraph({
    title,
    activeEdges,
    activeStates,
    acceptedStates,
  });
}

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

async function ensureAudioReady() {
  try {
    const context = getAudioContext();
    if (context.state === "suspended") {
      await context.resume();
    }
  } catch (_) {
  }
}

function playTone(frequency, duration, type = "sine", gainValue = 0.03, delay = 0) {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, context.currentTime + delay);
  gain.gain.setValueAtTime(0.0001, context.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(gainValue, context.currentTime + delay + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + delay + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(context.currentTime + delay);
  oscillator.stop(context.currentTime + delay + duration + 0.02);
}

function playDispenseSound() {
  try {
    ensureAudioReady();
    playTone(920, 0.12, "square", 0.02, 0.0);
    playTone(780, 0.16, "triangle", 0.02, 0.12);
    playTone(220, 0.28, "sawtooth", 0.03, 0.3);
  } catch (_) {
  }
}

function attachImageFallback(imgElement, fallbackImage) {
  imgElement.onerror = () => {
    if (imgElement.src.endsWith(fallbackImage)) return;
    imgElement.src = fallbackImage;
  };
}

function renderShelves() {
  shelvesContainer.innerHTML = "";
  for (const row of buildRandomShelfRows()) {
    const shelf = document.createElement("div");
    shelf.className = "shelf";

    for (const state of row) {
      const product = PRODUCTS_BY_STATE[state];
      const card = document.createElement("span");
      card.className = "item-card";
      card.dataset.state = state;

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      attachImageFallback(img, product.fallbackImage);

      const badge = document.createElement("span");
      badge.className = "price-badge";
      badge.textContent = `$${product.display_code}`;

      const label = document.createElement("span");
      label.className = "item-label";
      label.textContent = product.priorityLabel || product.name;

      if (PRIORITY_STATES.has(state)) {
        card.classList.add("item-priority");
      }

      card.appendChild(img);
      card.appendChild(badge);
      card.appendChild(label);
      shelf.appendChild(card);
    }

    shelvesContainer.appendChild(shelf);
  }
}

function highlightSelectedState(state) {
  const cards = shelvesContainer.querySelectorAll(".item-card");
  for (const card of cards) {
    card.classList.remove("item-selected");
  }

  if (!state) {
    return;
  }

  const selected = shelvesContainer.querySelector(`.item-card[data-state='${state}']`);
  if (selected) {
    selected.classList.add("item-selected");
  }
}

function stateParamsClass(state) {
  if (state === INITIAL_STATE) return "pill-initial";
  if (ACCEPTING_STATES.has(state)) return "pill-accepting";
  return "pill-plain";
}

function makeParamLabel(text) {
  const label = document.createElement("span");
  label.className = "param-label";
  label.textContent = text;
  return label;
}

function makePill(text, className) {
  const pill = document.createElement("span");
  pill.className = "param-state-pill";
  if (className) {
    pill.classList.add(className);
  }
  pill.textContent = text;
  return pill;
}

function buildParamBlock(title, states, classFn) {
  const block = document.createElement("div");
  block.className = "param-block";
  block.appendChild(makeParamLabel(title));

  const pills = document.createElement("div");
  pills.className = "param-pills";
  for (const state of states) {
    const className = classFn ? classFn(state) : "pill-plain";
    pills.appendChild(makePill(state, className));
  }
  block.appendChild(pills);
  return block;
}

function renderDeltaTable() {
  if (!deltaTable) {
    return;
  }
  deltaTable.innerHTML = "";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const stateTh = document.createElement("th");
  stateTh.textContent = "Estado";
  headerRow.appendChild(stateTh);
  for (const symbol of [...ALPHABET].sort()) {
    const th = document.createElement("th");
    th.textContent = symbol;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  deltaTable.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (const state of [...STATES].sort()) {
    const row = document.createElement("tr");
    const stateCell = document.createElement("td");
    stateCell.textContent = getStateLabel(state);
    row.appendChild(stateCell);

    for (const symbol of [...ALPHABET].sort()) {
      const key = `${state}|${symbol}`;
      const targets = transitionMap.get(key) || new Set();
      const cell = document.createElement("td");
      cell.textContent = targets.size ? [...targets].sort().map(getStateLabel).join(", ") : "–";
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  deltaTable.appendChild(tbody);
}

function renderRegex() {
  if (!regexList) {
    return;
  }
  regexList.innerHTML = "";

  const symbols = [...ALPHABET].sort();
  const alt = `(${symbols.join("|")})`;
  const notations = [
    { label: "Expandida", text: alt.repeat(3) },
    { label: "Compacta", text: `[${symbols.join("")}]{3}` },
    { label: "Potencia", text: `${alt}³` },
  ];

  for (const notation of notations) {
    const item = document.createElement("div");
    item.className = "regex-item";

    const name = document.createElement("span");
    name.className = "regex-name";
    name.textContent = notation.label;

    const code = document.createElement("code");
    code.textContent = notation.text;

    item.appendChild(name);
    item.appendChild(code);
    regexList.appendChild(item);
  }
}

function renderFormalParams() {
  if (!paramsGrid) {
    return;
  }
  paramsGrid.innerHTML = "";

  paramsGrid.appendChild(
    buildParamBlock("Q — estados", [...STATES].sort(), (state) => stateParamsClass(state))
  );
  paramsGrid.appendChild(
    buildParamBlock("Σ — alfabeto", [...ALPHABET].sort(), () => "pill-symbol")
  );
  paramsGrid.appendChild(buildParamBlock("q0 — estado inicial", [INITIAL_STATE], () => "pill-initial"));
  paramsGrid.appendChild(
    buildParamBlock("F — estados de aceptación", [...ACCEPTING_STATES].sort(), () => "pill-accepting")
  );

  renderDeltaTable();
  renderRegex();
}

function animateProduct(image, fallbackImage, productName, displayCode) {
  chuteGate.classList.remove("open");
  void chuteGate.offsetWidth;
  chuteGate.classList.add("open");

  scannerBeam.classList.remove("active");
  void scannerBeam.offsetWidth;
  scannerBeam.classList.add("active");

  machineBody.classList.remove("dispensing");
  void machineBody.offsetWidth;
  machineBody.classList.add("dispensing");
  playDispenseSound();

  productImage.src = image;
  productImage.alt = productName;
  attachImageFallback(productImage, fallbackImage);
  productPrice.textContent = `$${displayCode}`;
  productToken.classList.remove("dispense");
  void productToken.offsetWidth;
  productToken.classList.add("dispense");

  setTimeout(() => {
    machineBody.classList.remove("dispensing");
    scannerBeam.classList.remove("active");
  }, 950);
}

function setStatusClass(className) {
  statusText.classList.remove("status-ok", "status-bad", "status-warn");
  statusText.classList.add(className);
}

function evaluateNow() {
  const raw = input.value.trim();
  const sequence = raw.replace(/[^01]/g, "");
  if (sequence !== raw) {
    input.value = sequence;
  }

  if (sequence.length === 0) {
    statusText.textContent = "Esperando entrada…";
    setStatusClass("status-warn");
    screenText.textContent = "---";
    renderAutomatonGraph("");
    renderTransitionTable("");
    highlightSelectedState(null);
    return;
  }

  if (sequence.length < 3) {
    statusText.textContent = "Cadena incompleta. Debe tener 3 caracteres.";
    setStatusClass("status-warn");
    screenText.textContent = sequence;
    const partialResult = runNFA(sequence);
    renderAutomatonGraph(sequence, partialResult.acceptedStates);
    renderTransitionTable(sequence);
    highlightSelectedState(null);
    return;
  }

  if (sequence.length > 3) {
    statusText.textContent = "Cadena demasiado larga. Solo 3 caracteres.";
    setStatusClass("status-bad");
    const clipped = sequence.slice(0, 3);
    screenText.textContent = clipped;
    const clippedResult = runNFA(clipped);
    renderAutomatonGraph(clipped, clippedResult.acceptedStates);
    renderTransitionTable(clipped);
    highlightSelectedState(null);
    return;
  }

  const result = runNFA(sequence);
  screenText.textContent = sequence;
  renderAutomatonGraph(sequence, result.acceptedStates);
  renderTransitionTable(sequence);

  if (result.accepted && result.products.length > 0) {
    const product = result.products[0];
    statusText.textContent = `Producto dispensado: ${product.name}`;
    setStatusClass("status-ok");
    highlightSelectedState(result.acceptedStates[0]);
    animateProduct(product.image, product.fallbackImage, product.name, product.display_code);
  } else {
    statusText.textContent = "Cadena no aceptada por el autómata.";
    setStatusClass("status-bad");
    highlightSelectedState(null);
  }
}

input.addEventListener("input", evaluateNow);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    evaluateNow();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "e") {
    input.focus();
  }
});

renderShelves();
renderFormalParams();
statusText.classList.add("status-warn");
renderAutomatonGraph("");
renderTransitionTable("");

window.addEventListener("pointerdown", ensureAudioReady, { once: true });
window.addEventListener("keydown", ensureAudioReady, { once: true });
input.addEventListener("focus", ensureAudioReady, { once: true });
