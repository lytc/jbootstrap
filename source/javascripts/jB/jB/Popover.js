//= require ./Tooltip
/**
 * @example
 * var btn = jB.Button({
 *     text: 'Popover'
 * })
 *
 * jB.Popover({
 *     target: btn
 *     ,title: 'Popover'
 *     ,body: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
 * })
 *
 * btn
 *
 * @class jB.Popover
 * @alias popover
 * @extends jB.Tooltip
 */

jB.Tooltip.extend('jB.Popover popover', {
    $cls: 'popover top'
    ,$typeClassPrefix: 'popover'
    ,$triggerType: 'click'
    ,$headerOptions: '<h3 class="popover-title">'
    ,$bodyOptions: '<div class="popover-content">'
    ,$arrowOptions: '<div class="arrow"></div>'

    /**
     * The popover title
     * <ul>
     *   <li>String: The text/html apply to popover title
     *   <li>Object: The options apply to popover title
     *   <li>jB.Component: A instance of jB.Component
     * </ul>
     * @attribute title
     * @type String|Object|jB.Component
     */

    /**
     * @method title
     * @param {String} title <ul>
     *                         <li>String: The text/html apply to popover title
     *                         <li>Object: The options apply to popover title
     *                         <li>jB.Component: A instance of jB.Component
     *                        </ul>
     * @return {jB.Popover}
     */
    ,title: function() {
        return this.header.apply(this, arguments)
    }
});