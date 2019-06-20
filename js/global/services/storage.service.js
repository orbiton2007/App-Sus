

function store(key, any) {
    localStorage[key] = JSON.stringify(any);
}

function load(key) {
    var str = localStorage[key] || 'null';
    return Promise.resolve(JSON.parse(str)) 
}

export default {
    store,
    load
}