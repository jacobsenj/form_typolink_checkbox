define([
  'TYPO3/CMS/Recordlist/LinkBrowser',
  'TYPO3/CMS/Backend/Modal'
], function(LinkBrowser, Modal) {


  var LinkBrowserAdapter = { target: null };

  LinkBrowserAdapter.finalizeFunction = function(link)
  {
    this._getParent().$('#' + this.target).val(link).trigger('change');
    Modal.dismiss();
  };

  LinkBrowserAdapter._getParent = function() {
    let opener;
    if (
      typeof window.parent !== 'undefined' &&
      typeof window.parent.document.list_frame !== 'undefined' &&
      window.parent.document.list_frame.parent.document.querySelector('.t3js-modal-iframe') !== null
    ) {
      opener = window.parent.document.list_frame;
    } else if (
      typeof window.parent !== 'undefined' &&
      typeof window.parent.frames.list_frame !== 'undefined' &&
      window.parent.frames.list_frame.parent.document.querySelector('.t3js-modal-iframe') !== null
    ) {
      opener = window.parent.frames.list_frame;
    } else if (
      typeof window.frames !== 'undefined' &&
      typeof window.frames.frameElement !== 'undefined' &&
      window.frames.frameElement !== null &&
      window.frames.frameElement.classList.contains('t3js-modal-iframe')
    ) {
      opener = window.frames.frameElement.contentWindow.parent;
    } else if (window.opener) {
      opener = window.opener;
    }

    return opener;
  };


  LinkBrowser.finalizeFunction = LinkBrowserAdapter.finalizeFunction.bind(LinkBrowserAdapter);

  return LinkBrowserAdapter;
});
