class SparkLine extends HTMLElement {
	svg;
	data;
	dataRects;

	static get observedAttributes(): Array<string> {
		return ["points"];
	}

	get points(): Array<number> {
		if (!this.hasAttribute("points"))
			return [];
		const points: Array<number> = [];
		const regMatches = this.getAttribute("points").
			matchAll(/[0-9]+[,.]{1}[0-9]+/g);
		if (regMatches)
			for (const match of regMatches)
				points.push(Number(match[0]));
		return points;
	}
	
	setData(data: Array<number>): void {
		this.clearGraph();
		this.data = data;
		if (data.length === 0)
			return;
		this.adjustViewBox();
		this.populateGraph();
	}
	
	constructor() {
		super();
		this.attachShadow({mode: "open"});
		this.svg = document.createElementNS("http://www.w3.org/2000/svg",
											"svg");
		this.svg.setAttributeNS(null, "preserveAspectRatio", "none");
		this.svg.setAttributeNS(null, "width", "2em");
		this.svg.setAttributeNS(null, "height", "1em");
		this.shadowRoot.append(this.svg);
	}
	private connectedCallback(): void {
		this.setData(this.points);
	}
	private attributeChangedCallback(attr: string,
									 current: string,
									 previous: string): void {
		switch (attr) {
			case ("points"):
				this.setData(this.points);
				break;
		}
	}
	
	private adjustViewBox(): void {
		this.svg.setAttributeNS(null, "viewBox",
								`0 0 ${this.data.length} 1`);
	}
	private populateGraph(): void {
		const group = document.createElementNS("http://www.w3.org/2000/svg",
											   "g");
		// const rectangles: Array<SVGRectElement> = [];
		for (let i = 0; i < this.data.length; ++i) {
			const rect = this.createRect(i, this.data[i])
			const parts: Array<string> = [];
			if (i === 0)
				parts.push("first");
			if (i === (this.data.length - 1))
				parts.push("last");
			if ((i%2) === 0)
				parts.push("even");
			else
				parts.push("odd");
			rect.setAttributeNS(null, "part", parts.join(" "));
			group.append(rect);
			// rectangles.push(rect);
		}
		this.svg.append(group);
	}
	private createRect(index: number, height: number): SVGRectElement {
		const rect = document.createElementNS("http://www.w3.org/2000/svg",
												  "rect");
		rect.setAttributeNS(null, "width", "1");
		rect.setAttributeNS(null, "height", `${height}`);
		rect.setAttributeNS(null, "x", `${index}`);
		rect.setAttributeNS(null, "y", `${1 - height}`);
		return rect;
	}
	private clearGraph(): void {
		for (const rect of this.svg.children)
			rect.remove();
	}
}
customElements.define("spark-line", SparkLine);
