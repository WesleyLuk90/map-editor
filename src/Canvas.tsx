import React, { useEffect } from "react";

export function Canvas({ image }: { image: File | null }) {
    const container = React.createRef<HTMLDivElement>();
    const ref = React.createRef<HTMLCanvasElement>();

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
