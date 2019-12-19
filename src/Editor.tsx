import React, { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { ImageDisplay } from "./ImageDisplay";
import { SquaresGrid } from "./SquaresGrid";
import { Target } from "./Target";

export class Point {
    constructor(readonly x: number, readonly y: number) {}

    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }

    sub(point: Point) {
        return new Point(this.x - point.x, this.y - point.y);
    }

    scale(scale: number) {
        return new Point(this.x * scale, this.y * scale);
    }

    mod(number: number) {
        return new Point(this.x % number, this.y % number);
    }

    abs() {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }

    toString(decimals: number = 2) {
        return `(${this.x.toFixed(decimals)}, ${this.y.toFixed(decimals)})`;
    }
}

export class View {
    constructor(readonly point: Point, readonly scale: number) {}

    move(point: Point) {
        return new View(this.point.add(point), this.scale);
    }

    updateScale(delta: number, point: Point) {
        const newScale = this.scale * (1 - delta / 10);
        return new View(
            this.point
                .sub(point)
                .scale(1 / this.scale)
                .scale(newScale)
                .add(point),
            newScale
        );
    }

    nearestImagePixel(point: Point) {
        const delta = point.sub(this.point).scale(1 / this.scale);
        return new Point(Math.round(delta.x), Math.round(delta.y));
    }

    containedImagePixel(point: Point) {
        const delta = point.sub(this.point).scale(1 / this.scale);
        return new Point(Math.floor(delta.x), Math.floor(delta.y));
    }

    pixelToDisplay(point: Point) {
        return this.point.add(point.scale(this.scale));
    }
}

export function Editor({
    file,
    point1,
    setPoint1,
    point2,
    setPoint2,
    xCells,
    yCells
}: {
    file: File | null;
    point1: Point;
    setPoint1: (p: Point) => void;
    point2: Point;
    setPoint2: (p: Point) => void;
    xCells: number;
    yCells: number;
}) {
    const [url, setUrl] = useState<string | null>(null);
    const [dragging1, setDragging1] = useState(false);
    const [dragging2, setDragging2] = useState(false);
    const [pan, setPanning] = useState<Point | null>(null);

    useEffect(() => {
        if (file != null) {
            const u = URL.createObjectURL(file);
            setUrl(u);
            return () => {
                URL.revokeObjectURL(u);
            };
        } else {
            setUrl(null);
        }
    }, [file]);

    const svg = React.createRef<SVGSVGElement>();
    const [view, setView] = useState(new View(new Point(0, 0), 1));

    function getScreenPosition(e: React.MouseEvent<any>) {
        if (svg.current == null) {
            return null;
        }
        const rect = svg.current.getBoundingClientRect();
        return new Point(e.clientX - rect.left, e.clientY - rect.top);
    }

    function onWheel(e: React.WheelEvent<SVGElement>) {
        const position = getScreenPosition(e);
        if (position == null) {
            return;
        }
        setView(view.updateScale(e.deltaY / 100, position));
    }

    function onMouseMove(e: React.MouseEvent<SVGSVGElement>) {
        if (dragging1) {
            const position = getScreenPosition(e);
            if (position == null) {
                return;
            }
            setPoint1(view.containedImagePixel(position));
        }
        if (dragging2) {
            const position = getScreenPosition(e);
            if (position == null) {
                return;
            }
            setPoint2(view.containedImagePixel(position));
        }
        if (pan) {
            const newPoint = new Point(e.clientX, e.clientY);
            const delta = new Point(e.clientX, e.clientY).sub(pan);
            setView(view.move(delta));
            setPanning(newPoint);
        }
    }

    function stopDrag() {
        setDragging1(false);
        setDragging2(false);
        setPanning(null);
    }

    function startPan(e: React.MouseEvent<SVGSVGElement>) {
        setPanning(new Point(e.clientX, e.clientY));
    }

    return (
        <div className="editor">
            <svg
                className="svg"
                onWheel={onWheel}
                ref={svg}
                onMouseDown={startPan}
                onMouseMove={onMouseMove}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                cursor={dragging1 || dragging2 ? "move" : undefined}
            >
                {url && <ImageDisplay url={url} view={view} />}
                <Grid view={view} />
                <Target
                    position={point1}
                    view={view}
                    onMouseDown={() => setDragging1(true)}
                />
                <Target
                    position={point2}
                    view={view}
                    onMouseDown={() => setDragging2(true)}
                />
                <SquaresGrid
                    point1={point1}
                    point2={point2}
                    view={view}
                    xCells={xCells}
                    yCells={yCells}
                />
            </svg>
        </div>
    );
}
