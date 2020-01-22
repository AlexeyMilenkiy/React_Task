# 📦 React / TypeScript starter project

## Scripts to get started

* Project requires to have a Google account with access to Google Cloud storage (GCS)
* Using your GCS credentials, add PROJECT_ID, CLIENT_ID and API_KEY to credentials.ts 

* Then, start scripts to run the app:
  ```
  $ yarn
  $ yarn dev
  ```

## Conventions

* All components go in `components/`
* All files should be named using `dash-case`
* Utility functions go in `lib/`

## VSCode

Install

* https://github.com/styled-components/vscode-styled-components

Add the following to your workspace settings `.vscode/settings.json`

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```
