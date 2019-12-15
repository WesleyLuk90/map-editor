import React, { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { ImageDisplay } from "./ImageDisplay";

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
}

export function Editor({ file }: { file: File | null }) {
    const [url, setUrl] = useState<string | null>(null);

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

    function onWheel(e: React.WheelEvent<SVGElement>) {
        if (svg.current != null) {
            const rect = svg.current.getBoundingClientRect();
            setView(
                view.updateScale(
                    e.deltaY / 100,
                    new Point(e.clientX - rect.left, e.clientY - rect.top)
                )
            );
        }
    }

    return (
        <div className="editor">
            <svg className="svg" onWheel={onWheel} ref={svg}>
                {url && <ImageDisplay url={url} view={view} />}
                <Grid view={view} />
            </svg>
        </div>
    );
}
