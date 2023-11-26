import { extractColors, isColorLuminant } from "../utils/helpers";

describe("extractColors", () => {
    it('When color is a correct HEX, return an array containg the color twice', () => {
        const color = '#ff0000';
        const colors = extractColors(color);
        expect(colors).toEqual(['#ff0000', '#ff0000']);
    });

    it('When color is a css linear-gradient, return an array containing the colors', () => {
        const color = 'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)'
        const colors = extractColors(color);
        expect(colors).toEqual(['#ff0000', '#00ff00']);
    });

    it('When color is an empty string, return undefined', () => {
        const color = '';
        const colors = extractColors(color);
        expect(colors).toBeUndefined();
    });

    it('When color is not HEX nor linear-gradient, return undefined', () => {
        const color = 'Not Hex, nor linear-gradient';
        const colors = extractColors(color);
        expect(colors).toBeUndefined();
    });
});

describe('isColorLuminant', () => {
    it('When color array has white, return true', () => {
        const colors = ['#ffffff', '#ffffff'];
        const isLuminant = isColorLuminant(colors);
        expect(isLuminant).toBe(true);
    });

    it('When color array has black, return false', () => {
        const colors = ['#000000', '#000000'];
        const isLuminant = isColorLuminant(colors);
        expect(isLuminant).toBe(false);
    });

    it('When color array has white and black, return true', () => {
        const colors = ['#ffffff', '#000000'];
        const isLuminant = isColorLuminant(colors);
        expect(isLuminant).toBe(true);
    });
});

