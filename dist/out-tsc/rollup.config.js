// // rollup.config.js
// import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';
// import commonjs from 'rollup-plugin-commonjs';
// import { terser } from 'rollup-plugin-terser';
// const terserInstance = terser({
//   mangle: {
//     // captureExceptions and captureMessage are public API methods and they don't need to be listed here
//     // as mangler doesn't touch user-facing thing, however sentryWrapped is not, and it would be mangled into a minified version.
//     // We need those full names to correctly detect our internal frames for stripping.
//     // I listed all of them here just for the clarity sake, as they are all used in the frames manipulation process.
//     reserved: ['captureException', 'captureMessage', 'sentryWrapped'],
//     properties: {
//       regex: /^_[^_]/,
//     },
//   },
// });
// export default [{
//   input: 'src/main.js',
//   output: {
//     name:"postError",
//     format: 'iife',
//     sourcemap: true,
//     strict: false,
//     file:"./build/bundle.js"
//   },
//   plugins: [
//     resolve({
//       customResolveOptions: {
//         moduleDirectory: 'node_modules'
//       }
//     }),
//     typescript({
//       exclude: ['*.d.ts', '**/*.d.ts', '**/*.stories.tsx', '**/*.spec.tsx'],
//       rollupCommonJSResolveHack: true,
//       clean: true,
//     }),
//     babel({
//       exclude: 'node_modules/**' // 只编译我们的源代码
//     }),
//     commonjs(),
//   ],
//   external: ['react',"angular"]
// }];
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const commitHash = require('child_process')
    .execSync('git rev-parse --short HEAD', { encoding: 'utf-8' })
    .trim();
const terserInstance = terser({
    mangle: {
        // captureExceptions and captureMessage are public API methods and they don't need to be listed here
        // as mangler doesn't touch user-facing thing, however sentryWrapped is not, and it would be mangled into a minified version.
        // We need those full names to correctly detect our internal frames for stripping.
        // I listed all of them here just for the clarity sake, as they are all used in the frames manipulation process.
        reserved: ['captureException', 'captureMessage', 'sentryWrapped'],
        properties: {
            regex: /^_[^_]/,
        },
    },
});
const paths = {};
const plugins = [
    typescript({
        tsconfig: 'tsconfig.build.json',
        tsconfigOverride: {
            compilerOptions: {
                declaration: false,
                declarationMap: false,
                module: 'ES2015',
                paths,
            },
        },
        include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)'],
    }),
    resolve({
        mainFields: ['module'],
    }),
    commonjs(),
];
const bundleConfig = {
    input: 'src/index.ts',
    output: {
        format: 'iife',
        name: 'postError',
        sourcemap: true,
        strict: false,
    },
    plugins: [
        ...plugins,
        license({
            sourcemap: true,
            banner: `/*! @sentry/browser <%= pkg.version %> (${commitHash}) | https://github.com/getsentry/sentry-javascript */`,
        }),
    ],
};
export default [
    Object.assign(Object.assign({}, bundleConfig), { output: Object.assign(Object.assign({}, bundleConfig.output), { file: 'build/bundle.js' }) }),
    Object.assign(Object.assign({}, bundleConfig), { output: Object.assign(Object.assign({}, bundleConfig.output), { file: 'build/bundle.min.js' }), 
        // Uglify has to be at the end of compilation, BUT before the license banner
        plugins: bundleConfig.plugins
            .slice(0, -1)
            .concat(terserInstance)
            .concat(bundleConfig.plugins.slice(-1)) }),
    Object.assign(Object.assign({}, bundleConfig), { output: Object.assign(Object.assign({}, bundleConfig.output), { file: 'build/bundle.es6.js' }), plugins: [
            typescript({
                tsconfig: 'tsconfig.json',
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        declarationMap: false,
                        module: 'ES2015',
                        paths,
                        target: 'es6',
                    },
                },
                include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)'],
            }),
            ...plugins.slice(1).concat(bundleConfig.plugins.slice(-1)),
        ] }),
    Object.assign(Object.assign({}, bundleConfig), { output: Object.assign(Object.assign({}, bundleConfig.output), { file: 'build/bundle.es6.min.js' }), plugins: [
            typescript({
                tsconfig: 'tsconfig.build.json',
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        declarationMap: false,
                        module: 'ES2015',
                        paths,
                        target: 'es6',
                    },
                },
                include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)'],
            }),
            ...plugins
                .slice(1)
                .slice(0, -1)
                .concat(terserInstance)
                .concat(bundleConfig.plugins.slice(-1)),
        ] }),
];
//# sourceMappingURL=rollup.config.js.map