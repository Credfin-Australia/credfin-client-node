# Credfin Client

A wrapper that handles authentication with the Credfin API ([docs](https://credfin.io/api/v1/docs)).

Built and Tested on Node version `14.15.4`

The exported function `createCredfinClient` creates an Axios instance that automatically creates the requisite authentication headers. The resultant Axios instance can then be used as usual.

For Python and PHP language usage, check the HMAC integration [docs](https://credfin.io/docs/v1/hmac-authentication).

## Prerequisites

- A secret and identifier pair can be created through the dashboard at https://credfin.io/dashboard/tokens.
- A webhook must be registered at https://credfin.io/dashboard/webhooks.

## Installation

The package is available on [NPM](https://www.npmjs.com/package/@credfin/client).

```bash
# NPM

npm install @credfin/client

# OR Yarn

yarn add @credfin/client
```

## API Reference

```typescript
// Values required to generate authorization headers
interface CredfinApiToken {
  secret: string;
  identifier: string;
}

// Request details
interface HmacOptions {
  method: string;
  path: string;
  body?: string;
}

// the function used internally by createCredfinClient is exposed
// if you prefer to use your own HTTP request library
function generateHmacHeaders(token: CredfinApiToken, options: HmacOptions): Record<string, string>;

// Method to create an axios instance with authorization headers
function createCredfinClient(token: CredfinApiToken): AxiosInstance;
```

## Example

```typescript
import {createCredfinClient} from '@credin/client';

const secret = process.env.CREDFIN_SECRET;
const identifier = process.env.CREDFIN_IDENTIFIER;

import {createCredfinClient} from '@credfin/client';

const example = async () => {
  const bundleId = 0; // Check webhooks for specific bundle id
  const urlPath = `/api/v1/applications/${bundleId})/bundle`;

  const client = createCredfinClient({secret, identififer});

  try {
    const response = await client.get(urlPath);
  } catch (error) {
    // handle the error
  }
};

example();
```

Response data is dependent on the API requests used. Check [API docs](https://credfin.io/api/docs/) for more information.
