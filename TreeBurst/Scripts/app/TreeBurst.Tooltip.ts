/// <reference path="references.ts" />
module TreeBurst {

    export interface TooltipOptions {
        $: JQueryStatic;
        title: string;
        content: string;
        x: number;
        y: number;
    }

    export class Tooltip {

        private tooltipTemplate = '<div class="tooltip"><header></header><div class="content"></div></div>';

        private $: JQueryStatic;
        private title: string;
        private content: string;
        private x: number;
        private y: number;

        private tooltipDom: JQuery;

        constructor(opts: TooltipOptions) {
            this.$ = opts.$;
            this.title = opts.title;
            this.content = opts.content;
            this.x = opts.x;
            this.y = opts.y;

            // first remove all tooltips
            // TODO: do we ever want more than one?
            this.$('.tooltip').remove();

            this.tooltipDom = this.$(this.tooltipTemplate);

            this.$('.tbContainer').append(this.tooltipDom);

        }

        public show(): void {

            //this.tooltipDom.find('header').text(this.title);
            //this.tooltipDom.find('.content').text(this.content);

            //this.tooltipDom.css('left', this.x + 100 + "px");
            //this.tooltipDom.css('top', this.y + 100 + "px");
            this.tooltipDom.fadeIn("fast");

        }

        public update(x: number, y: number, title: string, content: string): void {
            this.x = x;
            this.y = y;
            this.title = title;
            this.content = content;

            this.tooltipDom.find('header').text(this.title);
            this.tooltipDom.find('.content').text(this.content);
            this.tooltipDom.css('left', this.x + 100 + "px");
            this.tooltipDom.css('top', this.y - 100 + "px");
        }

        public hide(): void {
            this.tooltipDom.fadeOut("fast");
        }
    }
}