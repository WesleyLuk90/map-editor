export function range(start: number, end?: number) {
    const a = end == null ? 0 : start;
    const b = end == null ? start : end;
    return new Array(b - a).fill(0).map((i, j) => j + a);
}
