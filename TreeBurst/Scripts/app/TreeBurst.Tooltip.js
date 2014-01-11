/// <reference path="references.ts" />
var TreeBurst;
(function (TreeBurst) {
    var Tooltip = (function () {
        function Tooltip(opts) {
            this.tooltipTemplate = '<div class="tooltip"><header></header><div class="content"></div></div>';
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
        Tooltip.prototype.show = function () {
            //this.tooltipDom.find('header').text(this.title);
            //this.tooltipDom.find('.content').text(this.content);
            //this.tooltipDom.css('left', this.x + 100 + "px");
            //this.tooltipDom.css('top', this.y + 100 + "px");
            this.tooltipDom.fadeIn("fast");
        };

        Tooltip.prototype.update = function (x, y, title, content) {
            this.x = x;
            this.y = y;
            this.title = title;
            this.content = content;

            this.tooltipDom.find('header').text(this.title);
            this.tooltipDom.find('.content').text(this.content);
            this.tooltipDom.css('left', this.x + 100 + "px");
            this.tooltipDom.css('top', this.y - 100 + "px");
        };

        Tooltip.prototype.hide = function () {
            this.tooltipDom.fadeOut("fast");
        };
        return Tooltip;
    })();
    TreeBurst.Tooltip = Tooltip;
})(TreeBurst || (TreeBurst = {}));
