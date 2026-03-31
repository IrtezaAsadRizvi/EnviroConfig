# EnviroConfig

EnviroConfig is a lightweight **Node.js and TypeScript environment configuration manager** for apps that rely on different `.env` files across development, testing, and production. It helps you load the right environment file, apply fallback defaults, validate values with **Joi**, and keep `process.env` predictable.

If you are looking for a simple way to manage **environment variables in Node.js**, handle multiple `.env` files, or add **runtime config validation** to a backend project, EnviroConfig is built for that workflow.

## Why Use EnviroConfig?

- Load environment-specific files like `.env.development`, `.env.testing`, and `.env.production`
- Apply default values when variables are missing
- Validate configuration with Joi before your app starts
- Switch environments at runtime
- Use a custom directory for your environment files
- Keep setup simple for JavaScript and TypeScript projects

## Installation

Install the package:

```bash
npm install enviroconfig
```

If you want to validate your environment variables with Joi in your own app code, install Joi as well:

```bash
npm install joi
```

## Quick Start

Create environment files in your project root:

```bash
# .env.development
DB_HOST=localhost
DB_PORT=5432
API_KEY=dev123
```

```bash
# .env.testing
DB_HOST=localhost
DB_PORT=5433
API_KEY=test123
```

```bash
# .env.production
DB_HOST=prod.db.server
DB_PORT=5432
API_KEY=prod123
```

Then initialize EnviroConfig in your app.

## JavaScript Example

```js
const EnviroConfig = require('enviroconfig').default;
const Joi = require('joi');

const schema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  API_KEY: Joi.string().required()
});

const config = new EnviroConfig({
  env: 'development',
  schema,
  defaults: { DB_PORT: 5432 },
  configPath: __dirname
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
```

## TypeScript Example

```ts
import EnviroConfig from 'enviroconfig';
import Joi from 'joi';

const schema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  API_KEY: Joi.string().required()
});

const config = new EnviroConfig({
  env: 'development',
  schema,
  defaults: { DB_PORT: 5432 },
  configPath: __dirname
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
```

## Switch Environments

You can move from one environment to another without rewriting your setup:

```ts
config.switchEnv('production');

console.log(process.env.DB_HOST);
```

This is useful for test runners, scripts, deployment tooling, and apps that need flexible configuration loading.

## Use Default Values

Set fallback values for variables that are not defined in the selected `.env` file:

```ts
const config = new EnviroConfig({
  env: 'development',
  defaults: {
    DB_PORT: 5432,
    FEATURE_ENABLED: false
  }
});
```

## Validate Environment Variables with Joi

Use Joi to make sure required values exist and are the right type before your application continues:

```ts
import Joi from 'joi';
import EnviroConfig from 'enviroconfig';

const schema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  API_KEY: Joi.string().required()
});

new EnviroConfig({
  env: 'production',
  schema
});
```

If validation fails, EnviroConfig throws an error so configuration issues are caught early.

## Use a Custom Config Path

Store your environment files outside the project root if needed:

```ts
const config = new EnviroConfig({
  env: 'development',
  configPath: '/custom/path/to/config'
});
```

You can also update the location later:

```ts
config.setConfigPath('/another/path');
```

## API Overview

### `new EnviroConfig(options)`

Available options:

- `env`: target environment name. Default: `'development'`
- `schema`: Joi schema used to validate `process.env`
- `defaults`: fallback key-value pairs for missing variables
- `configPath`: directory that contains `.env.<env>` files. Default: `process.cwd()`

### Methods

- `switchEnv(newEnv: string)`: load a different environment file
- `setConfigPath(newPath: string)`: change the directory used for environment files

## Common Use Cases

- Node.js API servers with separate local, test, and production configs
- TypeScript backends that need typed validation around environment setup
- CLI tools and scripts that switch between environments
- Projects migrating from plain `dotenv` to a more structured config workflow

## Why It Works Well

EnviroConfig stays intentionally small. It focuses on the practical parts of **environment variable management**:

- loading the correct `.env` file
- filling in missing values with sensible defaults
- validating configuration before runtime failures happen
- keeping everything in familiar `process.env`

That makes it a good fit for teams that want something more structured than raw `dotenv`, without introducing a heavy configuration system.

## License

ISC
