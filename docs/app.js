const LEVEL1 = ["q_0", "q_0_alt", "q_1", "q_1_alt"];
const LEVEL2 = ["q_00", "q_01", "q_10", "q_11"];
const LEVEL3 = ["q_000", "q_001", "q_010", "q_011", "q_100", "q_101", "q_110", "q_111"];
const LEVEL4 = [
  "q_0000", "q_0001", "q_0010", "q_0011",
  "q_0100", "q_0101", "q_0110", "q_0111",
  "q_1000", "q_1001", "q_1010", "q_1011",
  "q_1100", "q_1101", "q_1110", "q_1111",
];

const STATES = new Set(["q0", ...LEVEL1, ...LEVEL2, ...LEVEL3, ...LEVEL4]);

const ALPHABET = new Set(["0", "1"]);
const INITIAL_STATE = "q0";
const ACCEPTING_STATES = new Set([...LEVEL2, ...LEVEL3, ...LEVEL4]);

const SYMBOL_VALUES = { 0: 500, 1: 1000 };
const MIN_LENGTH = 2;
const MAX_LENGTH = 4;
const AMOUNTS = [1000, 1500, 2000, 2500, 3000, 3500, 4000];
const TOTAL_SHELF_ITEMS = 12;

const AMOUNT_CHAINS = (() => {
  const result = new Map(AMOUNTS.map((amount) => [amount, []]));
  for (let length = MIN_LENGTH; length <= MAX_LENGTH; length += 1) {
    const total = 1 << length;
    for (let mask = 0; mask < total; mask += 1) {
      const chain = mask.toString(2).padStart(length, "0");
      result.get(valueOfSequence(chain)).push(chain);
    }
  }
  return result;
})();

function valueOfSequence(sequence) {
  let ones = 0;
  for (const symbol of sequence) {
    if (symbol === "1") ones += 1;
  }
  return 500 * (sequence.length + ones);
}

const TRANSITIONS = [
  ["q0", "0", "q_0"],
  ["q0", "0", "q_0_alt"],
  ["q0", "1", "q_1"],
  ["q0", "1", "q_1_alt"],
  ["q_0", "0", "q_00"],
  ["q_0", "1", "q_01"],
  ["q_0_alt", "0", "q_00"],
  ["q_0_alt", "1", "q_01"],
  ["q_1", "0", "q_10"],
  ["q_1", "1", "q_11"],
  ["q_1_alt", "0", "q_10"],
  ["q_1_alt", "1", "q_11"],
  ["q_00", "0", "q_000"],
  ["q_00", "1", "q_001"],
  ["q_01", "0", "q_010"],
  ["q_01", "1", "q_011"],
  ["q_10", "0", "q_100"],
  ["q_10", "1", "q_101"],
  ["q_11", "0", "q_110"],
  ["q_11", "1", "q_111"],
  ["q_000", "0", "q_0000"],
  ["q_000", "1", "q_0001"],
  ["q_001", "0", "q_0010"],
  ["q_001", "1", "q_0011"],
  ["q_010", "0", "q_0100"],
  ["q_010", "1", "q_0101"],
  ["q_011", "0", "q_0110"],
  ["q_011", "1", "q_0111"],
  ["q_100", "0", "q_1000"],
  ["q_100", "1", "q_1001"],
  ["q_101", "0", "q_1010"],
  ["q_101", "1", "q_1011"],
  ["q_110", "0", "q_1100"],
  ["q_110", "1", "q_1101"],
  ["q_111", "0", "q_1110"],
  ["q_111", "1", "q_1111"],
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

function toProductDisplay(product) {
  return {
    name: product.name,
    price: product.price,
    display_code: String(product.price),
    internal_id: `P${product.price}-${product.code}`,
    image: product.image || makePlaceholderSVG(product.name),
    fallbackImage: product.fallbackImage || makePlaceholderSVG(product.name),
  };
}

function buildProductSelection() {
  const total = TOTAL_SHELF_ITEMS;
  const available = shuffle([...PRODUCT_BANK]);
  const picked = [];
  const used = new Map(AMOUNTS.map((amount) => [amount, 0]));
  const capacity = (amount) => AMOUNT_CHAINS.get(amount).length;

  for (const amount of AMOUNTS) {
    const index = available.findIndex((item) => item.price === amount);
    if (index !== -1) {
      picked.push(available.splice(index, 1)[0]);
      used.set(amount, 1);
    }
  }
  while (picked.length < total && available.length > 0) {
    const index = available.findIndex(
      (item) => used.get(item.price) < capacity(item.price)
    );
    if (index === -1) break;
    const item = available.splice(index, 1)[0];
    picked.push(item);
    used.set(item.price, used.get(item.price) + 1);
  }

  const shelf = shuffle(picked).map(toProductDisplay);
  const labeled = new Set();
  for (const product of shelf) {
    if (!labeled.has(product.price) && (product.price === 1000 || product.price === 1500)) {
      product.priorityLabel = product.price === 1000 ? "1° más económico" : "2° solicitado";
      labeled.add(product.price);
    } else {
      product.priorityLabel = product.name;
    }
  }

  const byAmount = new Map();
  for (const amount of AMOUNTS) {
    byAmount.set(amount, shelf.filter((product) => product.price === amount));
  }

  PRODUCTS_BY_AMOUNT = byAmount;
  return shelf;
}

function pickProductByChain(sequence, candidates) {
  if (candidates.length === 1) return candidates[0];
  const index = parseInt(sequence, 2) % candidates.length;
  return candidates[index];
}

let PRODUCTS_BY_AMOUNT = new Map();
let SHELF_ITEMS = buildProductSelection();

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function buildShelfRows() {
  const items = shuffle([...SHELF_ITEMS]);
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push([items[i], items[i + 1], items[i + 2]]);
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
  const products = acceptedStates.length > 0 ? (PRODUCTS_BY_AMOUNT.get(valueOfSequence(input)) || []).slice() : [];

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
  title = "Autómata completo (33 estados, 36 transiciones)",
  activeEdges = new Set(),
  activeStates = new Set(),
  acceptedStates = [],
  height = 620,
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
  const nodeWidth = 58;
  const nodeHeight = 22;

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
  const accepted = sequence ? acceptedStates : [...ACCEPTING_STATES];
  const title = sequence
    ? `Autómata completo — ruta de "${sequence}" resaltada`
    : "Autómata completo (33 estados, 36 transiciones)";
  renderGraph({
    title,
    activeEdges,
    activeStates,
    acceptedStates: accepted,
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
  for (const row of buildShelfRows()) {
    const shelf = document.createElement("div");
    shelf.className = "shelf";

    for (const product of row) {
      if (!product) continue;
      const card = document.createElement("span");
      card.className = "item-card";
      card.dataset.price = product.display_code;
      card.dataset.name = product.name;

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

      if (product.priorityLabel && product.priorityLabel.includes("°")) {
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

function highlightSelectedProduct(productName) {
  const cards = shelvesContainer.querySelectorAll(".item-card");
  for (const card of cards) {
    card.classList.remove("item-selected");
  }

  if (!productName) {
    return;
  }

  const selected = shelvesContainer.querySelector(`.item-card[data-name='${productName}']`);
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

function expandSuperscripts(pattern) {
  const sup = { "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9 };
  let out = "";
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (sup[ch]) {
      if (out.endsWith(")")) {
        const open = out.lastIndexOf("(");
        const group = out.slice(open);
        out = out.slice(0, open);
        for (let k = 0; k < sup[ch]; k += 1) {
          out += group;
        }
      }
      i += 1;
      continue;
    }
    out += ch === "∪" ? "|" : ch;
    i += 1;
  }
  return out;
}

function regexToAst(pattern) {
  pattern = pattern.replace(/\s/g, "");
  let i = 0;
  function parseAlt() {
    const alternatives = [parseSeq()];
    while (i < pattern.length && pattern[i] === "|") {
      i += 1;
      alternatives.push(parseSeq());
    }
    return alternatives.length > 1 ? { type: "alt", alts: alternatives } : alternatives[0];
  }
  function parseSeq() {
    const items = [];
    while (i < pattern.length && pattern[i] !== "|" && pattern[i] !== ")") {
      items.push(parseAtom());
    }
    return items.length === 1 ? items[0] : { type: "seq", items };
  }
  function parseAtom() {
    let node;
    const ch = pattern[i];
    if (ch === "(") {
      i += 1;
      node = parseAlt();
      if (pattern[i] === ")") i += 1;
    } else {
      node = { type: "lit", ch };
      i += 1;
    }
    if (pattern[i] === "?") {
      i += 1;
      node = { type: "opt", node };
    }
    return node;
  }
  return parseAlt();
}

function regexMatchEnds(node, sequence, pos) {
  if (node.type === "lit") {
    return sequence[pos] === node.ch ? new Set([pos + 1]) : new Set();
  }
  if (node.type === "opt") {
    const set = new Set([pos]);
    for (const end of regexMatchEnds(node.node, sequence, pos)) {
      set.add(end);
    }
    return set;
  }
  if (node.type === "seq") {
    let positions = new Set([pos]);
    for (const item of node.items) {
      const next = new Set();
      for (const p of positions) {
        for (const end of regexMatchEnds(item, sequence, p)) {
          next.add(end);
        }
      }
      positions = next;
      if (positions.size === 0) break;
    }
    return positions;
  }
  const set = new Set();
  for (const alt of node.alts) {
    for (const end of regexMatchEnds(alt, sequence, pos)) {
      set.add(end);
    }
  }
  return set;
}

function regexMatches(pattern, sequence) {
  return regexMatchEnds(regexToAst(pattern), sequence, 0).has(sequence.length);
}

function binaryStringsSet() {
  const set = new Set();
  for (let len = MIN_LENGTH; len <= MAX_LENGTH; len += 1) {
    for (let mask = 0; mask < 1 << len; mask += 1) {
      set.add(mask.toString(2).padStart(len, "0"));
    }
  }
  return set;
}

function verifyRegexNotations(notations) {
  const expected = binaryStringsSet();
  const rejected = ["0", "1", "00000", "11111", "01010"];
  for (const notation of notations) {
    const pattern = expandSuperscripts(notation.text);
    let ok = true;
    for (const word of expected) {
      if (!regexMatches(pattern, word)) {
        ok = false;
        break;
      }
    }
    if (ok) {
      for (const word of rejected) {
        if (regexMatches(pattern, word)) {
          ok = false;
          break;
        }
      }
    }
    if (!ok) {
      console.warn(`[regex] ${notation.label} no coincide con el autómata`);
    }
  }
}

function renderRegex() {
  if (!regexList) {
    return;
  }
  regexList.innerHTML = "";

  const symbols = [...ALPHABET].sort();
  const alt = `(${symbols.join("|")})`;
  const superscripts = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];

  const groups = [LEVEL2, LEVEL3, LEVEL4].map((level) => {
    const terms = level.map((state) => state.replace("q_", "")).join("|");
    return `(${terms})`;
  });
  const expanded = groups.join(" ∪ ");

  let compacta = "";
  for (let i = 0; i < MIN_LENGTH; i += 1) {
    compacta += alt;
  }
  for (let i = 0; i < MAX_LENGTH - MIN_LENGTH; i += 1) {
    compacta += `${alt}?`;
  }

  const potenciaParts = [];
  for (let len = MIN_LENGTH; len <= MAX_LENGTH; len += 1) {
    potenciaParts.push(`${alt}${superscripts[len]}`);
  }
  const potencia = potenciaParts.join(" ∪ ");

  const notations = [
    { label: "Expandida", text: expanded },
    { label: "Compacta", text: compacta },
    { label: "Potencia", text: potencia },
  ];

  verifyRegexNotations(notations);

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
    highlightSelectedProduct(null);
    return;
  }

  if (sequence.length < MIN_LENGTH) {
    statusText.textContent = `La cadena ${sequence} no pertenece al AFN.`;
    setStatusClass("status-warn");
    screenText.textContent = sequence;
    const partialResult = runNFA(sequence);
    renderAutomatonGraph(sequence, partialResult.acceptedStates);
    renderTransitionTable(sequence);
    highlightSelectedProduct(null);
    return;
  }

  if (sequence.length > MAX_LENGTH) {
    statusText.textContent = `La cadena ${sequence} no pertenece al AFN.`;
    setStatusClass("status-bad");
    const clipped = sequence.slice(0, MAX_LENGTH);
    screenText.textContent = clipped;
    const clippedResult = runNFA(clipped);
    renderAutomatonGraph(clipped, clippedResult.acceptedStates);
    renderTransitionTable(clipped);
    highlightSelectedProduct(null);
    return;
  }

  const result = runNFA(sequence);
  screenText.textContent = sequence;
  renderAutomatonGraph(sequence, result.acceptedStates);
  renderTransitionTable(sequence);

  if (result.accepted && result.products.length > 0) {
    const product = pickProductByChain(sequence, result.products);
    statusText.textContent = `La cadena ${sequence} pertenece al AFN.`;
    setStatusClass("status-ok");
    highlightSelectedProduct(product.name);
    animateProduct(product.image, product.fallbackImage, product.name, product.display_code);
  } else {
    statusText.textContent = `La cadena ${sequence} no pertenece al AFN.`;
    setStatusClass("status-bad");
    highlightSelectedProduct(null);
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
