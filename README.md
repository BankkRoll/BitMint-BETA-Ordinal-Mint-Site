# IN PROGRESS COMING SOON!!!
## Star For Early Access

---
## Full stack easy Low-Code mint DApp for ordinal collections fully onchain. Easily deploy a collection, setup easy user minting directly here in the frontend for your collection!
### Full integrated Xverse, Unisat, Hiro wallet connect intergration, tracking order status and much more!

![screencapture-localhost-3000-2023-06-12-20_01_03](https://github.com/BankkRoll/BitMint2/assets/106103625/7da9ea3d-0ac8-4c3b-8235-b1fa4f57cdc8)


# BitMint - Minting DApp Configuration Guide

### Full stack easy Low-Code mint DApp for ordinal collections fully onchain. Easily deploy a collection, setup easy user minting directly here in the frontend for your collection!
#### Full xverse/unisat wallet connect intergration, tracking order status and much more!

Welcome to the BitMint configuration guide! This guide will help you get started with setting up your own BTC ordinal minting DApp.


## Step 1: Setting Up the Configuration File

To start setting up the BitMint DApp, you need to fill out the `config.ts` file in the `const` folder. This file contains the primary configuration of your minting DApp, including information about your social links, mint options, collection options, and other constants.

Replace the placeholder values in the corresponding sections. If you do not wish to include a certain platform in the `socialLinks` object, you may leave the string empty (`''`) which will make it not show the icon on the frontend.

```typescript
const socialLinks: SocialLinks = {
  twitter: '<Your Twitter Link>',                  // replace with your Twitter link
  instagram: '<Your Instagram Link>',              // replace with your Instagram link
  discord: '<Your Discord Link>',                  // replace with your Discord link
  telegram: '<Your Telegram Link>',                // replace with your Telegram link
  website: '<Your Website Link>',                  // replace with your website link
  email: 'mailto:<Your Email>',                    // replace with your email - ex. 'mailto:example@gmail.com'
};

const mintOptions: MintOptions = {
  publicMintStart: new Date('<UTC Date>'),         // replace with the public mint start UTC date in 'YYYY-MM-DDTHH:MM:SS' format
  publicMintPrice: <Price in Satoshis>,            // replace with the public mint price in Satoshis
  limitPerWallet: <Limit per Wallet>,              // replace with the limit per wallet
  recipientBTCAddress: '<BTC Address>',            // replace with the recipient BTC address
  totalSupply: <Total Supply>,                     // replace with the total supply of NFTs
  artFilesFolder: '<IPFS Folder Link>',            // replace with the link to your art collection in an IPFS folder
  artFilesMimeType: "<MIME Type>",                 // replace with the MIME type of your files. - refer below to the MIME types and file extensions
  artFilesExtension: "<File Extension>",           // replace with the file extension of your files. - refer below to the MIME types and file extensions
  fee: <Fee>,                                      // DO NOT CHANGE THIS UNLESS YOU KNOW WHAT YOU ARE DOING
  serviceFee: <Service Fee>,                       // DO NOT CHANGE THIS UNLESS YOU KNOW WHAT YOU ARE DOING
};

const collectionOptions: CollectionOptions = {
  id: '<Collection ID>',                            // replace with your collection ID
  creator: '<Creator>',                             // replace with your creator name
};

const constants: Constants = {
  fontStyle: '<Font Style>',                        // replace with the desired font style - Font1, Font2, Font3, etc. up to Font7
  title: "<Title>",                                 // replace with your title
  description: "<Description>",                     // replace with your description
  collectionImage: "<Path to Collection Image>",    // replace with the path to the collection image
  navbarImage: "<Path to Navbar Image>",            // replace with the path to the navbar image
  socialLinks: socialLinks,                         // DO NOT CHANGE THIS
  mintOptions: mintOptions,                         // DO NOT CHANGE THIS
  collectionOptions: collectionOptions,             // DO NOT CHANGE THIS
};
export default constants;
```

### MIME types and file extensions
List of possible MIME types and file extensions:
```typescript
// 'image/apng' and 'apng'
// 'audio/flac' and 'flac'
// 'image/gif' and 'gif'
// 'text/html' and 'html'
// 'image/jpeg' and 'jpg' or 'jpeg'
// 'audio/mpeg' and 'mp3'
// 'application/pdf' and 'pdf'
// 'image/png' and 'png'
// 'image/svg+xml' and 'svg'
// 'text/plain' and 'txt' or 'asc'
// 'audio/wave' and 'wav'
// 'video/webm' and 'webm'
// 'image/webp' and 'webp'
// 'video/mp4' and 'mp4'
// 'model/stl' and 'stl'
// 'model/gltf-binary' and 'glb'
// 'image/avif' and 'avif'
// 'text/yaml' and 'yaml' or 'yml'
// 'application/json' and 'json'

```

## Step 2: Creating a New Collection

After setting up your configuration file, the next step is to create your collection. For this purpose, we have a script named `createCollection.ts` which reads your art files, prepares the necessary collection data, and sends it to a predefined API endpoint.

To run this script, follow these steps:

1. Make sure you have the required art files in the folder specified in the `artFilesFolder` field in your constants file.

2. Run the `createCollection` script using the command:

   `npm run create`

This command will execute the script which automatically creates your collection based on the provided configuration.

Upon successful execution, a JSON file named `collection.json` will be created in the root directory of your project. This file will contain the response data from the collection creation API which includes important details of your collection such as the collection ID.

Remember to keep the `collection.json` file safe as it contains important information about your collection.




## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### Coming Soon!

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

BankkRoll - [@bankkroll_eth](https://twitter.com/bankkroll_eth)
