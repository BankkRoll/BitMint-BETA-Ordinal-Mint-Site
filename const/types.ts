// const/types.ts

export interface SocialLinks {
  twitter: string;
  instagram: string;
  discord: string;
  telegram: string;
  website: string;
  email: string;
}

export interface MintOptions {
  publicMintStart: Date;
  publicMintPrice: number;
  limitPerWallet: number;
  recipientBTCAddress: string;
  totalSupply: number;
  artFilesFolder: string;
  artFilesMimeType: string;
  artFilesExtension: string;
  fee: number;
  serviceFee: number;
  optimizeImages: boolean;
}

export interface CollectionOptions {
  id: string;
  creator: string;
}

export interface Constants {
  fontStyle: string;
  title: string;
  description: string;
  collectionImage: string;
  navbarImage: string;
  socialLinks: SocialLinks;
  mintOptions: MintOptions;
  collectionOptions: CollectionOptions;
}
