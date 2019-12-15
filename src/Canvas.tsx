import React, { useEffect, useState } from "react";
import { isContext } from "vm";

class Size {
    constructor(
        readonly x: number,
        readonly y: number,
        readonly scale: number
    ) {}
}

export function Canvas({ image }: { image: File | null }) {
    const container = React.createRef<HTMLDivElement>();
    const ref = React.createRef<HTMLCanvasElement>();

    const [size, setSize] = useState(new Size(0, 0, 1));

    function render(ctx: CanvasRenderingContext2D, image: ImageBitmap) {
        ctx.drawImage(
            image,
            size.x,
            size.y,
            image.width * size.scale,
            image.height * size.scale
        );
    }

    useEffect(() => {
        if (!image) {
            return;
        }
        if (!ref.current) {
            return;
        }
        const canvas = ref.current;
        const context = canvas.getContext("2d");
        if (context == null) {
            return;
        }
        createImageBitmap(image).then(img => {
            context.drawImage(img, 0, 0);
        });
    }, [image, ref]);

    return (
        <div className="canvas" ref={container}>
            <canvas ref={ref} />
        </div>
    );
}
