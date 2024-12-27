setContrastMode()

function getLuminance (rgb) {
    const [rr, gg, bb] = getRGB(rgb).map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}

function getRGB(color) {
    const rgb = color.match(/\d+/g);
    return rgb ? rgb.map(Number) : [0, 0, 0];
}

function getContrast(rgb1, rgb2) {
    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}

function getBrightness(rgb) {
    const [r, g, b] = getRGB(rgb);
    return Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
}

function setContrastMode() {
    const root = document.querySelector(".body.apply-styles")
    if (root == null) {
        return;
    }

    setContrastRecursion(root);
}

function setContrastRecursion(node, bgColor = 'transparent') {
    if (node.style.backgroundColor !== "" || node.style.color !== "") {
        console.log("element " + node.tagName + " má explicitní barvu, kontrastím...")
        const fontColor = window.getComputedStyle(node).color;
        bgColor = getBackgroundColor(node, bgColor);
        console.log("font má barvu " + fontColor + ", pozadí " + bgColor);

        if (getContrast(fontColor, bgColor) < 2.5) {
            console.log("element " + node.tagName + " se nedá přečíst, kontrast: " + getContrast(fontColor, bgColor))
            setNodeTextColor(node, fontColor, bgColor)
        }
    }

    Array.from(node.children).forEach(child => {
        setContrastRecursion(child, bgColor);
    })
}

function setNodeTextColor(node, fontColor, bgColor) {
    if (fontColor === 'rgb(0, 0, 0)') {
        node.style.removeProperty("color");
        return;
    } else if (fontColor === 'rgb(255, 255, 255)') {
        node.style.color = shade(fontColor, 1);
        return;
    }

    if (getBrightness(bgColor) > 125) {
        node.style.color = shade(fontColor);
    } else {
        node.style.color = tint(fontColor);
    }

    console.log("element " + node.tagName + " se nedá přečíst, měním z " + fontColor + " na " + node.style.color)
}

function tint(rgb, tint_factor = 0.2) {
    const [r, g, b] = getRGB(rgb)
    console.log("moc tmavé, tintím " + `rgb(${r}, ${g}, ${b}), factor: ${tint_factor}`);
    const newR = r + (255 - r) * tint_factor
    const newG = g + (255 - g) * tint_factor
    const newB = b + (255 - b) * tint_factor
    return `rgb(${newR}, ${newG}, ${newB})`;
}

function shade(rgb, shade_factor = 0.2) {
    const [r, g, b] = getRGB(rgb)
    console.log("moc světlé, šejdím " + `rgb(${r}, ${g}, ${b}), factor: ${shade_factor}`);
    const newR = r * (1 - shade_factor)
    const newG = g * (1 - shade_factor)
    const newB = b * (1 - shade_factor)
    return `rgb(${newR}, ${newG}, ${newB})`;
}

function getBackgroundColorFromAncestors(node) {
    let bgColor = 'transparent'

    while (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        node = node.parentElement;
        if (!node) return 'rgba(18,18,18)';
        bgColor = window.getComputedStyle(node).backgroundColor;
    }

    return bgColor;
}

function getBackgroundColor(node, inheritedBg) {
    let bgColor = window.getComputedStyle(node).backgroundColor;

    if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return bgColor;
    }

    if (inheritedBg !== 'transparent') {
        return inheritedBg;
    }

    return getBackgroundColorFromAncestors(node);
}
