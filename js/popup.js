
$(function() {
    // 初始化
    initTips()
    initData()

    $('#switch').on('click', function() {
        chrome.storage.sync.set({'switch-status': $(this).prop('checked')})
        showStatus($(this).prop('checked'))
    })

    $('#httpList').on('blur', function() {
        chrome.storage.sync.set({'http-list': $(this).val()})
    })

    chrome.declarativeNetRequest.getDynamicRules(
        function(data) {
            console.log("DynamicRules:", data)
        }
    )
    
})
function initTips() {
    $('#statusTip').text(chrome.i18n.getMessage("statusTip"))
    $('#inputTip').text(chrome.i18n.getMessage("inputTip"))
}

function initData() {
    getStorageSyncData(['http-list']).then(val => {
        $('#httpList').val(val)
    })

    getStorageSyncData(['switch-status']).then(val => {
        showStatus(val)
        $('#switch').prop('checked', val)
    })
}

function showStatus(status) {
    if (status) {
        $('#showStatus').text(chrome.i18n.getMessage("statusOn"))
    } else {
        $('#showStatus').text(chrome.i18n.getMessage("statusOff"))
    }
}

function getStorageSyncData(keys) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, (items) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        if (keys.length == 1) {
            items = items[keys]
        }
        resolve(items);
      });
    });
}