class Sparkline extends HTMLElement {
    svg;
    data;
    dataRects;
    static get observedAttributes() {
        return ["points"];
    }
    get points() {
        if (!this.hasAttribute("points"))
            return [];
        const points = [];
        const regMatches = this.getAttribute("points").
            matchAll(/[0-9]+[,.]{1}[0-9]+/g);
        if (regMatches)
            for (const match of regMatches)
                points.push(Number(match[0]));
        return points;
    }
    setData(data) {
        this.clearGraph();
        this.data = data;
        if (data.length === 0)
            return;
        this.adjustViewBox();
        this.populateGraph();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttributeNS(null, "preserveAspectRatio", "none");
        this.svg.setAttributeNS(null, "width", "2em");
        this.svg.setAttributeNS(null, "height", "1em");
        this.shadowRoot.append(this.svg);
    }
    connectedCallback() {
        this.setData(this.points);
    }
    attributeChangedCallback(attr, current, previous) {
        switch (attr) {
            case ("points"):
                this.setData(this.points);
                break;
        }
    }
    adjustViewBox() {
        this.svg.setAttributeNS(null, "viewBox", `0 0 ${this.data.length} 1`);
    }
    populateGraph() {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        for (let i = 0; i < this.data.length; ++i) {
            const rect = this.createRect(i, this.data[i]);
            const parts = [];
            if (i === 0)
                parts.push("first");
            if (i === (this.data.length - 1))
                parts.push("last");
            if ((i % 2) === 0)
                parts.push("even");
            else
                parts.push("odd");
            rect.setAttributeNS(null, "part", parts.join(" "));
            group.append(rect);
        }
        this.svg.append(group);
    }
    createRect(index, height) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttributeNS(null, "width", "1");
        rect.setAttributeNS(null, "height", `${height}`);
        rect.setAttributeNS(null, "x", `${index}`);
        rect.setAttributeNS(null, "y", `${1 - height}`);
        return rect;
    }
    clearGraph() {
        for (const rect of this.svg.children)
            rect.remove();
    }
}
customElements.define("spark-", Sparkline);
