let vDOM: { id: number; title: string; description: string }[] = [];

function createDomElements() {
  var parentElement = document.getElementById("mainArea");

  if (parentElement) {
    var currentChildren = Array.from(parentElement.children);

    let added = 0,
      deleted = 0,
      updated = 0;

    vDOM.forEach(function (item: {
      title: string;
      description: string;
      id: number;
    }) {
      var existingChild = currentChildren.find(function (child) {
        return (child as HTMLElement).dataset.id === String(item.id);
      });

      if (existingChild) {
        updated++;

        existingChild.children[0].innerHTML = item.title;
        existingChild.children[1].innerHTML = item.description;

        currentChildren = currentChildren.filter(function (child) {
          return child !== existingChild;
        });
      } else {
        added++;

        var childElement = document.createElement("div");
        childElement.dataset.id = item.id.toString();

        var grandChildElement1 = document.createElement("span");
        grandChildElement1.innerHTML = item.title;

        var grandChildElement2 = document.createElement("span");
        grandChildElement2.innerHTML = item.description;

        var grandChildElement3 = document.createElement("button");
        grandChildElement3.innerHTML = "Delete";
        grandChildElement3.setAttribute(
          "onclick",
          "deleteTodo(" + item.id + ")"
        );

        childElement.appendChild(grandChildElement1);
        childElement.appendChild(grandChildElement2);
        childElement.appendChild(grandChildElement3);
        if (parentElement) parentElement.appendChild(childElement);
      }
    });

    currentChildren.forEach(function (child) {
      deleted++;
      if (parentElement) parentElement.removeChild(child);
    });

    console.log(added);
    console.log(updated);
    console.log(deleted);
  }
}

function updateVirtualDom(
  data: {
    title: string;
    description: string;
    id: number;
  }[]
) {
  vDOM = data.map(
    (item: { title: string; description: string; id: number }) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
      };
    }
  );
}
window.setInterval(() => {
  let todos: { title: string; description: string; id: number }[] = [];
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    todos.push({
      title: "Go to gym",
      description: "Go to gym from 5",
      id: i + 1,
    });
  }

  updateVirtualDom(todos);
}, 5000);

window.setInterval(() => {
  createDomElements();
}, 1000);
