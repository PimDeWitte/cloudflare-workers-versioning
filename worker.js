addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

const versions = {
    transcoderMaster: 44
}

/**
 * Refines URL for parsing without query string
 */
function refineURL(request) {
    //get full URL
    var currURL = request.url; //get current address
    //Get the URL between what's after '/' and befor '?'
    //1- get URL after'/'
    var afterDomain = currURL.substring(currURL.lastIndexOf('/') + 1);
    //2- get the part before '?'
    var beforeQueryString = afterDomain.split("?")[0];

    return beforeQueryString;
}

/**
 * Handle the request and look up the correct version
 * @param {Request} request
 */
async function handleRequest(request) {
    let url;
    try {
        url = refineURL(request);
    } catch (err) {
        console.log(err);
    }
    if (url && versions[url]) {
        return new Response(versions[url], {status: 200})
    } else {
        return new Response(-1, {status: 400})
    }
}
