# EnviroConfig

## Description

**EnviroConfig** is a flexible and easy-to-use Node.js package designed to manage environment configurations. It addresses the common issue of handling multiple sets of environment variables for different environments, such as development, testing, and production. By using EnviroConfig, developers can easily switch between these environments, apply default values, validate configurations against schemas, and set custom paths for environment files. This package ensures that applications are configured correctly and consistently across various environments, reducing errors and simplifying the setup process.

## How to Install

To install EnviroConfig, run the following command:

```bash
npm install enviro-config
```

## How to Use

### Using EnviroConfig in a Node.js Project

1. **Create Environment Files**

    Create `.env.development`, `.env.testing`, and `.env.production` files in your project root:

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
2. **Initialize EnviroConfig**

   Create a `config.js` file and use EnviroConfig:

    ```js
    const EnviroConfig = require('enviro-config');
    const Joi = require('joi');

    const schema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    API_KEY: Joi.string().required()
    });

    const config = new EnviroConfig({
    env: 'development',
    schema: schema,
    defaults: { DB_PORT: 5432 },
    configPath: __dirname
    });

    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_PORT:', process.env.DB_PORT);
    ```

3. **Switch Environment**
    ```js
    config.switchEnv('production');
    console.log('Production DB_HOST:', process.env.DB_HOST);
    ```

### Using EnviroConfig in a TypeScript Project
1. **Create Environment Files**
    Create `.env.development`, `.env.testing`, and `.env.production` files as shown in the Node.js example.
2. **Initialize EnviroConfig**
    Create a `config.ts` file and use EnviroConfig:
    ```ts
    import EnviroConfig from 'enviro-config';
    import Joi from 'joi';

    const schema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    API_KEY: Joi.string().required()
    });

    const config = new EnviroConfig({
    env: 'development',
    schema: schema,
    defaults: { DB_PORT: 5432 },
    configPath: __dirname
    });

    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_PORT:', process.env.DB_PORT);

    ```
3. **Switch Environment**
    ```ts
    config.switchEnv('production');
    console.log('Production DB_HOST:', process.env.DB_HOST);
    ```

## ✨ Features

- ✨ **Default Values**: Apply default values for missing environment variables.interaction.
- ✨ **Schema Validation**: Validate environment variables against a schema using Joi.
- ✨ **Custom Configuration Paths**: Set custom paths for environment files.
- ✨ **Switch Environments**: Easily switch between different environment configurations.

### Applying Default Values
```ts
const config = new EnviroConfig({
  env: 'development',
  defaults: { DB_PORT: 5432 }
});
```

### Schema Validation
```ts
const schema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  API_KEY: Joi.string().required()
});

const config = new EnviroConfig({
  env: 'development',
  schema: schema
});
```

### Custom Configuration Paths
```ts
const config = new EnviroConfig({
  env: 'development',
  configPath: '/custom/path/to/config'
});
```

### From Dev
EnviroConfig simplifies the management of environment variables in Node.js applications. By providing features such as default values, schema validation, and easy switching between environments, it helps ensure that your application is consistently configured across different stages of development. This reduces configuration errors and improves overall development efficiency.


## License

[MIT]