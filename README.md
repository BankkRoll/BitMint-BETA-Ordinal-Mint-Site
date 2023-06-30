# BitMint BETA - Minting DApp Configuration Guide
## 🚨IN PROGRESS NOT READY FOR PRODUCTION!🚨
## 🚨THIS REPO IS NOT READY FOR MINTING AND STILL IN PROGRESS!!🚨

---

### Simple Low-Code mint DApp for ordinal collections fully onchain.
### Easily deploy a collection, setup easy user minting directly here in the frontend for your collection! Full integrated Xverse, Unisat, Hiro wallet connect integration, tracking order status and much more!

<p align="center">
  <img src="https://github.com/BankkRoll/BitMint-BETA-Ordinal-Mint-Site/assets/106103625/7da9ea3d-0ac8-4c3b-8235-b1fa4f57cdc8" width="50%" alt="Project screenshot"/>
</p>

# Table of Contents
1. [BitMint BETA - Minting DApp Configuration Guide](#bitmint-beta---minting-dapp-configuration-guide)
2. [In Progress & Completed Features ⚙️](#in-progress--completed-features-️)
3. [Configuration Guide 🔧](#configuration-guide-)
4. [Step 1: Setting Up the Configuration File](#step-1-setting-up-the-configuration-file)
5. [Step 2: Creating a New Collection 🎨](#step-2-creating-a-new-collection-)
6. [Step 3: Deploying the Site For Minting 💻](#step-3-deploying-the-site-for-minting-)
7. [Contributing 🤝](#contributing-)
8. [Learn More 📚](#learn-more-)
9. [License 📜](#license-)
10. [Contact 📨](#contact-)
---

## In Progress & Completed Features ⚙️

<details>
<summary><strong>In progress</strong></summary>

- [ ] - Fix FEE and order confirmation
- [ ] - Finish implementing custom gas for economy, normal, custom
- [ ] - Add whitelist phase and functionality
- [ ] - Integrate automatic application process
- [ ] - Integrate recursive ordinals support
- [ ] - MORE COMING SOON!!!
</details>

<details>
<summary><strong>Completed</strong></summary>

- [x] - 1 command collection creation - `npm run create`
- [x] - 1 file easy setup configuration - `config.ts`
- [x] - 20+ Built in Fonts
- [x] - Easy minting UI
- [x] - Multi Wallet Connect support - `Xverse, Unisat, Hiro, More coming soon!`
- [x] - Pending order status tracking - `Live order tracking`
</details>

---

## Configuration Guide 🔧


## Step 1: Setting Up the Configuration File

To start setting up the BitMint DApp, you need to fill out the `config.ts` file in the `const` folder. This file contains the primary configuration of your minting DApp, including information about your social links, mint options, collection options, and other constants.

Replace the placeholder values in the corresponding sections. If you do not wish to include a certain platform in the `socialLinks` object, you may leave the string empty (`''`) which will make it not show the icon on the frontend.

<details>
<summary><strong>config.ts example</strong></summary>

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
  artFilesFolder: '<IPFS Folder Link>',            // replace with the link to your art collection in a local folder ex. './assets'
  optimizeImages: true,                            // Optimize images - true/false
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
  fontStyle: '<Font Style>',                        // replace with the desired font style - Font1, Font2, Font3, etc. up to Font13
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
</details>


### MIME types and file extensions

<details>
<summary><strong>List of possible MIME types and file extensions:</strong></summary>

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
</details>


---

## Step 2: Creating a New Collection 🎨

After you've successfully set up your configuration file, it's time to generate your art collection! This is accomplished with the `createCollection.ts` script. This tool takes your art files, generates all the necessary collection data, and then communicates with our API endpoint to initiate the creation process.

**Before using the `createCollection.ts` script, you absolutely must obtain a `collection-upload` API key**. 

To obtain this key, please follow these crucial steps:

1. **Visit the [OrdinalsBot Discord](https://ordinalsbot.com/).**

2. **Open a ticket to request a `collection-upload` API key:** In the ticket, clearly state that you're using the Bitmint boilerplate for creating your NFT collection and you need a `collection-upload` API key. The clearer you make your request, the smoother the process will be.

3. **Await approval for your API key:** This is a crucial step. Please be patient and do not proceed to the next step without this approval and the `collection-upload` API key.

Upon approval, you will receive the API key. Add this key to your `.env` file (or to your Environment Variables if you're using Vercel or a similar service) as follows:

```typescript
ORDINALSBOT_API_KEY=<Your API Key>
```

To use this script, please follow the steps below:

1. **Prepare your Art Files:** Ensure that all required art files are located in the folder specified by the `artFilesFolder` field in your constants file.

2. **Run the `createCollection` script:** This is easily done using the following command:

   ```shell
   npm run create
   ```

   This command initiates the script, which will create your collection based on the information provided in your configuration file.

---

## Step 3: Deploying the Site For Minting 💻

After your collection has been created, it's time to deploy your site and start minting! 


I suggest setting up a GitHub repo and deploying your site with Vercel for a smooth and cost-effective launch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBankkRoll%2FBitMint-BETA-Ordinal-Mint-Site&env=ORDINALSBOT_API_KEY&envDescription=OrdinalsBot%20API%20Key%20REQUIRED!&envLink=https%3A%2F%2Fordinalsbot.com%2F&demo-title=BitMint&demo-description=Low-Code%20mint%20DApp%20for%20ordinal%20collections%20fully%20onchain.&demo-url=https%3A%2F%2Fbitmint.vercel.app%2F&demo-image=https%3A%2F%2Fgithub.com%2FBankkRoll%2FBitMint2%2Fassets%2F106103625%2F7da9ea3d-0ac8-4c3b-8235-b1fa4f57cdc8)

---

---

---


## Contributing 🤝
[![Fork](https://img.shields.io/badge/Fork-on%20GitHub-blue?logo=github)](https://github.com/BankkRoll/BitMint-BETA-Ordinal-Mint-Site/fork)

Contributions are what make the open-source community vibrant, inspiring, and a great place for learning. Any contributions you make to BitMint are **greatly appreciated**.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

---

## Learn More 📚

Here are some resources to help you get started:

- **Next.js**: [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- **Vercel**: [Vercel Documentation](https://vercel.com/docs) - Learn about Vercel features and API.
- **GitHub**: [GitHub Documentation](https://docs.github.com) - Learn how to use GitHub to manage and collaborate on your projects.
- **Ordinals Bot**:  [ordinalsbot.com](https://ordinalsbot.com/) - Learn about the OrdinalBot platform.
- **Ordinals Bot API**: [Ordinals Bot API Documentation](https://docs.ordinalsbot.com/) - Learn about the API used in this project.
- **Ordinals Bot Discord**: [Join the OrdinalsBot Discord](https://discord.gg/9nBhVgCjct) - A place to get help and discuss about Ordinals Bot.

These resources will help you understand the technologies used in this project and allow you to better use, modify, and contribute to the project.

---

## License 📜

BitMint is distributed under the MIT License. See [LICENSE](/LICENSE) for more information.

---

## Contact 📨

You can reach out through the following:

Twitter - [@bankkroll_eth](https://twitter.com/bankkroll_eth)
