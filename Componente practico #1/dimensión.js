
const celdas = () => document.querySelectorAll("#vector-numerico tbody tr:nth-child(2) td");
const obtenerVector = () => [...celdas()].map(td => parseInt(td.textContent));
const pintarVector = (vector) => {
    celdas().forEach((td, i) => td.textContent = vector[i]);
};
const setRes = (id, valor) => {
    document.getElementById(id).textContent = valor;
};

document.getElementById("cargar").onclick = () => {
    let v = obtenerVector().map(() => Math.floor(Math.random() * 100));
    pintarVector(v);
};

document.getElementById("vaciar").onclick = () => {
    pintarVector(obtenerVector().map(() => 0));
};

document.getElementById("presentar").onclick = () => {
    alert(obtenerVector().join(", "));
};

document.getElementById("mayor").onclick = () =>
    setRes("res-mayor", Math.max(...obtenerVector()));
document.getElementById("menor").onclick = () =>
    setRes("res-menor", Math.min(...obtenerVector()));
document.getElementById("sumar").onclick = () =>
    setRes("res-suma", obtenerVector().reduce((a, b) => a + b, 0));
document.getElementById("producto").onclick = () =>
    setRes("res-producto", obtenerVector().reduce((a, b) => a * b, 1));

document.getElementById("media").onclick = () => {
    let v = obtenerVector();
    setRes("res-media", (v.reduce((a, b) => a + b, 0) / v.length).toFixed(2));
};
document.getElementById("mediana").onclick = () => {
    let v = [...obtenerVector()].sort((a, b) => a - b);
    let m = Math.floor(v.length / 2);
    let res = v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
    setRes("res-mediana", res);
};
document.getElementById("moda").onclick = () => {
    let v = obtenerVector();
    let freq = {};
    v.forEach(n => freq[n] = (freq[n] || 0) + 1);

    let moda = Object.keys(freq).reduce((a, b) =>
        freq[a] > freq[b] ? a : b
    );

    setRes("res-moda", moda);
};

function ordenar(metodo, tipo) {
    let v = [...obtenerVector()];

    if (metodo === "burbuja") burbuja(v, tipo);
    else seleccion(v, tipo);

    setRes(`res-${metodo}-${tipo}`, v.join(", "));
}

function burbuja(arr, tipo) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (
                (tipo === "asc" && arr[j] > arr[j + 1]) ||
                (tipo === "desc" && arr[j] < arr[j + 1])
            ) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

function seleccion(arr, tipo) {
    for (let i = 0; i < arr.length; i++) {
        let idx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (
                (tipo === "asc" && arr[j] < arr[idx]) ||
                (tipo === "desc" && arr[j] > arr[idx])
            ) {
                idx = j;
            }
        }
        [arr[i], arr[idx]] = [arr[idx], arr[i]];
    }
}
