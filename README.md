# IN PROGRESS COMING SOON!!!

## Full stack easy Low-Code mint DApp for ordinal collections fully onchain. Easily deploy a collection, setup easy user minting directly here in the frontend for your collection!
### Full xverse/unisat wallet connect intergration, tracking order status and much more!

![screencapture-localhost-3000-2023-06-12-13_02_47](https://github.com/BankkRoll/BitMint2/assets/106103625/6c3a0199-b801-42a7-8bd4-5ccb5bb189e0)

# BitMint - Minting DApp Configuration Guide

Welcome to the BitMint configuration guide! This guide will help you get started with setting up your own BTC ordinal minting DApp.

## Step 1: Setting Up the Configuration File

To start setting up the BitMint DApp, you need to fill out the `config.ts` file in the `const` folder. This file contains the primary configuration of your minting DApp, including information about your social links, mint options, and collection options.

### Step 1.1: Configuring Social Links

Replace the placeholder URLs in the `socialLinks` object with your own. If you do not wish to include a certain platform, you may leave the string empty (`''`) which will make it not show the icon on the frontend.

```typescript
const socialLinks: SocialLinks = {
  twitter: '<Your Twitter Link>',
  instagram: '<Your Instagram Link>',
  discord: '<Your Discord Link>',
  telegram: '<Your Telegram Link>',
  website: '<Your Website Link>',
  email: '<Your Email>',
};
```

### Step 1.2: Configuring Mint Options

Replace the placeholder values in the `mintOptions` object with your own. These settings will determine the conditions of your NFT minting process.

```typescript
const mintOptions: MintOptions = {
  publicMintStart: new Date('<UTC Date>'),         // Format: 'YYYY-MM-DDTHH:MM:SS'
  publicMintPrice: <Price in Satoshis>,            // replace with the price per mint
  limitPerWallet: <Limit per Wallet>,              // replace with the limit per wallet
  recipientBTCAddress: '<BTC Address>',            // replace with the recipient BTC address
  totalSupply: <Total Supply>,                     // replace with the total supply of NFTs
  artFilesFolder: '<Path to Art Collection>',      // replace with the path to the art collection
};
```

### Step 1.3: Configuring Collection Options

Replace the placeholder values in the `collectionOptions` object with your own. These options will define the identity of your NFT collection.

```typescript
const collectionOptions: CollectionOptions = {
  id: '<Collection ID>',                            // replace with your collection ID
  creator: '<Creator>',                             // replace with your creator name
};
```

### Step 1.4: Other Configurations

There are a few more configurations that you will need to set. These include the title, description, font style, and images used in your DApp.

```typescript
const constants: Constants = {
  fontStyle: '<Font Style>',                         // replace with the desired font style - Font1, Font2, Font3, etc. up to Font7
  title: "<Title>",                                  // replace with your title
  description: "<Description>",                      // replace with your description
  collectionImage: "<Path to Collection Image>",     // replace with the path to the collection image
  navbarImage: "<Path to Navbar Image>",             // replace with the path to the navbar image
  socialLinks: socialLinks,                          // DO NOT CHANGE THIS
  mintOptions: mintOptions,                          // DO NOT CHANGE THIS
  collectionOptions: collectionOptions,              // DO NOT CHANGE THIS
};
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
