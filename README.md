### Installation
```
 npm install @credfin/client 
 ```

### Configuration

```javascript

    // This value must be either 'STAGING' or 'PRODUCTION'
    const environment = process.env.CREDFIN_ENV;
   
    /*
    Check the webhook settings for these values on your credfin account
    https://credfin.io/dashboard/user-settings or 
    https://staging.credfin.io/dashboard/user-settings depending on environment
    */

    const secret = process.env.CREDFIN_SECRET;
    const identifier = process.env.CREDFIN_IDENTIFER;
    const name = process.env.CREDFIN.NAME;

    const credinClient = new Client({
        secret,
        identififer,
        name,
        environment
    })

```
### Note Bundle webhooks must have previously been configured


### Client Methods
```javascript

// Handles Authentication for credfin endpoints between client and credfin servers
Client.get(urlPath: string, handleErrorCB: (error: axios.AxiosError) => any)

```

### Usage Example

```javascript
    const example = async () => {
      const bundleId = 0; // Check webhooks for specific bundle id
      const urlPath = `/api/applications/${bundleId})/bundle`;
  
      // Callback handles axios.AxiosError refer to axios docs for more info
      const response = await credfin.get(urlPath, (err) => {
          throw new Error(err.message);
      }) 
    }

    example();

```
[Response body will be json check API Docs for more specific information](https://credfin.io/api/docs/)


