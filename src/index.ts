import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Joi, { Schema } from 'joi';

interface EnviroConfigOptions {
  env?: string;
  schema?: Schema;
  defaults?: { [key: string]: string | number | boolean };
  configPath?: string;
}

class EnviroConfig {
  private env: string;
  private schema: Schema | null;
  private defaults: { [key: string]: string | number | boolean };
  private configPath: string;

  constructor(options: EnviroConfigOptions = {}) {
    this.env = options.env || 'development';
    this.schema = options.schema || null;
    this.defaults = options.defaults || {};
    this.configPath = options.configPath || process.cwd();
    this.loadConfig();
  }

  private loadConfig(): void {
    const envFilePath = path.resolve(this.configPath, `.env.${this.env}`);
    if (fs.existsSync(envFilePath)) {
      const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
      const parsedEnv = dotenv.parse(envFileContent);

      for (const key in parsedEnv) {
        process.env[key] = parsedEnv[key];
      }
    } else {
      console.warn(`Environment file .env.${this.env} not found`);
    }

    this.applyDefaults();
    this.validateConfig();
  }

  private applyDefaults(): void {
    for (const key in this.defaults) {
      if (!process.env[key]) {
        process.env[key] = this.defaults[key].toString();
      }
    }
  }

  private validateConfig(): void {
    if (this.schema) {
      const { error } = this.schema.validate(process.env, { allowUnknown: true });
      if (error) {
        throw new Error(`Environment validation error: ${error.message}`);
      }
    }
  }

  public switchEnv(newEnv: string): void {
    this.env = newEnv;
    this.loadConfig();
  }

  public setConfigPath(newPath: string): void {
    this.configPath = newPath;
    this.loadConfig();
  }
}

export default EnviroConfig;
