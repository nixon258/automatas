from dataclasses import dataclass
from pprint import pprint
from typing import Dict, FrozenSet, Iterable, List, Optional, Set, Tuple

from automata_params import (
    ACCEPTING_STATES,
    ALPHABET,
    INITIAL_STATE,
    MAX_LENGTH,
    MIN_LENGTH,
    PRODUCTS_BY_STATE,
    STATES,
    TRANSITIONS,
    get_five_parameters,
)

EPSILON: Optional[str] = None


@dataclass(frozen=True)
class Product:
    internal_id: str
    display_code: str
    name: str
    price: int


@dataclass(frozen=True)
class Transition:
    source: str
    symbol: Optional[str]
    target: str


@dataclass(frozen=True)
class NFASimulationResult:
    input_symbols: Tuple[str, ...]
    state_history: Tuple[FrozenSet[str], ...]
    final_states: FrozenSet[str]
    accepted_states: FrozenSet[str]


@dataclass(frozen=True)
class VendingResponse:
    input_sequence: str
    accepted: bool
    accepted_products: List[Product]
    final_states: List[str]
    accepted_states: List[str]


class NFA:
    def __init__(
        self,
        states: Set[str],
        alphabet: Set[str],
        initial_state: str,
        accepting_states: Set[str],
        transitions: Iterable[Transition],
        state_products: Optional[Dict[str, Product]] = None,
    ) -> None:
        self.states = set(states)
        self.alphabet = set(alphabet)
        self.initial_state = initial_state
        self.accepting_states = set(accepting_states)
        self.state_products = dict(state_products or {})

        self.transition_function: Dict[Tuple[str, Optional[str]], Set[str]] = {}
        for transition in transitions:
            key = (transition.source, transition.symbol)
            self.transition_function.setdefault(key, set()).add(transition.target)

        self._validate()

    def _validate(self) -> None:
        if self.initial_state not in self.states:
            raise ValueError("El estado inicial no pertenece a Q")

        unknown_accepting = self.accepting_states - self.states
        if unknown_accepting:
            raise ValueError(f"Estados de aceptación inválidos: {unknown_accepting}")

        for (source, symbol), targets in self.transition_function.items():
            if source not in self.states:
                raise ValueError(f"Estado origen inválido en transición: {source}")
            if symbol is not None and symbol not in self.alphabet:
                raise ValueError(f"Símbolo inválido en transición: {symbol}")
            unknown_targets = targets - self.states
            if unknown_targets:
                raise ValueError(f"Estados destino inválidos: {unknown_targets}")

    def epsilon_closure(self, current_states: Set[str]) -> Set[str]:
        closure = set(current_states)
        stack = list(current_states)

        while stack:
            state = stack.pop()
            epsilon_targets = self.transition_function.get((state, EPSILON), set())
            for target in epsilon_targets:
                if target not in closure:
                    closure.add(target)
                    stack.append(target)

        return closure

    def move(self, current_states: Set[str], symbol: str) -> Set[str]:
        next_states: Set[str] = set()
        for state in current_states:
            next_states.update(self.transition_function.get((state, symbol), set()))
        return next_states

    def run(self, input_symbols: Iterable[str]) -> NFASimulationResult:
        symbols = tuple(input_symbols)
        invalid = [symbol for symbol in symbols if symbol not in self.alphabet]
        if invalid:
            raise ValueError(f"Símbolos fuera del alfabeto: {invalid}")

        current_states = self.epsilon_closure({self.initial_state})
        history: List[FrozenSet[str]] = [frozenset(current_states)]

        for symbol in symbols:
            moved = self.move(current_states, symbol)
            current_states = self.epsilon_closure(moved)
            history.append(frozenset(current_states))

        accepted = current_states.intersection(self.accepting_states)
        return NFASimulationResult(
            input_symbols=symbols,
            state_history=tuple(history),
            final_states=frozenset(current_states),
            accepted_states=frozenset(accepted),
        )

    def accepted_products(self, result: NFASimulationResult) -> List[Product]:
        products: List[Product] = []
        for state in sorted(result.accepted_states):
            product = self.state_products.get(state)
            if product:
                products.append(product)
        return products

    def five_parameters(self) -> Dict[str, object]:
        delta = {
            f"δ({state}, {symbol if symbol is not None else 'ε'})": sorted(targets)
            for (state, symbol), targets in sorted(
                self.transition_function.items(), key=lambda item: (item[0][0], str(item[0][1]))
            )
        }

        return {
            "Q": sorted(self.states),
            "Σ": sorted(self.alphabet),
            "δ": delta,
            "q0": self.initial_state,
            "F": sorted(self.accepting_states),
        }

    def transition_table(self) -> List[Dict[str, object]]:
        symbols = [*sorted(self.alphabet), "ε"]
        table: List[Dict[str, object]] = []

        for state in sorted(self.states):
            row: Dict[str, object] = {"state": state}
            for symbol in symbols:
                key_symbol: Optional[str] = None if symbol == "ε" else symbol
                row[symbol] = sorted(self.transition_function.get((state, key_symbol), set()))
            table.append(row)

        return table

    def graph_adjacency(self) -> Dict[str, List[Dict[str, str]]]:
        adjacency: Dict[str, List[Dict[str, str]]] = {state: [] for state in sorted(self.states)}

        for (source, symbol), targets in sorted(
            self.transition_function.items(), key=lambda item: (item[0][0], str(item[0][1]))
        ):
            label = symbol if symbol is not None else "ε"
            for target in sorted(targets):
                adjacency[source].append({"symbol": label, "target": target})

        return adjacency


class VendingMachine:
    def __init__(self) -> None:
        transitions = [Transition(source, symbol, target) for source, symbol, target in TRANSITIONS]
        products = {
            state: Product(
                internal_id=str(values["internal_id"]),
                display_code=str(values["display_code"]),
                name=str(values["name"]),
                price=int(values["price"]),
            )
            for state, values in PRODUCTS_BY_STATE.items()
        }

        self.automaton = NFA(
            states=STATES,
            alphabet=ALPHABET,
            initial_state=INITIAL_STATE,
            accepting_states=ACCEPTING_STATES,
            transitions=transitions,
            state_products=products,
        )

    def evaluate(self, raw_sequence: str) -> VendingResponse:
        sequence = raw_sequence.strip()
        if not (MIN_LENGTH <= len(sequence) <= MAX_LENGTH):
            return VendingResponse(
                input_sequence=sequence,
                accepted=False,
                accepted_products=[],
                final_states=[],
                accepted_states=[],
            )
        result = self.automaton.run(list(sequence))
        products = self.automaton.accepted_products(result)
        return VendingResponse(
            input_sequence=sequence,
            accepted=len(result.accepted_states) > 0,
            accepted_products=products,
            final_states=sorted(result.final_states),
            accepted_states=sorted(result.accepted_states),
        )

    def get_formal_definition(self) -> Dict[str, object]:
        return get_five_parameters()

    def get_transition_table(self) -> List[Dict[str, object]]:
        return self.automaton.transition_table()

    def get_graph(self) -> Dict[str, List[Dict[str, str]]]:
        return self.automaton.graph_adjacency()


def run_cli(machine: VendingMachine) -> None:
    print("\n=== Máquina Expendedora AFN ===")
    print("Comandos:")
    print("  1) ver-afn      -> muestra Q, Σ, δ, q0, F")
    print("  2) ver-tabla    -> muestra tabla de transición")
    print("  3) ver-grafo    -> muestra grafo (lista de adyacencia)")
    print("  4) probar       -> evalúa una cadena de entrada")
    print("  5) salir")

    while True:
        option = input("\nSelecciona una opción: ").strip().lower()

        if option in {"5", "salir"}:
            print("Finalizado.")
            return

        if option in {"1", "ver-afn"}:
            print("\nDefinición formal del AFN:")
            pprint(machine.get_formal_definition(), sort_dicts=False)
            continue

        if option in {"2", "ver-tabla"}:
            print("\nTabla de transición:")
            for row in machine.get_transition_table():
                print(row)
            continue

        if option in {"3", "ver-grafo"}:
            print("\nGrafo (adyacencia):")
            pprint(machine.get_graph(), sort_dicts=False)
            continue

        if option in {"4", "probar"}:
            sequence = input("Ingresa la cadena (solo símbolos del alfabeto): ").strip()
            try:
                response = machine.evaluate(sequence)
            except ValueError as exc:
                print(f"Error: {exc}")
                continue

            print("\nResultado:")
            print(f"- Cadena: {response.input_sequence}")
            if response.accepted:
                print(f"- La cadena {response.input_sequence} pertenece al AFN.")
            else:
                print(f"- La cadena {response.input_sequence} no pertenece al AFN.")
            print(f"- Estados finales activos: {response.final_states}")
            print(f"- Estados de aceptación activos: {response.accepted_states}")

            if response.accepted_products:
                print("- Productos dispensados:")
                for product in response.accepted_products:
                    print(f"  * {product.name} | id interno={product.internal_id}")
            continue

        print("Opción no válida.")


def main() -> None:
    machine = VendingMachine()
    run_cli(machine)


if __name__ == "__main__":
    main()
