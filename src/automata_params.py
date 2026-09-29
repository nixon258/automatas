from collections import defaultdict
from typing import Dict, List, Optional, Set, Tuple

LEVEL1: List[str] = ["q_0", "q_0_alt", "q_1", "q_1_alt"]
LEVEL2: List[str] = ["q_00", "q_01", "q_10", "q_11"]
LEVEL3: List[str] = [
    "q_000", "q_001", "q_010", "q_011",
    "q_100", "q_101", "q_110", "q_111",
]
LEVEL4: List[str] = [
    "q_0000", "q_0001", "q_0010", "q_0011",
    "q_0100", "q_0101", "q_0110", "q_0111",
    "q_1000", "q_1001", "q_1010", "q_1011",
    "q_1100", "q_1101", "q_1110", "q_1111",
]

STATES: Set[str] = set(["q0", *LEVEL1, *LEVEL2, *LEVEL3, *LEVEL4])

ALPHABET: Set[str] = {"0", "1"}
INITIAL_STATE: str = "q0"
FINAL_STATES: Set[str] = set([*LEVEL2, *LEVEL3, *LEVEL4])
ACCEPTING_STATES: Set[str] = set(FINAL_STATES)

SYMBOL_VALUES: Dict[str, int] = {"0": 500, "1": 1000}
MIN_LENGTH: int = 2
MAX_LENGTH: int = 4
AMOUNTS: List[int] = [1000, 1500, 2000, 2500, 3000, 3500, 4000]


def value_of_sequence(sequence: str) -> int:
    ones = sum(1 for symbol in sequence if symbol == "1")
    return 500 * (len(sequence) + ones)


TRANSITIONS: List[Tuple[str, Optional[str], str]] = [
    ("q0", "0", "q_0"),
    ("q0", "0", "q_0_alt"),
    ("q0", "1", "q_1"),
    ("q0", "1", "q_1_alt"),
    ("q_0", "0", "q_00"),
    ("q_0", "1", "q_01"),
    ("q_0_alt", "0", "q_00"),
    ("q_0_alt", "1", "q_01"),
    ("q_1", "0", "q_10"),
    ("q_1", "1", "q_11"),
    ("q_1_alt", "0", "q_10"),
    ("q_1_alt", "1", "q_11"),
    ("q_00", "0", "q_000"),
    ("q_00", "1", "q_001"),
    ("q_01", "0", "q_010"),
    ("q_01", "1", "q_011"),
    ("q_10", "0", "q_100"),
    ("q_10", "1", "q_101"),
    ("q_11", "0", "q_110"),
    ("q_11", "1", "q_111"),
    ("q_000", "0", "q_0000"),
    ("q_000", "1", "q_0001"),
    ("q_001", "0", "q_0010"),
    ("q_001", "1", "q_0011"),
    ("q_010", "0", "q_0100"),
    ("q_010", "1", "q_0101"),
    ("q_011", "0", "q_0110"),
    ("q_011", "1", "q_0111"),
    ("q_100", "0", "q_1000"),
    ("q_100", "1", "q_1001"),
    ("q_101", "0", "q_1010"),
    ("q_101", "1", "q_1011"),
    ("q_110", "0", "q_1100"),
    ("q_110", "1", "q_1101"),
    ("q_111", "0", "q_1110"),
    ("q_111", "1", "q_1111"),
]

PRODUCTS_BY_AMOUNT: Dict[int, Dict[str, object]] = {
    1000: {"internal_id": "P1000-BOMBOMBUM", "display_code": "1000", "name": "Bombom Bum Fresa", "price": 1000},
    1500: {"internal_id": "P1500-FESTIVAL", "display_code": "1500", "name": "Galletas Festival Vainilla", "price": 1500},
    2000: {"internal_id": "P2000-CHOCORAMO", "display_code": "2000", "name": "Chocoramo Mini", "price": 2000},
    2500: {"internal_id": "P2500-MARGARITA", "display_code": "2500", "name": "Papas Margarita Natural", "price": 2500},
    3000: {"internal_id": "P3000-JET", "display_code": "3000", "name": "Chocolate Jet", "price": 3000},
    3500: {"internal_id": "P3500-MANIMOTO", "display_code": "3500", "name": "Manimoto", "price": 3500},
    4000: {"internal_id": "P4000-DETODITO", "display_code": "4000", "name": "De Todito Natural", "price": 4000},
}

PRODUCTS_BY_STATE: Dict[str, Dict[str, object]] = {
    state: PRODUCTS_BY_AMOUNT[value_of_sequence(state.replace("q_", ""))]
    for state in ACCEPTING_STATES
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