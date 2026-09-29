# Máquina Expendedora con Autómata No Determinista (AFN)

Máquina expendedora modelada con un AFN. Cada símbolo de la cadena es una moneda: `0` = $500, `1` = $1000. Las cadenas válidas miden entre **2 y 4 caracteres** y su valor total (precio) determina el producto a dispensar.

## Demo en línea

El sitio está publicado en GitHub Pages:

- **https://nixon258.github.io/automatas/**

## Estructura

- `src/automata_params.py`: definición formal del AFN (`Q`, `Σ`, `δ`, `q0`, `F`), cadenas por monto y catálogo de productos.
- `src/main.py`: motor del AFN, ejecución de cadenas y CLI.
- `docs/`: interfaz web animada de la máquina expendedora (publicada en GitHub Pages).

## Ejecución local

Simulador de consola (desde la raíz):

```bash
python src/main.py
```

Interfaz web (servida desde `docs/`):

```bash
python -m http.server 5500 -d docs
```

Luego abre:

```text
http://127.0.0.1:5500/index.html
```

## Reglas del AFN

- **Alfabeto**: `Σ = {0, 1}` (monedas de $500 y $1000).
- **Cadenas válidas**: longitud entre 2 y 4 → precio entre $1000 y $4000 (múltiplos de $500).
- **Estructura**: 33 estados, 36 transiciones, 28 estados de aceptación (un estado por cadena válida).
- **Producto**: cuando varias cadenas pagan el mismo monto, la forma binaria de la cadena decide la tarjeta: `candidatas[valorBinario(cadena) mod n]`.

## Qué expone la interfaz

- Parámetros formales del AFN (`Q`, `Σ`, `δ`, `q0`, `F`) y tabla de transición.
- Grafo de transiciones con resaltado del camino según la cadena ingresada.
- Expresión regular del lenguaje (expandida, compacta y por potencias) verificada automáticamente.
- Estantes con 12 productos; dispense con sonido, animación y resalte de la tarjeta elegida.

## Dónde están los parámetros del autómata

El AFN está definido dos veces (una por cada interfaz), con los mismos valores:

**Web (`docs/app.js`)**

| Parámetro | Ubicación | Qué es |
| --- | --- | --- |
| `LEVEL1..LEVEL4` | `docs/app.js:1-9` | Nombres de estados por nivel; el sufijo es la cadena que llevó hasta ahí (`q_011` = se leyó `0,1,1`). |
| `STATES` (**Q**) | `docs/app.js:11` | 33 estados: `"q0"` + 4 + 4 + 8 + 16. |
| `ALPHABET` (**Σ**) | `docs/app.js:13` | `{0, 1}` (0 = $500, 1 = $1000). |
| `INITIAL_STATE` (**q0**) | `docs/app.js:14` | `"q0"`. |
| `ACCEPTING_STATES` (**F**) | `docs/app.js:15` | 28 estados de aceptación (niveles 2, 3 y 4). |
| `TRANSITIONS` (**δ**) | `docs/app.js:43-72` | 36 triples `[origen, símbolo, destino]`. |
| `SYMBOL_VALUES`, `MIN_LENGTH`, `MAX_LENGTH`, `AMOUNTS`, `TOTAL_SHELF_ITEMS` | `docs/app.js:17-21` | Parámetros del modelo de dinero. |

En pantalla se reflejan en `docs/index.html`: `#paramsGrid` (Q, Σ, q0, F), `#deltaTable` (δ), `#transitionTable` y `#graphSvg`.

**Python (`src/`)**

- `src/automata_params.py:4-15` → estados (Q), `:17-22` → Q/q0/F, `:19` → Σ, `:35-72` → δ, `:30-32` → `value_of_sequence`, `:90-112` → `get_five_parameters()`.
- `src/main.py` → motor del AFN (`VendingMachine.evaluate`), tabla de transición, grafo y CLI.

## Lógica de la función de transición δ

δ es una lista de triples. En la web se indexa una sola vez en `transitionMap` (`docs/app.js:213-218`) usando la clave `` `${origen}|${símbolo}` `` → `Set` de destinos:

```js
const transitionMap = new Map();
for (const [source, symbol, target] of TRANSITIONS) {
  const key = `${source}|${symbol}`;
  if (!transitionMap.has(key)) transitionMap.set(key, new Set());
  transitionMap.get(key).add(target);
}
```

- Que una misma clave tenga **varios destinos** es lo que hace al AFN **no determinista** (p. ej. `q0` con `0` va a `q_0` **y** `q_0_alt`, `docs/app.js:44-45`).
- `runNFA` (`docs/app.js:226-250`) simula por **subconjuntos**: parte de `{q0}` y, por cada símbolo, calcula la unión de los δ de todos los estados actuales. Al final **acepta si algún estado actual pertenece a F**.
- El nivel del grafo es la longitud leída; el nivel 4 no tiene salidas (rechazo estructural de largo >4) y `MIN_LENGTH` refuerza el mínimo 2.
- El monto pagado es `500 · (largo + cantidad de 1s)` (`valueOfSequence`, `docs/app.js:35-41`) y con ese monto se elige el producto.
- `buildTrace` / `buildFullGraph` (`docs/app.js:252+`) usan el mismo `transitionMap` para dibujar el camino activo y el grafo completo.

Los mensajes de resultado indican pertenencia: *"La cadena &lt;cadena&gt; pertenece al AFN"* o *"La cadena &lt;cadena&gt; no pertenece al AFN"*.