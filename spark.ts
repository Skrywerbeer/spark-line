class SparkLine extends HTMLElement {
	svg;
	data;
	dataRects;

	setData(data: Array<number>): void {
		this.clearGraph();
		this.data = data;
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
		console.log("connected!");
		let d = [];
		for (let i = 0; i < 8; i++)
			d.push(Math.random());
		this.setData(d);
	}
	private adjustViewBox(): void {
		this.svg.setAttributeNS(null, "viewBox",
								`0 0 ${this.data.length} 1`);
	}
	private populateGraph(): void {
		const group = document.createElementNS("http://www.w3.org/2000/svg",
											   "g");
		for (let i = 0; i < this.data.length; ++i) {
			const rect = this.createRect(i, this.data[i])
			rect.setAttributeNS(null, "part", "entry");
			group.append(rect);
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
