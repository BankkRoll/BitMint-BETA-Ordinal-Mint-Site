// const/config.ts
import { Constants, MintOptions, SocialLinks, CollectionOptions } from './types';

const socialLinks: SocialLinks = {
  twitter: "https://twitter.com/",
  instagram: "https://instagram.com/",
  discord: "https://discord.com/",
  telegram: "https://telegram.me/",
  website: "https://bitmint-beta.vercel.app",
  email: "mailto:example@email.com",                                                                                // add 'mailto:' to email link for click event ex 'mailto:example.com'
};

const mintOptions: MintOptions = {
  publicMintStart: new Date('2023-06-12T13:57:00'),                                                                 // UTC Date, Format: 'YYYY-MM-DDTHH:MM:SS'
  publicMintPrice: 0.0006,                                                                                          // Price in Satoshis
  limitPerWallet: 3,                                                                                                // Limit per wallet
  recipientBTCAddress: "bc1px7a26uzsf8wlfdny7sttk543lxzf3hs95dztgjct76aurdk3p5uq6vftde",                            // Address to receive mint funds
  totalSupply: 3,                                                                                                   // Total supply
  artFilesFolder: "/ArtCollectionFiles",                                                                            // Full art collection in a folder
  optimizeImages: true,                                                                                             // Optimize images - true/false
  artFilesMimeType: "image/png",                                                                                    // Replace 'image/png' with the actual MIME type of your files.
  artFilesExtension: "png",                                                                                         // File extension of the files.
  fee: 2,                                                                                                           // Miner fee that will be paid while inscribing in sats/byte. (default=2 sats/byte)
  serviceFee: 27000,                                                                                                // DO NOT CHANGE THIS REQUIRED!!!!
};

const collectionOptions: CollectionOptions = {
  id: 'BitMint',                                                                                                     // replace with your collection slug
  creator: 'BankkRoll',                                                                                              // replace with your creator name
};

const constants: Constants = {
  fontStyle: 'Font12',                                                                                                // Font1, Font2, ..to.. Font12, Font13
  title: "BitMint",                                                                                                   // Title
  description: "The First ever low-code bitcoin ordinals full-stack minting boilerplate. Developed by Bankkroll.eth", // Description
  collectionImage: "images/logo.png",                                                                                 // Mintpage main image
  navbarImage: "images/logo.png",                                                                                     // Navbar image
  socialLinks: socialLinks,
  mintOptions: mintOptions,
  collectionOptions: collectionOptions,
};

export default constants;
