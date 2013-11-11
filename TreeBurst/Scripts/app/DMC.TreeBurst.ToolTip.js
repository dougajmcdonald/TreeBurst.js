var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        var Tooltip = (function () {
            function Tooltip(opts) {
                this.tooltipTemplate = '<div class="tooltip"><header></header><div class="content"></div></div>';
                this.$ = opts.$;
                this.title = opts.title;
                this.content = opts.content;
                this.x = opts.x;
                this.y = opts.y;

                this.tooltipDom = this.$(this.tooltipTemplate);
            }
            Tooltip.prototype.show = function () {
                //this.tooltipDom.find('header').text(this.title);
                //this.tooltipDom.find('.content').text(this.content);
                //this.tooltipDom.css('left', this.x + 100 + "px");
                //this.tooltipDom.css('top', this.y + 100 + "px");
                this.$('.tbContainer').append(this.tooltipDom);

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
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
