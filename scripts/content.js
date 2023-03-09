const HASH_VALUE = 'bafybeifzsdjsyhuzvxvprgfkorqylan63ptbsgkv45qwcu7tbrrdp3pqsq';

const popsicleBlack = 'https://res.cloudinary.com/dk7vtkmru/image/upload/v1678328731/popsicle-black_vugoh7.png';
const popsicle = 'https://res.cloudinary.com/dk7vtkmru/image/upload/v1678328731/popsicle_vtjlbe.png';
const donutBlack = 'https://res.cloudinary.com/dk7vtkmru/image/upload/v1678328731/donut-black_l0wgay.png';
const donut = 'https://res.cloudinary.com/dk7vtkmru/image/upload/v1678328731/donut_fa8vyc.png';

const COMMON_LINK = 'https://opensea.io/assets/ethereum/0x86cc280d0bac0bd4ea38ba7d31e895aa20cceb4b';

function checkDonut(tokenID, callback, errorCallback) {
  fetch(`https://ipfs.io/ipfs/${HASH_VALUE}/2${tokenID.toString().padStart(4, '0')}`)
    .then(response => {
      if (response.status === 200) {
        callback();
      } else {
        errorCallback();
      }
    })
    .catch(error => {
      console.log(`An error occurred while checking IPFS data with hash ${tokenID}: ${error}`);
      errorCallback();
    });
}

function checkPopsicle(tokenID, callback, errorCallback) {
  fetch(`https://ipfs.io/ipfs/${HASH_VALUE}/1${tokenID.toString().padStart(4, '0')}`)
    .then(response => {
      if (response.status === 200) {
        callback();
      } else {
        errorCallback();
      }
    })
    .catch(error => {
      console.log(`An error occurred while checking IPFS data with hash ${tokenID}: ${error}`);
      errorCallback();
    });
}

function insertLinkToNFTProduct() {
  const allAssets = document.querySelectorAll('.Asset--loaded article');

  for (let i = 0; i < allAssets.length; i++) {
    const asset = allAssets[i];
    const link = asset.querySelector('a').href;
    const splitedLink = link.split('/');
    const token = splitedLink[splitedLink.length - 1];
    const imageElem = asset.querySelector('div:nth-of-type(1)');
    const elem = asset.querySelector('div:nth-of-type(3)');
    const isExist = elem.querySelector('.link-text');
    const isIconExist = imageElem.querySelector('.icon-row');
    if (elem && !isExist) {
      if (!isIconExist) {
        const iconRow = document.createElement("div");
        iconRow.className = 'icon-row';
        iconRow.innerHTML = `
          <a class="popsicle-link">
            <img src="${popsicleBlack}" class="popsicle-icon status-icon" />
          </a>
          <a class="donut-link">
            <img src="${donutBlack}" class="donut-icon status-icon" />
          </a>
        `;
        imageElem.insertBefore(iconRow, imageElem.firstChild)
        imageElem.querySelector('.icon-row .popsicle-link').addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          // window.open(`${COMMON_LINK}/1${token.toString().padStart(4, '0')}`, '_blank');
        });
        imageElem.querySelector('.icon-row .donut-link').addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          // window.open(`${COMMON_LINK}/2${token.toString().padStart(4, '0')}`, '_blank');
        });
        checkPopsicle(token, function () {
          allAssets[i].querySelector('.popsicle-icon').src = popsicle;
          allAssets[i].querySelector('.popsicle-icon').style.cursor = 'pointer';
          allAssets[i].querySelector('.icon-row .popsicle-link').addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.open(`${COMMON_LINK}/1${token.toString().padStart(4, '0')}`, '_blank');
          });
        }, function () { allAssets[i].querySelector('.popsicle-icon').src = popsicleBlack });
        checkDonut(token, function () {
          allAssets[i].querySelector('.donut-icon').src = donut;
          allAssets[i].querySelector('.donut-icon').style.cursor = 'pointer';
          allAssets[i].querySelector('.icon-row .donut-link').addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.open(`${COMMON_LINK}/2${token.toString().padStart(4, '0')}`, '_blank');
          });
        }, function () { allAssets[i].querySelector('.donut-icon').src = donutBlack });
      }
    }
  }
}

function removeAllLinks() {
  // const allLinks = document.querySelectorAll('.link-text');
  const allLinks = document.querySelectorAll('.icon-row');
  for (let i = 0; i < allLinks.length; i++) {
    const link = allLinks[i];
    if (link) {
      link.remove();
    }
  }
}

const WEB_URL = 'https://opensea.io/collection/onchainmonkey';
let allowed = false;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request);
    if (request.message === "allowed") {
      if (request.selected && window.location.href.indexOf(WEB_URL) > -1) {
        allowed = true;
        insertLinkToNFTProduct();

        window.addEventListener("wheel", event => {
          if (window.location.href.indexOf(WEB_URL) > -1) {
            insertLinkToNFTProduct();
          }
        });
      } else {
        removeAllLinks();
      }
    }
  }
);

let previousUrl = '';
const observer = new MutationObserver(function (mutations) {
  if (window.location.href.indexOf(WEB_URL) > -1) {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
      console.log(`URL changed to ${location.href}`);
      setTimeout(() => {
        chrome.runtime.sendMessage({ "localstorage": "isAllowed" });
      }, 2000);
    }
  }
});
const config = { subtree: true, childList: true };
observer.observe(document, config);

