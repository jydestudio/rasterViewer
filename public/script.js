

// Remove globe projection or use 'mercator' (default)

let rasterLayerId;
let activeRasterId;
const apiKey = 'mSmxvGAu571uVjVJweAl';

const basicBasemap = `https://api.maptiler.com/maps/basic/style.json?key=${apiKey}`;
const brightBasemap = `https://api.maptiler.com/maps/bright/style.json?key=${apiKey}`;
const pastelBasemap = `https://api.maptiler.com/maps/pastel/style.json?key=${apiKey}`;
const darkBasemap = `https://api.maptiler.com/maps/darkmatter/style.json?key=${apiKey}`;
const outdoorBasemap = `https://api.maptiler.com/maps/outdoor/style.json?key=${apiKey}`;
const winterBasemap = `https://api.maptiler.com/maps/winter/style.json?key=${apiKey}`;
const topoBasemap = `https://api.maptiler.com/maps/topo/style.json?key=${apiKey}`;
const tonerBasemap = `https://api.maptiler.com/maps/toner/style.json?key=${apiKey}`;
const tonerLiteBasemap = `https://api.maptiler.com/maps/toner-lite/style.json?key=${apiKey}`;
const positronBasemap = `https://api.maptiler.com/maps/positron/style.json?key=${apiKey}`;
const hybridBasemap = `https://api.maptiler.com/maps/hybrid/style.json?key=${apiKey}`;
const satelliteBasemap = `https://api.maptiler.com/maps/satellite/style.json?key=${apiKey}`;
const streetsBasemap = `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`;
const osmBasemap = `https://api.maptiler.com/maps/osm/style.json?key=${apiKey}`;
const threeDBasemap = `https://api.maptiler.com/maps/3d/style.json?key=${apiKey}`;
const terrainBasemap = `https://api.maptiler.com/maps/hybrid/style.json?key=${apiKey}`;
const fiordColorBasemap = `https://api.maptiler.com/maps/fiord-color/style.json?key=${apiKey}`;
const osmLibertyBasemap = `https://api.maptiler.com/maps/osm-liberty/style.json?key=${apiKey}`;
const osmBrightBasemap = `https://api.maptiler.com/maps/osm-bright/style.json?key=${apiKey}`;


// Color gradients
const colorGradients = {
  magma: [
    "#000004", "#180f3d", "#4b0c6b", "#781c6d", "#a52c60",
    "#cf4446", "#ed6925", "#fb9f3a", "#fdbf6f", "#fbe6c5"
  ],
  viridis: [
    "#440154", "#482878", "#3e4989", "#31688e", "#26828e",
    "#1f9e89", "#35b779", "#6ece58", "#b5de2b", "#fde725"
  ],
  cividis: [
    "#00204c", "#00326a", "#575c7d", "#a0a48c", "#f3e49e"
  ],
  plasma: [
    "#0d0887", "#5b02a3", "#9a179b", "#ca4678", "#f89441", "#f0f921"
  ],
  
  inferno: [
    "#000004", "#1b0c41", "#4a0c6b", "#781c6d", "#a52c60",
    "#cf4446", "#ed6925", "#fb9f3a", "#fdbf6f", "#fbe6c5"
  ],

  // New high-contrast palettes
  neonFire: [
    "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#00ffff",
    "#0000ff", "#8b00ff", "#ff1493", "#ffffff", "#000000"
  ],

  technoBright: [
    "#ff0055", "#00ffaa", "#ffaa00", "#5500ff", "#00aaff",
    "#ffcc00", "#cc00ff", "#00ff55", "#ff4444", "#4444ff"
  ],

  pastelPunch: [
    "#ffd700", "#ff69b4", "#87ceeb", "#90ee90", "#dda0dd",
    "#ffb6c1", "#ff8c00", "#7fffd4", "#dc143c", "#00ced1"
  ],

  crispHues: [
    "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231",
    "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe"
  ],

  shadowSpectrum: [
    "#000000", "#202020", "#404040", "#606060", "#808080",
    "#a0a0a0", "#c0c0c0", "#e0e0e0", "#ffffff", "#ff0000"
  ]
};



const symbologySelect = document.getElementById("symbology-select");
symbologySelect.innerHTML = ""; // Clear any existing options
symbologySelect.value = "plasma"; // Set default value


for (const key in colorGradients) {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  symbologySelect.appendChild(option);
}



const map = new maplibregl.Map({
    container: 'map',
    style: satelliteBasemap,
    center: [5.1362598407919, 7.300661549770309],
    zoom: 14,
    pitch: 50,
    bearing: -10,
    antialias: true
});



// Create dropdown element with styling for top center
function createBaseMapDropdown(map, apiKey) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '10px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.backgroundColor = 'white';
    container.style.padding = '6px 12px';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '4px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '14px';
    container.style.color = '#333';
    container.style.zIndex = '1000';
    container.style.width = '180px'; // fixed width for better layout
  
    // Create a label element above the select dropdown
    const label = document.createElement('div');

    const select = document.createElement('select');
    select.id = 'basemap-select';
    select.style.padding = '6px 8px';
    select.style.width = '100%';
    select.style.fontSize = '14px';
    select.style.borderRadius = '4px';
    select.style.border = 'none';
    select.style.color = '#333';
    select.style.backgroundColor = 'white';
    select.style.cursor = 'crosshair';
    select.style.outline = 'none';
  
    // Define basemaps with a special key for the default custom style
    const baseMaps = [
      { name: 'Default', key: 'default' },
      { name: 'Dark Matter', url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json' },
      { name: 'Positron', url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json' },
      { name: 'Voyager', url: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json' },
      { name: 'Terrain', url: `https://api.maptiler.com/maps/hybrid/style.json?key=${apiKey}` },
      { name: 'Satellite', url: `https://api.maptiler.com/maps/satellite/style.json?key=${apiKey}` },
      { name: 'Hybrid', url: `https://api.maptiler.com/maps/hybrid/style.json?key=${apiKey}` },
      
    ];
  
    baseMaps.forEach(({ name, url, key }) => {
      const option = document.createElement('option');
      option.textContent = name;
      option.value = key === 'default' ? 'default' : url;
      select.appendChild(option);
    });
  
    // Set default selected option to "Default"
    select.value = 'default';
    select.style.fontFamily = "Poppins, sans-serif";

    select.addEventListener('change', () => {
 
      if (select.value === 'defaultt') {
        // Remove existing hills layer if it exists (precaution)
        if (map.getLayer('hills')) {
          map.removeLayer('hills');
        }
  
        map.setStyle(`https://api.maptiler.com/maps/hybrid/style.json?key=${apiKey}`, {
          transformStyle: (previousStyle, nextStyle) => {
            nextStyle.projection = { type: 'globe' };
            nextStyle.sources = {
              ...nextStyle.sources,
              terrainSource: {
                type: 'raster-dem',
                url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${apiKey}`,
                tileSize: 256
              },
              hillshadeSource: {
                type: 'raster-dem',
                url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${apiKey}`,
                tileSize: 256
              }
            };
            nextStyle.terrain = {
              source: 'terrainSource',
              exaggeration: 1
            };
            nextStyle.sky = {
              'atmosphere-blend': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 1,
                2, 0
              ]
            };
            // Add hills layer only if it doesn't exist
            const hasHills = nextStyle.layers.some(layer => layer.id === 'hills');
            if (!hasHills) {
              nextStyle.layers.push({
                id: 'hills',
                type: 'hillshade',
                source: 'hillshadeSource',
                layout: { visibility: 'visible' },
                paint: { 'hillshade-shadow-color': '#473B24' }
              });
            }
            
            return nextStyle;
          }
        });
  
      } else {
        // For other basemaps, just set the style URL
        map.setStyle(select.value);
      }
    });
  
    // Append label and select to container
    container.appendChild(label);
    container.appendChild(select);
  
    return container;
  }
  
  // Usage example:
  // After your map is created and loaded
  map.on('load', () => {
    const dropdown = createBaseMapDropdown(map, apiKey);
    map.getContainer().appendChild(dropdown);
  
    // Set the default style on load as well (to ensure sync)
    dropdown.querySelector('select').dispatchEvent(new Event('change'));
  });
  
  
  
map.addControl(new maplibregl.NavigationControl());

const fileUpload = document.getElementById('file-upload');
const previewContainer = document.getElementById('preview-container');
const symbologyBox = document.getElementById("symbology-container");
const legend = document.getElementById("legend");



let currentTop = 10;  // Position for the next notification
let notifications = []; // Array to track active notifications

function showNotification(message, duration = 3000) {
  const notification = document.createElement('div');
  notification.className = 'notification';

  // Add Font Awesome error icon
  const icon = document.createElement('i');
  icon.className = 'fas fa-exclamation-circle'; // Font Awesome icon class for error
  notification.appendChild(icon);

  // Add message text
  // notification.textContent = message;
  notification.innerHTML = `<i class='fas fa-exclamation-circle'></i> <span>${message}</span>`;  // Fix: To append text after the icon

  // Set the top position of the notification
  notification.style.top = `${currentTop}px`;
  document.body.appendChild(notification);

  // Trigger animation (show notification)
  setTimeout(() => notification.classList.add('show'), 10);

  // Update currentTop to position the next notification below
  currentTop += notification.offsetHeight + 10;

  // Add notification to the array
  notifications.push(notification);

  // Remove notification after 'duration'
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove(); // Wait for transition to finish before removing
      currentTop -= notification.offsetHeight + 10; // Adjust the top position for the next notification
      notifications = notifications.filter(n => n !== notification); // Remove from active notifications

      // If no more active notifications, reset position to the start
      if (notifications.length === 0) {
        currentTop = 20;
      }
    }, 500);
  }, duration);
}


// Keep track of uploaded rasters info: { file, bbox, id, canvas }
const uploadedRasters = [];
let numOfClasses = 0;
let uniqueRasterValue; 


async function renderTiff(file, symbology) {
    // console.log(symbology);
    const arrayBuffer = await file.arrayBuffer();
    try {
        const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
        const image = await tiff.getImage();
        const width = image.getWidth();
        const height = image.getHeight();
        const rasterData = await image.readRasters({ interleave: false });

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height);
      
        const minValue = Math.min(...rasterData[0]);
        const maxValue = Math.max(...rasterData[0]);


        uniqueRasterValue = rasterData[0].filter((v, i) => rasterData[0].indexOf(v) === i);
        numOfClasses = uniqueRasterValue.length;


        // let newSymbology_ = colorGradients[symbologySelect.value]; 

        symbology = [...symbology]; // spread operator creates a shallow copy
        symbology.unshift("#00000000"); 

        console.log('rater passed moving on to visualization');
        for (let i = 0; i < rasterData[0].length; i++) {
            const value = rasterData[0][i];
            if (value === -9999 || isNaN(value)) {
                imageData.data[i * 4 + 3] = 0; // Transparent for nodata
            } else {
                // const normalizedValue = (value - minValue) / (maxValue - minValue);
                // const color = interpolateColor(normalizedValue, symbology);
                // console.log('color', color, normalizedValue);  
                // console.log(symbology);

                const color = symbology[uniqueRasterValue.indexOf(value)];

                // Collect unique values from raster, ignoring nodata -9999
                // Parse RGBA hex color (#RRGGBB or #RRGGBBAA)
                const r = parseInt(color.slice(1, 3), 16);
                const g = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);
                let a = 255; // default opaque alpha

                if (color.length === 9) { // #RRGGBBAA
                    a = parseInt(color.slice(7, 9), 16);
                }

                imageData.data[i * 4] = r;
                imageData.data[i * 4 + 1] = g;
                imageData.data[i * 4 + 2] = b;
                imageData.data[i * 4 + 3] = a;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        const bbox = image.getBoundingBox();

        symbology.shift(); // remove the first element which is transparent
        symbology = updateLegend(symbology);  

        return { canvas, bbox };
    } catch (error) {
        console.error("Failed to render TIFF:", error);
        showNotification("Failed to render TIFF. Make sure file is a valid .tif/.tiff and is classified.");
        throw error;
    }
}



async function updateLegendValues(symbology, id) {
  console.log('update legend values called');
  for (const raster of uploadedRasters) {
    if (raster.id === id) {
      console.log(raster);
      await renderTiff(raster.file, symbology);
      updateLegend(symbology);
    }
  }
}




function updateLegend(symbologyColors) {

  let colors = [...symbologyColors]; // spread operator creates a shallow copy
  colors.unshift("#00000000"); // safe to modify
  
  console.log("called")
  const legend = document.getElementById('legend');

  if (!colors) {
    legend.innerHTML = 'No legend available';
    return;
  }

  // Clear existing legend
  legend.innerHTML = '';

  // Add title
  const title = document.createElement('h3');
  title.textContent = 'Legend';
  title.style.marginTop = '0';
  title.style.marginBottom = '15px';
  title.style.fontWeight = '700';
  title.style.fontSize = '18px';
  title.style.borderBottom = '1px solid #ccc';
  title.style.paddingBottom = '5px';
  title.style.textAlign = 'left';
  legend.appendChild(title);

  const steps = colors.length - 1;

  const legendContainer = document.createElement('div');
  legendContainer.style.display = 'flex';
  legendContainer.style.flexDirection = 'column';
  legendContainer.style.width = '100%';
  legendContainer.style.maxHeight = '500px';
  legendContainer.style.padding = '5px';
  legendContainer.style.borderRadius = '6px';
  legendContainer.style.background = 'white';
  legendContainer.style.userSelect = 'none';
  legendContainer.style.overflow = 'scroll';

  for (let i = 1; i <= numOfClasses-1; i++) {
    const color = colors[i];
    const box = document.createElement('div');
    box.style.display = 'flex';
    box.style.alignItems = 'center';
    box.style.marginBottom = '8px';

    // Transparency toggle button
    const transparentBtn = document.createElement('button');
    transparentBtn.innerHTML = '<i class="fas fa-adjust"></i>'; // Font Awesome icon
    transparentBtn.style.border = 'none';
    transparentBtn.style.background = 'none';
    transparentBtn.style.cursor = 'pointer';
    transparentBtn.style.marginRight = '6px';
    transparentBtn.title = 'Toggle Transparency';

    transparentBtn.addEventListener('click', () => {
      handleTransparencyToggle(i, colors); // You must define this function
    });

    // Color picker
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = color;
    colorPicker.style.marginRight = '10px';
    colorPicker.style.width = '30px';
    colorPicker.style.height = '30px';
    colorPicker.style.border = 'none';
    colorPicker.style.cursor = 'pointer';

    colorPicker.addEventListener('change', (e) => {
      const newColor = e.target.value;
      handleColorChange(i, newColor); // You must define this function
    });

    // Label for range
    const minVal = ((i - 1) / steps).toFixed(2);
    const maxVal = (i / steps).toFixed(2);
    const label = document.createElement('span');
    label.style.fontSize = '13px';
    label.textContent = `${uniqueRasterValue[i]}`;
    label.contentEditable = true;
    label.style.outline = 'none';

    // Append items: transparency button → color picker → label
    box.appendChild(transparentBtn);
    box.appendChild(colorPicker);
    box.appendChild(label);

    legendContainer.appendChild(box);
  }

  legend.appendChild(legendContainer);
  return colors;
}



function handleTransparencyToggle(index, symbology) {
  handleColorChange(index, "#00000000");
} 


async function handleColorChange(index, newColor) {
  const newSymbology = symbologySelect.value;
  symbologyArray = colorGradients[newSymbology];
  symbologyArray[index-1] = newColor;


  let raster = uploadedRasters.find(r => r.id === activeRasterId);
    try {
      const { canvas: newCanvas, bbox } = await renderTiff(raster.file, symbologyArray);

      addRasterToMap(newCanvas, bbox, raster.id, symbologyArray);

      // Update preview canvas
      const previewBox = Array.from(previewContainer.children).find(div => {
          const nameElem = div.querySelector('p');
          return nameElem && nameElem.textContent === raster.file.name;
      });

      if (previewBox) {
          const oldCanvas = previewBox.querySelector('canvas');
          if (oldCanvas) previewBox.removeChild(oldCanvas);

          newCanvas.style.width = "100px";
          newCanvas.style.height = "100px";

          previewBox.insertBefore(newCanvas, previewBox.querySelector('p'));

          newCanvas.addEventListener('click', async function() {
              await updateLegendValues(symbologyArray, raster.id);

              addRasterToMap(newCanvas, bbox, raster.id, symbologyArray);
              map.fitBounds([
                  [bbox[0], bbox[1]],
                  [bbox[2], bbox[3]]
              ], { padding: 20 });
          });

          raster.canvas = newCanvas;
      }
  } catch (error) {
      console.error("Error updating raster symbology:", error);
  }
}



function addRasterToMap(canvas, bbox, id, symbology) {
  updateLegend(symbology);
    // Remove any other raster layers/sources before adding the new one
    for (const raster of uploadedRasters) {
        if (raster.id !== id) {
            if (map.getLayer(raster.id + '-layer')) {
                map.removeLayer(raster.id + '-layer');
            }
            if (map.getSource(raster.id + '-source')) {
                map.removeSource(raster.id + '-source');
            }
        }
    }

    if (map.getLayer(id + '-layer')) {
        map.removeLayer(id + '-layer');
    }
    if (map.getSource(id + '-source')) {
        map.removeSource(id + '-source');
    }

    const dataURL = canvas.toDataURL();
    map.addSource(id + '-source', {
        type: 'image',
        url: dataURL,
        coordinates: [
            [bbox[0], bbox[3]],
            [bbox[2], bbox[3]],
            [bbox[2], bbox[1]],
            [bbox[0], bbox[1]]
        ]
    });

    rasterLayerId = id + '-layer';
    activeRasterId = id;
    
    // Add the raster layer before the first draw layer (if it exists)
    
    map.addLayer({
        id: rasterLayerId,
        type: 'raster',
        source: id + '-source',
        paint: {
            'raster-opacity': 1
        }
    });  // This ensures the raster is added below draw layers
}




const opacitySlider = document.getElementById('opacity-range');

opacitySlider.addEventListener('input', () => {
    // For each raster layer you have, update the opacity
    uploadedRasters.forEach(raster => {
        if (map.getLayer(raster.id + '-layer')) {
            map.setPaintProperty(raster.id + '-layer', 'raster-opacity', parseFloat(opacitySlider.value));
        }
    });
});



fileUpload.addEventListener('change', async (event) => {
    previewContainer.innerHTML = '';
    const files = event.target.files;

    if (files.length > 0) {


        previewContainer.style.display = "flex";
        symbologyBox.style.display = "block";
        legend.style.display = "block";
    } else {
        previewContainer.style.display = "none";
    }

    uploadedRasters.length = 0; // clear previous

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const previewBox = document.createElement('div');
        previewBox.className = "preview-box";
        const fileName = document.createElement('p');
        fileName.textContent = file.name;

        try {
            console.log("do the calms");
            const { canvas, bbox } = await renderTiff(file, colorGradients[symbologySelect.value] || colorGradients['plasma']);
            console.log("normal things");
            canvas.style.width = "100px";
            canvas.style.height = "100px";

            previewBox.appendChild(canvas);
            previewBox.appendChild(fileName);

            const rasterId = 'uploaded-raster-' + i;

            uploadedRasters.push({ file, bbox, id: rasterId, canvas });
            

            canvas.addEventListener('click', async function() {
              console.log("clicked clicked");
              await updateLegendValues(colorGradients[symbologySelect.value], rasterId);

              console.log('canvas clicked');
                addRasterToMap(canvas, bbox, rasterId, colorGradients[symbologySelect.value] || colorGradients['plasma']);
                map.fitBounds([
                    [bbox[0], bbox[1]],
                    [bbox[2], bbox[3]]
                ], { padding: 20 });
            });

            previewContainer.appendChild(previewBox);
        } catch (error) {
            console.error("Error rendering TIFF:", error);
        }
    }
});





symbologySelect.addEventListener('change', async () => {

    const newSymbology = colorGradients[symbologySelect.value];
    updateLegend(newSymbology); 

    let raster = uploadedRasters.find(r => r.id === activeRasterId);
        try {
            const { canvas: newCanvas, bbox } = await renderTiff(raster.file, newSymbology);

            addRasterToMap(newCanvas, bbox, raster.id, newSymbology);

            // Update preview canvas
            const previewBox = Array.from(previewContainer.children).find(div => {
                const nameElem = div.querySelector('p');
                return nameElem && nameElem.textContent === raster.file.name;
            });

            if (previewBox) {
                const oldCanvas = previewBox.querySelector('canvas');
                if (oldCanvas) previewBox.removeChild(oldCanvas);

                newCanvas.style.width = "100px";
                newCanvas.style.height = "100px";

                previewBox.insertBefore(newCanvas, previewBox.querySelector('p'));

                newCanvas.addEventListener('click', async function() {
                    await updateLegendValues(colorGradients[symbologySelect.value], raster.id);

                    addRasterToMap(newCanvas, bbox, raster.id, newSymbology);
                    map.fitBounds([
                        [bbox[0], bbox[1]],
                        [bbox[2], bbox[3]]
                    ], { padding: 20 });
                });

                raster.canvas = newCanvas;
            }
        } catch (error) {
            console.error("Error updating raster symbology:", error);
        }
    }
);






let currentPopup = null;


function saveGeoJSONToServer(geojson) {
  fetch('/save-geojson', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ geojson })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Save response:', data);
  
  })
  .catch(err => {
    console.error('Error saving geojson:', err);
  });
}



// Function to convert OSM Overpass data to GeoJSON
function overpassToGeoJSON(overpassData) {
  const nodes = {};
  const geojson = {
      type: "FeatureCollection",
      features: []
  };

  // First, collect all nodes
  overpassData.elements.forEach(element => {
      if (element.type === "node") {
          nodes[element.id] = [element.lon, element.lat];
      }
  });

  // Convert ways and relations
  overpassData.elements.forEach(element => {
      if (element.type === "way") {
          const coordinates = element.nodes.map(nodeId => nodes[nodeId]);

          if (coordinates.length > 0) {
              geojson.features.push({
                  type: "Feature",
                  geometry: {
                      type: "LineString",
                      coordinates: coordinates
                  },
                  properties: element.tags || {}
              });
          }
      }
  });

  return geojson;
}





    
const measureControl = new maplibreGLMeasures.default({});
map.addControl(measureControl, 'top-left');

map.on('contextmenu', async (e) => {

  toggleMapLoader();


  const clickPoint = e.lngLat;
  const allFeatures = measureControl._drawCtrl.getAll();

  const clickedFeature = allFeatures.features.find(feature => {
    if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
      return pointInPolygon(clickPoint.toArray(), feature.geometry.coordinates);
    } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
      return isPointNearLine(clickPoint.toArray(), feature.geometry.coordinates, 0.0005);
    } else if (feature.geometry.type === 'Point') {
      const [lng, lat] = feature.geometry.coordinates;
      return distance(clickPoint.lng, clickPoint.lat, lng, lat) < 0.0005;
    }
    return false;
  });

  if (!clickedFeature) {
    console.log("No feature clicked.");
    return;
  }

  const savedGeoJSON = {
    type: 'FeatureCollection',
    features: [clickedFeature]
  };

  // Remove previous source and layer if exist
  const sourceId = 'saved-feature-source';
  const layerId = 'saved-feature-layer';


  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }
  if (map.getSource(sourceId)) {
    map.removeSource(sourceId);
  }

  map.addSource(sourceId, {
    type: 'geojson',
    data: savedGeoJSON
  });

  // Add proper layer based on geometry type
  if (clickedFeature.geometry.type === 'Point') {
    map.addLayer({
      id: layerId,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-radius': 8,
        'circle-color': '#fff'
      }
    });
  } else if (
    clickedFeature.geometry.type === 'LineString' ||
    clickedFeature.geometry.type === 'MultiLineString'
  ) {
    map.addLayer({
      id: layerId,
      type: 'line',
      source: sourceId,
      paint: {
        'line-color': '#fff',
        'line-width': 4
      }
    });
  } else if (
    clickedFeature.geometry.type === 'Polygon' ||
    clickedFeature.geometry.type === 'MultiPolygon'
  ) {
    map.addLayer({
      id: layerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': '#fff',
        'fill-opacity': 0.4
      }
    });
  }



  // Save clicked feature GeoJSON to server
  // saveGeoJSONToServer(savedGeoJSON);

  // Fetch and add OSM data for buildings, amenities, and highways
  const featuresList = ["building", "highway"];
  let numberOfBuildings = 0;  
  let numberOfHighways = 0;

  for (const feature of featuresList) {
    try {
      const response = await fetch('/get-osm-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geojson: clickedFeature,
          featureType: feature
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch OSM data for ${feature}`);
      }

      const osmData = await response.json();
      const osmGeoJSON = overpassToGeoJSON(osmData);

      console.log('OSM Data:', osmGeoJSON);
      
      console.log('OSM GeoJSON:', osmGeoJSON);

      if (osmGeoJSON.features.length === 0) {
        console.log(`No OSM features found for ${feature}`);
        continue;
      }

      // Remove old source and layer if exist
      const osmSourceId = `${feature}-feature`;
      const osmLayerId = `${feature}-feature-layer`;

      if (map.getLayer(osmLayerId)) {
        map.removeLayer(osmLayerId);
      }
      if (map.getSource(osmSourceId)) {
        map.removeSource(osmSourceId);
      }

      // Add OSM source
      map.addSource(osmSourceId, {
        type: 'geojson',
        data: osmGeoJSON
      });

      // Add layer depending on feature type
      if (feature === 'building') {
        numberOfBuildings = osmGeoJSON.features.length;
        map.addLayer({
          id: osmLayerId,
          type: 'fill',
          source: osmSourceId,
          paint: {
            'fill-color': '#FF0000',
            'fill-opacity': 0.5
          }
        });
      } else if (feature === 'highway') {
        numberOfHighways = osmGeoJSON.features.length;
        map.addLayer({
          id: osmLayerId,
          type: 'line',
          source: osmSourceId,
          paint: {
            'line-color': '#42A5F5',
            'line-width': 3
          }
        });
      } else if (feature === 'amenity') {
        map.addLayer({
          id: osmLayerId,
          type: 'circle',
          source: osmSourceId,
          paint: {
            'circle-radius': 3,
            'circle-color': '#FF4136'
          }
        });
      }
    } catch (error) {
      console.error(`Error fetching OSM data for ${feature}:`, error.message);
    }
  }


  toggleLayer('highway-feature-layer', false);

    // Close old popup if it exists
    if (currentPopup) {
      currentPopup.remove();
    }


    toggleMapLoader("off");
  
    // Create new popup
    currentPopup = new maplibregl.Popup({ closeOnClick: true, offset: [0, -350] })
      .setLngLat(clickPoint)
      .setHTML(`
        <div class="toggle-container">
          <div class="toggle-item">
            <label class="switch">
              <input type="checkbox" id="toggle-building" checked>
              <span class="slider"></span>
            </label>
            <div class="toggle-label">Building</div>
            <span class="toggle-description"><i class="fas fa-house"></i> ${numberOfBuildings}</span>
          </div>
  
          <div class="toggle-item">
            <label class="switch">
              <input type="checkbox" id="toggle-highway">
              <span class="slider"></span>
            </label>
            <div class="toggle-label">Highway</div>
            <span class="toggle-description"><i class="fas fa-road"></i> ${numberOfHighways}</span>
          </div>
        </div>
      `)
      .addTo(map);


      document.getElementById('toggle-building').addEventListener('change', function () {
        toggleLayer('building-feature-layer', this.checked);
      });
      
      document.getElementById('toggle-highway').addEventListener('change', function () {
        toggleLayer('highway-feature-layer', this.checked);
      });
});





function toggleLayer(layerId, visible) {
  console.log('Toggling layer:', layerId, 'Visible:', visible);

  const visibility = visible ? 'visible' : 'none';
  if (map.getLayer(layerId)) {
    console.log('Layer found:', layerId);
    map.setLayoutProperty(layerId, 'visibility', visibility);
  }
}

// Event listeners for the checkboxes



function toggleMapLoader(state = "on") {
  let loader = document.getElementById("map-loader");

  if (!loader && state === "on") {
    // Create container
    loader = document.createElement("div");
    loader.id = "map-loader";
    Object.assign(loader.style, {
      position: "absolute",
      top: "50%",
      left: "60%",
      transform: "translate(-50%, -50%)",
      zIndex: "9999",
      pointerEvents: "none"
    });

    // Create spinning element
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    Object.assign(spinner.style, {
      width: "40px",
      height: "40px",
      border: "4px solid rgba(255, 255, 255, 0.3)",
      borderTop: "4px solid #c3d900",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    });

    // Inject CSS keyframes via JS
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    loader.appendChild(spinner);
    document.body.appendChild(loader);
  }

  // Toggle visibility
  if (loader) {
    loader.style.display = state === "on" ? "block" : "none";
  }
}






async function askAI() {
  const userMessage = document.getElementById("chat-input").value;
  const message_container = document.getElementById("message-container");

  try {
    const response = await fetch(`/ask-ai?message=${encodeURIComponent(userMessage)}`);
    const data = await response.json();
    console.log(data.reply);
  } catch (error) {
    console.log(error)
    // message_container.innerHTML += `<div id="ai-response">Radius too large to process</div>`;
}
}
  
  // (Keep helper functions from before: pointInPolygon, isPointNearLine, distance, distanceToSegment)
  

  function pointInPolygon(point, polygons) {
    if (polygons.length === 0) return false;
  
    if (typeof polygons[0][0][0] === 'number') {
      return polygonContainsPoint(polygons, point);
    } else {
      return polygons.some(polygon => polygonContainsPoint(polygon, point));
    }
  }
  
  function polygonContainsPoint(polygon, point) {
    let x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = polygon[0].length - 1; i < polygon[0].length; j = i++) {
      let xi = polygon[0][i][0], yi = polygon[0][i][1];
      let xj = polygon[0][j][0], yj = polygon[0][j][1];
      let intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
  
  function isPointNearLine(point, lines, tolerance) {
    const lineCoords = (typeof lines[0][0] === 'number') ? [lines] : lines;
    for (const line of lineCoords) {
      for (let i = 0; i < line.length - 1; i++) {
        if (distanceToSegment(point, line[i], line[i + 1]) < tolerance) return true;
      }
    }
    return false;
  }
  
  function distance(lng1, lat1, lng2, lat2) {
    return Math.sqrt(Math.pow(lng1 - lng2, 2) + Math.pow(lat1 - lat2, 2));
  }
  
  function distanceToSegment(point, segStart, segEnd) {
    const x = point[0], y = point[1];
    const x1 = segStart[0], y1 = segStart[1];
    const x2 = segEnd[0], y2 = segEnd[1];
    const A = x - x1, B = y - y1, C = x2 - x1, D = y2 - y1;
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) param = dot / len_sq;
    let xx, yy;
    if (param < 0) {
      xx = x1; yy = y1;
    } else if (param > 1) {
      xx = x2; yy = y2;
    } else {
      xx = x1 + param * C; yy = y1 + param * D;
    }
    return distance(x, y, xx, yy);
  }