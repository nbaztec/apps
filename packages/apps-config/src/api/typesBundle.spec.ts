// Copyright 2017-2023 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import fs from 'node:fs';

import { objectSpread } from '@polkadot/util';

import chain from './chain';
import spec from './spec';

// Technically this shouldn't be a test - it was that way since historically we
// didn't use something like ts-node. Now however we can actually replace this
// with a non-script test version and use the @polkadot/dev/node/ts loader

describe('typesBundle', (): void => {
  const specEntries = Object.entries(spec);
  const chainEntries = Object.entries(chain);
  const typesBundle: { chain: Record<string, unknown>, spec: Record<string, unknown> } = { chain: {}, spec: {} };

  afterAll((): void => {
    fs.writeFileSync('packages/apps-config/src/api/typesBundle.ts', `// Copyright 2017-2023 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Do not edit, auto-generated by @polkadot/apps-config

import type { OverrideBundleType } from '@polkadot/types/types';

/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable sort-keys */

export const typesBundle = ${JSON.stringify(typesBundle, null, 2)} as unknown as OverrideBundleType;
`);
  });

  describe('specs', (): void => {
    for (const [k, v] of specEntries) {
      it(`adds ${k}`, (): void => {
        const value = objectSpread<{ derives: unknown }>({}, v);

        delete value.derives;

        typesBundle.spec[k] = value;
      });
    }
  });

  describe('chains', (): void => {
    for (const [k, v] of chainEntries) {
      it(`adds ${k}`, (): void => {
        const value = objectSpread<{ derives: unknown }>({}, v);

        delete value.derives;

        typesBundle.chain[k] = value;
      });
    }
  });
});
