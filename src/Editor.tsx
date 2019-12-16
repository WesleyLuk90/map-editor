import React, { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { ImageDisplay } from "./ImageDisplay";
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
}

export class View {
    constructor(readonly point: Point, readonly scale: number) {}

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

export function Editor({ file }: { file: File | null }) {
    const [url, setUrl] = useState<string | null>(null);
    const [point, setPoint] = useState(new Point(100, 100));
    const [dragging, setDragging] = useState(false);

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
        if (dragging) {
            const position = getScreenPosition(e);
            if (position == null) {
                return;
            }
            setPoint(view.containedImagePixel(position));
        }
    }

    function stopDrag() {
        setDragging(false);
    }

    return (
        <div className="editor">
            <svg
                className="svg"
                onWheel={onWheel}
                ref={svg}
                onMouseMove={onMouseMove}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                cursor={dragging ? "move" : undefined}
            >
                {url && <ImageDisplay url={url} view={view} />}
                <Grid view={view} />
                <Target
                    position={point}
                    view={view}
                    onMouseDown={() => setDragging(true)}
                />
            </svg>
        </div>
    );
}
