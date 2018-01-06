import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

/**
 * Ensures opts are valid and rejects them if they are not.
 * @param {array} opts Plugin options.
 * @return {Promise} [description]
 */
export const validateOpts = (
    opts,
    schemaFile = path.resolve(__dirname, '../optsSchema.json'),
) =>
    new Promise((resolve, reject) => {
        fs.readFile(schemaFile, 'utf-8', (err, schemaBuffer) => {
            if (err) {
                reject(err);
                return;
            }

            const ajv = new Ajv();
            const valid = ajv.validate(JSON.parse(schemaBuffer), opts);

            if (!valid) {
                reject(ajv.errorsText());
                return;
            }

            resolve(opts);
        });
    });
