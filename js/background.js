//listen for changes in URL in the google chrome address bar and
// activates the plugin if it is flipkart.com

chrome.tabs.onUpdated.addListener(function(id, info, tab) {
    if (tab.url.toLowerCase().indexOf("flipkart.com") > -1) {
        chrome.pageAction.show(tab.id);
    }
});