const HASH_VALUE = 'bafybeifzsdjsyhuzvxvprgfkorqylan63ptbsgkv45qwcu7tbrrdp3pqsq';

const popsicleBlack = 'https://res.cloudinary.com/dk7vtkmru/image/upload/v1678328731/popsicle-black_vugoh7.png';
const popsicle = 'https://res.cloudinary.com/dk7vtkmru/image/upload/v1678328731/popsicle_vtjlbe.png';
const donutBlack = 'https://res.cloudinary.com/dk7vtkmru/image/upload/v1678328731/donut-black_l0wgay.png';
const donut = 'https://res.cloudinary.com/dk7vtkmru/image/upload/v1678328731/donut_fa8vyc.png';

const COMMON_LINK = 'https://blur.io/asset/0x86cc280d0bac0bd4ea38ba7d31e895aa20cceb4b';

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

function attachAllEvents() {
  if (window.location.href.indexOf(WEB_URL) > -1) {
    document.querySelector('button div[name="grid"]').addEventListener('click', function (evt) {
      setTimeout(() => {
        insertLinkToNFTProduct();
      }, 1000);
    });
    document.querySelector('button div[name="grid-condensed"]').addEventListener('click', function (evt) {
      setTimeout(() => {
        insertLinkToNFTProduct();
      }, 1000);
    });
    document.querySelector('button div[name="list-bulleted-spaced"]').addEventListener('click', function (evt) {
      setTimeout(() => {
        insertLinkToNFTProduct();
      }, 1000);
    });
    document.querySelector('button div[name="list-bulleted-condensed"]').addEventListener('click', function (evt) {
      setTimeout(() => {
        insertLinkToNFTProduct();
      }, 1000);
    });

    if (document.querySelectorAll('.interactive.rows .row .cell.index-1 img') && document.querySelectorAll('.interactive.rows .row .cell.index-1 img').length) {
      document.querySelectorAll('.interactive.rows .row .cell.index-1 img').forEach((gridImg) => {
        gridImg.addEventListener('mouseover', function (evt) {
          setTimeout(() => {
            const divElem = document.querySelector('next-route-announcer').nextSibling;
            if (divElem) {
              const imageElem = divElem.querySelectorAll('div')[2];
              const link = gridImg.parentElement.parentElement.querySelector('a').href;
              const splitedLink = link.split('/');
              const token = splitedLink[splitedLink.length - 1];
              const isIconExist = imageElem.querySelector('.icon-row');
              if (!isIconExist) {
                const iconRow = document.createElement("div");
                iconRow.className = 'icon-row icon-row-grid';
                iconRow.innerHTML = `
                  <a class="popsicle-link">
                    <img src="${popsicleBlack}" class="popsicle-icon status-icon" />
                  </a>
                  <a class="donut-link">
                    <img src="${donutBlack}" class="donut-icon status-icon" />
                  </a>
                `;
                imageElem.insertBefore(iconRow, imageElem.nextSibling);
                imageElem.querySelector('.icon-row .popsicle-link').addEventListener('click', function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                });
                imageElem.querySelector('.icon-row .donut-link').addEventListener('click', function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                });
                checkPopsicle(token, function () {
                  divElem.querySelector('.popsicle-icon').src = popsicle;
                  divElem.querySelector('.popsicle-icon').style.cursor = 'pointer';
                  divElem.querySelector('.icon-row .popsicle-link').addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(`${COMMON_LINK}/1${token.toString().padStart(4, '0')}`, '_blank');
                  });
                }, function () { divElem.querySelector('.popsicle-icon').src = popsicleBlack });
                checkDonut(token, function () {
                  divElem.querySelector('.donut-icon').src = donut;
                  divElem.querySelector('.donut-icon').style.cursor = 'pointer';
                  divElem.querySelector('.icon-row .donut-link').addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(`${COMMON_LINK}/2${token.toString().padStart(4, '0')}`, '_blank');
                  });
                }, function () { divElem.querySelector('.donut-icon').src = donutBlack });
              }
            }
          }, 1000);
        })
      });
      document.querySelectorAll('.interactive.rows .row .cell.index-9 div').forEach((gridChevron) => {
        gridChevron.addEventListener('click', function (evt) {
          setTimeout(() => {
            const allAssets = document.querySelectorAll('.expanded');
            for (let i = 0; i < allAssets.length; i++) {
              const asset = allAssets[i];

              const link = asset.parentElement.querySelector('a').href;
              const splitedLink = link.split('/');
              const token = splitedLink[splitedLink.length - 1];
              const imageElem = asset.querySelector('.image div');
              const isIconExist = imageElem.querySelector('.icon-row');
              if (!isIconExist) {
                const iconRow = document.createElement("div");
                iconRow.className = 'icon-row icon-row-grid';
                iconRow.innerHTML = `
                  <a class="popsicle-link">
                    <img src="${popsicleBlack}" class="popsicle-icon status-icon" />
                  </a>
                  <a class="donut-link">
                    <img src="${donutBlack}" class="donut-icon status-icon" />
                  </a>
                `;
                imageElem.insertBefore(iconRow, imageElem.nextSibling);
                if (imageElem.querySelector('.icon-row .popsicle-link')) {
                  imageElem.querySelector('.icon-row .popsicle-link').addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
                }
                if (imageElem.querySelector('.icon-row .donut-link')) {
                  imageElem.querySelector('.icon-row .donut-link').addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
                }
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
          }, 1000);
        })
      });
    }
  }
}
let insertTimeout = null;
function attachNextCalling() {
  insertTimeout && clearTimeout(insertTimeout);
  insertTimeout = setTimeout(() => {
    insertLinkToNFTProduct();
  }, 300 * 1000);
}

function insertLinkToNFTProduct() {
  const isGrid = document.querySelector('button div[name="grid"]').attributes.color.value === 'yellow300';
  const isGridCondensed = document.querySelector('button div[name="grid-condensed"]').attributes.color.value === 'yellow300';
  const isListSpaced = document.querySelector('button div[name="list-bulleted-spaced"]').attributes.color.value === 'yellow300';
  const isListCondensed = document.querySelector('button div[name="list-bulleted-condensed"]').attributes.color.value === 'yellow300';

  let allAssets = [];
  if (isGrid || isGridCondensed) {
    allAssets = document.querySelectorAll('.grid-item');
  }
  if (isListCondensed || isListSpaced) {
    allAssets = document.querySelectorAll('.interactive.rows .row .cell.index-1');
  }
  for (let i = 0; i < allAssets.length; i++) {
    const asset = allAssets[i];
    let link = '';
    if (isListCondensed || isListSpaced) {
      link = asset.querySelector('a').href;
    }
    if (isGrid || isGridCondensed) {
      link = asset.querySelectorAll('a')[1].href;
    }
    const splitedLink = link.split('/');
    const token = splitedLink[splitedLink.length - 1];
    let imageElem = null;
    if (isListCondensed || isListSpaced) {
      imageElem = asset;
    }
    if (isGrid || isGridCondensed) {
      imageElem = asset.querySelector('.image div');
    }

    const isIconExist = imageElem.querySelector('.icon-row');
    if (!isIconExist) {
      const iconRow = document.createElement("div");

      if (isListCondensed || isListSpaced) {
        iconRow.className = 'icon-row icon-row-list';
      }
      if (isGrid || isGridCondensed) {
        iconRow.className = 'icon-row icon-row-grid';
      }
      iconRow.innerHTML = `
        <a class="popsicle-link">
          <img src="${popsicleBlack}" class="popsicle-icon status-icon" />
        </a>
        <a class="donut-link">
          <img src="${donutBlack}" class="donut-icon status-icon" />
        </a>
      `;
      if (isListCondensed || isListSpaced) {
        imageElem.append(iconRow);
      }
      if (isGrid || isGridCondensed) {
        imageElem.insertBefore(iconRow, imageElem.nextSibling);
      }
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
  attachAllEvents();
  attachNextCalling();
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

const WEB_URL = 'https://blur.io/collection/onchainmonkey';
let allowed = false;
let wheelTimeout = null;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "allowed") {
      if (request.selected && window.location.href.indexOf(WEB_URL) > -1) {
        allowed = true;
        insertLinkToNFTProduct();

        window.addEventListener("wheel", event => {
          wheelTimeout && clearTimeout(wheelTimeout);
          wheelTimeout = setTimeout(() => {
            if (window.location.href.indexOf(WEB_URL) > -1 && allowed) {
              insertLinkToNFTProduct();
            }
          }, 100);
        });
      } else {
        allowed = false;
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
