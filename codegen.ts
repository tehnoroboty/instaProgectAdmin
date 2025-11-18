import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  documents: ['./src/queries/**/*.ts'],
  generates: {
    'src/': {
      config: {
        withHooks: true,
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: './queries/types.ts',
        extension: '.generated.tsx',
      },
    },
    'src/queries/types.ts': { plugins: ['typescript'] },
  },
  ignoreNoDocuments: true, // for better experience with the watcher
  schema: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://inctagram.work/api/v1/'}graphql`,
}

export default config
