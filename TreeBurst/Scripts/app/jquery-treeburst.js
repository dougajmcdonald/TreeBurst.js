var _this = this;
(function ($) {
    $.TreeBurst = function (method, args) {
        if (TreeBurst[method]) {
            return TreeBurst[method].apply(TreeBurst, [_this].concat(args));
        } else if (typeof method === 'object' || !method) {
            return TreeBurst.init.call(TreeBurst, _this, arguments[0]);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.TreeBurst');
        }
    };
})(jQuery);
