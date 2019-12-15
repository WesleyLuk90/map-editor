import React from "react";

export function Controls({ onSelect }: { onSelect: (file: File) => void }) {
    const ref = React.createRef<HTMLInputElement>();

    function handleSelect() {
        if (ref.current == null) {
            return;
        }
        const file = ref.current.files && ref.current.files[0];
        if (!file) {
            return;
        }
        onSelect(file);
    }

    return (
        <div className="controls">
            <input type="file" ref={ref} onChange={handleSelect} />
        </div>
    );
}
