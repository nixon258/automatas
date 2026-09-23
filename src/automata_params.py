from collections import defaultdict
from typing import Dict, List, Optional, Set, Tuple

STATES: Set[str] = {
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
}

ALPHABET: Set[str] = {"0", "1"}
INITIAL_STATE: str = "q0"
FINAL_STATES: Set[str] = {
    "q_product_000",
    "q_product_001",
    "q_product_010",
    "q_product_011",
    "q_product_100",
    "q_product_101",
    "q_product_110",
    "q_product_111",
}
ACCEPTING_STATES: Set[str] = set(FINAL_STATES)

TRANSITIONS: List[Tuple[str, Optional[str], str]] = [
    ("q0", "0", "q_after_0"),
    ("q0", "0", "q_after_0_alt"),
    ("q0", "1", "q_after_1"),
    ("q0", "1", "q_after_1_alt"),
    ("q_after_0", "0", "q_after_00"),
    ("q_after_0", "1", "q_after_01"),
    ("q_after_0_alt", "0", "q_after_00"),
    ("q_after_0_alt", "1", "q_after_01"),
    ("q_after_1", "0", "q_after_10"),
    ("q_after_1", "1", "q_after_11"),
    ("q_after_1_alt", "0", "q_after_10"),
    ("q_after_1_alt", "1", "q_after_11"),
    ("q_after_00", "0", "q_product_000"),
    ("q_after_00", "1", "q_product_001"),
    ("q_after_01", "0", "q_product_010"),
    ("q_after_01", "1", "q_product_011"),
    ("q_after_10", "0", "q_product_100"),
    ("q_after_10", "1", "q_product_101"),
    ("q_after_11", "0", "q_product_110"),
    ("q_after_11", "1", "q_product_111"),
]

PRODUCTS_BY_STATE: Dict[str, Dict[str, object]] = {
    "q_product_000": {
        "internal_id": "P1000-BOMBOMBUM-000",
        "display_code": "1000",
        "name": "Bombom Bum Fresa",
        "price": 1000,
    },
    "q_product_001": {
        "internal_id": "P2500-MARGARITA-001",
        "display_code": "2500",
        "name": "Papas Margarita Natural",
        "price": 2500,
    },
    "q_product_010": {
        "internal_id": "P1500-FESTIVAL-010",
        "display_code": "1500",
        "name": "Galletas Festival Vainilla",
        "price": 1500,
    },
    "q_product_011": {
        "internal_id": "P2000-CHOCORAMO-011",
        "display_code": "2000",
        "name": "Chocoramo Mini",
        "price": 2000,
    },
    "q_product_100": {
        "internal_id": "P2500-PONYMALTA-100",
        "display_code": "2500",
        "name": "Pony Malta Lata",
        "price": 2500,
    },
    "q_product_101": {
        "internal_id": "P3000-JET-101",
        "display_code": "3000",
        "name": "Chocolate Jet",
        "price": 3000,
    },
    "q_product_110": {
        "internal_id": "P3500-MANIMOTO-110",
        "display_code": "3500",
        "name": "Manimoto",
        "price": 3500,
    },
    "q_product_111": {
        "internal_id": "P4000-DETODITO-111",
        "display_code": "4000",
        "name": "De Todito Natural",
        "price": 4000,
    },
}


def get_five_parameters() -> Dict[str, object]:
    grouped_delta = defaultdict(set)
    for source, symbol, target in TRANSITIONS:
        grouped_delta[(source, symbol)].add(target)

    delta = {
        f"δ({state}, {symbol if symbol is not None else 'ε'})": sorted(targets)
        for (state, symbol), targets in sorted(grouped_delta.items(), key=lambda item: (item[0][0], str(item[0][1])))
    }

    return {
        "estado_inicial": INITIAL_STATE,
        "alfabeto": sorted(ALPHABET),
        "tabla_transicion": delta,
        "estado_final": sorted(FINAL_STATES),
        "estado_aceptacion": sorted(ACCEPTING_STATES),

        "Q": sorted(STATES),
        "Σ": sorted(ALPHABET),
        "δ": delta,
        "q0": INITIAL_STATE,
        "F": sorted(ACCEPTING_STATES),
    }
