import axios, { CancelTokenSource } from 'axios';
import constants from './const/config';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

async function createCollection() {
  console.log('Creating collection...');

  // Check if API Key is set
  if (!process.env.ORDINALSBOT_API_KEY) {
    throw new Error('ORDINALSBOT_API_KEY environment variable is not set.');
  }

  const extension = constants.mintOptions.artFilesExtension;
  const totalSupply = constants.mintOptions.totalSupply;
  console.log(`Extension: ${extension}, Total supply: ${totalSupply}`);

  const filePromises = Array.from({ length: totalSupply }, async (_, i) => {
    const fileName = `${i + 1}.${extension}`;
    const localFilePath = path.join(__dirname, constants.mintOptions.artFilesFolder, fileName);

    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`File ${localFilePath} does not exist.`);
    }

    return {
      name: fileName,
      url: localFilePath
    };
  });

  console.log('Awaiting file promises...');
  const files = await Promise.all(filePromises);
  console.log('File promises resolved.');

  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', fs.createReadStream(file.url), file.name);
  });

  // Append other fields
  formData.append('id', constants.collectionOptions.id);
  formData.append('name', constants.title);
  formData.append('description', constants.description);
  formData.append('creator', constants.collectionOptions.creator);
  formData.append('price', constants.mintOptions.publicMintPrice.toString());
  formData.append('totalCount', totalSupply.toString());
  formData.append('serviceFee', constants.mintOptions.serviceFee.toString());
  formData.append('receiveAddress', constants.mintOptions.recipientBTCAddress);
  formData.append('optimize-images', constants.mintOptions.optimizeImages.toString());


  const options = {
    headers: {
      ...formData.getHeaders(),
      'x-api-key': process.env.ORDINALSBOT_API_KEY,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537'
    },
  };


  console.log('Making request to create collection...');
  try {
    const response = await axios.post('https://api2.ordinalsbot.com/collection-upload', formData, options);
    console.log(`Created collection. Response data: ${JSON.stringify(response.data)}`);

    return response.data;
  } catch (error: any) {
    console.error(`Caught error while creating collection: ${error}`);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error details:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    } else {
      console.error('Error:', error.message);
    }
  }
}

console.log('Starting collection creation...');
createCollection()
  .then(() => {
    console.log(`${constants.collectionOptions.id} creation process completed. Here are the details of the collection:
    - Collection ID: ${constants.collectionOptions.id}
    - Number of pieces: ${constants.mintOptions.totalSupply}
    - Art file extension: ${constants.mintOptions.artFilesExtension}
    - Collection creator: ${constants.collectionOptions.creator}
    - Public mint price: ${constants.mintOptions.publicMintPrice} BTC
    - Recipient BTC address: ${constants.mintOptions.recipientBTCAddress}
    - Image optimization: ${constants.mintOptions.optimizeImages}`);
    console.log('Please join the OrdinalsBot discord and open a ticket to get your collection approved.');
    console.log('\x1b[34m%s\x1b[0m', 'https://discord.gg/9nBhVgCjct');
  })
  .catch(error => {
    console.error(`Error during collection creation process: ${error.message}`);
  });
