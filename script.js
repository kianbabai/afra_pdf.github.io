import json from './model.json' with { type: "json" };

const model = json.state;

let image_array = [];
console.log(model);
for (const key in model) {
    if (model.hasOwnProperty(key)) {
        if (typeof model[key] === 'object' && model[key] !== null) {
            for (const innerKey in model[key]) {
                if (model[key].hasOwnProperty(innerKey)) {
                    if (innerKey === 'image' && typeof model[key][innerKey] === 'object' && model[key][innerKey] !== null) {
                        if (model[key][innerKey].hasOwnProperty('url')) {
                            // console.log(model[key][innerKey]['url']);
                            image_array.push(model[key][innerKey]['url']) 
                        }
                    }
                }
            }
        }
    }
}
console.table(image_array);
