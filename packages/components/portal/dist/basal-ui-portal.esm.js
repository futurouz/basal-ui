import React from 'react';
import ReactDOM from 'react-dom';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var Portal = /*#__PURE__*/React.forwardRef(function Portal(props, forwardedRef) {
  var _globalThis$document;

  var rootContainer = globalThis == null ? void 0 : (_globalThis$document = globalThis.document) == null ? void 0 : _globalThis$document.body;
  /**
   * Skip rendering when there is no portal during the SSR
   */

  if (!rootContainer) return null;
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", _extends({}, props, {
    "data-x-portal": "",
    ref: forwardedRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1
    }
  })), rootContainer);
});

export { Portal as default };