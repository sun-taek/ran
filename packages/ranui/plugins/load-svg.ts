import type { Plugin } from 'vite';
import { readFile } from 'ranuts';
import type { Config } from 'svgo';
import { optimize } from 'svgo';

interface Options {
  defaultImport?: string;
  svgoConfig?: Config;
  svgo?: boolean;
}

export default function loadSvgPlugin(options: Options = {}): Plugin {
  const { svgoConfig, defaultImport, svgo = true } = options;

  const svgRegex = /\.svg(\?(raw|skipsvgo))?$/;
  return {
    name: 'vite-plugin-load-svg',
    enforce: 'pre',
    async load(id) {
      if (!id.match(svgRegex)) return;
      const [path, query] = id.split('?', 2);
      const importType = query || defaultImport;
      if (importType === 'url') return;
      let svg: any;
      try {
        svg = await readFile(path, 'utf-8');
      } catch (ex) {
        console.warn('\n', `${id} couldn't be loaded by vite-plugin-load-svg`);
        return;
      }
      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`;
      }
      if (svgo && query !== 'skipsvgo') {
        svg = optimize(svg, { ...svgoConfig, path }).data;
      }
      return svg;
    },
  };
}
