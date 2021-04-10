import { App } from "vue";

import "./tooltip.css";

enum TooltipPlacement {
  Under,
  Above
}

type TooltipTarget = {
  element: HTMLElement;
  tooltip: string;
  placement: TooltipPlacement;
};

export default class ContextMenuManager {
  element: HTMLElement;
  target: TooltipTarget | null = null;

  constructor() {
    this.element = document.createElement("div");
    this.element.id = "tooltip";
    document.body.appendChild(this.element);
    document.body.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.body.addEventListener("mousedown", this.onMouseDown.bind(this));
  }

  onMouseMove(event: MouseEvent) {
    if (!event.target) return;

    const element = event.target as HTMLElement;

    const tooltip = element.getAttribute("tooltip");
    if (tooltip) {
      let placement = TooltipPlacement.Under;
      if (element.hasAttribute("tooltip-above"))
        placement = TooltipPlacement.Above;

      this.setTarget({ element, tooltip, placement });
    } else if (this.target && element !== this.target.element) {
      this.clearTarget();
    }
  }

  onMouseDown(_: MouseEvent) {
    this.clearTarget();
  }

  setTarget(target: TooltipTarget) {
    if (this.target && target.element == this.target.element) return;

    this.target = target;

    this.element.innerHTML = target.tooltip;

    this.element.classList.remove("placement-under");
    this.element.classList.remove("placement-above");
    if (target.placement == TooltipPlacement.Above)
      this.element.classList.add("placement-above");
    else if (target.placement == TooltipPlacement.Under)
      this.element.classList.add("placement-under");

    console.log(target.placement);
    // Trick to make the text render before using the element's offsetWidth
    setTimeout(() => {
      const bounds = target.element.getBoundingClientRect();
      this.element.style.left = `${bounds.left + bounds.width / 2 - this.element.offsetWidth / 2}px`;

      if (target.placement == TooltipPlacement.Above)
        this.element.style.top = `${bounds.top - this.element.offsetHeight - 5}px`;
      else if (target.placement == TooltipPlacement.Under)
        this.element.style.top = `${bounds.top + bounds.height + 5}px`;

      this.element.classList.add("visible");
    }, 1);
  }

  clearTarget() {
    this.target = null;
    this.element.innerHTML = "";
    this.element.classList.remove("visible");
  }
}

export function createTooltip(): (app: App) => void {
  const tooltip = new ContextMenuManager();
  return (app) => {
    app.config.globalProperties.$tooltip = tooltip;
  };
}
