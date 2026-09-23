# Máquina Expendedora con Autómata No Determinista (AFN)

Proyecto en Python con arquitectura limpia, enfocado primero en la lógica de un AFN para una máquina expendedora. holi

## Objetivo

Modelar una máquina con **8 productos internos** usando un AFN, donde cada producto se selecciona con una cadena binaria de **3 caracteres**.

Secuencias válidas de selección:
- `000`, `001`, `010`, `011`, `100`, `101`, `110`, `111`

## Estructura simplificada

- `src/automata_params.py`: contiene la definición formal del AFN (`Q`, `Σ`, `δ`, `q0`, `F`) y el catálogo de productos.
- `src/main.py`: contiene el motor del AFN, ejecución de cadenas y CLI.
- `ui/index.html`, `ui/styles.css`, `ui/app.js`: interfaz web animada de máquina expendedora.

## Ejecución

Desde la raíz del proyecto:

```bash
python src/main.py
```

## Interfaz web animada

Desde la carpeta `ui`:

```bash
python -m http.server 5500
```

Luego abre:

```text
http://127.0.0.1:5500/index.html
```

## Qué expone la lógica

- 5 parámetros del AFN: `Q`, `Σ`, `δ`, `q0`, `F`
- Grafo de transiciones (lista de adyacencia)
- Tabla de transición
- Simulación del AFN sobre una cadena
- Resolución de productos aceptados (incluyendo estados múltiples por no determinismo)
