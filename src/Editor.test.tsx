import { Point, View } from "./Editor";

describe("View", () => {
    it("should scale", () => {
        const view = new View(new Point(-100, -50), 2);
        const newView = view.updateScale(-10, new Point(100, 100));
        expect(newView).toEqual(new View(new Point(-300, -200), 4));
    });
});
