/// <reference path="references.ts" />
interface JQueryStatic {
    TreeBurst?: any;
}

(($: JQueryStatic) => {
    $.TreeBurst = (method, args: any[]) => {
        // Method calling logic
        if (TreeBurst[method]) {

            return TreeBurst[method].apply(TreeBurst, [this].concat(args));

        } else if (typeof method === 'object' || !method) {

            return TreeBurst.init.call(TreeBurst, this, arguments[0]);

        } else {

            $.error('Method ' + method + ' does not exist on jQuery.TreeBurst');

        }
    };
})(jQuery);