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
// Function to generate PDF from rendered HTML
document.getElementById('download-pdf').addEventListener('click', () => {
    const element = document.querySelector('main'); // Select the main content to include in the PDF

    // Convert dimensions from pixels to millimeters (1px = 0.264583 mm)
    const pxToMm = (px) => px * 0.264583 + 1;
    const widthPx = element.offsetWidth; // Width of the content in pixels
    const heightPx = element.offsetHeight; // Height of the content in pixels
    const widthMm = pxToMm(widthPx); // Convert width to millimeters
    const heightMm = pxToMm(heightPx); // Convert height to millimeters

    const options = {
        margin: 0, // Remove margins to fit content on one page
        filename: 'afra-door.pdf',
        image: { type: 'jpeg', quality: 1 }, // High-quality image
        html2canvas: { scale: 1, useCORS: true }, // Ensure styles and images are applied
        jsPDF: { unit: 'mm', format: [widthMm, heightMm] ,orientation: 'landscape'} // Use calculated dimensions in millimeters
    };

    // Generate and download the PDF
    html2pdf().set(options).from(element).save();
});