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