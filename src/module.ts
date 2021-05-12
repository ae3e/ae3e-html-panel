import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaults } from './types';
import { SimplePanel } from './SimplePanel';
import {PanelOptionCode} from './PanelOptionCode';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
    return builder
    .addCustomEditor({
        id: 'html',
        path: 'html',
        name: 'Html',
        description: `
        Html code
        `,
        editor: PanelOptionCode,
        category: ['Html'],
        settings: {
            language: 'html'
        },
        defaultValue: defaults.html
    })
    .addCustomEditor({
        id: 'script',
        path: 'script',
        name: 'Script',
        description: `
        Script executed when chart is clicked.
        f(data){...your code...}`,
        editor: PanelOptionCode,
        category: ['Script'],
        settings: {
            language: 'javascript'
        },
        defaultValue: defaults.script
    })
});