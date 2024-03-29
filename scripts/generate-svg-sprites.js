const SVGSpriter = require('svg-sprite');
const path = require('path');
const fs = require('fs-extra');

const transform = [
    {
        svgo: {
            plugins: [
                {
                    name: 'preset-default',
                    params: {
                        overrides: {
                            inlineStyles: {
                                onlyMatchedOnce: false
                            }
                        }
                    }
                },
                {
                    name: 'convertStyleToAttrs'
                },
                {
                    name: 'removeAttributesBySelector',
                    params: {
                        selector: '[fill="#000"]',
                        attributes: 'fill'
                    },
                },
                {
                    name: 'removeAttributesBySelector',
                    params: {
                        selector: '[stop-opacity="1"]',
                        attributes: 'stop-opacity'
                    },
                },
            ]
        }
    }
]

let config = {
    'dest': 'packages/uhk-web/src/assets/',
    log: 'verbose',
    'shape': {
        'id': {
            'generator': function (name) {
                return 'icon-' + path.basename(name).slice(0, -4);
            }
        },
        transform
    },
    'mode': {
        'defs': {
            'inline': true,
            'dest': './',
            'sprite': 'compiled_sprite.svg',
            bust: false
        }
    },
    svg: { // General options for created SVG files
        namespaceIDs: true,
        rootAttributes: {
            "xmlns:xlink":"http://www.w3.org/1999/xlink"
        }
    }
};

let spriter = new SVGSpriter(config);

// Register Keyboard SVG files with the spriter
addInputSvgs(path.join(__dirname, '../packages/uhk-web/src/svgs/keyboard'));
// Compile the sprite
spriter.compile(writeResultFiles);

// Register scss icon
config = {
    'dest': 'packages/uhk-web/src/styles/uhk-icons/',
    log: 'verbose',
    'shape': {
        'id': {
            'generator': function (name) {
                return 'icon-' + path.basename(name).slice(0, -4);
            }
        },
        transform
    },
    'mode': {
        'css': {
            'dest': './',
            prefix: '.uhk-%s',
            sprite: 'uhk-css.svg',
            bust: false,
            render: {
                scss: {
                    template: './packages/uhk-web/src/svgs/icons/scss-template.mustache',
                    dest: './uhk-icon.scss'
                }
            },
            dimensions: false
        }
    }
};

spriter = new SVGSpriter(config);
addInputSvgs(path.join(__dirname, '../packages/uhk-web/src/svgs/icons'));
spriter.compile(writeResultFiles);

// Helper functions
function addInputSvgs (dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            return addInputSvgs(fullPath);
        }
        if (path.extname(file) === '.svg') {
            spriter.add(fullPath, file, fs.readFileSync(fullPath, {encoding: 'utf-8'}));
        }
    });
}

function writeResultFiles (error, result) {
    if (error) {
        return console.error(error);
    }
    // Run through all configured output modes
    for (const mode in result) {

        // Run through all created resources and write them to disk
        for (const type in result[mode]) {
            fs.ensureDirSync(path.dirname(result[mode][type].path));
            fs.writeFileSync(result[mode][type].path, result[mode][type].contents);
        }
    }
}
