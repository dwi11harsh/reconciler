var vDOM = [];
function createDomElements() {
    var parentElement = document.getElementById("mainArea");
    if (parentElement) {
        var currentChildren = Array.from(parentElement.children);
        var added_1 = 0, deleted_1 = 0, updated_1 = 0;
        vDOM.forEach(function (item) {
            var existingChild = currentChildren.find(function (child) {
                return child.dataset.id === String(item.id);
            });
            if (existingChild) {
                updated_1++;
                existingChild.children[0].innerHTML = item.title;
                existingChild.children[1].innerHTML = item.description;
                currentChildren = currentChildren.filter(function (child) {
                    return child !== existingChild;
                });
            }
            else {
                added_1++;
                var childElement = document.createElement("div");
                childElement.dataset.id = item.id.toString();
                var grandChildElement1 = document.createElement("span");
                grandChildElement1.innerHTML = item.title;
                var grandChildElement2 = document.createElement("span");
                grandChildElement2.innerHTML = item.description;
                var grandChildElement3 = document.createElement("button");
                grandChildElement3.innerHTML = "Delete";
                grandChildElement3.setAttribute("onclick", "deleteTodo(" + item.id + ")");
                childElement.appendChild(grandChildElement1);
                childElement.appendChild(grandChildElement2);
                childElement.appendChild(grandChildElement3);
                if (parentElement)
                    parentElement.appendChild(childElement);
            }
        });
        currentChildren.forEach(function (child) {
            deleted_1++;
            if (parentElement)
                parentElement.removeChild(child);
        });
        console.log(added_1);
        console.log(updated_1);
        console.log(deleted_1);
    }
}
function updateVirtualDom(data) {
    vDOM = data.map(function (item) {
        return {
            id: item.id,
            title: item.title,
            description: item.description,
        };
    });
}
window.setInterval(function () {
    var todos = [];
    for (var i = 0; i < Math.floor(Math.random() * 100); i++) {
        todos.push({
            title: "Go to gym",
            description: "Go to gym from 5",
            id: i + 1,
        });
    }
    updateVirtualDom(todos);
}, 5000);
window.setInterval(function () {
    createDomElements();
}, 1000);
